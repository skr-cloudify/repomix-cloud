var CaptureType;
(function (CaptureType) {
    CaptureType["Comment"] = "comment";
    CaptureType["Class"] = "definition.class";
    CaptureType["Function"] = "definition.function";
    CaptureType["Docstring"] = "docstring";
    CaptureType["TypeAlias"] = "definition.type_alias";
})(CaptureType || (CaptureType = {}));
export class PythonParseStrategy {
    parseCapture(capture, lines, processedChunks, context) {
        const { node, name } = capture;
        const startRow = node.startPosition.row;
        const endRow = node.endPosition.row;
        if (!lines[startRow]) {
            return null;
        }
        const captureTypes = this.getCaptureType(name);
        // Class definition
        if (captureTypes.has(CaptureType.Class)) {
            return this.parseClassDefinition(lines, startRow, processedChunks).content;
        }
        // Function definition
        if (captureTypes.has(CaptureType.Function)) {
            return this.parseFunctionDefinition(lines, startRow, processedChunks).content;
        }
        // Docstring
        if (captureTypes.has(CaptureType.Docstring)) {
            return this.parseDocstringOrComment(lines, startRow, endRow, processedChunks).content;
        }
        // Comment
        if (captureTypes.has(CaptureType.Comment)) {
            return this.parseDocstringOrComment(lines, startRow, endRow, processedChunks).content;
        }
        // Type alias
        if (captureTypes.has(CaptureType.TypeAlias)) {
            return this.parseTypeAlias(lines, startRow, processedChunks).content;
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
    getDecorators(lines, startRow) {
        const decorators = [];
        let currentRow = startRow - 1;
        while (currentRow >= 0) {
            const line = lines[currentRow].trim();
            if (line.startsWith('@')) {
                decorators.unshift(line); // Add to beginning to maintain order
            }
            else {
                break;
            }
            currentRow--;
        }
        return decorators;
    }
    getClassInheritance(lines, startRow) {
        const line = lines[startRow];
        const match = line.match(/class\s+\w+\s*\((.*?)\):/);
        return match ? line.replace(/:\s*$/, '') : line.replace(/:\s*$/, '');
    }
    getFunctionSignature(lines, startRow) {
        const line = lines[startRow];
        const match = line.match(/def\s+(\w+)\s*\((.*?)\)(\s*->\s*[^:]+)?:/);
        if (!match)
            return null;
        return line.replace(/:\s*$/, '');
    }
    parseClassDefinition(lines, startRow, processedChunks) {
        const decorators = this.getDecorators(lines, startRow);
        const classDefinition = this.getClassInheritance(lines, startRow);
        const fullDefinition = [...decorators, classDefinition].join('\n');
        if (processedChunks.has(fullDefinition)) {
            return { content: null };
        }
        processedChunks.add(fullDefinition);
        return { content: fullDefinition };
    }
    parseFunctionDefinition(lines, startRow, processedChunks) {
        const decorators = this.getDecorators(lines, startRow);
        const signature = this.getFunctionSignature(lines, startRow);
        if (!signature) {
            return { content: null };
        }
        const fullDefinition = [...decorators, signature].join('\n');
        if (processedChunks.has(fullDefinition)) {
            return { content: null };
        }
        processedChunks.add(fullDefinition);
        return { content: fullDefinition };
    }
    parseDocstringOrComment(lines, startRow, endRow, processedChunks) {
        const content = lines.slice(startRow, endRow + 1).join('\n');
        if (processedChunks.has(content)) {
            return { content: null };
        }
        processedChunks.add(content);
        return { content };
    }
    parseTypeAlias(lines, startRow, processedChunks) {
        const typeAlias = lines[startRow].trim();
        if (processedChunks.has(typeAlias)) {
            return { content: null };
        }
        processedChunks.add(typeAlias);
        return { content: typeAlias };
    }
}
//# sourceMappingURL=PythonParseStrategy.js.map