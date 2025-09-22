import { spawn } from "node:child_process";
import type { RepomixConfigMerged } from "../../config/configSchema.js";
import { logger } from "../../shared/logger.js";
import type { RepomixProgressCallback } from "../../shared/types.js";

// Lazy import to avoid import.meta.url issues in CommonJS builds
const getClipboard = async () => {
  try {
    const { default: clipboard } = await import("clipboardy");
    return clipboard;
  } catch (error) {
    logger.warn("clipboardy not available in this environment");
    return null;
  }
};

export const copyToClipboardIfEnabled = async (
  output: string,
  progressCallback: RepomixProgressCallback,
  config: RepomixConfigMerged
): Promise<void> => {
  if (!config.output.copyToClipboard) return;

  // Disable clipboard in Smithery/server environments
  if (process.env.SMITHERY_MODE || process.env.NODE_ENV === "production") {
    logger.trace("Clipboard disabled in server environment");
    return;
  }

  progressCallback("Copying to clipboard...");

  if (process.env.NODE_ENV !== "test" && process.env.WAYLAND_DISPLAY) {
    logger.trace("Wayland detected; attempting wl-copy.");
    try {
      await new Promise<void>((resolve, reject) => {
        const proc = spawn("wl-copy", [], {
          stdio: ["pipe", "ignore", "ignore"],
        });
        proc.on("error", (err) =>
          reject(new Error(`Failed to execute wl-copy: ${err.message}`))
        );
        proc.on("close", (code) =>
          code
            ? reject(new Error(`wl-copy exited with code ${code}`))
            : resolve()
        );
        proc.stdin.end(output);
      });
      logger.trace("Copied using wl-copy.");
      return;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "unknown error";
      logger.warn(`wl-copy failed (${msg}); falling back.`);
    }
  }

  try {
    const clipboard = await getClipboard();
    if (!clipboard) {
      logger.warn("Clipboard functionality not available");
      return;
    }
    logger.trace("Using clipboardy.");
    await clipboard.write(output);
    logger.trace("Copied using clipboardy.");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown error";
    logger.error(`clipboardy failed: ${msg}`);
  }
};
