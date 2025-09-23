import type { TiktokenEncoding } from "tiktoken";
import type { OutputMetricsTask } from "./workers/outputMetricsWorker.js";
export declare const calculateOutputMetrics: (content: string, encoding: TiktokenEncoding, path?: string, deps?: {
    initTaskRunner: (numOfTasks: number) => ((task: OutputMetricsTask) => Promise<any>) | null;
}) => Promise<number>;
//# sourceMappingURL=calculateOutputMetrics.d.ts.map