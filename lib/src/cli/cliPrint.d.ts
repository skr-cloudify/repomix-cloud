import type { RepomixConfigMerged } from '../config/configSchema.js';
import type { PackResult } from '../core/packager.js';
import type { SuspiciousFileResult } from '../core/security/securityCheck.js';
export declare const printSummary: (packResult: PackResult, config: RepomixConfigMerged) => void;
export declare const printSecurityCheck: (rootDir: string, suspiciousFilesResults: SuspiciousFileResult[], suspiciousGitDiffResults: SuspiciousFileResult[], config: RepomixConfigMerged) => void;
export declare const printTopFiles: (fileCharCounts: Record<string, number>, fileTokenCounts: Record<string, number>, topFilesLength: number) => void;
export declare const printCompletion: () => void;
//# sourceMappingURL=cliPrint.d.ts.map