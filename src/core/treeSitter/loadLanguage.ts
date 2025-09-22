import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Parser from "web-tree-sitter";

// Handle both ESM and CommonJS environments
const getRequire = () => {
  try {
    // Try ESM first
    return createRequire(import.meta.url);
  } catch {
    // Fallback for CommonJS/Smithery builds
    if (typeof __filename !== "undefined") {
      return createRequire(`file://${__filename}`);
    }
    // Last resort
    return createRequire(
      `file://${process.cwd()}/src/core/treeSitter/loadLanguage.ts`
    );
  }
};

const require = getRequire();

export async function loadLanguage(langName: string): Promise<Parser.Language> {
  if (!langName) {
    throw new Error("Invalid language name");
  }

  try {
    const wasmPath = await getWasmPath(langName);
    return await Parser.Language.load(wasmPath);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load language ${langName}: ${message}`);
  }
}

async function getWasmPath(langName: string): Promise<string> {
  const wasmPath = require.resolve(
    `tree-sitter-wasms/out/tree-sitter-${langName}.wasm`
  );
  try {
    await fs.access(wasmPath);
    return wasmPath;
  } catch {
    throw new Error(
      `WASM file not found for language ${langName}: ${wasmPath}`
    );
  }
}
