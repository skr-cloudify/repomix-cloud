var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calculateAllFileMetrics } from './calculateAllFileMetrics.js';
import { calculateOutputMetrics } from './calculateOutputMetrics.js';
import { TokenCounter } from './TokenCounter.js';
export const calculateMetrics = (processedFiles_1, output_1, progressCallback_1, config_1, gitDiffResult_1, ...args_1) => __awaiter(void 0, [processedFiles_1, output_1, progressCallback_1, config_1, gitDiffResult_1, ...args_1], void 0, function* (processedFiles, output, progressCallback, config, gitDiffResult, deps = {
    calculateAllFileMetrics,
    calculateOutputMetrics,
}) {
    var _a;
    progressCallback('Calculating metrics...');
    // Calculate token count for git diffs if included
    let gitDiffTokenCount = 0;
    if (((_a = config.output.git) === null || _a === void 0 ? void 0 : _a.includeDiffs) && gitDiffResult) {
        const tokenCounter = new TokenCounter(config.tokenCount.encoding);
        const countPromises = [];
        if (gitDiffResult.workTreeDiffContent) {
            countPromises.push(Promise.resolve().then(() => tokenCounter.countTokens(gitDiffResult.workTreeDiffContent)));
        }
        if (gitDiffResult.stagedDiffContent) {
            countPromises.push(Promise.resolve().then(() => tokenCounter.countTokens(gitDiffResult.stagedDiffContent)));
        }
        gitDiffTokenCount = (yield Promise.all(countPromises)).reduce((sum, count) => sum + count, 0);
        tokenCounter.free();
    }
    const [fileMetrics, totalTokens] = yield Promise.all([
        deps.calculateAllFileMetrics(processedFiles, config.tokenCount.encoding, progressCallback),
        deps.calculateOutputMetrics(output, config.tokenCount.encoding, config.output.filePath),
    ]);
    const totalFiles = processedFiles.length;
    const totalCharacters = output.length;
    const fileCharCounts = {};
    const fileTokenCounts = {};
    for (const file of fileMetrics) {
        fileCharCounts[file.path] = file.charCount;
        fileTokenCounts[file.path] = file.tokenCount;
    }
    return {
        totalFiles,
        totalCharacters,
        totalTokens,
        fileCharCounts,
        fileTokenCounts,
        gitDiffTokenCount: gitDiffTokenCount,
    };
});
//# sourceMappingURL=calculateMetrics.js.map