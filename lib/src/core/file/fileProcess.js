var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import pc from "picocolors";
import { logger } from "../../shared/logger.js";
import { initPiscina } from "../../shared/processConcurrency.js";
import { getFileManipulator } from "./fileManipulate.js";
import fileProcessWorker from "./workers/fileProcessWorker.js";
const initTaskRunner = (numOfTasks) => {
    // Disable worker pools in Smithery/server environments due to import.meta.url issues
    if (process.env.SMITHERY_MODE || process.env.NODE_ENV === "production") {
        return null; // Will fall back to synchronous processing
    }
    try {
        const pool = initPiscina(numOfTasks, new URL("./workers/fileProcessWorker.js", import.meta.url).href);
        return (task) => pool.run(task);
    }
    catch (error) {
        console.warn("Worker pool initialization failed, falling back to synchronous processing:", error);
        return null;
    }
};
export const processFiles = (rawFiles_1, config_1, progressCallback_1, ...args_1) => __awaiter(void 0, [rawFiles_1, config_1, progressCallback_1, ...args_1], void 0, function* (rawFiles, config, progressCallback, deps = {
    initTaskRunner,
    getFileManipulator,
}) {
    const runTask = deps.initTaskRunner(rawFiles.length);
    const tasks = rawFiles.map((rawFile, index) => ({
        rawFile,
        config,
    }));
    try {
        const startTime = process.hrtime.bigint();
        logger.trace(`Starting file processing for ${rawFiles.length} files using worker pool`);
        let completedTasks = 0;
        const totalTasks = tasks.length;
        const results = yield Promise.all(tasks.map((task) => {
            const promise = runTask ? runTask(task) : fileProcessWorker(task);
            return promise.then((result) => {
                completedTasks++;
                progressCallback(`Processing file... (${completedTasks}/${totalTasks}) ${pc.dim(task.rawFile.path)}`);
                logger.trace(`Processing file... (${completedTasks}/${totalTasks}) ${task.rawFile.path}`);
                return result;
            });
        }));
        const endTime = process.hrtime.bigint();
        const duration = Number(endTime - startTime) / 1e6;
        logger.trace(`File processing completed in ${duration.toFixed(2)}ms`);
        return results;
    }
    catch (error) {
        logger.error("Error during file processing:", error);
        throw error;
    }
});
//# sourceMappingURL=fileProcess.js.map