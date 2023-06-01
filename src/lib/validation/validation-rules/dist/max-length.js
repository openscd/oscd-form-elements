"use strict";
exports.__esModule = true;
exports.maxLength = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Max length Validator
 *
 * Checks if the length of the value is less than the given length
 *
 * @param length max length of the value
 * @returns null if valid, `MAX_LENGTH` otherwise
 */
exports.maxLength = function (length) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return value.length < length ? null : 'MAX_LENGTH';
    };
};
