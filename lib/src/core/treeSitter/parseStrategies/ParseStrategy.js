import { CssParseStrategy } from './CssParseStrategy.js';
import { DefaultParseStrategy } from './DefaultParseStrategy.js';
import { GoParseStrategy } from './GoParseStrategy.js';
import { PythonParseStrategy } from './PythonParseStrategy.js';
import { TypeScriptParseStrategy } from './TypeScriptParseStrategy.js';
import { VueParseStrategy } from './VueParseStrategy.js';
export function createParseStrategy(lang) {
    switch (lang) {
        case 'typescript':
            return new TypeScriptParseStrategy();
        case 'python':
            return new PythonParseStrategy();
        case 'go':
            return new GoParseStrategy();
        case 'css':
            return new CssParseStrategy();
        case 'vue':
            return new VueParseStrategy();
        default:
            return new DefaultParseStrategy();
    }
}
//# sourceMappingURL=ParseStrategy.js.map