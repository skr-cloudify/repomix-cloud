import cliSpinners from 'cli-spinners';
import logUpdate from 'log-update';
import pc from 'picocolors';
export class Spinner {
    constructor(message, cliOptions) {
        this.spinner = cliSpinners.dots;
        this.currentFrame = 0;
        this.interval = null;
        this.message = message;
        // If the user has specified the verbose flag, don't show the spinner
        this.isQuiet = cliOptions.quiet || cliOptions.verbose || cliOptions.stdout || false;
    }
    start() {
        if (this.isQuiet) {
            return;
        }
        const frames = this.spinner.frames;
        const framesLength = frames.length;
        this.interval = setInterval(() => {
            this.currentFrame++;
            const frame = frames[this.currentFrame % framesLength];
            logUpdate(`${pc.cyan(frame)} ${this.message}`);
        }, this.spinner.interval);
    }
    update(message) {
        if (this.isQuiet) {
            return;
        }
        this.message = message;
    }
    stop(finalMessage) {
        if (this.isQuiet) {
            return;
        }
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        logUpdate(finalMessage);
        logUpdate.done();
    }
    succeed(message) {
        if (this.isQuiet) {
            return;
        }
        this.stop(`${pc.green('✔')} ${message}`);
    }
    fail(message) {
        if (this.isQuiet) {
            return;
        }
        this.stop(`${pc.red('✖')} ${message}`);
    }
}
//# sourceMappingURL=cliSpinner.js.map