var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { logger } from '../../shared/logger.js';
// Map to store generated output files
const outputFileRegistry = new Map();
// Register an output file
export const registerOutputFile = (id, filePath) => {
    outputFileRegistry.set(id, filePath);
};
// Get file path from output ID
export const getOutputFilePath = (id) => {
    return outputFileRegistry.get(id);
};
/**
 * Creates a temporary directory for MCP tool operations
 */
export const createToolWorkspace = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tmpBaseDir = path.join(os.tmpdir(), 'repomix', 'mcp-outputs');
        yield fs.mkdir(tmpBaseDir, { recursive: true });
        const tempDir = yield fs.mkdtemp(`${tmpBaseDir}/`);
        return tempDir;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to create temporary directory: ${message}`);
    }
});
/**
 * Generate a unique output ID
 */
export const generateOutputId = () => {
    return crypto.randomBytes(8).toString('hex');
};
/**
 * Creates a result object with metrics information for MCP tools
 */
export const formatToolResponse = (context, metrics, outputFilePath, topFilesLen = 5) => {
    // Generate output ID and register the file
    const outputId = generateOutputId();
    registerOutputFile(outputId, outputFilePath);
    // Get top files by character count
    const topFiles = Object.entries(metrics.fileCharCounts)
        .map(([filePath, charCount]) => ({
        path: filePath,
        charCount,
        tokenCount: metrics.fileTokenCounts[filePath] || 0,
    }))
        .sort((a, b) => b.charCount - a.charCount)
        .slice(0, topFilesLen);
    // Create JSON string with all the metrics information
    const jsonResult = JSON.stringify(Object.assign(Object.assign(Object.assign({}, (context.directory ? { directory: context.directory } : {})), (context.repository ? { repository: context.repository } : {})), { outputFilePath,
        outputId, metrics: {
            totalFiles: metrics.totalFiles,
            totalCharacters: metrics.totalCharacters,
            totalTokens: metrics.totalTokens,
            topFiles,
        } }), null, 2);
    return {
        content: [
            {
                type: 'text',
                text: '🎉 Successfully packed codebase!\nPlease review the metrics below and consider adjusting compress/includePatterns/ignorePatterns if the token count is too high and you need to reduce it before reading the file content.',
            },
            {
                type: 'text',
                text: jsonResult,
            },
            {
                type: 'text',
                text: `For environments with direct file system access, you can read the file directly using path: ${outputFilePath}`,
            },
            {
                type: 'text',
                text: `For environments without direct file access (e.g., web browsers or sandboxed apps), use the \`read_repomix_output\` tool with this outputId: ${outputId} to access the packed codebase contents.`,
            },
        ],
    };
};
/**
 * Creates an error result for MCP tools
 */
export const formatToolError = (error) => {
    logger.error(`Error in MCP tool: ${error instanceof Error ? error.message : String(error)}`);
    return {
        isError: true,
        content: [
            {
                type: 'text',
                text: JSON.stringify({
                    success: false,
                    error: error instanceof Error ? error.message : String(error),
                }, null, 2),
            },
        ],
    };
};
//# sourceMappingURL=mcpToolRuntime.js.map