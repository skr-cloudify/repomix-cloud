var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'node:fs/promises';
import iconv from 'iconv-lite';
import { isBinary } from 'istextorbinary';
import jschardet from 'jschardet';
import { logger } from '../../shared/logger.js';
/**
 * Read a file and return its text content
 * @param filePath Path to the file
 * @param maxFileSize Maximum file size in bytes
 * @returns File content as string, or null if the file is binary or exceeds size limit
 */
export const readRawFile = (filePath, maxFileSize) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield fs.stat(filePath);
        if (stats.size > maxFileSize) {
            const sizeKB = (stats.size / 1024).toFixed(1);
            const maxSizeKB = (maxFileSize / 1024).toFixed(1);
            logger.trace(`File exceeds size limit: ${sizeKB}KB > ${maxSizeKB}KB (${filePath})`);
            return null;
        }
        if (isBinary(filePath)) {
            logger.debug(`Skipping binary file: ${filePath}`);
            return null;
        }
        logger.trace(`Reading file: ${filePath}`);
        const buffer = yield fs.readFile(filePath);
        if (isBinary(null, buffer)) {
            logger.debug(`Skipping binary file (content check): ${filePath}`);
            return null;
        }
        const encoding = jschardet.detect(buffer).encoding || 'utf-8';
        const content = iconv.decode(buffer, encoding);
        return content;
    }
    catch (error) {
        logger.warn(`Failed to read file: ${filePath}`, error);
        return null;
    }
});
//# sourceMappingURL=fileRead.js.map