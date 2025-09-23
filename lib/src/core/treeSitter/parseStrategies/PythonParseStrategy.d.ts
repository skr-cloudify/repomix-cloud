import type { SyntaxNode } from 'web-tree-sitter';
import type { ParseContext, ParseStrategy } from './ParseStrategy.js';
export declare class PythonParseStrategy implements ParseStrategy {
    parseCapture(capture: {
        node: SyntaxNode;
        name: string;
    }, lines: string[], processedChunks: Set<string>, context: ParseContext): string | null;
    private getCaptureType;
    private getDecorators;
    private getClassInheritance;
    private getFunctionSignature;
    private parseClassDefinition;
    private parseFunctionDefinition;
    private parseDocstringOrComment;
    private parseTypeAlias;
}
//# sourceMappingURL=PythonParseStrategy.d.ts.map