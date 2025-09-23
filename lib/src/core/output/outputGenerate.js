var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'node:fs/promises';
import path from 'node:path';
import { XMLBuilder } from 'fast-xml-parser';
import Handlebars from 'handlebars';
import { RepomixError } from '../../shared/errorHandle.js';
import { searchFiles } from '../file/fileSearch.js';
import { generateTreeString } from '../file/fileTreeGenerate.js';
import { sortOutputFiles } from './outputSort.js';
import { generateHeader, generateSummaryFileFormat, generateSummaryNotes, generateSummaryPurpose, generateSummaryUsageGuidelines, } from './outputStyleDecorate.js';
import { getMarkdownTemplate } from './outputStyles/markdownStyle.js';
import { getPlainTemplate } from './outputStyles/plainStyle.js';
import { getXmlTemplate } from './outputStyles/xmlStyle.js';
const calculateMarkdownDelimiter = (files) => {
    const maxBackticks = files
        .flatMap((file) => { var _a; return (_a = file.content.match(/`+/g)) !== null && _a !== void 0 ? _a : []; })
        .reduce((max, match) => Math.max(max, match.length), 0);
    return '`'.repeat(Math.max(3, maxBackticks + 1));
};
const createRenderContext = (outputGeneratorContext) => {
    var _a, _b, _c;
    return {
        generationHeader: generateHeader(outputGeneratorContext.config, outputGeneratorContext.generationDate),
        summaryPurpose: generateSummaryPurpose(),
        summaryFileFormat: generateSummaryFileFormat(),
        summaryUsageGuidelines: generateSummaryUsageGuidelines(outputGeneratorContext.config, outputGeneratorContext.instruction),
        summaryNotes: generateSummaryNotes(outputGeneratorContext.config),
        headerText: outputGeneratorContext.config.output.headerText,
        instruction: outputGeneratorContext.instruction,
        treeString: outputGeneratorContext.treeString,
        processedFiles: outputGeneratorContext.processedFiles,
        fileSummaryEnabled: outputGeneratorContext.config.output.fileSummary,
        directoryStructureEnabled: outputGeneratorContext.config.output.directoryStructure,
        filesEnabled: outputGeneratorContext.config.output.files,
        escapeFileContent: outputGeneratorContext.config.output.parsableStyle,
        markdownCodeBlockDelimiter: calculateMarkdownDelimiter(outputGeneratorContext.processedFiles),
        gitDiffEnabled: (_a = outputGeneratorContext.config.output.git) === null || _a === void 0 ? void 0 : _a.includeDiffs,
        gitDiffWorkTree: (_b = outputGeneratorContext.gitDiffResult) === null || _b === void 0 ? void 0 : _b.workTreeDiffContent,
        gitDiffStaged: (_c = outputGeneratorContext.gitDiffResult) === null || _c === void 0 ? void 0 : _c.stagedDiffContent,
    };
};
const generateParsableXmlOutput = (renderContext) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlBuilder = new XMLBuilder({ ignoreAttributes: false });
    const xmlDocument = {
        repomix: {
            '#text': renderContext.generationHeader,
            file_summary: renderContext.fileSummaryEnabled
                ? {
                    '#text': 'This section contains a summary of this file.',
                    purpose: renderContext.summaryPurpose,
                    file_format: `${renderContext.summaryFileFormat}
4. Repository files, each consisting of:
  - File path as an attribute
  - Full contents of the file`,
                    usage_guidelines: renderContext.summaryUsageGuidelines,
                    notes: renderContext.summaryNotes,
                    additional_info: {
                        user_provided_header: renderContext.headerText,
                    },
                }
                : undefined,
            directory_structure: renderContext.directoryStructureEnabled ? renderContext.treeString : undefined,
            files: renderContext.filesEnabled
                ? {
                    '#text': "This section contains the contents of the repository's files.",
                    file: renderContext.processedFiles.map((file) => ({
                        '#text': file.content,
                        '@_path': file.path,
                    })),
                }
                : undefined,
            git_diffs: renderContext.gitDiffEnabled
                ? {
                    git_diff_work_tree: renderContext.gitDiffWorkTree,
                    git_diff_staged: renderContext.gitDiffStaged,
                }
                : undefined,
            instruction: renderContext.instruction ? renderContext.instruction : undefined,
        },
    };
    try {
        return xmlBuilder.build(xmlDocument);
    }
    catch (error) {
        throw new RepomixError(`Failed to generate XML output: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});
const generateHandlebarOutput = (config, renderContext) => __awaiter(void 0, void 0, void 0, function* () {
    let template;
    switch (config.output.style) {
        case 'xml':
            template = getXmlTemplate();
            break;
        case 'markdown':
            template = getMarkdownTemplate();
            break;
        case 'plain':
            template = getPlainTemplate();
            break;
        default:
            throw new RepomixError(`Unknown output style: ${config.output.style}`);
    }
    try {
        const compiledTemplate = Handlebars.compile(template);
        return `${compiledTemplate(renderContext).trim()}\n`;
    }
    catch (error) {
        throw new RepomixError(`Failed to compile template: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
});
export const generateOutput = (rootDirs_1, config_1, processedFiles_1, allFilePaths_1, ...args_1) => __awaiter(void 0, [rootDirs_1, config_1, processedFiles_1, allFilePaths_1, ...args_1], void 0, function* (rootDirs, config, processedFiles, allFilePaths, gitDiffResult = undefined, deps = {
    buildOutputGeneratorContext,
    generateHandlebarOutput,
    generateParsableXmlOutput,
    sortOutputFiles,
}) {
    // Sort processed files by git change count if enabled
    const sortedProcessedFiles = yield deps.sortOutputFiles(processedFiles, config);
    const outputGeneratorContext = yield deps.buildOutputGeneratorContext(rootDirs, config, allFilePaths, sortedProcessedFiles, gitDiffResult);
    const renderContext = createRenderContext(outputGeneratorContext);
    if (!config.output.parsableStyle)
        return deps.generateHandlebarOutput(config, renderContext);
    switch (config.output.style) {
        case 'xml':
            return deps.generateParsableXmlOutput(renderContext);
        case 'markdown':
            return deps.generateHandlebarOutput(config, renderContext);
        default:
            return deps.generateHandlebarOutput(config, renderContext);
    }
});
export const buildOutputGeneratorContext = (rootDirs_1, config_1, allFilePaths_1, processedFiles_1, ...args_1) => __awaiter(void 0, [rootDirs_1, config_1, allFilePaths_1, processedFiles_1, ...args_1], void 0, function* (rootDirs, config, allFilePaths, processedFiles, gitDiffResult = undefined) {
    let repositoryInstruction = '';
    if (config.output.instructionFilePath) {
        const instructionPath = path.resolve(config.cwd, config.output.instructionFilePath);
        try {
            repositoryInstruction = yield fs.readFile(instructionPath, 'utf-8');
        }
        catch (_a) {
            throw new RepomixError(`Instruction file not found at ${instructionPath}`);
        }
    }
    let emptyDirPaths = [];
    if (config.output.includeEmptyDirectories) {
        try {
            emptyDirPaths = (yield Promise.all(rootDirs.map((rootDir) => searchFiles(rootDir, config)))).reduce((acc, curr) => ({
                filePaths: [...acc.filePaths, ...curr.filePaths],
                emptyDirPaths: [...acc.emptyDirPaths, ...curr.emptyDirPaths],
            }), { filePaths: [], emptyDirPaths: [] }).emptyDirPaths;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new RepomixError(`Failed to search for empty directories: ${error.message}`);
            }
        }
    }
    return {
        generationDate: new Date().toISOString(),
        treeString: generateTreeString(allFilePaths, emptyDirPaths),
        processedFiles,
        config,
        instruction: repositoryInstruction,
        gitDiffResult,
    };
});
//# sourceMappingURL=outputGenerate.js.map