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
import { setLogLevelByEnv } from '../../../shared/logger.js';
import { readRawFile } from '../fileRead.js';
// Set logger log level from environment variable if provided
setLogLevelByEnv();
export default (_a) => __awaiter(void 0, [_a], void 0, function* ({ filePath, rootDir, maxFileSize }) {
    const fullPath = path.resolve(rootDir, filePath);
    const content = yield readRawFile(fullPath, maxFileSize);
    if (content) {
        return {
            path: filePath,
            content,
        };
    }
    return null;
});
//# sourceMappingURL=fileCollectWorker.js.map