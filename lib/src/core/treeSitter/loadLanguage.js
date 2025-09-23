var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import Parser from "web-tree-sitter";
// Handle both ESM and CommonJS environments
const getRequire = () => {
    try {
        // Try ESM first
        return createRequire(import.meta.url);
    }
    catch (_a) {
        // Fallback for CommonJS/Smithery builds
        if (typeof __filename !== "undefined") {
            return createRequire(`file://${__filename}`);
        }
        // Last resort
        return createRequire(`file://${process.cwd()}/src/core/treeSitter/loadLanguage.ts`);
    }
};
const require = getRequire();
export function loadLanguage(langName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!langName) {
            throw new Error("Invalid language name");
        }
        try {
            const wasmPath = yield getWasmPath(langName);
            return yield Parser.Language.load(wasmPath);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`Failed to load language ${langName}: ${message}`);
        }
    });
}
function getWasmPath(langName) {
    return __awaiter(this, void 0, void 0, function* () {
        const wasmPath = require.resolve(`tree-sitter-wasms/out/tree-sitter-${langName}.wasm`);
        try {
            yield fs.access(wasmPath);
            return wasmPath;
        }
        catch (_a) {
            throw new Error(`WASM file not found for language ${langName}: ${wasmPath}`);
        }
    });
}
//# sourceMappingURL=loadLanguage.js.map