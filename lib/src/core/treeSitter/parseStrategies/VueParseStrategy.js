export class VueParseStrategy {
    parseCapture(capture, lines, processedChunks, context) {
        const { node, name } = capture;
        const startRow = node.startPosition.row;
        const endRow = node.endPosition.row;
        if (!lines[startRow]) {
            return null;
        }
        // Extract the content based on the capture type
        const selectedLines = lines.slice(startRow, endRow + 1);
        if (selectedLines.length < 1) {
            return null;
        }
        const chunk = selectedLines.join('\n');
        const normalizedChunk = chunk.trim();
        // Create a unique ID for this chunk
        const chunkId = `${name}:${startRow}`;
        if (processedChunks.has(chunkId)) {
            return null;
        }
        processedChunks.add(chunkId);
        return chunk;
    }
}
//# sourceMappingURL=VueParseStrategy.js.map