var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "node:fs/promises";
import path from "node:path";
import * as url from "node:url";
import { logger } from "../../shared/logger.js";
export const getVersion = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const packageJson = yield parsePackageJson();
        if (!packageJson.version) {
            logger.warn("No version found in package.json");
            return "unknown";
        }
        return packageJson.version;
    }
    catch (error) {
        logger.error("Error reading package.json:", error);
        return "unknown";
    }
});
const parsePackageJson = () => __awaiter(void 0, void 0, void 0, function* () {
    let packageJsonPath;
    if (process.env.SMITHERY_MODE === "true") {
        // In Smithery mode, look for package.json in current working directory
        packageJsonPath = path.join(process.cwd(), "package.json");
    }
    else {
        let dirName;
        try {
            // Try to use import.meta.url (works in ESM)
            dirName = url.fileURLToPath(new URL(".", import.meta.url));
        }
        catch (_a) {
            // Fallback for CommonJS builds
            dirName = __dirname || process.cwd();
        }
        packageJsonPath = path.join(dirName, "..", "..", "..", "package.json");
    }
    const packageJsonFile = yield fs.readFile(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonFile);
    return packageJson;
});
//# sourceMappingURL=packageJsonParse.js.map