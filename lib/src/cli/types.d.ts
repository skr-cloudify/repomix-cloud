import type { OptionValues } from "commander";
import type { RepomixOutputStyle } from "../config/configSchema.js";
export interface CliOptions extends OptionValues {
    version?: boolean;
    output?: string;
    stdout?: boolean;
    style?: RepomixOutputStyle;
    parsableStyle?: boolean;
    compress?: boolean;
    outputShowLineNumbers?: boolean;
    copy?: boolean;
    fileSummary?: boolean;
    directoryStructure?: boolean;
    files?: boolean;
    removeComments?: boolean;
    removeEmptyLines?: boolean;
    headerText?: string;
    instructionFilePath?: string;
    includeEmptyDirectories?: boolean;
    gitSortByChanges?: boolean;
    includeDiffs?: boolean;
    include?: string;
    ignore?: string;
    gitignore?: boolean;
    defaultPatterns?: boolean;
    remote?: string;
    remoteBranch?: string;
    gitHubToken?: string;
    config?: string;
    init?: boolean;
    global?: boolean;
    securityCheck?: boolean;
    tokenCountEncoding?: string;
    mcp?: boolean;
    topFilesLen?: number;
    verbose?: boolean;
    quiet?: boolean;
}
//# sourceMappingURL=types.d.ts.map