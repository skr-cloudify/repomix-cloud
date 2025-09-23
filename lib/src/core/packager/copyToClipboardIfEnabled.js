var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { spawn } from "node:child_process";
import { logger } from "../../shared/logger.js";
// Lazy import to avoid import.meta.url issues in CommonJS builds
const getClipboard = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { default: clipboard } = yield import("clipboardy");
        return clipboard;
    }
    catch (error) {
        logger.warn("clipboardy not available in this environment");
        return null;
    }
});
export const copyToClipboardIfEnabled = (output, progressCallback, config) => __awaiter(void 0, void 0, void 0, function* () {
    if (!config.output.copyToClipboard)
        return;
    // Disable clipboard in Smithery/server environments
    if (process.env.SMITHERY_MODE || process.env.NODE_ENV === "production") {
        logger.trace("Clipboard disabled in server environment");
        return;
    }
    progressCallback("Copying to clipboard...");
    if (process.env.NODE_ENV !== "test" && process.env.WAYLAND_DISPLAY) {
        logger.trace("Wayland detected; attempting wl-copy.");
        try {
            yield new Promise((resolve, reject) => {
                const proc = spawn("wl-copy", [], {
                    stdio: ["pipe", "ignore", "ignore"],
                });
                proc.on("error", (err) => reject(new Error(`Failed to execute wl-copy: ${err.message}`)));
                proc.on("close", (code) => code
                    ? reject(new Error(`wl-copy exited with code ${code}`))
                    : resolve());
                proc.stdin.end(output);
            });
            logger.trace("Copied using wl-copy.");
            return;
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : "unknown error";
            logger.warn(`wl-copy failed (${msg}); falling back.`);
        }
    }
    try {
        const clipboard = yield getClipboard();
        if (!clipboard) {
            logger.warn("Clipboard functionality not available");
            return;
        }
        logger.trace("Using clipboardy.");
        yield clipboard.write(output);
        logger.trace("Copied using clipboardy.");
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : "unknown error";
        logger.error(`clipboardy failed: ${msg}`);
    }
});
//# sourceMappingURL=copyToClipboardIfEnabled.js.map