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
import { logger } from '../../shared/logger.js';
import { getFileChangeCount, isGitInstalled } from '../file/gitCommand.js';
// Sort files by git change count for output
export const sortOutputFiles = (files_1, config_1, ...args_1) => __awaiter(void 0, [files_1, config_1, ...args_1], void 0, function* (files, config, deps = {
    getFileChangeCount,
    isGitInstalled,
}) {
    var _a, _b, _c;
    // If git sort is not enabled, return original order
    if (!((_a = config.output.git) === null || _a === void 0 ? void 0 : _a.sortByChanges)) {
        logger.trace('Git sort is not enabled');
        return files;
    }
    // Check if Git is installed
    const gitInstalled = yield deps.isGitInstalled();
    if (!gitInstalled) {
        logger.trace('Git is not installed');
        return files;
    }
    // If `.git` directory is not found, return original order
    const gitFolderPath = path.resolve(config.cwd, '.git');
    try {
        yield fs.access(gitFolderPath);
    }
    catch (_d) {
        logger.trace('Git folder not found');
        return files;
    }
    try {
        // Get file change counts
        const fileChangeCounts = yield deps.getFileChangeCount(config.cwd, (_b = config.output.git) === null || _b === void 0 ? void 0 : _b.sortByChangesMaxCommits);
        const sortedFileChangeCounts = Object.entries(fileChangeCounts).sort((a, b) => b[1] - a[1]);
        logger.trace('Git File change counts max commits:', (_c = config.output.git) === null || _c === void 0 ? void 0 : _c.sortByChangesMaxCommits);
        logger.trace('Git File change counts:', sortedFileChangeCounts);
        // Sort files by change count (files with more changes go to the bottom)
        return [...files].sort((a, b) => {
            const countA = fileChangeCounts[a.path] || 0;
            const countB = fileChangeCounts[b.path] || 0;
            return countA - countB;
        });
    }
    catch (error) {
        // If git command fails, return original order
        return files;
    }
});
//# sourceMappingURL=outputSort.js.map