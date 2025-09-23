import type { RepomixConfigMerged } from "../../config/configSchema.js";
import type { RepomixProgressCallback } from "../../shared/types.js";
import type { RawFile } from "./fileTypes.js";
import type { FileCollectTask } from "./workers/fileCollectWorker.js";
export declare const collectFiles: (filePaths: string[], rootDir: string, config: RepomixConfigMerged, progressCallback?: RepomixProgressCallback, deps?: {
    initTaskRunner: (numOfTasks: number) => ((task: FileCollectTask) => Promise<any>) | null;
}) => Promise<RawFile[]>;
//# sourceMappingURL=fileCollect.d.ts.map