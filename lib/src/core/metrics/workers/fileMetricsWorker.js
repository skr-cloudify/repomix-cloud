var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logger, setLogLevelByEnv } from '../../../shared/logger.js';
import { TokenCounter } from '../TokenCounter.js';
// Worker-level singleton for TokenCounter
let tokenCounter = null;
const getTokenCounter = (encoding) => {
    if (!tokenCounter) {
        tokenCounter = new TokenCounter(encoding);
    }
    return tokenCounter;
};
// Set logger log level from environment variable if provided
setLogLevelByEnv();
export default (_a) => __awaiter(void 0, [_a], void 0, function* ({ file, encoding }) {
    const processStartAt = process.hrtime.bigint();
    const metrics = yield calculateIndividualFileMetrics(file, encoding);
    const processEndAt = process.hrtime.bigint();
    logger.trace(`Calculated metrics for ${file.path}. Took: ${(Number(processEndAt - processStartAt) / 1e6).toFixed(2)}ms`);
    return metrics;
});
export const calculateIndividualFileMetrics = (file, encoding) => __awaiter(void 0, void 0, void 0, function* () {
    const charCount = file.content.length;
    const tokenCounter = getTokenCounter(encoding);
    const tokenCount = tokenCounter.countTokens(file.content, file.path);
    return { path: file.path, charCount, tokenCount };
});
// Cleanup when worker is terminated
process.on('exit', () => {
    if (tokenCounter) {
        tokenCounter.free();
        tokenCounter = null;
    }
});
//# sourceMappingURL=fileMetricsWorker.js.map