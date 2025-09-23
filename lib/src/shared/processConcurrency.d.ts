import { Piscina } from 'piscina';
export declare const getProcessConcurrency: () => number;
export declare const getWorkerThreadCount: (numOfTasks: number) => {
    minThreads: number;
    maxThreads: number;
};
export declare const initPiscina: (numOfTasks: number, workerPath: string) => Piscina;
//# sourceMappingURL=processConcurrency.d.ts.map