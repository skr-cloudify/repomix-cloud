import Parser from "web-tree-sitter";
import { type SupportedLang } from "./lang2Query.js";
import { type ParseStrategy } from "./parseStrategies/ParseStrategy.js";
export declare class LanguageParser {
    private loadedResources;
    private initialized;
    private getFileExtension;
    private prepareLang;
    private getResources;
    getParserForLang(name: SupportedLang): Promise<Parser>;
    getQueryForLang(name: SupportedLang): Promise<Parser.Query>;
    getStrategyForLang(name: SupportedLang): Promise<ParseStrategy>;
    guessTheLang(filePath: string): SupportedLang | undefined;
    init(): Promise<void>;
    dispose(): Promise<void>;
}
//# sourceMappingURL=languageParser.d.ts.map