import type { RepomixConfigMerged } from "../../config/configSchema.js";
import type { RepomixProgressCallback } from "../../shared/types.js";
import { type FileManipulator } from "./fileManipulate.js";
import type { ProcessedFile, RawFile } from "./fileTypes.js";
import type { FileProcessTask } from "./workers/fileProcessWorker.js";
type GetFileManipulator = (filePath: string) => FileManipulator | null;
declare const initTaskRunner: (numOfTasks: number) => ((task: FileProcessTask) => Promise<any>) | null;
export declare const processFiles: (rawFiles: RawFile[], config: RepomixConfigMerged, progressCallback: RepomixProgressCallback, deps?: {
    initTaskRunner: typeof initTaskRunner;
    getFileManipulator: GetFileManipulator;
}) => Promise<ProcessedFile[]>;
export {};
//# sourceMappingURL=fileProcess.d.ts.map