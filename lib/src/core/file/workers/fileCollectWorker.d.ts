export interface FileCollectTask {
    filePath: string;
    rootDir: string;
    maxFileSize: number;
}
declare const _default: ({ filePath, rootDir, maxFileSize }: FileCollectTask) => Promise<{
    path: string;
    content: string;
} | null>;
export default _default;
//# sourceMappingURL=fileCollectWorker.d.ts.map