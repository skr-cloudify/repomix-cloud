import type { RepomixConfigMerged } from '../config/configSchema.js';
import type { RepomixProgressCallback } from '../shared/types.js';
import type { RawFile } from './file/fileTypes.js';
import { GitDiffResult } from './file/gitDiff.js';
import type { SuspiciousFileResult } from './security/securityCheck.js';
export interface PackResult {
    totalFiles: number;
    totalCharacters: number;
    totalTokens: number;
    fileCharCounts: Record<string, number>;
    fileTokenCounts: Record<string, number>;
    gitDiffTokenCount: number;
    suspiciousFilesResults: SuspiciousFileResult[];
    suspiciousGitDiffResults: SuspiciousFileResult[];
}
declare const defaultDeps: {
    searchFiles: (rootDir: string, config: RepomixConfigMerged) => Promise<import("./file/fileSearch.js").FileSearchResult>;
    collectFiles: (filePaths: string[], rootDir: string, config: RepomixConfigMerged, progressCallback?: RepomixProgressCallback, deps?: {
        initTaskRunner: (numOfTasks: number) => ((task: import("./file/workers/fileCollectWorker.js").FileCollectTask) => Promise<any>) | null;
    }) => Promise<RawFile[]>;
    processFiles: (rawFiles: RawFile[], config: RepomixConfigMerged, progressCallback: RepomixProgressCallback, deps?: {
        initTaskRunner: (numOfTasks: number) => ((task: import("./file/workers/fileProcessWorker.js").FileProcessTask) => Promise<any>) | null;
        getFileManipulator: (filePath: string) => import("./file/fileManipulate.js").FileManipulator | null;
    }) => Promise<import("./file/fileTypes.js").ProcessedFile[]>;
    generateOutput: (rootDirs: string[], config: RepomixConfigMerged, processedFiles: import("./file/fileTypes.js").ProcessedFile[], allFilePaths: string[], gitDiffResult?: GitDiffResult | undefined, deps?: {
        buildOutputGeneratorContext: (rootDirs: string[], config: RepomixConfigMerged, allFilePaths: string[], processedFiles: import("./file/fileTypes.js").ProcessedFile[], gitDiffResult?: GitDiffResult | undefined) => Promise<import("./output/outputGeneratorTypes.js").OutputGeneratorContext>;
        generateHandlebarOutput: (config: RepomixConfigMerged, renderContext: import("./output/outputGeneratorTypes.js").RenderContext) => Promise<string>;
        generateParsableXmlOutput: (renderContext: import("./output/outputGeneratorTypes.js").RenderContext) => Promise<string>;
        sortOutputFiles: (files: import("./file/fileTypes.js").ProcessedFile[], config: RepomixConfigMerged, deps?: {
            getFileChangeCount: (directory: string, maxCommits?: number, deps?: {
                execFileAsync: typeof import("child_process").execFile.__promisify__;
            }) => Promise<Record<string, number>>;
            isGitInstalled: (deps?: {
                execFileAsync: typeof import("child_process").execFile.__promisify__;
            }) => Promise<boolean>;
        }) => Promise<import("./file/fileTypes.js").ProcessedFile[]>;
    }) => Promise<string>;
    validateFileSafety: (rawFiles: RawFile[], progressCallback: RepomixProgressCallback, config: RepomixConfigMerged, gitDiffResult?: GitDiffResult, deps?: {
        runSecurityCheck: (rawFiles: RawFile[], progressCallback?: RepomixProgressCallback, gitDiffResult?: GitDiffResult, deps?: {
            initTaskRunner: (numOfTasks: number) => ((task: import("./security/workers/securityCheckWorker.js").SecurityCheckTask) => Promise<any>) | null;
        }) => Promise<SuspiciousFileResult[]>;
        filterOutUntrustedFiles: (rawFiles: RawFile[], suspiciousFilesResults: SuspiciousFileResult[]) => RawFile[];
    }) => Promise<{
        safeRawFiles: RawFile[];
        safeFilePaths: string[];
        suspiciousFilesResults: SuspiciousFileResult[];
        suspiciousGitDiffResults: SuspiciousFileResult[];
    }>;
    handleOutput: (output: string, config: RepomixConfigMerged) => Promise<undefined>;
    copyToClipboardIfEnabled: (output: string, progressCallback: RepomixProgressCallback, config: RepomixConfigMerged) => Promise<void>;
    calculateMetrics: (processedFiles: import("./file/fileTypes.js").ProcessedFile[], output: string, progressCallback: RepomixProgressCallback, config: RepomixConfigMerged, gitDiffResult: GitDiffResult | undefined, deps?: {
        calculateAllFileMetrics: (processedFiles: import("./file/fileTypes.js").ProcessedFile[], tokenCounterEncoding: import("tiktoken").TiktokenEncoding, progressCallback: RepomixProgressCallback, deps?: {
            initTaskRunner: (numOfTasks: number) => ((task: import("./metrics/workers/fileMetricsWorker.js").FileMetricsTask) => Promise<any>) | null;
        }) => Promise<import("./metrics/workers/types.js").FileMetrics[]>;
        calculateOutputMetrics: (content: string, encoding: import("tiktoken").TiktokenEncoding, path?: string, deps?: {
            initTaskRunner: (numOfTasks: number) => ((task: import("./metrics/workers/outputMetricsWorker.js").OutputMetricsTask) => Promise<any>) | null;
        }) => Promise<number>;
    }) => Promise<import("./metrics/calculateMetrics.js").CalculateMetricsResult>;
    sortPaths: (filePaths: string[]) => string[];
    getGitDiffs: (rootDirs: string[], config: RepomixConfigMerged, deps?: {
        getWorkTreeDiff: (directory: string, deps?: {
            execFileAsync: typeof import("child_process").execFile.__promisify__;
        }) => Promise<string>;
        getStagedDiff: (directory: string, deps?: {
            execFileAsync: typeof import("child_process").execFile.__promisify__;
        }) => Promise<string>;
    }) => Promise<GitDiffResult | undefined>;
};
export declare const pack: (rootDirs: string[], config: RepomixConfigMerged, progressCallback?: RepomixProgressCallback, overrideDeps?: Partial<typeof defaultDeps>) => Promise<PackResult>;
export {};
//# sourceMappingURL=packager.d.ts.map