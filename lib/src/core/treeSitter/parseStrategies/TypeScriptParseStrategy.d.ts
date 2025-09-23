import type { SyntaxNode } from 'web-tree-sitter';
import type { ParseContext, ParseStrategy } from './ParseStrategy.js';
export declare class TypeScriptParseStrategy implements ParseStrategy {
    private static readonly FUNCTION_NAME_PATTERN;
    parseCapture(capture: {
        node: SyntaxNode;
        name: string;
    }, lines: string[], processedChunks: Set<string>, context: ParseContext): string | null;
    private getFunctionName;
    private getCaptureType;
    private parseFunctionDefinition;
    private findSignatureEnd;
    private cleanFunctionSignature;
    private parseClassDefinition;
    private parseTypeOrImport;
}
//# sourceMappingURL=TypeScriptParseStrategy.d.ts.map