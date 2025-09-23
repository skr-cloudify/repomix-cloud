var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// Set Smithery mode environment variable
process.env.SMITHERY_MODE = "true";
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
        .describe("Token count encoding used by tiktoken (e.g., 'o200k_base' for GPT-4o)"),
    security_check: z
        .union([z.boolean(), z.string()])
        .transform((val) => val === true || val === "true")
        .default(true)
        .describe("Whether to perform security checks on files"),
});
// Main server creation function - required by Smithery
export default function createServer({ config, }) {
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
    }
    else {
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
    // Register pack_codebase tool
    server.registerTool("pack_codebase", {
        title: "Pack Local Codebase",
        description: "Package local code directory into a consolidated file for AI analysis",
        inputSchema: {
            directory: z.string().describe("Directory to pack (Absolute path)"),
            compress: z
                .boolean()
                .default(true)
                .describe("Utilize Tree-sitter to intelligently extract essential code signatures and structure while removing implementation details, significantly reducing token usage (default: true)"),
            includePatterns: z
                .string()
                .optional()
                .describe('Specify which files to include using fast-glob compatible patterns (e.g., "**/*.js,src/**"). Only files matching these patterns will be processed. It is recommended to pack only necessary files.'),
            ignorePatterns: z
                .string()
                .optional()
                .describe('Specify additional files to exclude using fast-glob compatible patterns (e.g., "test/**,*.spec.js"). These patterns complement .gitignore and default ignores. It is recommended to pack only necessary files.'),
            topFilesLength: z
                .number()
                .default(10)
                .describe("Number of top files to display in the metrics (default: 10)"),
        },
    }, (_a) => __awaiter(this, [_a], void 0, function* ({ directory, compress, includePatterns, ignorePatterns, topFilesLength, }) {
        return {
            content: [
                {
                    type: "text",
                    text: `Packing directory: ${directory}`,
                },
            ],
        };
    }));
    // Register pack_remote_repository tool
    server.registerTool("pack_remote_repository", {
        title: "Pack Remote Repository",
        description: "Package remote git repository into a consolidated file for AI analysis",
        inputSchema: {
            url: z.string().describe("Git repository URL to pack"),
            compress: z
                .boolean()
                .default(true)
                .describe("Use Tree-sitter to extract essential code signatures while removing implementation details"),
            branch: z.string().optional().describe("Git branch to pack (optional)"),
            includePatterns: z
                .string()
                .optional()
                .describe("Specify which files to include using fast-glob compatible patterns"),
            ignorePatterns: z
                .string()
                .optional()
                .describe("Specify additional files to exclude using fast-glob compatible patterns"),
        },
    }, (_a) => __awaiter(this, [_a], void 0, function* ({ url, compress, branch, includePatterns, ignorePatterns }) {
        return {
            content: [
                {
                    type: "text",
                    text: `Packing repository: ${url}`,
                },
            ],
        };
    }));
    // CRITICAL: Return server.server as shown in Smithery documentation
    // This is the key requirement from the official docs
    return server.server;
}
//# sourceMappingURL=smithery-entry.js.map