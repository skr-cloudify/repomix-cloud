import type { SyntaxNode } from 'web-tree-sitter';
import type { ParseContext, ParseStrategy } from './ParseStrategy.js';
export declare class GoParseStrategy implements ParseStrategy {
    parseCapture(capture: {
        node: SyntaxNode;
        name: string;
    }, lines: string[], processedChunks: Set<string>, context: ParseContext): string | null;
    private getCaptureType;
    private getFunctionName;
    private getMethodWithReceiver;
    private findClosingToken;
    private parseSimpleDeclaration;
    private parseBlockDeclaration;
    private parseFunctionOrMethod;
    private parseTypeDefinition;
}
//# sourceMappingURL=GoParseStrategy.d.ts.map