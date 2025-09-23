import type { RepomixConfigMerged } from '../../config/configSchema.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import type { ProcessedFile } from '../file/fileTypes.js';
import type { GitDiffResult } from '../file/gitDiff.js';
export interface CalculateMetricsResult {
    totalFiles: number;
    totalCharacters: number;
    totalTokens: number;
    fileCharCounts: Record<string, number>;
    fileTokenCounts: Record<string, number>;
    gitDiffTokenCount: number;
}
export declare const calculateMetrics: (processedFiles: ProcessedFile[], output: string, progressCallback: RepomixProgressCallback, config: RepomixConfigMerged, gitDiffResult: GitDiffResult | undefined, deps?: {
    calculateAllFileMetrics: (processedFiles: ProcessedFile[], tokenCounterEncoding: import("tiktoken").TiktokenEncoding, progressCallback: RepomixProgressCallback, deps?: {
        initTaskRunner: (numOfTasks: number) => ((task: import("./workers/fileMetricsWorker.js").FileMetricsTask) => Promise<any>) | null;
    }) => Promise<import("./workers/types.js").FileMetrics[]>;
    calculateOutputMetrics: (content: string, encoding: import("tiktoken").TiktokenEncoding, path?: string, deps?: {
        initTaskRunner: (numOfTasks: number) => ((task: import("./workers/outputMetricsWorker.js").OutputMetricsTask) => Promise<any>) | null;
    }) => Promise<number>;
}) => Promise<CalculateMetricsResult>;
//# sourceMappingURL=calculateMetrics.d.ts.map