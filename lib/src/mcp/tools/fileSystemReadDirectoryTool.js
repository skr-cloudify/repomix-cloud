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
import path from 'node:path';
import { z } from 'zod';
import { logger } from '../../shared/logger.js';
/**
 * Register file system directory listing tool
 */
export const registerFileSystemReadDirectoryTool = (mcpServer) => {
    mcpServer.tool('file_system_read_directory', 'List contents of a directory using an absolute path.', {
        path: z.string().describe('Absolute path to the directory to list'),
    }, {
        title: 'Read Directory',
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    }, (_a) => __awaiter(void 0, [_a], void 0, function* ({ path: directoryPath }) {
        try {
            logger.trace(`Listing directory at absolute path: ${directoryPath}`);
            // Ensure path is absolute
            if (!path.isAbsolute(directoryPath)) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error: Path must be absolute. Received: ${directoryPath}`,
                        },
                    ],
                };
            }
            // Check if directory exists
            try {
                const stats = yield fs.stat(directoryPath);
                if (!stats.isDirectory()) {
                    return {
                        isError: true,
                        content: [
                            {
                                type: 'text',
                                text: `Error: The specified path is not a directory: ${directoryPath}. Use file_system_read_file for files.`,
                            },
                        ],
                    };
                }
            }
            catch (_b) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error: Directory not found at path: ${directoryPath}`,
                        },
                    ],
                };
            }
            // Read directory contents
            const entries = yield fs.readdir(directoryPath, { withFileTypes: true });
            const formatted = entries
                .map((entry) => `${entry.isDirectory() ? '[DIR]' : '[FILE]'} ${entry.name}`)
                .join('\n');
            return {
                content: [
                    {
                        type: 'text',
                        text: `Contents of ${directoryPath}:`,
                    },
                    {
                        type: 'text',
                        text: formatted || '(empty directory)',
                    },
                ],
            };
        }
        catch (error) {
            logger.error(`Error in file_system_read_directory tool: ${error}`);
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: `Error listing directory: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }));
};
//# sourceMappingURL=fileSystemReadDirectoryTool.js.map