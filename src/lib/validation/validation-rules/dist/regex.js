"use strict";
exports.__esModule = true;
exports.regexp = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Regex Validator
 *
 * Checks if the value adheres to the given regex
 *
 * @param regex regex to check
 * @returns null if valid, `REGEX` otherwise
 */
exports.regexp = function (regex) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(regex) || utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return (typeof regex === 'string' ? new RegExp(regex) : regex).test(value)
            ? null
            : 'REGEXP';
    };
};
