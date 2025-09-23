import type { RepomixProgressCallback } from "../../shared/types.js";
import type { RawFile } from "../file/fileTypes.js";
import type { GitDiffResult } from "../file/gitDiff.js";
import type { SecurityCheckTask, SecurityCheckType } from "./workers/securityCheckWorker.js";
export interface SuspiciousFileResult {
    filePath: string;
    messages: string[];
    type: SecurityCheckType;
}
export declare const runSecurityCheck: (rawFiles: RawFile[], progressCallback?: RepomixProgressCallback, gitDiffResult?: GitDiffResult, deps?: {
    initTaskRunner: (numOfTasks: number) => ((task: SecurityCheckTask) => Promise<any>) | null;
}) => Promise<SuspiciousFileResult[]>;
//# sourceMappingURL=securityCheck.d.ts.map