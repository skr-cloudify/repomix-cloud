import { execFile } from "node:child_process";
export declare const getFileChangeCount: (directory: string, maxCommits?: number, deps?: {
    execFileAsync: typeof execFile.__promisify__;
}) => Promise<Record<string, number>>;
export declare const getWorkTreeDiff: (directory: string, deps?: {
    execFileAsync: typeof execFile.__promisify__;
}) => Promise<string>;
export declare const getStagedDiff: (directory: string, deps?: {
    execFileAsync: typeof execFile.__promisify__;
}) => Promise<string>;
export declare const isGitRepository: (directory: string, deps?: {
    execFileAsync: typeof execFile.__promisify__;
}) => Promise<boolean>;
export declare const isGitInstalled: (deps?: {
    execFileAsync: typeof execFile.__promisify__;
}) => Promise<boolean>;
export declare const execGitShallowClone: (url: string, directory: string, remoteBranch?: string, gitHubToken?: string, deps?: {
    execFileAsync: typeof execFile.__promisify__;
}) => Promise<void>;
//# sourceMappingURL=gitCommand.d.ts.map