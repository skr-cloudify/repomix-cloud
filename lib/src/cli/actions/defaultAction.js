var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "node:path";
import { loadFileConfig, mergeConfigs } from "../../config/configLoad.js";
import { repomixConfigCliSchema, } from "../../config/configSchema.js";
import { pack } from "../../core/packager.js";
import { rethrowValidationErrorIfZodError } from "../../shared/errorHandle.js";
import { logger } from "../../shared/logger.js";
import { splitPatterns } from "../../shared/patternUtils.js";
import { printCompletion, printSecurityCheck, printSummary, printTopFiles, } from "../cliPrint.js";
import { Spinner } from "../cliSpinner.js";
import { runMigrationAction } from "./migrationAction.js";
export const runDefaultAction = (directories, cwd, cliOptions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    logger.trace("Loaded CLI options:", cliOptions);
    // Run migration before loading config
    yield runMigrationAction(cwd);
    // Load the config file
    const fileConfig = yield loadFileConfig(cwd, (_a = cliOptions.config) !== null && _a !== void 0 ? _a : null);
    logger.trace("Loaded file config:", fileConfig);
    // Parse the CLI options into a config
    const cliConfig = buildCliConfig(cliOptions);
    logger.trace("CLI config:", cliConfig);
    // Merge default, file, and CLI configs
    const config = mergeConfigs(cwd, fileConfig, cliConfig);
    logger.trace("Merged config:", config);
    const targetPaths = directories.map((directory) => path.resolve(cwd, directory));
    const spinner = new Spinner("Packing files...", cliOptions);
    spinner.start();
    let packResult;
    try {
        packResult = yield pack(targetPaths, config, (message) => {
            spinner.update(message);
        });
    }
    catch (error) {
        spinner.fail("Error during packing");
        throw error;
    }
    spinner.succeed("Packing completed successfully!");
    logger.log("");
    if (config.output.topFilesLength > 0) {
        printTopFiles(packResult.fileCharCounts, packResult.fileTokenCounts, config.output.topFilesLength);
        logger.log("");
    }
    printSecurityCheck(cwd, packResult.suspiciousFilesResults, packResult.suspiciousGitDiffResults, config);
    logger.log("");
    printSummary(packResult, config);
    logger.log("");
    printCompletion();
    return {
        packResult,
        config,
    };
});
/**
 * Builds CLI configuration from command-line options.
 *
 * Note: Due to Commander.js behavior with --no-* flags:
 * - When --no-* flags are used (e.g., --no-file-summary), the options explicitly become false
 * - When no flag is specified, Commander defaults to true (e.g., options.fileSummary === true)
 * - For --no-* flags, we only apply the setting when it's explicitly false to respect config file values
 * - This allows the config file to maintain control unless explicitly overridden by CLI
 */
export const buildCliConfig = (options) => {
    var _a, _b;
    const cliConfig = {};
    if (options.output) {
        cliConfig.output = { filePath: options.output };
    }
    if (options.include) {
        cliConfig.include = splitPatterns(options.include);
    }
    if (options.ignore) {
        cliConfig.ignore = { customPatterns: splitPatterns(options.ignore) };
    }
    // Only apply gitignore setting if explicitly set to false
    if (options.gitignore === false) {
        cliConfig.ignore = Object.assign(Object.assign({}, cliConfig.ignore), { useGitignore: options.gitignore });
    }
    // Only apply defaultPatterns setting if explicitly set to false
    if (options.defaultPatterns === false) {
        cliConfig.ignore = Object.assign(Object.assign({}, cliConfig.ignore), { useDefaultPatterns: options.defaultPatterns });
    }
    if (options.topFilesLen !== undefined) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { topFilesLength: options.topFilesLen });
    }
    if (options.outputShowLineNumbers !== undefined) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { showLineNumbers: options.outputShowLineNumbers });
    }
    if (options.copy) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { copyToClipboard: options.copy });
    }
    if (options.style) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { style: options.style.toLowerCase() });
    }
    if (options.parsableStyle !== undefined) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { parsableStyle: options.parsableStyle });
    }
    if (options.stdout) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { stdout: true });
    }
    // Only apply securityCheck setting if explicitly set to false
    if (options.securityCheck === false) {
        cliConfig.security = { enableSecurityCheck: options.securityCheck };
    }
    // Only apply fileSummary setting if explicitly set to false
    if (options.fileSummary === false) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { fileSummary: false });
    }
    // Only apply directoryStructure setting if explicitly set to false
    if (options.directoryStructure === false) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { directoryStructure: false });
    }
    // Only apply files setting if explicitly set to false
    if (options.files === false) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { files: false });
    }
    if (options.removeComments !== undefined) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { removeComments: options.removeComments });
    }
    if (options.removeEmptyLines !== undefined) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { removeEmptyLines: options.removeEmptyLines });
    }
    if (options.headerText !== undefined) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { headerText: options.headerText });
    }
    if (options.compress !== undefined) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { compress: options.compress });
    }
    if (options.tokenCountEncoding) {
        cliConfig.tokenCount = { encoding: options.tokenCountEncoding };
    }
    if (options.instructionFilePath) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { instructionFilePath: options.instructionFilePath });
    }
    if (options.includeEmptyDirectories) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { includeEmptyDirectories: options.includeEmptyDirectories });
    }
    // Only apply gitSortByChanges setting if explicitly set to false
    if (options.gitSortByChanges === false) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { git: Object.assign(Object.assign({}, (_a = cliConfig.output) === null || _a === void 0 ? void 0 : _a.git), { sortByChanges: false }) });
    }
    if (options.includeDiffs) {
        cliConfig.output = Object.assign(Object.assign({}, cliConfig.output), { git: Object.assign(Object.assign({}, (_b = cliConfig.output) === null || _b === void 0 ? void 0 : _b.git), { includeDiffs: true }) });
    }
    if (options.gitHubToken) {
        cliConfig.remote = Object.assign(Object.assign({}, cliConfig.remote), { gitHubToken: options.gitHubToken });
    }
    try {
        return repomixConfigCliSchema.parse(cliConfig);
    }
    catch (error) {
        rethrowValidationErrorIfZodError(error, "Invalid cli arguments");
        throw error;
    }
};
//# sourceMappingURL=defaultAction.js.map