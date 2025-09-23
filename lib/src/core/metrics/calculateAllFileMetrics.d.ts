import type { TiktokenEncoding } from "tiktoken";
import type { RepomixProgressCallback } from "../../shared/types.js";
import type { ProcessedFile } from "../file/fileTypes.js";
import type { FileMetricsTask } from "./workers/fileMetricsWorker.js";
import type { FileMetrics } from "./workers/types.js";
export declare const calculateAllFileMetrics: (processedFiles: ProcessedFile[], tokenCounterEncoding: TiktokenEncoding, progressCallback: RepomixProgressCallback, deps?: {
    initTaskRunner: (numOfTasks: number) => ((task: FileMetricsTask) => Promise<any>) | null;
}) => Promise<FileMetrics[]>;
//# sourceMappingURL=calculateAllFileMetrics.d.ts.map