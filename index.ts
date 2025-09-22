import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Convert a file or repo to a file for Claude
const server = new Server(
  {
    name: "repo-to-file-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
    },
  }
);

// Define the schema for our 'convert' tool
const ConvertRepositorySchema = z.object({
  repository: z
    .string()
    .describe("Repository URL or GitHub shorthand (e.g., user/repo)"),
  compress: z
    .boolean()
    .default(true)
    .describe("Whether to compress the output to reduce token usage"),
  includePatterns: z
    .string()
    .optional()
    .describe(
      'Comma-separated glob patterns to include (e.g., "src/**/*.ts,**/*.md")'
    ),
  ignorePatterns: z
    .string()
    .optional()
    .describe(
      'Comma-separated glob patterns to ignore (e.g., "node_modules,dist")'
    ),
  githubToken: z
    .string()
    .optional()
    .describe("GitHub personal access token for private repository access"),
});

// Define the schema for our 'convert_local' tool
const ConvertLocalSchema = z.object({
  directory: z.string().describe("Absolute path to the directory to convert"),
  compress: z
    .boolean()
    .default(true)
    .describe("Whether to compress the output to reduce token usage"),
  includePatterns: z
    .string()
    .optional()
    .describe(
      'Comma-separated glob patterns to include (e.g., "src/**/*.ts,**/*.md")'
    ),
  ignorePatterns: z
    .string()
    .optional()
    .describe(
      'Comma-separated glob patterns to ignore (e.g., "node_modules,dist")'
    ),
});

// Define the schema for our 'convert_file' tool
const ConvertFileSchema = z.object({
  filePath: z.string().describe("Absolute path to the file to convert"),
});

// Register the 'convert_repository' tool
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "convert_repository",
        description:
          "Convert a remote GitHub repository into a single file for analysis",
        parameters: ConvertRepositorySchema,
      },
      {
        name: "convert_local",
        description:
          "Convert a local directory into a single file for analysis",
        parameters: ConvertLocalSchema,
      },
      {
        name: "convert_file",
        description: "Convert a single file for analysis",
        parameters: ConvertFileSchema,
      },
    ],
  };
});

// Handler for converting a remote repository
server.setRequestHandler(
  CallToolRequestSchema.extend({
    name: z.literal("convert_repository"),
    parameters: ConvertRepositorySchema,
  }),
  async (request) => {
    try {
      const {
        repository,
        compress,
        includePatterns,
        ignorePatterns,
        githubToken,
      } = request.parameters;

      // Import the local repomix implementation
      const { runRemoteAction } = await import(
        "./src/cli/actions/remoteAction.js"
      );

      // Create temporary directory for output
      const tmpDir = path.join("/tmp", `repomix-${Date.now()}`);
      await fs.mkdir(tmpDir, { recursive: true });
      const outputPath = path.join(tmpDir, "repomix-output.xml");

      // Prepare CLI options
      const cliOptions = {
        verbose: false,
        output: outputPath,
        include: includePatterns,
        ignore: ignorePatterns,
        compress: compress,
        gitHubToken: githubToken,
      };

      // Use the local repomix implementation
      await runRemoteAction(repository, cliOptions);

      // Read the output file
      const content = await fs.readFile(outputPath, "utf-8");

      // Clean up temporary directory
      await fs.rm(tmpDir, { recursive: true, force: true });

      return {
        result: {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        },
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

// Handler for converting a local directory
server.setRequestHandler(
  CallToolRequestSchema.extend({
    name: z.literal("convert_local"),
    parameters: ConvertLocalSchema,
  }),
  async (request) => {
    try {
      const { directory, compress, includePatterns, ignorePatterns } =
        request.parameters;

      // Verify the directory exists
      try {
        const stats = await fs.stat(directory);
        if (!stats.isDirectory()) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Not a directory: ${directory}`
          );
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `Directory does not exist: ${directory}`
        );
      }

      // Call repomix CLI via exec
      const { exec } = await import("node:child_process");
      const { promisify } = await import("node:util");
      const execAsync = promisify(exec);

      // Create temporary directory for output
      const tmpDir = path.join("/tmp", `repomix-${Date.now()}`);
      await fs.mkdir(tmpDir, { recursive: true });
      const outputPath = path.join(tmpDir, "repomix-output.xml");

      // Build the command
      let command = `npx repomix --output ${outputPath} ${directory}`;
      if (compress) command += " --compress";
      if (includePatterns) command += ` --include "${includePatterns}"`;
      if (ignorePatterns) command += ` --ignore "${ignorePatterns}"`;

      // Execute the repomix command
      const { stdout, stderr } = await execAsync(command);

      // Check if the output file exists
      try {
        await fs.access(outputPath);
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Failed to generate output file: ${stderr}`
        );
      }

      // Read the output file
      const content = await fs.readFile(outputPath, "utf-8");

      return {
        result: {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        },
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

// Handler for converting a single file
server.setRequestHandler(
  CallToolRequestSchema.extend({
    name: z.literal("convert_file"),
    parameters: ConvertFileSchema,
  }),
  async (request) => {
    try {
      const { filePath } = request.parameters;

      // Verify the file exists
      try {
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) {
          throw new McpError(
            ErrorCode.InvalidParams,
            `Not a file: ${filePath}`
          );
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InvalidParams,
          `File does not exist: ${filePath}`
        );
      }

      // Read the file directly
      const content = await fs.readFile(filePath, "utf-8");

      return {
        result: {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        },
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        error instanceof Error ? error.message : String(error)
      );
    }
  }
);

// Connect to the transport
const transport = new StdioServerTransport();
server.connect(transport).catch((error) => {
  console.error("Failed to connect to transport:", error);
  process.exit(1);
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await server.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await server.close();
  process.exit(0);
});

console.error("Repo-to-file MCP Server is running...");
