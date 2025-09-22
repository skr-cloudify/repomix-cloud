import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { RepomixError } from "../../shared/errorHandle.js";
import { logger } from "../../shared/logger.js";

const execFileAsync = promisify(execFile);

export const getFileChangeCount = async (
  directory: string,
  maxCommits = 100,
  deps = {
    execFileAsync,
  }
): Promise<Record<string, number>> => {
  try {
    const result = await deps.execFileAsync("git", [
      "-C",
      directory,
      "log",
      "--pretty=format:",
      "--name-only",
      "-n",
      maxCommits.toString(),
    ]);

    const fileChangeCounts: Record<string, number> = {};
    const lines = result.stdout.split("\n").filter(Boolean);

    for (const line of lines) {
      fileChangeCounts[line] = (fileChangeCounts[line] || 0) + 1;
    }

    return fileChangeCounts;
  } catch (error) {
    logger.trace("Failed to get file change counts:", (error as Error).message);
    return {};
  }
};

export const getWorkTreeDiff = async (
  directory: string,
  deps = {
    execFileAsync,
  }
): Promise<string> => {
  return getDiff(directory, [], deps);
};

export const getStagedDiff = async (
  directory: string,
  deps = {
    execFileAsync,
  }
): Promise<string> => {
  return getDiff(directory, ["--cached"], deps);
};

/**
 * Helper function to get git diff with common repository check and error handling
 */
const getDiff = async (
  directory: string,
  options: string[],
  deps = {
    execFileAsync,
  }
): Promise<string> => {
  try {
    // Check if the directory is a git repository
    const isGitRepo = await isGitRepository(directory, deps);
    if (!isGitRepo) {
      logger.trace("Not a git repository, skipping diff generation");
      return "";
    }

    // Get the diff with provided options
    const result = await deps.execFileAsync("git", [
      "-C",
      directory,
      "diff",
      "--no-color", // Avoid ANSI color codes
      ...options,
    ]);

    return result.stdout || "";
  } catch (error) {
    logger.trace("Failed to get git diff:", (error as Error).message);
    return "";
  }
};

export const isGitRepository = async (
  directory: string,
  deps = {
    execFileAsync,
  }
): Promise<boolean> => {
  try {
    // Check if the directory is a git repository
    await deps.execFileAsync("git", [
      "-C",
      directory,
      "rev-parse",
      "--is-inside-work-tree",
    ]);
    return true;
  } catch (error) {
    return false;
  }
};

export const isGitInstalled = async (
  deps = {
    execFileAsync,
  }
) => {
  try {
    const result = await deps.execFileAsync("git", ["--version"]);
    return !result.stderr;
  } catch (error) {
    logger.trace("Git is not installed:", (error as Error).message);
    return false;
  }
};

export const execGitShallowClone = async (
  url: string,
  directory: string,
  remoteBranch?: string,
  gitHubToken?: string,
  deps = {
    execFileAsync,
  }
) => {
  // Check if the URL is valid
  try {
    new URL(url);
  } catch (error) {
    throw new RepomixError(
      `Invalid repository URL. Please provide a valid URL. url: ${url}`
    );
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
      logger.trace(
        "Using GitHub token for authentication (token hidden for security)"
      );
    } catch (error) {
      logger.trace(
        "Failed to add authentication to URL, falling back to original URL"
      );
      authenticatedUrl = url;
    }
  }

  if (remoteBranch) {
    await deps.execFileAsync("git", ["-C", directory, "init"]);
    await deps.execFileAsync("git", [
      "-C",
      directory,
      "remote",
      "add",
      "origin",
      authenticatedUrl,
    ]);
    try {
      await deps.execFileAsync("git", [
        "-C",
        directory,
        "fetch",
        "--depth",
        "1",
        "origin",
        remoteBranch,
      ]);
      await deps.execFileAsync("git", [
        "-C",
        directory,
        "checkout",
        "FETCH_HEAD",
      ]);
    } catch (err: unknown) {
      // git fetch --depth 1 origin <short SHA> always throws "couldn't find remote ref" error
      const isRefNotfoundError =
        err instanceof Error &&
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
      await deps.execFileAsync("git", ["-C", directory, "fetch", "origin"]);
      await deps.execFileAsync("git", [
        "-C",
        directory,
        "checkout",
        remoteBranch,
      ]);
    }
  } else {
    await deps.execFileAsync("git", [
      "clone",
      "--depth",
      "1",
      authenticatedUrl,
      directory,
    ]);
  }

  // Clean up .git directory
  await fs.rm(path.join(directory, ".git"), { recursive: true, force: true });
};
