import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as path from "node:path";
import { z } from "zod";
import * as crypto from "node:crypto";
import { promises as fs } from "node:fs";
import * as os from "node:os";
import { spawn } from "node:child_process";

// Map to store generated output files
const outputFileRegistry = new Map<string, string>();

// Register an output file
const registerOutputFile = (id: string, filePath: string): void => {
  outputFileRegistry.set(id, filePath);
};

// Get file path from output ID
const getOutputFilePath = (id: string): string | undefined => {
  return outputFileRegistry.get(id);
};

/**
 * Creates a temporary directory for MCP tool operations
 */
const createToolWorkspace = async (): Promise<string> => {
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
const generateOutputId = (): string => {
  return crypto.randomBytes(16).toString("hex");
};

interface PackResult {
  metrics?: {
    totalFiles?: number;
    totalCharacters?: number;
    totalTokens?: number;
    fileCharCounts?: Record<string, number>;
    fileTokenCounts?: Record<string, number>;
  };
}

interface Context {
  repository?: string;
  directory?: string;
}

/**
 * Format tool response with metrics and output file registration
 */
const formatToolResponse = async (
  context: Context,
  packResult: PackResult,
  outputFilePath: string,
  topFilesLength: number
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
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, topFilesLength)
      .map(
        ([file, chars]) =>
          `${file}: ${(chars as number).toLocaleString()} chars`
      );

    // Get top files by token count
    const topFilesByToken = Object.entries(fileTokenCounts)
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, topFilesLength)
      .map(
        ([file, tokens]) =>
          `${file}: ${(tokens as number).toLocaleString()} tokens`
      );

    const contextStr = context.repository
      ? `Repository: ${context.repository}`
      : context.directory
      ? `Directory: ${context.directory}`
      : "Unknown source";

    return {
      content: [
        {
          type: "text" as const,
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
            `Use the "read_repomix_output" tool with output ID: ${outputId} to view the packaged content.`,
        },
      ],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text" as const,
          text: `Error reading output file: ${message}`,
        },
      ],
    };
  }
};

/**
 * Execute a shell command and return the result
 */
const execCommand = (
  command: string,
  args: string[],
  cwd?: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> => {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd,
      stdio: ["pipe", "pipe", "pipe"],
      shell: true,
    });

    let stdout = "";
    let stderr = "";

    child.stdout?.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr?.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      resolve({
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        exitCode: code || 0,
      });
    });

    child.on("error", (error) => {
      resolve({
        stdout: "",
        stderr: error.message,
        exitCode: 1,
      });
    });
  });
};

// Configuration schema for Smithery
export const configSchema = z.object({
  githubToken: z
    .string()
    .optional()
    .describe("GitHub personal access token for private repository access"),
  defaultCompress: z
    .boolean()
    .default(true)
    .describe("Default compression setting for output"),
  maxFileSize: z
    .union([z.string(), z.number()])
    .transform((val) => Number(val))
    .default(50000000)
    .describe("Maximum file size to process (in bytes)"),
  token_count_encoding: z
    .string()
    .default("o200k_base")
    .describe(
      "Token count encoding used by tiktoken (e.g., 'o200k_base' for GPT-4o)"
    ),
  security_check: z
    .union([z.boolean(), z.string()])
    .transform((val) => val === true || val === "true")
    .default(true)
    .describe("Whether to perform security checks on files"),
});

// Main server creation function - required by Smithery
export default function createServer({
  config,
}: {
  config?: z.infer<typeof configSchema>;
}) {
  // Set Smithery mode to disable problematic features like clipboard
  process.env.SMITHERY_MODE = "true";

  // Set environment variables from Smithery config or use scan mode defaults
  if (config) {
    if (config.githubToken) {
      process.env.GITHUB_TOKEN = config.githubToken;
    }
    if (config.maxFileSize) {
      process.env.MAX_FILE_SIZE = String(config.maxFileSize);
    }
    if (config.token_count_encoding) {
      process.env.TOKEN_COUNT_ENCODING = config.token_count_encoding;
    }
    if (config.security_check !== undefined) {
      process.env.SECURITY_CHECK = String(config.security_check);
    }
    if (config.defaultCompress !== undefined) {
      process.env.DEFAULT_COMPRESS = String(config.defaultCompress);
    }
  } else {
    // For Smithery capability scanning, provide dummy values
    if (!process.env.GITHUB_TOKEN) {
      process.env.GITHUB_TOKEN = "scan_mode";
    }
    if (!process.env.TOKEN_COUNT_ENCODING) {
      process.env.TOKEN_COUNT_ENCODING = "o200k_base";
    }
    if (!process.env.SECURITY_CHECK) {
      process.env.SECURITY_CHECK = "true";
    }
    if (!process.env.MAX_FILE_SIZE) {
      process.env.MAX_FILE_SIZE = "50000000";
    }
    if (!process.env.DEFAULT_COMPRESS) {
      process.env.DEFAULT_COMPRESS = "true";
    }
  }

  // Create MCP server using the McpServer class as shown in Smithery docs
  const server = new McpServer({
    name: "repomix-mcp-server",
    version: "1.0.0",
  });

  // Register pack_remote_repository tool
  server.registerTool(
    "pack_remote_repository",
    {
      title: "Pack Remote Repository",
      description:
        "Package remote git repository into a consolidated file for AI analysis",
      inputSchema: {
        url: z.string().describe("Git repository URL to pack"),
        compress: z
          .boolean()
          .default(true)
          .describe(
            "Use Tree-sitter to extract essential code signatures while removing implementation details"
          ),
        branch: z.string().optional().describe("Git branch to pack (optional)"),
        includePatterns: z
          .string()
          .optional()
          .describe(
            "Specify which files to include using fast-glob compatible patterns"
          ),
        ignorePatterns: z
          .string()
          .optional()
          .describe(
            "Specify additional files to exclude using fast-glob compatible patterns"
          ),
      },
    },
    async ({ url, compress, branch, includePatterns, ignorePatterns }) => {
      try {
        // Check if Git is available
        try {
          await execCommand("git", ["--version"]);
        } catch (gitError) {
          return {
            content: [
              {
                type: "text",
                text: "❌ Git is not installed or not available in the system PATH. This tool requires Git to be installed to clone and process remote repositories.\n\nFor private repositories, you can:\n1. Download the repository as a ZIP file\n2. Extract it locally\n3. Use the 'pack_codebase' tool to process the local directory\n\nAlternatively, if this is a public repository, you can try accessing it through a different method.",
              },
            ],
            isError: true,
          };
        }

        const outputDir = await createToolWorkspace();
        const outputFilePath = path.join(outputDir, "repository-output.xml");

        // Build repomix command
        const args: string[] = ["--remote", url];

        if (compress) {
          args.push("--compress");
        }

        if (branch) {
          args.push("--remote-branch", branch);
        }

        if (includePatterns) {
          args.push("--include", includePatterns);
        }

        if (ignorePatterns) {
          args.push("--ignore", ignorePatterns);
        }

        args.push("--output", outputFilePath);

        // Execute repomix command
        const result = await execCommand("npx", ["repomix", ...args]);

        if (result.exitCode !== 0) {
          return {
            content: [
              {
                type: "text",
                text: `Error packing repository: ${
                  result.stderr || result.stdout
                }`,
              },
            ],
          };
        }

        // Parse output to get metrics
        const packResult: PackResult = {};

        // Try to extract metrics from stdout
        if (result.stdout) {
          // Attempt to parse metrics from the output
          const lines = result.stdout.split("\n");
          for (const line of lines) {
            if (line.includes("Total files:")) {
              const match = line.match(/(\d+)/);
              if (match) {
                packResult.metrics = packResult.metrics || {};
                packResult.metrics.totalFiles = parseInt(match[1]);
              }
            }
          }
        }

        return await formatToolResponse(
          { repository: url },
          packResult,
          outputFilePath,
          10
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text",
              text: `Error: ${message}`,
            },
          ],
        };
      }
    }
  );

  // Register pack_codebase tool
  server.registerTool(
    "pack_codebase",
    {
      title: "Pack Local Codebase",
      description:
        "Package local code directory into a consolidated file for AI analysis",
      inputSchema: {
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
            'Specify which files to include using fast-glob compatible patterns (e.g., "**/*.js,src/**"). Only files matching these patterns will be processed. It is recommended to pack only necessary files.'
          ),
        ignorePatterns: z
          .string()
          .optional()
          .describe(
            'Specify additional files to exclude using fast-glob compatible patterns (e.g., "test/**,*.spec.js"). These patterns complement .gitignore and default ignores. It is recommended to pack only necessary files.'
          ),
        topFilesLength: z
          .number()
          .default(10)
          .describe(
            "Number of top files to display in the metrics (default: 10)"
          ),
      },
    },
    async ({
      directory,
      compress,
      includePatterns,
      ignorePatterns,
      topFilesLength,
    }) => {
      try {
        const outputDir = await createToolWorkspace();
        const outputFilePath = path.join(outputDir, "codebase-output.xml");

        // Build repomix command
        const args: string[] = [directory];

        if (compress) {
          args.push("--compress");
        }

        if (includePatterns) {
          args.push("--include", includePatterns);
        }

        if (ignorePatterns) {
          args.push("--ignore", ignorePatterns);
        }

        args.push("--output", outputFilePath);

        // Execute repomix command
        const result = await execCommand("npx", ["repomix", ...args]);

        if (result.exitCode !== 0) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Error packing codebase: ${
                  result.stderr || result.stdout
                }`,
              },
            ],
          };
        }

        // Parse output to get metrics
        const packResult: PackResult = {};

        // Try to extract metrics from stdout
        if (result.stdout) {
          // Attempt to parse metrics from the output
          const lines = result.stdout.split("\n");
          for (const line of lines) {
            if (line.includes("Total files:")) {
              const match = line.match(/(\d+)/);
              if (match) {
                packResult.metrics = packResult.metrics || {};
                packResult.metrics.totalFiles = parseInt(match[1]);
              }
            }
          }
        }

        return await formatToolResponse(
          { directory },
          packResult,
          outputFilePath,
          topFilesLength || 10
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text" as const,
              text: `Error: ${message}`,
            },
          ],
        };
      }
    }
  );

  // Register read_repomix_output tool
  server.registerTool(
    "read_repomix_output",
    {
      title: "Read Repomix Output",
      description:
        "Read the contents of a previously generated repomix output file",
      inputSchema: {
        outputId: z
          .string()
          .describe("Output ID from a previous pack operation"),
      },
    },
    async ({ outputId }) => {
      try {
        const filePath = getOutputFilePath(outputId);

        if (!filePath) {
          return {
            content: [
              {
                type: "text" as const,
                text: `Output ID not found: ${outputId}. Make sure to use the output ID from a previous pack operation.`,
              },
            ],
          };
        }

        const content = await fs.readFile(filePath, "utf-8");

        return {
          content: [
            {
              type: "text" as const,
              text: content,
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text" as const,
              text: `Error reading output file: ${message}`,
            },
          ],
        };
      }
    }
  );

  // Register file_system_read_file tool
  server.registerTool(
    "file_system_read_file",
    {
      title: "Read File",
      description: "Read the contents of a specific file from the file system",
      inputSchema: {
        path: z.string().describe("Absolute path to the file to read"),
      },
    },
    async ({ path: filePath }) => {
      try {
        const content = await fs.readFile(filePath, "utf-8");

        return {
          content: [
            {
              type: "text" as const,
              text: content,
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text" as const,
              text: `Error reading file: ${message}`,
            },
          ],
        };
      }
    }
  );

  // Register file_system_read_directory tool
  server.registerTool(
    "file_system_read_directory",
    {
      title: "Read Directory",
      description: "List the contents of a directory",
      inputSchema: {
        path: z.string().describe("Absolute path to the directory to read"),
      },
    },
    async ({ path: dirPath }) => {
      try {
        const items = await fs.readdir(dirPath, { withFileTypes: true });
        const contents = items
          .map((item) => {
            const type = item.isDirectory() ? "directory" : "file";
            return `${type}: ${item.name}`;
          })
          .join("\n");

        return {
          content: [
            {
              type: "text" as const,
              text: `Contents of ${dirPath}:\n\n${contents}`,
            },
          ],
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text" as const,
              text: `Error reading directory: ${message}`,
            },
          ],
        };
      }
    }
  );

  // Return the MCP server object as required by Smithery
  return server.server;
}
