import * as fs from "node:fs/promises";
import path from "node:path";
import * as url from "node:url";
import { logger } from "../../shared/logger.js";

export const getVersion = async (): Promise<string> => {
  try {
    const packageJson = await parsePackageJson();

    if (!packageJson.version) {
      logger.warn("No version found in package.json");
      return "unknown";
    }

    return packageJson.version;
  } catch (error) {
    logger.error("Error reading package.json:", error);
    return "unknown";
  }
};

const parsePackageJson = async (): Promise<{
  name: string;
  version: string;
}> => {
  let packageJsonPath: string;

  if (process.env.SMITHERY_MODE === "true") {
    // In Smithery mode, look for package.json in current working directory
    packageJsonPath = path.join(process.cwd(), "package.json");
  } else {
    let dirName: string;
    try {
      // Try to use import.meta.url (works in ESM)
      dirName = url.fileURLToPath(new URL(".", import.meta.url));
    } catch {
      // Fallback for CommonJS builds
      dirName = __dirname || process.cwd();
    }
    packageJsonPath = path.join(dirName, "..", "..", "..", "package.json");
  }

  const packageJsonFile = await fs.readFile(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(packageJsonFile);
  return packageJson;
};
