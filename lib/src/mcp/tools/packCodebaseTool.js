var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from 'node:path';
import { z } from 'zod';
import { runCli } from '../../cli/cliRun.js';
import { createToolWorkspace, formatToolError, formatToolResponse } from './mcpToolRuntime.js';
export const registerPackCodebaseTool = (mcpServer) => {
    mcpServer.tool('pack_codebase', 'Package local code directory into a consolidated file for AI analysis', {
        directory: z.string().describe('Directory to pack (Absolute path)'),
        compress: z
            .boolean()
            .default(true)
            .describe('Utilize Tree-sitter to intelligently extract essential code signatures and structure while removing implementation details, significantly reducing token usage (default: true)'),
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
            .optional()
            .default(10)
            .describe('Number of top files to display in the metrics (default: 10)'),
    }, {
        title: 'Pack Local Codebase',
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
    }, (_a) => __awaiter(void 0, [_a], void 0, function* ({ directory, compress, includePatterns, ignorePatterns, topFilesLength }) {
        let tempDir = '';
        try {
            tempDir = yield createToolWorkspace();
            const outputFilePath = path.join(tempDir, 'repomix-output.xml');
            const cliOptions = {
                compress,
                include: includePatterns,
                ignore: ignorePatterns,
                output: outputFilePath,
                style: 'xml',
                securityCheck: true,
                topFilesLen: topFilesLength,
                quiet: true,
            };
            const result = yield runCli(['.'], directory, cliOptions);
            if (!result) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({
                                success: false,
                                error: 'Failed to return a result',
                            }, null, 2),
                        },
                    ],
                };
            }
            // Extract metrics information from the pack result
            const { packResult } = result;
            return formatToolResponse({ directory }, packResult, outputFilePath, topFilesLength);
        }
        catch (error) {
            return formatToolError(error);
        }
    }));
};
//# sourceMappingURL=packCodebaseTool.js.map