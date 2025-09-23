var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { lintSource } from '@secretlint/core';
import { creator } from '@secretlint/secretlint-rule-preset-recommend';
import { logger, setLogLevelByEnv } from '../../../shared/logger.js';
// Set logger log level from environment variable if provided
setLogLevelByEnv();
export default (_a) => __awaiter(void 0, [_a], void 0, function* ({ filePath, content, type }) {
    const config = createSecretLintConfig();
    try {
        const processStartAt = process.hrtime.bigint();
        const secretLintResult = yield runSecretLint(filePath, content, type, config);
        const processEndAt = process.hrtime.bigint();
        logger.trace(`Checked security on ${filePath}. Took: ${(Number(processEndAt - processStartAt) / 1e6).toFixed(2)}ms`);
        return secretLintResult;
    }
    catch (error) {
        logger.error(`Error checking security on ${filePath}:`, error);
        throw error;
    }
});
export const runSecretLint = (filePath, content, type, config) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lintSource({
        source: {
            filePath: filePath,
            content: content,
            ext: filePath.split('.').pop() || '',
            contentType: 'text',
        },
        options: {
            config: config,
        },
    });
    if (result.messages.length > 0) {
        logger.trace(`Found ${result.messages.length} issues in ${filePath}`);
        logger.trace(result.messages.map((message) => `  - ${message.message}`).join('\n'));
        return {
            filePath,
            messages: result.messages.map((message) => message.message),
            type,
        };
    }
    return null;
});
export const createSecretLintConfig = () => ({
    rules: [
        {
            id: '@secretlint/secretlint-rule-preset-recommend',
            rule: creator,
        },
    ],
});
//# sourceMappingURL=securityCheckWorker.js.map