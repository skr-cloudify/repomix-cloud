var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { collectFiles } from './file/fileCollect.js';
import { sortPaths } from './file/filePathSort.js';
import { processFiles } from './file/fileProcess.js';
import { searchFiles } from './file/fileSearch.js';
import { getGitDiffs } from './file/gitDiff.js';
import { calculateMetrics } from './metrics/calculateMetrics.js';
import { generateOutput } from './output/outputGenerate.js';
import { copyToClipboardIfEnabled } from './packager/copyToClipboardIfEnabled.js';
import { writeOutputToDisk } from './packager/writeOutputToDisk.js';
import { validateFileSafety } from './security/validateFileSafety.js';
const defaultDeps = {
    searchFiles,
    collectFiles,
    processFiles,
    generateOutput,
    validateFileSafety,
    handleOutput: writeOutputToDisk,
    copyToClipboardIfEnabled,
    calculateMetrics,
    sortPaths,
    getGitDiffs,
};
export const pack = (rootDirs_1, config_1, ...args_1) => __awaiter(void 0, [rootDirs_1, config_1, ...args_1], void 0, function* (rootDirs, config, progressCallback = () => { }, overrideDeps = {}) {
    const deps = Object.assign(Object.assign({}, defaultDeps), overrideDeps);
    progressCallback('Searching for files...');
    const filePathsByDir = yield Promise.all(rootDirs.map((rootDir) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            rootDir,
            filePaths: (yield deps.searchFiles(rootDir, config)).filePaths,
        });
    })));
    // Sort file paths
    progressCallback('Sorting files...');
    const allFilePaths = filePathsByDir.flatMap(({ filePaths }) => filePaths);
    const sortedFilePaths = yield deps.sortPaths(allFilePaths);
    // Regroup sorted file paths by rootDir
    const sortedFilePathsByDir = rootDirs.map((rootDir) => ({
        rootDir,
        filePaths: sortedFilePaths.filter((filePath) => { var _a; return (_a = filePathsByDir.find((item) => item.rootDir === rootDir)) === null || _a === void 0 ? void 0 : _a.filePaths.includes(filePath); }),
    }));
    progressCallback('Collecting files...');
    const rawFiles = (yield Promise.all(sortedFilePathsByDir.map(({ rootDir, filePaths }) => deps.collectFiles(filePaths, rootDir, config, progressCallback)))).reduce((acc, curr) => acc.concat(...curr), []);
    // Get git diffs if enabled - run this before security check
    progressCallback('Getting git diffs...');
    const gitDiffResult = yield deps.getGitDiffs(rootDirs, config);
    // Run security check and get filtered safe files
    const { safeFilePaths, safeRawFiles, suspiciousFilesResults, suspiciousGitDiffResults } = yield deps.validateFileSafety(rawFiles, progressCallback, config, gitDiffResult);
    // Process files (remove comments, etc.)
    progressCallback('Processing files...');
    const processedFiles = yield deps.processFiles(safeRawFiles, config, progressCallback);
    progressCallback('Generating output...');
    const output = yield deps.generateOutput(rootDirs, config, processedFiles, safeFilePaths, gitDiffResult);
    progressCallback('Writing output file...');
    yield deps.handleOutput(output, config);
    yield deps.copyToClipboardIfEnabled(output, progressCallback, config);
    const metrics = yield deps.calculateMetrics(processedFiles, output, progressCallback, config, gitDiffResult);
    // Create a result object that includes metrics and security results
    const result = Object.assign(Object.assign({}, metrics), { suspiciousFilesResults,
        suspiciousGitDiffResults });
    return result;
});
//# sourceMappingURL=packager.js.map