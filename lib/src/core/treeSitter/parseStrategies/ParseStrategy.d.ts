import type { Query, SyntaxNode, Tree } from 'web-tree-sitter';
import type { RepomixConfigMerged } from '../../../config/configSchema.js';
import type { SupportedLang } from '../lang2Query.js';
export interface ParseContext {
    fileContent: string;
    lines: string[];
    tree: Tree;
    query: Query;
    config: RepomixConfigMerged;
}
export interface ParseStrategy {
    parseCapture(capture: {
        node: SyntaxNode;
        name: string;
    }, lines: string[], processedChunks: Set<string>, context: ParseContext): string | null;
}
export declare function createParseStrategy(lang: SupportedLang): ParseStrategy;
//# sourceMappingURL=ParseStrategy.d.ts.map