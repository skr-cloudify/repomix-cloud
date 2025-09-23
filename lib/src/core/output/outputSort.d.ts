import type { RepomixConfigMerged } from '../../config/configSchema.js';
import type { ProcessedFile } from '../file/fileTypes.js';
export declare const sortOutputFiles: (files: ProcessedFile[], config: RepomixConfigMerged, deps?: {
    getFileChangeCount: (directory: string, maxCommits?: number, deps?: {
        execFileAsync: typeof import("child_process").execFile.__promisify__;
    }) => Promise<Record<string, number>>;
    isGitInstalled: (deps?: {
        execFileAsync: typeof import("child_process").execFile.__promisify__;
    }) => Promise<boolean>;
}) => Promise<ProcessedFile[]>;
//# sourceMappingURL=outputSort.d.ts.map