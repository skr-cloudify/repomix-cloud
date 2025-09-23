import type { TiktokenEncoding } from 'tiktoken';
import type { ProcessedFile } from '../../file/fileTypes.js';
import type { FileMetrics } from './types.js';
export interface FileMetricsTask {
    file: ProcessedFile;
    index: number;
    totalFiles: number;
    encoding: TiktokenEncoding;
}
declare const _default: ({ file, encoding }: FileMetricsTask) => Promise<FileMetrics>;
export default _default;
export declare const calculateIndividualFileMetrics: (file: ProcessedFile, encoding: TiktokenEncoding) => Promise<FileMetrics>;
//# sourceMappingURL=fileMetricsWorker.d.ts.map