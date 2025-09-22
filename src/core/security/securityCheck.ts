import pc from "picocolors";
import { logger } from "../../shared/logger.js";
import { initPiscina } from "../../shared/processConcurrency.js";
import type { RepomixProgressCallback } from "../../shared/types.js";
import type { RawFile } from "../file/fileTypes.js";
import type { GitDiffResult } from "../file/gitDiff.js";
import type {
  SecurityCheckTask,
  SecurityCheckType,
} from "./workers/securityCheckWorker.js";
import securityCheckWorker from "./workers/securityCheckWorker.js";

export interface SuspiciousFileResult {
  filePath: string;
  messages: string[];
  type: SecurityCheckType;
}

const initTaskRunner = (numOfTasks: number) => {
  // Disable worker pools in Smithery/server environments due to import.meta.url issues
  if (process.env.SMITHERY_MODE || process.env.NODE_ENV === "production") {
    return null; // Will fall back to synchronous processing
  }

  try {
    const pool = initPiscina(
      numOfTasks,
      new URL("./workers/securityCheckWorker.js", import.meta.url).href
    );
    return (task: SecurityCheckTask) => pool.run(task);
  } catch (error) {
    console.warn(
      "Worker pool initialization failed, falling back to synchronous processing:",
      error
    );
    return null;
  }
};

export const runSecurityCheck = async (
  rawFiles: RawFile[],
  progressCallback: RepomixProgressCallback = () => {},
  gitDiffResult?: GitDiffResult,
  deps = {
    initTaskRunner,
  }
): Promise<SuspiciousFileResult[]> => {
  const gitDiffTasks: SecurityCheckTask[] = [];

  // Add Git diff content for security checking if available
  if (gitDiffResult) {
    if (gitDiffResult.workTreeDiffContent) {
      gitDiffTasks.push({
        filePath: "Working tree changes",
        content: gitDiffResult.workTreeDiffContent,
        type: "gitDiff",
      });
    }

    if (gitDiffResult.stagedDiffContent) {
      gitDiffTasks.push({
        filePath: "Staged changes",
        content: gitDiffResult.stagedDiffContent,
        type: "gitDiff",
      });
    }
  }

  const runTask = deps.initTaskRunner(rawFiles.length + gitDiffTasks.length);
  const fileTasks = rawFiles.map(
    (file) =>
      ({
        filePath: file.path,
        content: file.content,
        type: "file",
      } satisfies SecurityCheckTask)
  );

  // Combine file tasks and Git diff tasks
  const tasks = [...fileTasks, ...gitDiffTasks];

  try {
    logger.trace(`Starting security check for ${tasks.length} files/content`);
    const startTime = process.hrtime.bigint();

    let completedTasks = 0;
    const totalTasks = tasks.length;

    const results = await Promise.all(
      tasks.map((task) => {
        const promise = runTask ? runTask(task) : securityCheckWorker(task);
        return promise.then((result) => {
          completedTasks++;
          progressCallback(
            `Running security check... (${completedTasks}/${totalTasks}) ${pc.dim(
              task.filePath
            )}`
          );
          logger.trace(
            `Running security check... (${completedTasks}/${totalTasks}) ${task.filePath}`
          );
          return result;
        });
      })
    );

    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1e6;
    logger.trace(`Security check completed in ${duration.toFixed(2)}ms`);

    return results.filter(
      (result): result is SuspiciousFileResult => result !== null
    );
  } catch (error) {
    logger.error("Error during security check:", error);
    throw error;
  }
};
