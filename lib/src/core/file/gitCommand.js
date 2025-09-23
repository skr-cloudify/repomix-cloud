var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { RepomixError } from "../../shared/errorHandle.js";
import { logger } from "../../shared/logger.js";
const execFileAsync = promisify(execFile);
export const getFileChangeCount = (directory_1, ...args_1) => __awaiter(void 0, [directory_1, ...args_1], void 0, function* (directory, maxCommits = 100, deps = {
    execFileAsync,
}) {
    try {
        const result = yield deps.execFileAsync("git", [
            "-C",
            directory,
            "log",
            "--pretty=format:",
            "--name-only",
            "-n",
            maxCommits.toString(),
        ]);
        const fileChangeCounts = {};
        const lines = result.stdout.split("\n").filter(Boolean);
        for (const line of lines) {
            fileChangeCounts[line] = (fileChangeCounts[line] || 0) + 1;
        }
        return fileChangeCounts;
    }
    catch (error) {
        logger.trace("Failed to get file change counts:", error.message);
        return {};
    }
});
export const getWorkTreeDiff = (directory_1, ...args_1) => __awaiter(void 0, [directory_1, ...args_1], void 0, function* (directory, deps = {
    execFileAsync,
}) {
    return getDiff(directory, [], deps);
});
export const getStagedDiff = (directory_1, ...args_1) => __awaiter(void 0, [directory_1, ...args_1], void 0, function* (directory, deps = {
    execFileAsync,
}) {
    return getDiff(directory, ["--cached"], deps);
});
/**
 * Helper function to get git diff with common repository check and error handling
 */
const getDiff = (directory_1, options_1, ...args_1) => __awaiter(void 0, [directory_1, options_1, ...args_1], void 0, function* (directory, options, deps = {
    execFileAsync,
}) {
    try {
        // Check if the directory is a git repository
        const isGitRepo = yield isGitRepository(directory, deps);
        if (!isGitRepo) {
            logger.trace("Not a git repository, skipping diff generation");
            return "";
        }
        // Get the diff with provided options
        const result = yield deps.execFileAsync("git", [
            "-C",
            directory,
            "diff",
            "--no-color", // Avoid ANSI color codes
            ...options,
        ]);
        return result.stdout || "";
    }
    catch (error) {
        logger.trace("Failed to get git diff:", error.message);
        return "";
    }
});
export const isGitRepository = (directory_1, ...args_1) => __awaiter(void 0, [directory_1, ...args_1], void 0, function* (directory, deps = {
    execFileAsync,
}) {
    try {
        // Check if the directory is a git repository
        yield deps.execFileAsync("git", [
            "-C",
            directory,
            "rev-parse",
            "--is-inside-work-tree",
        ]);
        return true;
    }
    catch (error) {
        return false;
    }
});
export const isGitInstalled = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (deps = {
    execFileAsync,
}) {
    try {
        const result = yield deps.execFileAsync("git", ["--version"]);
        return !result.stderr;
    }
    catch (error) {
        logger.trace("Git is not installed:", error.message);
        return false;
    }
});
export const execGitShallowClone = (url_1, directory_1, remoteBranch_1, gitHubToken_1, ...args_1) => __awaiter(void 0, [url_1, directory_1, remoteBranch_1, gitHubToken_1, ...args_1], void 0, function* (url, directory, remoteBranch, gitHubToken, deps = {
    execFileAsync,
}) {
    // Check if the URL is valid
    try {
        new URL(url);
    }
    catch (error) {
        throw new RepomixError(`Invalid repository URL. Please provide a valid URL. url: ${url}`);
    }
    // Modify URL for GitHub authentication if token is provided
    let authenticatedUrl = url;
    if (gitHubToken && url.includes("github.com")) {
        try {
            const urlObj = new URL(url);
            // For GitHub, we need to use the token as username and empty password
            urlObj.username = gitHubToken;
            urlObj.password = "";
            authenticatedUrl = urlObj.toString();
            logger.trace("Using GitHub token for authentication (token hidden for security)");
        }
        catch (error) {
            logger.trace("Failed to add authentication to URL, falling back to original URL");
            authenticatedUrl = url;
        }
    }
    if (remoteBranch) {
        yield deps.execFileAsync("git", ["-C", directory, "init"]);
        yield deps.execFileAsync("git", [
            "-C",
            directory,
            "remote",
            "add",
            "origin",
            authenticatedUrl,
        ]);
        try {
            yield deps.execFileAsync("git", [
                "-C",
                directory,
                "fetch",
                "--depth",
                "1",
                "origin",
                remoteBranch,
            ]);
            yield deps.execFileAsync("git", [
                "-C",
                directory,
                "checkout",
                "FETCH_HEAD",
            ]);
        }
        catch (err) {
            // git fetch --depth 1 origin <short SHA> always throws "couldn't find remote ref" error
            const isRefNotfoundError = err instanceof Error &&
                err.message.includes(`couldn't find remote ref ${remoteBranch}`);
            if (!isRefNotfoundError) {
                // Rethrow error as nothing else we can do
                throw err;
            }
            // Short SHA detection - matches a hexadecimal string of 4 to 39 characters
            // If the string matches this regex, it MIGHT be a short SHA
            // If the string doesn't match, it is DEFINITELY NOT a short SHA
            const isNotShortSHA = !remoteBranch.match(/^[0-9a-f]{4,39}$/i);
            if (isNotShortSHA) {
                // Rethrow error as nothing else we can do
                throw err;
            }
            // Maybe the error is due to a short SHA, let's try again
            // Can't use --depth 1 here as we need to fetch the specific commit
            yield deps.execFileAsync("git", ["-C", directory, "fetch", "origin"]);
            yield deps.execFileAsync("git", [
                "-C",
                directory,
                "checkout",
                remoteBranch,
            ]);
        }
    }
    else {
        yield deps.execFileAsync("git", [
            "clone",
            "--depth",
            "1",
            authenticatedUrl,
            directory,
        ]);
    }
    // Clean up .git directory
    yield fs.rm(path.join(directory, ".git"), { recursive: true, force: true });
});
//# sourceMappingURL=gitCommand.js.map