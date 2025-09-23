var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as path from "node:path";
import Parser from "web-tree-sitter";
import { RepomixError } from "../../shared/errorHandle.js";
import { ext2Lang } from "./ext2Lang.js";
import { lang2Query } from "./lang2Query.js";
import { createParseStrategy, } from "./parseStrategies/ParseStrategy.js";
// Lazy import to avoid import.meta.url issues in Smithery
let loadLanguageModule = null;
const getLoadLanguage = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!loadLanguageModule) {
        loadLanguageModule = yield import("./loadLanguage.js");
    }
    return loadLanguageModule.loadLanguage;
});
export class LanguageParser {
    constructor() {
        this.loadedResources = new Map();
        this.initialized = false;
    }
    getFileExtension(filePath) {
        return path.extname(filePath).toLowerCase().slice(1);
    }
    prepareLang(name) {
        return __awaiter(this, void 0, void 0, function* () {
            // Disable TreeSitter in Smithery/server environments
            if (process.env.SMITHERY_MODE || process.env.NODE_ENV === "production") {
                throw new RepomixError("TreeSitter is disabled in server environments");
            }
            try {
                const loadLanguage = yield getLoadLanguage();
                const lang = yield loadLanguage(name);
                const parser = new Parser();
                parser.setLanguage(lang);
                const query = lang.query(lang2Query[name]);
                const strategy = createParseStrategy(name);
                const resources = {
                    parser,
                    query,
                    strategy,
                };
                this.loadedResources.set(name, resources);
                return resources;
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                throw new RepomixError(`Failed to prepare language ${name}: ${message}`);
            }
        });
    }
    getResources(name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.initialized) {
                throw new RepomixError("LanguageParser is not initialized. Call init() first.");
            }
            const resources = this.loadedResources.get(name);
            if (!resources) {
                return this.prepareLang(name);
            }
            return resources;
        });
    }
    getParserForLang(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const resources = yield this.getResources(name);
            return resources.parser;
        });
    }
    getQueryForLang(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const resources = yield this.getResources(name);
            return resources.query;
        });
    }
    getStrategyForLang(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const resources = yield this.getResources(name);
            return resources.strategy;
        });
    }
    guessTheLang(filePath) {
        const ext = this.getFileExtension(filePath);
        if (!Object.keys(ext2Lang).includes(ext)) {
            return undefined;
        }
        return ext2Lang[ext];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.initialized) {
                return;
            }
            try {
                yield Parser.init();
                this.initialized = true;
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                throw new RepomixError(`Failed to initialize parser: ${message}`);
            }
        });
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const resources of this.loadedResources.values()) {
                resources.parser.delete();
            }
            this.loadedResources.clear();
            this.initialized = false;
        });
    }
}
//# sourceMappingURL=languageParser.js.map