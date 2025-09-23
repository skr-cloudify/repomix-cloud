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
export const registerPackRemoteRepositoryTool = (mcpServer) => {
    mcpServer.tool('pack_remote_repository', 'Fetch, clone and package a GitHub repository into a consolidated file for AI analysis', {
        remote: z.string().describe('GitHub repository URL or user/repo (e.g., yamadashy/repomix)'),
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
        title: 'Pack Remote Repository',
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true,
    }, (_a) => __awaiter(void 0, [_a], void 0, function* ({ remote, compress, includePatterns, ignorePatterns, topFilesLength }) {
        let tempDir = '';
        try {
            tempDir = yield createToolWorkspace();
            const outputFilePath = path.join(tempDir, 'repomix-output.xml');
            const cliOptions = {
                remote,
                compress,
                include: includePatterns,
                ignore: ignorePatterns,
                output: outputFilePath,
                style: 'xml',
                securityCheck: true,
                topFilesLen: topFilesLength,
                quiet: true,
            };
            const result = yield runCli(['.'], process.cwd(), cliOptions);
            if (!result) {
                return {
                    isError: true,
                    content: [
                        {
                            type: 'text',
                            text: 'Failed to return a result',
                        },
                    ],
                };
            }
            // Extract metrics information from the pack result
            const { packResult } = result;
            return formatToolResponse({ repository: remote }, packResult, outputFilePath, topFilesLength);
        }
        catch (error) {
            return formatToolError(error);
        }
    }));
};
//# sourceMappingURL=packRemoteRepositoryTool.js.map