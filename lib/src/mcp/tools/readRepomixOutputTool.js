var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'node:fs/promises';
import { z } from 'zod';
import { logger } from '../../shared/logger.js';
import { getOutputFilePath } from './mcpToolRuntime.js';
/**
 * Register the tool to read Repomix output files
 */
export const registerReadRepomixOutputTool = (mcpServer) => {
    mcpServer.tool('read_repomix_output', 'Read the contents of a Repomix output file in environments where direct file access is not possible. This tool is specifically intended for cases where the client cannot access the file system directly, such as in web-based environments or sandboxed applications. For systems with direct file access, use standard file operations instead.', {
        outputId: z.string().describe('ID of the Repomix output file to read'),
    }, {
        title: 'Read Repomix Output',
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    }, (_a) => __awaiter(void 0, [_a], void 0, function* ({ outputId }) {
        try {
            logger.trace(`Reading Repomix output with ID: ${outputId}`);
            // Get the file path from the registry
            const filePath = getOutputFilePath(outputId);
            if (!filePath) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error: Output file with ID ${outputId} not found. The output file may have been deleted or the ID is invalid.`,
                        },
                    ],
                };
            }
            // Check if the file exists
            try {
                yield fs.access(filePath);
            }
            catch (error) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error: Output file does not exist at path: ${filePath}. The temporary file may have been cleaned up.`,
                        },
                    ],
                };
            }
            // Read the file content
            const content = yield fs.readFile(filePath, 'utf8');
            return {
                content: [
                    {
                        type: 'text',
                        text: `Content of Repomix output file (ID: ${outputId}):`,
                    },
                    {
                        type: 'text',
                        text: content,
                    },
                ],
            };
        }
        catch (error) {
            logger.error(`Error reading Repomix output: ${error}`);
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: `Error reading Repomix output: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }));
};
//# sourceMappingURL=readRepomixOutputTool.js.map