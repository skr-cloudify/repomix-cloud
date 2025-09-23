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
export default (_a) => __awaiter(void 0, [_a], void 0, function* ({ content, encoding, path }) {
    const processStartAt = process.hrtime.bigint();
    const counter = getTokenCounter(encoding);
    const tokenCount = counter.countTokens(content, path);
    const processEndAt = process.hrtime.bigint();
    logger.trace(`Counted output tokens. Count: ${tokenCount}. Took: ${(Number(processEndAt - processStartAt) / 1e6).toFixed(2)}ms`);
    return tokenCount;
});
// Cleanup when worker is terminated
process.on('exit', () => {
    if (tokenCounter) {
        tokenCounter.free();
        tokenCounter = null;
    }
});
//# sourceMappingURL=outputMetricsWorker.js.map