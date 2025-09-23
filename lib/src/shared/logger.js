import util from "node:util";
import pc from "picocolors";
export const repomixLogLevels = {
    SILENT: -1, // No output
    ERROR: 0, // error
    WARN: 1, // warn
    INFO: 2, // success, info, log, note
    DEBUG: 3, // debug, trace
};
class RepomixLogger {
    constructor() {
        this.level = repomixLogLevels.INFO;
        this.init();
    }
    init() {
        this.setLogLevel(repomixLogLevels.INFO);
    }
    setLogLevel(level) {
        this.level = level;
    }
    getLogLevel() {
        return this.level;
    }
    error(...args) {
        if (this.level >= repomixLogLevels.ERROR) {
            console.error(pc.red(this.formatArgs(args)));
        }
    }
    warn(...args) {
        if (this.level >= repomixLogLevels.WARN) {
            console.log(pc.yellow(this.formatArgs(args)));
        }
    }
    success(...args) {
        if (this.level >= repomixLogLevels.INFO) {
            console.log(pc.green(this.formatArgs(args)));
        }
    }
    info(...args) {
        if (this.level >= repomixLogLevels.INFO) {
            console.log(pc.cyan(this.formatArgs(args)));
        }
    }
    log(...args) {
        if (this.level >= repomixLogLevels.INFO) {
            console.log(this.formatArgs(args));
        }
    }
    note(...args) {
        if (this.level >= repomixLogLevels.INFO) {
            console.log(pc.dim(this.formatArgs(args)));
        }
    }
    debug(...args) {
        if (this.level >= repomixLogLevels.DEBUG) {
            console.log(pc.blue(this.formatArgs(args)));
        }
    }
    trace(...args) {
        if (this.level >= repomixLogLevels.DEBUG) {
            console.log(pc.gray(this.formatArgs(args)));
        }
    }
    formatArgs(args) {
        return args
            .map((arg) => typeof arg === "object"
            ? util.inspect(arg, { depth: null, colors: true })
            : this.sanitize(String(arg)))
            .join(" ");
    }
    sanitize(str) {
        // Hide GitHub tokens in logs for security
        return str.replace(/([a-f0-9]{8})[a-f0-9]{32,}/gi, "$1...[HIDDEN]");
    }
}
export const logger = new RepomixLogger();
export const setLogLevel = (level) => {
    logger.setLogLevel(level);
};
/**
 * Set logger log level from REPOMIX_LOGLEVEL environment variable if valid.
 */
export const setLogLevelByEnv = () => {
    const logLevelStr = process.env.REPOMIX_LOGLEVEL;
    const logLevelNum = Number(logLevelStr);
    if (logLevelNum === repomixLogLevels.SILENT ||
        logLevelNum === repomixLogLevels.ERROR ||
        logLevelNum === repomixLogLevels.WARN ||
        logLevelNum === repomixLogLevels.INFO ||
        logLevelNum === repomixLogLevels.DEBUG) {
        setLogLevel(logLevelNum);
    }
};
//# sourceMappingURL=logger.js.map