import type { SyntaxNode } from 'web-tree-sitter';
import type { ParseContext, ParseStrategy } from './ParseStrategy.js';
export declare class DefaultParseStrategy implements ParseStrategy {
    parseCapture(capture: {
        node: SyntaxNode;
        name: string;
    }, lines: string[], processedChunks: Set<string>, context: ParseContext): string | null;
}
//# sourceMappingURL=DefaultParseStrategy.d.ts.map