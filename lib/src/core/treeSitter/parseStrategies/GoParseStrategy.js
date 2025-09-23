var CaptureType;
(function (CaptureType) {
    CaptureType["Comment"] = "comment";
    CaptureType["Type"] = "definition.type";
    CaptureType["Interface"] = "definition.interface";
    CaptureType["Struct"] = "definition.struct";
    CaptureType["Package"] = "definition.package";
    CaptureType["Import"] = "definition.import";
    CaptureType["Function"] = "definition.function";
    CaptureType["Method"] = "definition.method";
    CaptureType["Module"] = "definition.module";
    CaptureType["Variable"] = "definition.variable";
    CaptureType["Constant"] = "definition.constant";
})(CaptureType || (CaptureType = {}));
export class GoParseStrategy {
    parseCapture(capture, lines, processedChunks, context) {
        const { node, name } = capture;
        const startRow = node.startPosition.row;
        const endRow = node.endPosition.row;
        if (!lines[startRow]) {
            return null;
        }
        const captureTypes = this.getCaptureType(name);
        // Comments
        if (captureTypes.has(CaptureType.Comment)) {
            return this.parseBlockDeclaration(lines, startRow, endRow, processedChunks).content;
        }
        // Package declarations
        if (captureTypes.has(CaptureType.Package) || captureTypes.has(CaptureType.Module)) {
            return this.parseSimpleDeclaration(lines, startRow, processedChunks).content;
        }
        // Import declarations
        if (captureTypes.has(CaptureType.Import)) {
            return lines[startRow].includes('(')
                ? this.parseBlockDeclaration(lines, startRow, endRow, processedChunks).content
                : this.parseSimpleDeclaration(lines, startRow, processedChunks).content;
        }
        // Variable declarations
        if (captureTypes.has(CaptureType.Variable)) {
            return this.parseBlockDeclaration(lines, startRow, endRow, processedChunks).content;
        }
        // Constant declarations
        if (captureTypes.has(CaptureType.Constant)) {
            return this.parseBlockDeclaration(lines, startRow, endRow, processedChunks).content;
        }
        // Type definitions
        if (captureTypes.has(CaptureType.Type) ||
            captureTypes.has(CaptureType.Interface) ||
            captureTypes.has(CaptureType.Struct)) {
            return this.parseTypeDefinition(lines, startRow, endRow, processedChunks).content;
        }
        // Function declarations
        if (captureTypes.has(CaptureType.Function)) {
            return this.parseFunctionOrMethod(lines, startRow, endRow, processedChunks, false).content;
        }
        // Method declarations
        if (captureTypes.has(CaptureType.Method)) {
            return this.parseFunctionOrMethod(lines, startRow, endRow, processedChunks, true).content;
        }
        return null;
    }
    getCaptureType(name) {
        const types = new Set();
        for (const type of Object.values(CaptureType)) {
            if (name.includes(type)) {
                types.add(type);
            }
        }
        return types;
    }
    getFunctionName(lines, startRow) {
        const line = lines[startRow];
        // "func funcName(" pattern detection
        const match = line.match(/func\s+([A-Za-z0-9_]+)\s*\(/);
        if (match === null || match === void 0 ? void 0 : match[1]) {
            return match[1];
        }
        return null;
    }
    // Helper to get method name including receiver type
    getMethodWithReceiver(lines, startRow) {
        const line = lines[startRow];
        // "func (r ReceiverType) methodName(" pattern detection
        const match = line.match(/func\s+\(([^)]+)\)\s+([A-Za-z0-9_]+)\s*\(/);
        if (match === null || match === void 0 ? void 0 : match[2]) {
            return match[2];
        }
        return null;
    }
    findClosingToken(lines, startRow, endRow, openToken, closeToken) {
        for (let i = startRow; i <= endRow; i++) {
            if (lines[i].includes(closeToken)) {
                return i;
            }
        }
        return startRow;
    }
    parseSimpleDeclaration(lines, startRow, processedChunks) {
        const declaration = lines[startRow].trim();
        if (processedChunks.has(declaration)) {
            return { content: null };
        }
        processedChunks.add(declaration);
        return { content: declaration };
    }
    parseBlockDeclaration(lines, startRow, endRow, processedChunks) {
        const blockEndRow = lines[startRow].includes('(')
            ? this.findClosingToken(lines, startRow, endRow, '(', ')')
            : endRow;
        const declaration = lines.slice(startRow, blockEndRow + 1).join('\n');
        if (processedChunks.has(declaration)) {
            return { content: null };
        }
        processedChunks.add(declaration);
        return { content: declaration };
    }
    parseFunctionOrMethod(lines, startRow, endRow, processedChunks, isMethod) {
        const nameKey = isMethod ? 'method' : 'func';
        const getName = isMethod ? this.getMethodWithReceiver : this.getFunctionName;
        const name = getName.call(this, lines, startRow);
        if (name && processedChunks.has(`${nameKey}:${name}`)) {
            return { content: null };
        }
        const signatureEndRow = this.findClosingToken(lines, startRow, endRow, '{', '{');
        const signature = lines
            .slice(startRow, signatureEndRow + 1)
            .join('\n')
            .trim();
        const cleanSignature = signature.split('{')[0].trim();
        if (processedChunks.has(cleanSignature)) {
            return { content: null };
        }
        processedChunks.add(cleanSignature);
        if (name) {
            processedChunks.add(`${nameKey}:${name}`);
        }
        return { content: cleanSignature };
    }
    parseTypeDefinition(lines, startRow, endRow, processedChunks) {
        const signatureEndRow = lines[startRow].includes('{')
            ? this.findClosingToken(lines, startRow, endRow, '{', '}')
            : endRow;
        const definition = lines.slice(startRow, signatureEndRow + 1).join('\n');
        if (processedChunks.has(definition)) {
            return { content: null };
        }
        processedChunks.add(definition);
        return { content: definition };
    }
}
//# sourceMappingURL=GoParseStrategy.js.map