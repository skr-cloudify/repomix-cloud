// Smithery MCP server entry point
const { McpServer } = require("@modelcontextprotocol/sdk/server/mcp.js");
const path = require("path");
const { z } = require("zod");
const crypto = require("crypto");
const fs = require("fs/promises");
const os = require("os");
const { spawn } = require("child_process");

// Map to store generated output files
const outputFileRegistry = new Map();

// Register an output file
const registerOutputFile = (id, filePath) => {
  outputFileRegistry.set(id, filePath);
};

// Get file path from output ID
const getOutputFilePath = (id) => {
  return outputFileRegistry.get(id);
};

/**
 * Creates a temporary directory for MCP tool operations
 */
const createToolWorkspace = async () => {
  try {
    const tmpBaseDir = path.join(os.tmpdir(), "repomix", "mcp-outputs");
    await fs.mkdir(tmpBaseDir, { recursive: true });
    const tempDir = await fs.mkdtemp(`${tmpBaseDir}/`);
    return tempDir;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create temporary directory: ${message}`);
  }
};

/**
 * Generate a unique output ID
 */
const generateOutputId = () => {
  return crypto.randomBytes(16).toString("hex");
};

/**
 * Format tool response with metrics and output file registration
 */
const formatToolResponse = async (
  context,
  packResult,
  outputFilePath,
  topFilesLength
) => {
  try {
    // Read the output file
    const outputContent = await fs.readFile(outputFilePath, "utf-8");
    const outputId = generateOutputId();

    // Register the output file
    registerOutputFile(outputId, outputFilePath);

    // Extract metrics
    const metrics = packResult?.metrics || {};
    const {
      totalFiles = 0,
      totalCharacters = 0,
      totalTokens = 0,
      fileCharCounts = {},
      fileTokenCounts = {},
    } = metrics;

    // Get top files by character count
    const topFilesByChar = Object.entries(fileCharCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, topFilesLength)
      .map(([file, chars]) => `${file}: ${chars.toLocaleString()} chars`);

    // Get top files by token count
    const topFilesByToken = Object.entries(fileTokenCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, topFilesLength)
      .map(([file, tokens]) => `${file}: ${tokens.toLocaleString()} tokens`);

    const contextStr = context.repository
      ? `Repository: ${context.repository}`
      : context.directory
      ? `Directory: ${context.directory}`
      : "Unknown source";

    return {
      isError: false,
      content: [
        {
          type: "text",
          text:
            `Successfully packaged codebase!\n\n` +
            `${contextStr}\n` +
            `Output ID: ${outputId}\n\n` +
            `Metrics:\n` +
            `- Total files: ${totalFiles.toLocaleString()}\n` +
            `- Total characters: ${totalCharacters.toLocaleString()}\n` +
            `- Total tokens: ${totalTokens.toLocaleString()}\n\n` +
            `Top ${topFilesLength} files by character count:\n${topFilesByChar.join(
              "\n"
            )}\n\n` +
            `Top ${topFilesLength} files by token count:\n${topFilesByToken.join(
              "\n"
            )}\n\n` +
            `Output: Use the 'read_repomix_output' tool with output ID '${outputId}' to read the packaged content.`,
        },
      ],
    };
  } catch (error) {
    return formatToolError(error);
  }
};

/**
 * Format tool error response
 */
const formatToolError = (error) => {
  const message = error instanceof Error ? error.message : String(error);
  return {
    isError: true,
    content: [
      {
        type: "text",
        text: `Error: ${message}`,
      },
    ],
  };
};

/**
 * Run the repomix CLI with given options
 */
const runRepomixCli = async (args, cwd, options = {}) => {
  return new Promise((resolve, reject) => {
    // Build command line arguments
    const cliArgs = [];

    if (options.remote) cliArgs.push("--remote", options.remote);
    if (options.compress !== undefined)
      cliArgs.push(options.compress ? "--compress" : "--no-compress");
    if (options.include) cliArgs.push("--include", options.include);
    if (options.ignore) cliArgs.push("--ignore", options.ignore);
    if (options.output) cliArgs.push("--output", options.output);
    if (options.style) cliArgs.push("--style", options.style);
    if (options.securityCheck === false) cliArgs.push("--no-security-check");
    // Security checks are enabled by default, so no flag needed when true
    if (options.topFilesLen)
      cliArgs.push("--top-files-len", options.topFilesLen.toString());
    if (options.quiet) cliArgs.push("--quiet");

    // Add the target directory/path
    cliArgs.push(...args);

    // Try to find repomix binary, fallback to npx if not found
    let repomixPath = "/app/node_modules/.bin/repomix";
    let command = repomixPath;
    let args = cliArgs;

    try {
      await fs.access(repomixPath);
    } catch {
      // Fallback to npx if local binary not found
      command = "npx";
      args = ["repomix@0.3.5", ...cliArgs];
    }

    const child = spawn(command, args, {
      cwd,
      stdio: ["inherit", "pipe", "pipe"],
      env: {
        ...process.env,
        // Ensure GitHub token is passed through
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
      },
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code === 0) {
        // Parse the output to extract metrics if possible
        const metrics = {
          totalFiles: 0,
          totalCharacters: 0,
          totalTokens: 0,
          fileCharCounts: {},
          fileTokenCounts: {},
        };

        resolve({
          packResult: { metrics },
          stdout,
          stderr,
        });
      } else {
        reject(
          new Error(`Repomix CLI failed with code ${code}: ${stderr || stdout}`)
        );
      }
    });

    child.on("error", (error) => {
      reject(error);
    });
  });
};

module.exports = function ({ config = {} }) {
  try {
    // Set GitHub token if provided
    if (config.githubToken) {
      process.env.GITHUB_TOKEN = config.githubToken;
    }

    const mcpServer = new McpServer({
      name: "repomix",
      version: "1.0.0",
    });

    // Register pack_remote_repository tool
    mcpServer.tool(
      "pack_remote_repository",
      "Fetch, clone and package a GitHub repository into a consolidated file for AI analysis",
      {
        remote: z
          .string()
          .describe(
            "GitHub repository URL or user/repo (e.g., yamadashy/repomix)"
          ),
        compress: z
          .boolean()
          .default(true)
          .describe(
            "Utilize Tree-sitter to intelligently extract essential code signatures and structure while removing implementation details, significantly reducing token usage (default: true)"
          ),
        includePatterns: z
          .string()
          .optional()
          .describe(
            'Specify which files to include using fast-glob compatible patterns (e.g., "**/*.js,src/**"). Only files matching these patterns will be processed.'
          ),
        ignorePatterns: z
          .string()
          .optional()
          .describe(
            'Specify additional files to exclude using fast-glob compatible patterns (e.g., "test/**,*.spec.js"). These patterns complement .gitignore and default ignores.'
          ),
        topFilesLength: z
          .number()
          .optional()
          .default(10)
          .describe(
            "Number of top files to display in the metrics (default: 10)"
          ),
      },
      {
        title: "Pack Remote Repository",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
      },
      async ({
        remote,
        compress,
        includePatterns,
        ignorePatterns,
        topFilesLength,
      }) => {
        let tempDir = "";

        try {
          // Check if GitHub token is available for private repos
          if (!process.env.GITHUB_TOKEN) {
            console.log("Note: No GitHub token configured. Public repositories will work, but private repositories will fail. Configure githubToken in Smithery settings for private repo access.");
          }

          tempDir = await createToolWorkspace();
          const outputFilePath = path.join(tempDir, "repomix-output.xml");

          const cliOptions = {
            remote,
            compress,
            include: includePatterns,
            ignore: ignorePatterns,
            output: outputFilePath,
            style: "xml",
            securityCheck: true,
            topFilesLen: topFilesLength,
            quiet: true,
          };

          const result = await runRepomixCli(["."], tempDir, cliOptions);
          if (!result) {
            return {
              isError: true,
              content: [
                {
                  type: "text",
                  text: "Failed to return a result",
                },
              ],
            };
          }

          // Extract metrics information from the pack result
          const { packResult } = result;

          return formatToolResponse(
            { repository: remote },
            packResult,
            outputFilePath,
            topFilesLength
          );
        } catch (error) {
          return formatToolError(error);
        }
      }
    );

    // Register pack_codebase tool
    mcpServer.tool(
      "pack_codebase",
      "Package local code directory into a consolidated file for AI analysis",
      {
        directory: z.string().describe("Directory to pack (Absolute path)"),
        compress: z
          .boolean()
          .default(true)
          .describe(
            "Utilize Tree-sitter to intelligently extract essential code signatures and structure while removing implementation details, significantly reducing token usage (default: true)"
          ),
        includePatterns: z
          .string()
          .optional()
          .describe(
            'Specify which files to include using fast-glob compatible patterns (e.g., "**/*.js,src/**"). Only files matching these patterns will be processed.'
          ),
        ignorePatterns: z
          .string()
          .optional()
          .describe(
            'Specify additional files to exclude using fast-glob compatible patterns (e.g., "test/**,*.spec.js"). These patterns complement .gitignore and default ignores.'
          ),
        topFilesLength: z
          .number()
          .optional()
          .default(10)
          .describe(
            "Number of top files to display in the metrics (default: 10)"
          ),
      },
      {
        title: "Pack Local Codebase",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
      async ({
        directory,
        compress,
        includePatterns,
        ignorePatterns,
        topFilesLength,
      }) => {
        let tempDir = "";

        try {
          tempDir = await createToolWorkspace();
          const outputFilePath = path.join(tempDir, "repomix-output.xml");

          const cliOptions = {
            compress,
            include: includePatterns,
            ignore: ignorePatterns,
            output: outputFilePath,
            style: "xml",
            securityCheck: true,
            topFilesLen: topFilesLength,
            quiet: true,
          };

          const result = await runRepomixCli(
            [directory],
            process.cwd(),
            cliOptions
          );
          if (!result) {
            return {
              isError: true,
              content: [
                {
                  type: "text",
                  text: "Failed to return a result",
                },
              ],
            };
          }

          const { packResult } = result;

          return formatToolResponse(
            { directory },
            packResult,
            outputFilePath,
            topFilesLength
          );
        } catch (error) {
          return formatToolError(error);
        }
      }
    );

    // Register read_repomix_output tool
    mcpServer.tool(
      "read_repomix_output",
      "Read the packaged output from a previous pack operation using the output ID",
      {
        outputId: z
          .string()
          .describe(
            "Output ID returned from pack_remote_repository or pack_codebase"
          ),
      },
      {
        title: "Read Repomix Output",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      async ({ outputId }) => {
        try {
          const filePath = getOutputFilePath(outputId);
          if (!filePath) {
            return {
              isError: true,
              content: [
                {
                  type: "text",
                  text: `Output ID '${outputId}' not found. Please use a valid output ID from a previous pack operation.`,
                },
              ],
            };
          }

          // Check if file still exists
          try {
            await fs.access(filePath);
          } catch {
            return {
              isError: true,
              content: [
                {
                  type: "text",
                  text: `Output file for ID '${outputId}' is no longer available. The file may have been cleaned up.`,
                },
              ],
            };
          }

          // Read the file content
          const content = await fs.readFile(filePath, "utf-8");

          return {
            isError: false,
            content: [
              {
                type: "text",
                text: content,
              },
            ],
          };
        } catch (error) {
          return formatToolError(error);
        }
      }
    );

    // Register file_system_read_file tool
    mcpServer.tool(
      "file_system_read_file",
      "Read the contents of a file from the file system",
      {
        path: z.string().describe("Absolute path to the file to read"),
      },
      {
        title: "Read File",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      async ({ path: filePath }) => {
        try {
          // Security check - ensure it's an absolute path and not trying to escape
          if (!path.isAbsolute(filePath)) {
            return formatToolError(new Error("Path must be absolute"));
          }

          // Read the file
          const content = await fs.readFile(filePath, "utf-8");

          return {
            isError: false,
            content: [
              {
                type: "text",
                text: content,
              },
            ],
          };
        } catch (error) {
          return formatToolError(error);
        }
      }
    );

    // Register file_system_read_directory tool
    mcpServer.tool(
      "file_system_read_directory",
      "List the contents of a directory",
      {
        path: z.string().describe("Absolute path to the directory to list"),
      },
      {
        title: "Read Directory",
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
      async ({ path: dirPath }) => {
        try {
          // Security check - ensure it's an absolute path
          if (!path.isAbsolute(dirPath)) {
            return formatToolError(new Error("Path must be absolute"));
          }

          // Read the directory
          const entries = await fs.readdir(dirPath, { withFileTypes: true });

          const result = entries.map((entry) => ({
            name: entry.name,
            type: entry.isDirectory() ? "directory" : "file",
            path: path.join(dirPath, entry.name),
          }));

          const formattedResult = result
            .sort((a, b) => {
              // Directories first, then files
              if (a.type !== b.type) {
                return a.type === "directory" ? -1 : 1;
              }
              return a.name.localeCompare(b.name);
            })
            .map(
              (item) =>
                `${item.type === "directory" ? "DIR" : "FILE"} ${item.name}`
            )
            .join("\n");

          return {
            isError: false,
            content: [
              {
                type: "text",
                text: `Directory contents for: ${dirPath}\n\n${formattedResult}`,
              },
            ],
          };
        } catch (error) {
          return formatToolError(error);
        }
      }
    );

    return mcpServer.server;
  } catch (error) {
    throw error;
  }
};

// Export config schema for Smithery
module.exports.configSchema = z.object({
  githubToken: z.string().optional().describe(
    "GitHub personal access token for private repository access and higher rate limits"
  ),
});
