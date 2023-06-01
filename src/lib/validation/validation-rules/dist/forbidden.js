"use strict";
exports.__esModule = true;
exports.forbidden = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Forbidden Validator
 *
 * Checks if the value is equal to one of the forbidden words
 *
 * @param string[] forbidden words
 * @returns null if valid, `FORBIDDEN` otherwise
 */
exports.forbidden = function (words) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(words) || utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return words.indexOf(value) > -1 ? 'FORBIDDEN' : null;
    };
};
