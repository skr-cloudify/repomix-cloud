var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import GitUrlParse from "git-url-parse";
import pc from "picocolors";
import { execGitShallowClone, isGitInstalled, } from "../../core/file/gitCommand.js";
import { RepomixError } from "../../shared/errorHandle.js";
import { logger } from "../../shared/logger.js";
import { Spinner } from "../cliSpinner.js";
import { runDefaultAction, } from "./defaultAction.js";
export const runRemoteAction = (repoUrl_1, cliOptions_1, ...args_1) => __awaiter(void 0, [repoUrl_1, cliOptions_1, ...args_1], void 0, function* (repoUrl, cliOptions, deps = {
    isGitInstalled,
    execGitShallowClone,
    runDefaultAction,
}) {
    if (!(yield deps.isGitInstalled())) {
        throw new RepomixError("Git is not installed or not in the system PATH.");
    }
    const parsedFields = parseRemoteValue(repoUrl);
    const spinner = new Spinner("Cloning repository...", cliOptions);
    const tempDirPath = yield createTempDirectory();
    let result;
    // Check for GitHub token from CLI options or environment variable
    const gitHubToken = cliOptions.gitHubToken || process.env.GITHUB_TOKEN;
    if (gitHubToken && parsedFields.repoUrl.includes("github.com")) {
        logger.trace("GitHub token provided for private repository access");
    }
    try {
        spinner.start();
        // Clone the repository
        yield cloneRepository(parsedFields.repoUrl, tempDirPath, cliOptions.remoteBranch || parsedFields.remoteBranch, gitHubToken, {
            execGitShallowClone: deps.execGitShallowClone,
        });
        spinner.succeed("Repository cloned successfully!");
        logger.log("");
        // Run the default action on the cloned repository
        result = yield deps.runDefaultAction([tempDirPath], tempDirPath, cliOptions);
        yield copyOutputToCurrentDirectory(tempDirPath, process.cwd(), result.config.output.filePath);
    }
    catch (error) {
        spinner.fail("Error during repository cloning. cleanup...");
        throw error;
    }
    finally {
        // Cleanup the temporary directory
        yield cleanupTempDirectory(tempDirPath);
    }
    return result;
});
// Check the short form of the GitHub URL. e.g. yamadashy/repomix
const VALID_NAME_PATTERN = "[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?";
const validShorthandRegex = new RegExp(`^${VALID_NAME_PATTERN}/${VALID_NAME_PATTERN}$`);
export const isValidShorthand = (remoteValue) => {
    return validShorthandRegex.test(remoteValue);
};
export const parseRemoteValue = (remoteValue) => {
    if (isValidShorthand(remoteValue)) {
        logger.trace(`Formatting GitHub shorthand: ${remoteValue}`);
        return {
            repoUrl: `https://github.com/${remoteValue}.git`,
            remoteBranch: undefined,
        };
    }
    try {
        const parsedFields = GitUrlParse(remoteValue);
        // This will make parsedFields.toString() automatically append '.git' to the returned url
        parsedFields.git_suffix = true;
        const ownerSlashRepo = parsedFields.full_name.split("/").length > 1
            ? parsedFields.full_name.split("/").slice(-2).join("/")
            : "";
        if (ownerSlashRepo !== "" && !isValidShorthand(ownerSlashRepo)) {
            throw new RepomixError("Invalid owner/repo in repo URL");
        }
        const repoUrl = parsedFields.toString(parsedFields.protocol);
        if (parsedFields.ref) {
            return {
                repoUrl: repoUrl,
                remoteBranch: parsedFields.filepath
                    ? `${parsedFields.ref}/${parsedFields.filepath}`
                    : parsedFields.ref,
            };
        }
        if (parsedFields.commit) {
            return {
                repoUrl: repoUrl,
                remoteBranch: parsedFields.commit,
            };
        }
        return {
            repoUrl: repoUrl,
            remoteBranch: undefined,
        };
    }
    catch (error) {
        throw new RepomixError("Invalid remote repository URL or repository shorthand (owner/repo)");
    }
};
export const isValidRemoteValue = (remoteValue) => {
    try {
        parseRemoteValue(remoteValue);
        return true;
    }
    catch (error) {
        return false;
    }
};
export const createTempDirectory = () => __awaiter(void 0, void 0, void 0, function* () {
    const tempDir = yield fs.mkdtemp(path.join(os.tmpdir(), "repomix-"));
    logger.trace(`Created temporary directory. (path: ${pc.dim(tempDir)})`);
    return tempDir;
});
export const cloneRepository = (url_1, directory_1, remoteBranch_1, gitHubToken_1, ...args_1) => __awaiter(void 0, [url_1, directory_1, remoteBranch_1, gitHubToken_1, ...args_1], void 0, function* (url, directory, remoteBranch, gitHubToken, deps = {
    execGitShallowClone,
}) {
    logger.log(`Clone repository: ${url} to temporary directory. ${pc.dim(`path: ${directory}`)}`);
    logger.log("");
    try {
        yield deps.execGitShallowClone(url, directory, remoteBranch, gitHubToken);
    }
    catch (error) {
        throw new RepomixError(`Failed to clone repository: ${error.message}`);
    }
});
export const cleanupTempDirectory = (directory) => __awaiter(void 0, void 0, void 0, function* () {
    logger.trace(`Cleaning up temporary directory: ${directory}`);
    yield fs.rm(directory, { recursive: true, force: true });
});
export const copyOutputToCurrentDirectory = (sourceDir, targetDir, outputFileName) => __awaiter(void 0, void 0, void 0, function* () {
    const sourcePath = path.resolve(sourceDir, outputFileName);
    const targetPath = path.resolve(targetDir, outputFileName);
    try {
        logger.trace(`Copying output file from: ${sourcePath} to: ${targetPath}`);
        // Create target directory if it doesn't exist
        yield fs.mkdir(path.dirname(targetPath), { recursive: true });
        yield fs.copyFile(sourcePath, targetPath);
    }
    catch (error) {
        throw new RepomixError(`Failed to copy output file: ${error.message}`);
    }
});
//# sourceMappingURL=remoteAction.js.map