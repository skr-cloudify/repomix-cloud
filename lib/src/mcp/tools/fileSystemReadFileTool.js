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
import { createSecretLintConfig, runSecretLint } from '../../core/security/workers/securityCheckWorker.js';
import { logger } from '../../shared/logger.js';
/**
 * Register file system read file tool with security checks
 */
export const registerFileSystemReadFileTool = (mcpServer) => {
    mcpServer.tool('file_system_read_file', 'Read a file using an absolute path with security validation.', {
        path: z.string().describe('Absolute path to the file to read'),
    }, {
        title: 'Read File',
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
    }, (_a) => __awaiter(void 0, [_a], void 0, function* ({ path: filePath }) {
        try {
            logger.trace(`Reading file at absolute path: ${filePath}`);
            // Ensure path is absolute
            if (!path.isAbsolute(filePath)) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error: Path must be absolute. Received: ${filePath}`,
                        },
                    ],
                };
            }
            // Check if file exists
            try {
                yield fs.access(filePath);
            }
            catch (_b) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error: File not found at path: ${filePath}`,
                        },
                    ],
                };
            }
            // Check if it's a directory
            const stats = yield fs.stat(filePath);
            if (stats.isDirectory()) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error: The specified path is a directory, not a file: ${filePath}. Use file_system_read_directory for directories.`,
                        },
                    ],
                };
            }
            // Read file content
            const fileContent = yield fs.readFile(filePath, 'utf8');
            // Perform security check using the existing worker
            const config = createSecretLintConfig();
            const securityCheckResult = yield runSecretLint(filePath, fileContent, 'file', config);
            // If security check found issues, block the file
            if (securityCheckResult !== null) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: `Error: Security check failed. The file at ${filePath} may contain sensitive information.`,
                        },
                    ],
                };
            }
            return {
                content: [
                    {
                        type: 'text',
                        text: `Content of ${filePath}:`,
                    },
                    {
                        type: 'text',
                        text: fileContent,
                    },
                ],
            };
        }
        catch (error) {
            logger.error(`Error in file_system_read_file tool: ${error}`);
            return {
                isError: true,
                content: [
                    {
                        type: 'text',
                        text: `Error reading file: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
            };
        }
    }));
};
//# sourceMappingURL=fileSystemReadFileTool.js.map