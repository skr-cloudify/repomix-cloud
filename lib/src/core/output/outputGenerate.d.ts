import type { RepomixConfigMerged } from '../../config/configSchema.js';
import type { ProcessedFile } from '../file/fileTypes.js';
import type { GitDiffResult } from '../file/gitDiff.js';
import type { OutputGeneratorContext, RenderContext } from './outputGeneratorTypes.js';
export declare const generateOutput: (rootDirs: string[], config: RepomixConfigMerged, processedFiles: ProcessedFile[], allFilePaths: string[], gitDiffResult?: GitDiffResult | undefined, deps?: {
    buildOutputGeneratorContext: (rootDirs: string[], config: RepomixConfigMerged, allFilePaths: string[], processedFiles: ProcessedFile[], gitDiffResult?: GitDiffResult | undefined) => Promise<OutputGeneratorContext>;
    generateHandlebarOutput: (config: RepomixConfigMerged, renderContext: RenderContext) => Promise<string>;
    generateParsableXmlOutput: (renderContext: RenderContext) => Promise<string>;
    sortOutputFiles: (files: ProcessedFile[], config: RepomixConfigMerged, deps?: {
        getFileChangeCount: (directory: string, maxCommits?: number, deps?: {
            execFileAsync: typeof import("child_process").execFile.__promisify__;
        }) => Promise<Record<string, number>>;
        isGitInstalled: (deps?: {
            execFileAsync: typeof import("child_process").execFile.__promisify__;
        }) => Promise<boolean>;
    }) => Promise<ProcessedFile[]>;
}) => Promise<string>;
export declare const buildOutputGeneratorContext: (rootDirs: string[], config: RepomixConfigMerged, allFilePaths: string[], processedFiles: ProcessedFile[], gitDiffResult?: GitDiffResult | undefined) => Promise<OutputGeneratorContext>;
//# sourceMappingURL=outputGenerate.d.ts.map