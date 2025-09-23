import type { RepomixConfigMerged } from '../../config/configSchema.js';
export interface FileSearchResult {
    filePaths: string[];
    emptyDirPaths: string[];
}
/**
 * Escapes special characters in glob patterns to handle paths with parentheses.
 * Example: "src/(categories)" -> "src/\\(categories\\)"
 */
export declare const escapeGlobPattern: (pattern: string) => string;
/**
 * Normalizes glob patterns by removing trailing slashes and ensuring consistent directory pattern handling.
 * Makes "**\/folder", "**\/folder/", and "**\/folder/**\/*" behave identically.
 *
 * @param pattern The glob pattern to normalize
 * @returns The normalized pattern
 */
export declare const normalizeGlobPattern: (pattern: string) => string;
export declare const searchFiles: (rootDir: string, config: RepomixConfigMerged) => Promise<FileSearchResult>;
export declare const parseIgnoreContent: (content: string) => string[];
export declare const getIgnoreFilePatterns: (config: RepomixConfigMerged) => Promise<string[]>;
export declare const getIgnorePatterns: (rootDir: string, config: RepomixConfigMerged) => Promise<string[]>;
//# sourceMappingURL=fileSearch.d.ts.map