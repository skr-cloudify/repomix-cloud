var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logger } from '../../shared/logger.js';
import { filterOutUntrustedFiles } from './filterOutUntrustedFiles.js';
import { runSecurityCheck } from './securityCheck.js';
// Marks which files are suspicious and which are safe
// Returns Git diff results separately so they can be included in the output
// even if they contain sensitive information
export const validateFileSafety = (rawFiles_1, progressCallback_1, config_1, gitDiffResult_1, ...args_1) => __awaiter(void 0, [rawFiles_1, progressCallback_1, config_1, gitDiffResult_1, ...args_1], void 0, function* (rawFiles, progressCallback, config, gitDiffResult, deps = {
    runSecurityCheck,
    filterOutUntrustedFiles,
}) {
    let suspiciousFilesResults = [];
    let suspiciousGitDiffResults = [];
    if (config.security.enableSecurityCheck) {
        progressCallback('Running security check...');
        const allResults = yield deps.runSecurityCheck(rawFiles, progressCallback, gitDiffResult);
        // Separate Git diff results from regular file results
        suspiciousFilesResults = allResults.filter((result) => result.type === 'file');
        suspiciousGitDiffResults = allResults.filter((result) => result.type === 'gitDiff');
        if (suspiciousGitDiffResults.length > 0) {
            logger.warn('Security issues found in Git diffs, but they will still be included in the output');
            for (const result of suspiciousGitDiffResults) {
                logger.warn(`  - ${result.filePath}: ${result.messages.join(', ')}`);
            }
        }
    }
    const safeRawFiles = deps.filterOutUntrustedFiles(rawFiles, suspiciousFilesResults);
    const safeFilePaths = safeRawFiles.map((file) => file.path);
    logger.trace('Safe files count:', safeRawFiles.length);
    return {
        safeRawFiles,
        safeFilePaths,
        suspiciousFilesResults,
        suspiciousGitDiffResults,
    };
});
//# sourceMappingURL=validateFileSafety.js.map