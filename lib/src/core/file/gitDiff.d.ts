import type { RepomixConfigMerged } from '../../config/configSchema.js';
export interface GitDiffResult {
    workTreeDiffContent: string;
    stagedDiffContent: string;
}
export declare const getGitDiffs: (rootDirs: string[], config: RepomixConfigMerged, deps?: {
    getWorkTreeDiff: (directory: string, deps?: {
        execFileAsync: typeof import("child_process").execFile.__promisify__;
    }) => Promise<string>;
    getStagedDiff: (directory: string, deps?: {
        execFileAsync: typeof import("child_process").execFile.__promisify__;
    }) => Promise<string>;
}) => Promise<GitDiffResult | undefined>;
//# sourceMappingURL=gitDiff.d.ts.map