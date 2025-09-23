import type { RepomixConfigMerged } from '../../config/configSchema.js';
import type { RepomixProgressCallback } from '../../shared/types.js';
import type { RawFile } from '../file/fileTypes.js';
import type { GitDiffResult } from '../file/gitDiff.js';
import { type SuspiciousFileResult } from './securityCheck.js';
export declare const validateFileSafety: (rawFiles: RawFile[], progressCallback: RepomixProgressCallback, config: RepomixConfigMerged, gitDiffResult?: GitDiffResult, deps?: {
    runSecurityCheck: (rawFiles: RawFile[], progressCallback?: RepomixProgressCallback, gitDiffResult?: GitDiffResult, deps?: {
        initTaskRunner: (numOfTasks: number) => ((task: import("./workers/securityCheckWorker.js").SecurityCheckTask) => Promise<any>) | null;
    }) => Promise<SuspiciousFileResult[]>;
    filterOutUntrustedFiles: (rawFiles: RawFile[], suspiciousFilesResults: SuspiciousFileResult[]) => RawFile[];
}) => Promise<{
    safeRawFiles: RawFile[];
    safeFilePaths: string[];
    suspiciousFilesResults: SuspiciousFileResult[];
    suspiciousGitDiffResults: SuspiciousFileResult[];
}>;
//# sourceMappingURL=validateFileSafety.d.ts.map