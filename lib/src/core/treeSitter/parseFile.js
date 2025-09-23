var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { logger } from "../../shared/logger.js";
import { createParseStrategy, } from "./parseStrategies/ParseStrategy.js";
let languageParserSingleton = null;
export const CHUNK_SEPARATOR = "⋮----";
// TODO: Do something with config: RepomixConfigMerged, it is not used (yet)
export const parseFile = (fileContent, filePath, config) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if TreeSitter is disabled in server environments
        if (process.env.SMITHERY_MODE === "true") {
            return fileContent;
        }
        const languageParser = yield getLanguageParserSingleton();
        // Split the file content into individual lines
        const lines = fileContent.split("\n");
        if (lines.length < 1) {
            return "";
        }
        const lang = languageParser.guessTheLang(filePath);
        if (lang === undefined) {
            // Language not supported
            return fileContent;
        }
        const query = yield languageParser.getQueryForLang(lang);
        const parser = yield languageParser.getParserForLang(lang);
        const processedChunks = new Set();
        const capturedChunks = [];
        try {
            // Parse the file content into an Abstract Syntax Tree (AST)
            const tree = parser.parse(fileContent);
            // Get the appropriate parse strategy for the language
            const parseStrategy = createParseStrategy(lang);
            // Create parse context
            const context = {
                fileContent,
                lines,
                tree,
                query,
                config,
            };
            // Apply the query to the AST and get the captures
            const captures = query.captures(tree.rootNode);
            // Sort captures by their start position
            captures.sort((a, b) => a.node.startPosition.row - b.node.startPosition.row);
            for (const capture of captures) {
                const capturedChunkContent = parseStrategy.parseCapture(capture, lines, processedChunks, context);
                if (capturedChunkContent !== null) {
                    capturedChunks.push({
                        content: capturedChunkContent.trim(),
                        startRow: capture.node.startPosition.row,
                        endRow: capture.node.endPosition.row,
                    });
                }
            }
        }
        catch (error) {
            logger.log(`Error parsing file: ${error}\n`);
        }
        const filteredChunks = filterDuplicatedChunks(capturedChunks);
        const mergedChunks = mergeAdjacentChunks(filteredChunks);
        return mergedChunks
            .map((chunk) => chunk.content)
            .join(`\n${CHUNK_SEPARATOR}\n`)
            .trim();
    }
    catch (error) {
        // If TreeSitter fails or is disabled, return original content
        return fileContent;
    }
});
const getLanguageParserSingleton = () => __awaiter(void 0, void 0, void 0, function* () {
    // Disable TreeSitter in Smithery/server environments
    if (process.env.SMITHERY_MODE || process.env.NODE_ENV === "production") {
        throw new Error("TreeSitter is disabled in server environments");
    }
    if (!languageParserSingleton) {
        const { LanguageParser } = yield import("./languageParser.js");
        languageParserSingleton = new LanguageParser();
        yield languageParserSingleton.init();
    }
    return languageParserSingleton;
});
const filterDuplicatedChunks = (chunks) => {
    var _a;
    // Group chunks by their start row
    const chunksByStartRow = new Map();
    for (const chunk of chunks) {
        const startRow = chunk.startRow;
        if (!chunksByStartRow.has(startRow)) {
            chunksByStartRow.set(startRow, []);
        }
        (_a = chunksByStartRow.get(startRow)) === null || _a === void 0 ? void 0 : _a.push(chunk);
    }
    // For each start row, keep the chunk with the most content
    const filteredChunks = [];
    for (const [_, rowChunks] of chunksByStartRow) {
        rowChunks.sort((a, b) => b.content.length - a.content.length);
        filteredChunks.push(rowChunks[0]);
    }
    // Sort filtered chunks by start row
    return filteredChunks.sort((a, b) => a.startRow - b.startRow);
};
const mergeAdjacentChunks = (chunks) => {
    if (chunks.length <= 1) {
        return chunks;
    }
    const merged = [chunks[0]];
    for (let i = 1; i < chunks.length; i++) {
        const current = chunks[i];
        const previous = merged[merged.length - 1];
        // Merge the current chunk with the previous one
        if (previous.endRow + 1 === current.startRow) {
            previous.content += `\n${current.content}`;
            previous.endRow = current.endRow;
        }
        else {
            merged.push(current);
        }
    }
    return merged;
};
//# sourceMappingURL=parseFile.js.map