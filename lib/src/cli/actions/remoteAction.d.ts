import type { CliOptions } from "../types.js";
import { type DefaultActionRunnerResult } from "./defaultAction.js";
export declare const runRemoteAction: (repoUrl: string, cliOptions: CliOptions, deps?: {
    isGitInstalled: (deps?: {
        execFileAsync: typeof import("child_process").execFile.__promisify__;
    }) => Promise<boolean>;
    execGitShallowClone: (url: string, directory: string, remoteBranch?: string, gitHubToken?: string, deps?: {
        execFileAsync: typeof import("child_process").execFile.__promisify__;
    }) => Promise<void>;
    runDefaultAction: (directories: string[], cwd: string, cliOptions: CliOptions) => Promise<DefaultActionRunnerResult>;
}) => Promise<DefaultActionRunnerResult>;
export declare const isValidShorthand: (remoteValue: string) => boolean;
export declare const parseRemoteValue: (remoteValue: string) => {
    repoUrl: string;
    remoteBranch: string | undefined;
};
export declare const isValidRemoteValue: (remoteValue: string) => boolean;
export declare const createTempDirectory: () => Promise<string>;
export declare const cloneRepository: (url: string, directory: string, remoteBranch?: string, gitHubToken?: string, deps?: {
    execGitShallowClone: (url: string, directory: string, remoteBranch?: string, gitHubToken?: string, deps?: {
        execFileAsync: typeof import("child_process").execFile.__promisify__;
    }) => Promise<void>;
}) => Promise<void>;
export declare const cleanupTempDirectory: (directory: string) => Promise<void>;
export declare const copyOutputToCurrentDirectory: (sourceDir: string, targetDir: string, outputFileName: string) => Promise<void>;
//# sourceMappingURL=remoteAction.d.ts.map