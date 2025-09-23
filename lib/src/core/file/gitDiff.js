var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RepomixError } from '../../shared/errorHandle.js';
import { getStagedDiff, getWorkTreeDiff } from './gitCommand.js';
export const getGitDiffs = (rootDirs_1, config_1, ...args_1) => __awaiter(void 0, [rootDirs_1, config_1, ...args_1], void 0, function* (rootDirs, config, deps = {
    getWorkTreeDiff,
    getStagedDiff,
}) {
    var _a;
    // Get git diffs if enabled
    let gitDiffResult;
    if ((_a = config.output.git) === null || _a === void 0 ? void 0 : _a.includeDiffs) {
        try {
            // Use the first directory as the git repository root
            // Usually this would be the root of the project
            const gitRoot = rootDirs[0] || config.cwd;
            const [workTreeDiffContent, stagedDiffContent] = yield Promise.all([
                deps.getWorkTreeDiff(gitRoot),
                deps.getStagedDiff(gitRoot),
            ]);
            gitDiffResult = {
                workTreeDiffContent,
                stagedDiffContent,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new RepomixError(`Failed to get git diffs: ${error.message}`);
            }
        }
    }
    return gitDiffResult;
});
//# sourceMappingURL=gitDiff.js.map