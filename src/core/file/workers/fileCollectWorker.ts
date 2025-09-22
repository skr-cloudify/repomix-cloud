import path from 'node:path';
import { logger, setLogLevelByEnv } from '../../../shared/logger.js';
import { readRawFile } from '../fileRead.js';

export interface FileCollectTask {
  filePath: string;
  rootDir: string;
  maxFileSize: number;
}

// Set logger log level from environment variable if provided
setLogLevelByEnv();

export default async ({ filePath, rootDir, maxFileSize }: FileCollectTask) => {
  const fullPath = path.resolve(rootDir, filePath);
  const content = await readRawFile(fullPath, maxFileSize);

  if (content) {
    return {
      path: filePath,
      content,
    };
  }

  return null;
};
