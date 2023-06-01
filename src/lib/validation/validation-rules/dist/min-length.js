"use strict";
exports.__esModule = true;
exports.minLength = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Min length Validator
 *
 * Checks if the length of the value is more or equal than the given length
 *
 * @param length min length of the value
 * @returns null if valid, `MIN_LENGTH` otherwise
 */
exports.minLength = function (length) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(length) || utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return value.length >= length ? null : 'MIN_LENGTH';
    };
};
