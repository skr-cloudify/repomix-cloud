import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
export declare const registerOutputFile: (id: string, filePath: string) => void;
export declare const getOutputFilePath: (id: string) => string | undefined;
export interface McpToolMetrics {
    totalFiles: number;
    totalCharacters: number;
    totalTokens: number;
    fileCharCounts: Record<string, number>;
    fileTokenCounts: Record<string, number>;
}
export interface McpToolContext {
    directory?: string;
    repository?: string;
}
/**
 * Creates a temporary directory for MCP tool operations
 */
export declare const createToolWorkspace: () => Promise<string>;
/**
 * Generate a unique output ID
 */
export declare const generateOutputId: () => string;
/**
 * Creates a result object with metrics information for MCP tools
 */
export declare const formatToolResponse: (context: McpToolContext, metrics: McpToolMetrics, outputFilePath: string, topFilesLen?: number) => CallToolResult;
/**
 * Creates an error result for MCP tools
 */
export declare const formatToolError: (error: unknown) => CallToolResult;
//# sourceMappingURL=mcpToolRuntime.d.ts.map