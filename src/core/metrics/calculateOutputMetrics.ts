import type { TiktokenEncoding } from "tiktoken";
import { logger } from "../../shared/logger.js";
import { initPiscina } from "../../shared/processConcurrency.js";
import type { OutputMetricsTask } from "./workers/outputMetricsWorker.js";
import outputMetricsWorker from "./workers/outputMetricsWorker.js";

const CHUNK_SIZE = 1000;
const MIN_CONTENT_LENGTH_FOR_PARALLEL = 1_000_000; // 1000KB

const initTaskRunner = (numOfTasks: number) => {
  // Disable worker pools in Smithery/server environments due to import.meta.url issues
  if (process.env.SMITHERY_MODE || process.env.NODE_ENV === "production") {
    return null; // Will fall back to synchronous processing
  }

  try {
    const pool = initPiscina(
      numOfTasks,
      new URL("./workers/outputMetricsWorker.js", import.meta.url).href
    );
    return (task: OutputMetricsTask) => pool.run(task);
  } catch (error) {
    console.warn(
      "Worker pool initialization failed, falling back to synchronous processing:",
      error
    );
    return null;
  }
};

export const calculateOutputMetrics = async (
  content: string,
  encoding: TiktokenEncoding,
  path?: string,
  deps = {
    initTaskRunner,
  }
): Promise<number> => {
  const shouldRunInParallel = content.length > MIN_CONTENT_LENGTH_FOR_PARALLEL;
  const numOfTasks = shouldRunInParallel ? CHUNK_SIZE : 1;
  const runTask = deps.initTaskRunner(numOfTasks);

  try {
    logger.trace(`Starting output token count for ${path || "output"}`);
    const startTime = process.hrtime.bigint();

    let result: number;

    if (shouldRunInParallel) {
      // Split content into chunks for parallel processing
      const chunkSize = Math.ceil(content.length / CHUNK_SIZE);
      const chunks: string[] = [];

      for (let i = 0; i < content.length; i += chunkSize) {
        chunks.push(content.slice(i, i + chunkSize));
      }

      // Process chunks in parallel
      const chunkResults = await Promise.all(
        chunks.map((chunk, index) => {
          const task = {
            content: chunk,
            encoding,
            path: path ? `${path}-chunk-${index}` : undefined,
          };
          return runTask ? runTask(task) : outputMetricsWorker(task);
        })
      );

      // Sum up the results
      result = chunkResults.reduce((sum, count) => sum + count, 0);
    } else {
      // Process small content directly
      const task = { content, encoding, path };
      result = await (runTask ? runTask(task) : outputMetricsWorker(task));
    }

    const endTime = process.hrtime.bigint();
    const duration = Number(endTime - startTime) / 1e6;
    logger.trace(`Output token count completed in ${duration.toFixed(2)}ms`);

    return result;
  } catch (error) {
    logger.error("Error during token count:", error);
    throw error;
  }
};
