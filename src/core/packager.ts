import type { RepomixConfigMerged } from '../config/configSchema.js';
import type { RepomixProgressCallback } from '../shared/types.js';
import { collectFiles } from './file/fileCollect.js';
import { sortPaths } from './file/filePathSort.js';
import { processFiles } from './file/fileProcess.js';
import { searchFiles } from './file/fileSearch.js';
import type { RawFile } from './file/fileTypes.js';
import { GitDiffResult, getGitDiffs } from './file/gitDiff.js';
import { calculateMetrics } from './metrics/calculateMetrics.js';
import { generateOutput } from './output/outputGenerate.js';
import { copyToClipboardIfEnabled } from './packager/copyToClipboardIfEnabled.js';
import { writeOutputToDisk } from './packager/writeOutputToDisk.js';
import type { SuspiciousFileResult } from './security/securityCheck.js';
import { validateFileSafety } from './security/validateFileSafety.js';

export interface PackResult {
  totalFiles: number;
  totalCharacters: number;
  totalTokens: number;
  fileCharCounts: Record<string, number>;
  fileTokenCounts: Record<string, number>;
  gitDiffTokenCount: number;
  suspiciousFilesResults: SuspiciousFileResult[];
  suspiciousGitDiffResults: SuspiciousFileResult[];
}

const defaultDeps = {
  searchFiles,
  collectFiles,
  processFiles,
  generateOutput,
  validateFileSafety,
  handleOutput: writeOutputToDisk,
  copyToClipboardIfEnabled,
  calculateMetrics,
  sortPaths,
  getGitDiffs,
};

export const pack = async (
  rootDirs: string[],
  config: RepomixConfigMerged,
  progressCallback: RepomixProgressCallback = () => {},
  overrideDeps: Partial<typeof defaultDeps> = {},
): Promise<PackResult> => {
  const deps = {
    ...defaultDeps,
    ...overrideDeps,
  };

  progressCallback('Searching for files...');
  const filePathsByDir = await Promise.all(
    rootDirs.map(async (rootDir) => ({
      rootDir,
      filePaths: (await deps.searchFiles(rootDir, config)).filePaths,
    })),
  );

  // Sort file paths
  progressCallback('Sorting files...');
  const allFilePaths = filePathsByDir.flatMap(({ filePaths }) => filePaths);
  const sortedFilePaths = await deps.sortPaths(allFilePaths);

  // Regroup sorted file paths by rootDir
  const sortedFilePathsByDir = rootDirs.map((rootDir) => ({
    rootDir,
    filePaths: sortedFilePaths.filter((filePath) =>
      filePathsByDir.find((item) => item.rootDir === rootDir)?.filePaths.includes(filePath),
    ),
  }));

  progressCallback('Collecting files...');
  const rawFiles = (
    await Promise.all(
      sortedFilePathsByDir.map(({ rootDir, filePaths }) =>
        deps.collectFiles(filePaths, rootDir, config, progressCallback),
      ),
    )
  ).reduce((acc: RawFile[], curr: RawFile[]) => acc.concat(...curr), []);

  // Get git diffs if enabled - run this before security check
  progressCallback('Getting git diffs...');
  const gitDiffResult = await deps.getGitDiffs(rootDirs, config);

  // Run security check and get filtered safe files
  const { safeFilePaths, safeRawFiles, suspiciousFilesResults, suspiciousGitDiffResults } =
    await deps.validateFileSafety(rawFiles, progressCallback, config, gitDiffResult);

  // Process files (remove comments, etc.)
  progressCallback('Processing files...');
  const processedFiles = await deps.processFiles(safeRawFiles, config, progressCallback);

  progressCallback('Generating output...');
  const output = await deps.generateOutput(rootDirs, config, processedFiles, safeFilePaths, gitDiffResult);

  progressCallback('Writing output file...');
  await deps.handleOutput(output, config);

  await deps.copyToClipboardIfEnabled(output, progressCallback, config);

  const metrics = await deps.calculateMetrics(processedFiles, output, progressCallback, config, gitDiffResult);

  // Create a result object that includes metrics and security results
  const result = {
    ...metrics,
    suspiciousFilesResults,
    suspiciousGitDiffResults,
  };

  return result;
};
