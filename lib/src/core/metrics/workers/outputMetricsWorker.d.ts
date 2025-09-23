import type { TiktokenEncoding } from 'tiktoken';
export interface OutputMetricsTask {
    content: string;
    encoding: TiktokenEncoding;
    path?: string;
}
declare const _default: ({ content, encoding, path }: OutputMetricsTask) => Promise<number>;
export default _default;
//# sourceMappingURL=outputMetricsWorker.d.ts.map