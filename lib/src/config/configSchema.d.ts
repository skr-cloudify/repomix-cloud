import { z } from "zod";
export declare const repomixOutputStyleSchema: z.ZodEnum<["xml", "markdown", "plain"]>;
export type RepomixOutputStyle = z.infer<typeof repomixOutputStyleSchema>;
export declare const defaultFilePathMap: Record<RepomixOutputStyle, string>;
export declare const repomixConfigBaseSchema: z.ZodObject<{
    input: z.ZodOptional<z.ZodObject<{
        maxFileSize: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFileSize?: number | undefined;
    }, {
        maxFileSize?: number | undefined;
    }>>;
    output: z.ZodOptional<z.ZodObject<{
        filePath: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["xml", "markdown", "plain"]>>;
        parsableStyle: z.ZodOptional<z.ZodBoolean>;
        headerText: z.ZodOptional<z.ZodString>;
        instructionFilePath: z.ZodOptional<z.ZodString>;
        fileSummary: z.ZodOptional<z.ZodBoolean>;
        directoryStructure: z.ZodOptional<z.ZodBoolean>;
        files: z.ZodOptional<z.ZodBoolean>;
        removeComments: z.ZodOptional<z.ZodBoolean>;
        removeEmptyLines: z.ZodOptional<z.ZodBoolean>;
        compress: z.ZodOptional<z.ZodBoolean>;
        topFilesLength: z.ZodOptional<z.ZodNumber>;
        showLineNumbers: z.ZodOptional<z.ZodBoolean>;
        copyToClipboard: z.ZodOptional<z.ZodBoolean>;
        includeEmptyDirectories: z.ZodOptional<z.ZodBoolean>;
        git: z.ZodOptional<z.ZodObject<{
            sortByChanges: z.ZodOptional<z.ZodBoolean>;
            sortByChangesMaxCommits: z.ZodOptional<z.ZodNumber>;
            includeDiffs: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }>>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ignore: z.ZodOptional<z.ZodObject<{
        useGitignore: z.ZodOptional<z.ZodBoolean>;
        useDefaultPatterns: z.ZodOptional<z.ZodBoolean>;
        customPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }>>;
    security: z.ZodOptional<z.ZodObject<{
        enableSecurityCheck: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enableSecurityCheck?: boolean | undefined;
    }, {
        enableSecurityCheck?: boolean | undefined;
    }>>;
    tokenCount: z.ZodOptional<z.ZodObject<{
        encoding: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        encoding?: string | undefined;
    }, {
        encoding?: string | undefined;
    }>>;
    remote: z.ZodOptional<z.ZodObject<{
        gitHubToken: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        gitHubToken?: string | undefined;
    }, {
        gitHubToken?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}>;
export declare const repomixConfigDefaultSchema: z.ZodObject<{
    input: z.ZodDefault<z.ZodObject<{
        maxFileSize: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFileSize: number;
    }, {
        maxFileSize?: number | undefined;
    }>>;
    output: z.ZodDefault<z.ZodObject<{
        filePath: z.ZodDefault<z.ZodString>;
        style: z.ZodDefault<z.ZodEnum<["xml", "markdown", "plain"]>>;
        parsableStyle: z.ZodDefault<z.ZodBoolean>;
        headerText: z.ZodOptional<z.ZodString>;
        instructionFilePath: z.ZodOptional<z.ZodString>;
        fileSummary: z.ZodDefault<z.ZodBoolean>;
        directoryStructure: z.ZodDefault<z.ZodBoolean>;
        files: z.ZodDefault<z.ZodBoolean>;
        removeComments: z.ZodDefault<z.ZodBoolean>;
        removeEmptyLines: z.ZodDefault<z.ZodBoolean>;
        compress: z.ZodDefault<z.ZodBoolean>;
        topFilesLength: z.ZodDefault<z.ZodNumber>;
        showLineNumbers: z.ZodDefault<z.ZodBoolean>;
        copyToClipboard: z.ZodDefault<z.ZodBoolean>;
        includeEmptyDirectories: z.ZodOptional<z.ZodBoolean>;
        git: z.ZodDefault<z.ZodObject<{
            sortByChanges: z.ZodDefault<z.ZodBoolean>;
            sortByChangesMaxCommits: z.ZodDefault<z.ZodNumber>;
            includeDiffs: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            sortByChanges: boolean;
            sortByChangesMaxCommits: number;
            includeDiffs: boolean;
        }, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filePath: string;
        style: "xml" | "markdown" | "plain";
        parsableStyle: boolean;
        fileSummary: boolean;
        directoryStructure: boolean;
        files: boolean;
        removeComments: boolean;
        removeEmptyLines: boolean;
        compress: boolean;
        topFilesLength: number;
        showLineNumbers: boolean;
        copyToClipboard: boolean;
        git: {
            sortByChanges: boolean;
            sortByChangesMaxCommits: number;
            includeDiffs: boolean;
        };
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        includeEmptyDirectories?: boolean | undefined;
    }, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }>>;
    include: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    ignore: z.ZodDefault<z.ZodObject<{
        useGitignore: z.ZodDefault<z.ZodBoolean>;
        useDefaultPatterns: z.ZodDefault<z.ZodBoolean>;
        customPatterns: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        useGitignore: boolean;
        useDefaultPatterns: boolean;
        customPatterns: string[];
    }, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }>>;
    security: z.ZodDefault<z.ZodObject<{
        enableSecurityCheck: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enableSecurityCheck: boolean;
    }, {
        enableSecurityCheck?: boolean | undefined;
    }>>;
    tokenCount: z.ZodDefault<z.ZodObject<{
        encoding: z.ZodEffects<z.ZodDefault<z.ZodString>, "o200k_base" | "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base", string | undefined>;
    }, "strip", z.ZodTypeAny, {
        encoding: "o200k_base" | "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base";
    }, {
        encoding?: string | undefined;
    }>>;
    remote: z.ZodDefault<z.ZodObject<{
        gitHubToken: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        gitHubToken?: string | undefined;
    }, {
        gitHubToken?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    input: {
        maxFileSize: number;
    };
    output: {
        filePath: string;
        style: "xml" | "markdown" | "plain";
        parsableStyle: boolean;
        fileSummary: boolean;
        directoryStructure: boolean;
        files: boolean;
        removeComments: boolean;
        removeEmptyLines: boolean;
        compress: boolean;
        topFilesLength: number;
        showLineNumbers: boolean;
        copyToClipboard: boolean;
        git: {
            sortByChanges: boolean;
            sortByChangesMaxCommits: number;
            includeDiffs: boolean;
        };
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        includeEmptyDirectories?: boolean | undefined;
    };
    include: string[];
    ignore: {
        useGitignore: boolean;
        useDefaultPatterns: boolean;
        customPatterns: string[];
    };
    security: {
        enableSecurityCheck: boolean;
    };
    tokenCount: {
        encoding: "o200k_base" | "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base";
    };
    remote: {
        gitHubToken?: string | undefined;
    };
}, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}>;
export declare const repomixConfigFileSchema: z.ZodObject<{
    input: z.ZodOptional<z.ZodObject<{
        maxFileSize: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFileSize?: number | undefined;
    }, {
        maxFileSize?: number | undefined;
    }>>;
    output: z.ZodOptional<z.ZodObject<{
        filePath: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["xml", "markdown", "plain"]>>;
        parsableStyle: z.ZodOptional<z.ZodBoolean>;
        headerText: z.ZodOptional<z.ZodString>;
        instructionFilePath: z.ZodOptional<z.ZodString>;
        fileSummary: z.ZodOptional<z.ZodBoolean>;
        directoryStructure: z.ZodOptional<z.ZodBoolean>;
        files: z.ZodOptional<z.ZodBoolean>;
        removeComments: z.ZodOptional<z.ZodBoolean>;
        removeEmptyLines: z.ZodOptional<z.ZodBoolean>;
        compress: z.ZodOptional<z.ZodBoolean>;
        topFilesLength: z.ZodOptional<z.ZodNumber>;
        showLineNumbers: z.ZodOptional<z.ZodBoolean>;
        copyToClipboard: z.ZodOptional<z.ZodBoolean>;
        includeEmptyDirectories: z.ZodOptional<z.ZodBoolean>;
        git: z.ZodOptional<z.ZodObject<{
            sortByChanges: z.ZodOptional<z.ZodBoolean>;
            sortByChangesMaxCommits: z.ZodOptional<z.ZodNumber>;
            includeDiffs: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }>>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ignore: z.ZodOptional<z.ZodObject<{
        useGitignore: z.ZodOptional<z.ZodBoolean>;
        useDefaultPatterns: z.ZodOptional<z.ZodBoolean>;
        customPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }>>;
    security: z.ZodOptional<z.ZodObject<{
        enableSecurityCheck: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enableSecurityCheck?: boolean | undefined;
    }, {
        enableSecurityCheck?: boolean | undefined;
    }>>;
    tokenCount: z.ZodOptional<z.ZodObject<{
        encoding: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        encoding?: string | undefined;
    }, {
        encoding?: string | undefined;
    }>>;
    remote: z.ZodOptional<z.ZodObject<{
        gitHubToken: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        gitHubToken?: string | undefined;
    }, {
        gitHubToken?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}>;
export declare const repomixConfigCliSchema: z.ZodIntersection<z.ZodObject<{
    input: z.ZodOptional<z.ZodObject<{
        maxFileSize: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFileSize?: number | undefined;
    }, {
        maxFileSize?: number | undefined;
    }>>;
    output: z.ZodOptional<z.ZodObject<{
        filePath: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["xml", "markdown", "plain"]>>;
        parsableStyle: z.ZodOptional<z.ZodBoolean>;
        headerText: z.ZodOptional<z.ZodString>;
        instructionFilePath: z.ZodOptional<z.ZodString>;
        fileSummary: z.ZodOptional<z.ZodBoolean>;
        directoryStructure: z.ZodOptional<z.ZodBoolean>;
        files: z.ZodOptional<z.ZodBoolean>;
        removeComments: z.ZodOptional<z.ZodBoolean>;
        removeEmptyLines: z.ZodOptional<z.ZodBoolean>;
        compress: z.ZodOptional<z.ZodBoolean>;
        topFilesLength: z.ZodOptional<z.ZodNumber>;
        showLineNumbers: z.ZodOptional<z.ZodBoolean>;
        copyToClipboard: z.ZodOptional<z.ZodBoolean>;
        includeEmptyDirectories: z.ZodOptional<z.ZodBoolean>;
        git: z.ZodOptional<z.ZodObject<{
            sortByChanges: z.ZodOptional<z.ZodBoolean>;
            sortByChangesMaxCommits: z.ZodOptional<z.ZodNumber>;
            includeDiffs: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }>>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ignore: z.ZodOptional<z.ZodObject<{
        useGitignore: z.ZodOptional<z.ZodBoolean>;
        useDefaultPatterns: z.ZodOptional<z.ZodBoolean>;
        customPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }>>;
    security: z.ZodOptional<z.ZodObject<{
        enableSecurityCheck: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enableSecurityCheck?: boolean | undefined;
    }, {
        enableSecurityCheck?: boolean | undefined;
    }>>;
    tokenCount: z.ZodOptional<z.ZodObject<{
        encoding: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        encoding?: string | undefined;
    }, {
        encoding?: string | undefined;
    }>>;
    remote: z.ZodOptional<z.ZodObject<{
        gitHubToken: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        gitHubToken?: string | undefined;
    }, {
        gitHubToken?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    output: z.ZodOptional<z.ZodObject<{
        stdout: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        stdout?: boolean | undefined;
    }, {
        stdout?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    output?: {
        stdout?: boolean | undefined;
    } | undefined;
}, {
    output?: {
        stdout?: boolean | undefined;
    } | undefined;
}>>;
export declare const repomixConfigMergedSchema: z.ZodIntersection<z.ZodIntersection<z.ZodIntersection<z.ZodObject<{
    input: z.ZodDefault<z.ZodObject<{
        maxFileSize: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFileSize: number;
    }, {
        maxFileSize?: number | undefined;
    }>>;
    output: z.ZodDefault<z.ZodObject<{
        filePath: z.ZodDefault<z.ZodString>;
        style: z.ZodDefault<z.ZodEnum<["xml", "markdown", "plain"]>>;
        parsableStyle: z.ZodDefault<z.ZodBoolean>;
        headerText: z.ZodOptional<z.ZodString>;
        instructionFilePath: z.ZodOptional<z.ZodString>;
        fileSummary: z.ZodDefault<z.ZodBoolean>;
        directoryStructure: z.ZodDefault<z.ZodBoolean>;
        files: z.ZodDefault<z.ZodBoolean>;
        removeComments: z.ZodDefault<z.ZodBoolean>;
        removeEmptyLines: z.ZodDefault<z.ZodBoolean>;
        compress: z.ZodDefault<z.ZodBoolean>;
        topFilesLength: z.ZodDefault<z.ZodNumber>;
        showLineNumbers: z.ZodDefault<z.ZodBoolean>;
        copyToClipboard: z.ZodDefault<z.ZodBoolean>;
        includeEmptyDirectories: z.ZodOptional<z.ZodBoolean>;
        git: z.ZodDefault<z.ZodObject<{
            sortByChanges: z.ZodDefault<z.ZodBoolean>;
            sortByChangesMaxCommits: z.ZodDefault<z.ZodNumber>;
            includeDiffs: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            sortByChanges: boolean;
            sortByChangesMaxCommits: number;
            includeDiffs: boolean;
        }, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filePath: string;
        style: "xml" | "markdown" | "plain";
        parsableStyle: boolean;
        fileSummary: boolean;
        directoryStructure: boolean;
        files: boolean;
        removeComments: boolean;
        removeEmptyLines: boolean;
        compress: boolean;
        topFilesLength: number;
        showLineNumbers: boolean;
        copyToClipboard: boolean;
        git: {
            sortByChanges: boolean;
            sortByChangesMaxCommits: number;
            includeDiffs: boolean;
        };
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        includeEmptyDirectories?: boolean | undefined;
    }, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }>>;
    include: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    ignore: z.ZodDefault<z.ZodObject<{
        useGitignore: z.ZodDefault<z.ZodBoolean>;
        useDefaultPatterns: z.ZodDefault<z.ZodBoolean>;
        customPatterns: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        useGitignore: boolean;
        useDefaultPatterns: boolean;
        customPatterns: string[];
    }, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }>>;
    security: z.ZodDefault<z.ZodObject<{
        enableSecurityCheck: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enableSecurityCheck: boolean;
    }, {
        enableSecurityCheck?: boolean | undefined;
    }>>;
    tokenCount: z.ZodDefault<z.ZodObject<{
        encoding: z.ZodEffects<z.ZodDefault<z.ZodString>, "o200k_base" | "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base", string | undefined>;
    }, "strip", z.ZodTypeAny, {
        encoding: "o200k_base" | "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base";
    }, {
        encoding?: string | undefined;
    }>>;
    remote: z.ZodDefault<z.ZodObject<{
        gitHubToken: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        gitHubToken?: string | undefined;
    }, {
        gitHubToken?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    input: {
        maxFileSize: number;
    };
    output: {
        filePath: string;
        style: "xml" | "markdown" | "plain";
        parsableStyle: boolean;
        fileSummary: boolean;
        directoryStructure: boolean;
        files: boolean;
        removeComments: boolean;
        removeEmptyLines: boolean;
        compress: boolean;
        topFilesLength: number;
        showLineNumbers: boolean;
        copyToClipboard: boolean;
        git: {
            sortByChanges: boolean;
            sortByChangesMaxCommits: number;
            includeDiffs: boolean;
        };
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        includeEmptyDirectories?: boolean | undefined;
    };
    include: string[];
    ignore: {
        useGitignore: boolean;
        useDefaultPatterns: boolean;
        customPatterns: string[];
    };
    security: {
        enableSecurityCheck: boolean;
    };
    tokenCount: {
        encoding: "o200k_base" | "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base";
    };
    remote: {
        gitHubToken?: string | undefined;
    };
}, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    input: z.ZodOptional<z.ZodObject<{
        maxFileSize: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFileSize?: number | undefined;
    }, {
        maxFileSize?: number | undefined;
    }>>;
    output: z.ZodOptional<z.ZodObject<{
        filePath: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["xml", "markdown", "plain"]>>;
        parsableStyle: z.ZodOptional<z.ZodBoolean>;
        headerText: z.ZodOptional<z.ZodString>;
        instructionFilePath: z.ZodOptional<z.ZodString>;
        fileSummary: z.ZodOptional<z.ZodBoolean>;
        directoryStructure: z.ZodOptional<z.ZodBoolean>;
        files: z.ZodOptional<z.ZodBoolean>;
        removeComments: z.ZodOptional<z.ZodBoolean>;
        removeEmptyLines: z.ZodOptional<z.ZodBoolean>;
        compress: z.ZodOptional<z.ZodBoolean>;
        topFilesLength: z.ZodOptional<z.ZodNumber>;
        showLineNumbers: z.ZodOptional<z.ZodBoolean>;
        copyToClipboard: z.ZodOptional<z.ZodBoolean>;
        includeEmptyDirectories: z.ZodOptional<z.ZodBoolean>;
        git: z.ZodOptional<z.ZodObject<{
            sortByChanges: z.ZodOptional<z.ZodBoolean>;
            sortByChangesMaxCommits: z.ZodOptional<z.ZodNumber>;
            includeDiffs: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }>>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ignore: z.ZodOptional<z.ZodObject<{
        useGitignore: z.ZodOptional<z.ZodBoolean>;
        useDefaultPatterns: z.ZodOptional<z.ZodBoolean>;
        customPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }>>;
    security: z.ZodOptional<z.ZodObject<{
        enableSecurityCheck: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enableSecurityCheck?: boolean | undefined;
    }, {
        enableSecurityCheck?: boolean | undefined;
    }>>;
    tokenCount: z.ZodOptional<z.ZodObject<{
        encoding: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        encoding?: string | undefined;
    }, {
        encoding?: string | undefined;
    }>>;
    remote: z.ZodOptional<z.ZodObject<{
        gitHubToken: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        gitHubToken?: string | undefined;
    }, {
        gitHubToken?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}>>, z.ZodIntersection<z.ZodObject<{
    input: z.ZodOptional<z.ZodObject<{
        maxFileSize: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFileSize?: number | undefined;
    }, {
        maxFileSize?: number | undefined;
    }>>;
    output: z.ZodOptional<z.ZodObject<{
        filePath: z.ZodOptional<z.ZodString>;
        style: z.ZodOptional<z.ZodEnum<["xml", "markdown", "plain"]>>;
        parsableStyle: z.ZodOptional<z.ZodBoolean>;
        headerText: z.ZodOptional<z.ZodString>;
        instructionFilePath: z.ZodOptional<z.ZodString>;
        fileSummary: z.ZodOptional<z.ZodBoolean>;
        directoryStructure: z.ZodOptional<z.ZodBoolean>;
        files: z.ZodOptional<z.ZodBoolean>;
        removeComments: z.ZodOptional<z.ZodBoolean>;
        removeEmptyLines: z.ZodOptional<z.ZodBoolean>;
        compress: z.ZodOptional<z.ZodBoolean>;
        topFilesLength: z.ZodOptional<z.ZodNumber>;
        showLineNumbers: z.ZodOptional<z.ZodBoolean>;
        copyToClipboard: z.ZodOptional<z.ZodBoolean>;
        includeEmptyDirectories: z.ZodOptional<z.ZodBoolean>;
        git: z.ZodOptional<z.ZodObject<{
            sortByChanges: z.ZodOptional<z.ZodBoolean>;
            sortByChangesMaxCommits: z.ZodOptional<z.ZodNumber>;
            includeDiffs: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }, {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }, {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    }>>;
    include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ignore: z.ZodOptional<z.ZodObject<{
        useGitignore: z.ZodOptional<z.ZodBoolean>;
        useDefaultPatterns: z.ZodOptional<z.ZodBoolean>;
        customPatterns: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }, {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    }>>;
    security: z.ZodOptional<z.ZodObject<{
        enableSecurityCheck: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        enableSecurityCheck?: boolean | undefined;
    }, {
        enableSecurityCheck?: boolean | undefined;
    }>>;
    tokenCount: z.ZodOptional<z.ZodObject<{
        encoding: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        encoding?: string | undefined;
    }, {
        encoding?: string | undefined;
    }>>;
    remote: z.ZodOptional<z.ZodObject<{
        gitHubToken: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        gitHubToken?: string | undefined;
    }, {
        gitHubToken?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}, {
    input?: {
        maxFileSize?: number | undefined;
    } | undefined;
    output?: {
        filePath?: string | undefined;
        style?: "xml" | "markdown" | "plain" | undefined;
        parsableStyle?: boolean | undefined;
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        fileSummary?: boolean | undefined;
        directoryStructure?: boolean | undefined;
        files?: boolean | undefined;
        removeComments?: boolean | undefined;
        removeEmptyLines?: boolean | undefined;
        compress?: boolean | undefined;
        topFilesLength?: number | undefined;
        showLineNumbers?: boolean | undefined;
        copyToClipboard?: boolean | undefined;
        includeEmptyDirectories?: boolean | undefined;
        git?: {
            sortByChanges?: boolean | undefined;
            sortByChangesMaxCommits?: number | undefined;
            includeDiffs?: boolean | undefined;
        } | undefined;
    } | undefined;
    include?: string[] | undefined;
    ignore?: {
        useGitignore?: boolean | undefined;
        useDefaultPatterns?: boolean | undefined;
        customPatterns?: string[] | undefined;
    } | undefined;
    security?: {
        enableSecurityCheck?: boolean | undefined;
    } | undefined;
    tokenCount?: {
        encoding?: string | undefined;
    } | undefined;
    remote?: {
        gitHubToken?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    output: z.ZodOptional<z.ZodObject<{
        stdout: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        stdout?: boolean | undefined;
    }, {
        stdout?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    output?: {
        stdout?: boolean | undefined;
    } | undefined;
}, {
    output?: {
        stdout?: boolean | undefined;
    } | undefined;
}>>>, z.ZodObject<{
    cwd: z.ZodString;
}, "strip", z.ZodTypeAny, {
    cwd: string;
}, {
    cwd: string;
}>>;
export type RepomixConfigDefault = z.infer<typeof repomixConfigDefaultSchema>;
export type RepomixConfigFile = z.infer<typeof repomixConfigFileSchema>;
export type RepomixConfigCli = z.infer<typeof repomixConfigCliSchema>;
export type RepomixConfigMerged = z.infer<typeof repomixConfigMergedSchema>;
export declare const defaultConfig: {
    input: {
        maxFileSize: number;
    };
    output: {
        filePath: string;
        style: "xml" | "markdown" | "plain";
        parsableStyle: boolean;
        fileSummary: boolean;
        directoryStructure: boolean;
        files: boolean;
        removeComments: boolean;
        removeEmptyLines: boolean;
        compress: boolean;
        topFilesLength: number;
        showLineNumbers: boolean;
        copyToClipboard: boolean;
        git: {
            sortByChanges: boolean;
            sortByChangesMaxCommits: number;
            includeDiffs: boolean;
        };
        headerText?: string | undefined;
        instructionFilePath?: string | undefined;
        includeEmptyDirectories?: boolean | undefined;
    };
    include: string[];
    ignore: {
        useGitignore: boolean;
        useDefaultPatterns: boolean;
        customPatterns: string[];
    };
    security: {
        enableSecurityCheck: boolean;
    };
    tokenCount: {
        encoding: "o200k_base" | "gpt2" | "r50k_base" | "p50k_base" | "p50k_edit" | "cl100k_base";
    };
    remote: {
        gitHubToken?: string | undefined;
    };
};
//# sourceMappingURL=configSchema.d.ts.map