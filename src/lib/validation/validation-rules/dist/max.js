"use strict";
exports.__esModule = true;
exports.max = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Max Validator
 *
 * Checks if the value is less than the given max number
 *
 * @param length max number of the value
 * @returns null if valid, `MAX` otherwise
 */
exports.max = function (maxNumber) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(exports.max) || utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        var floatedValue = parseFloat(value);
        return !Number.isNaN(floatedValue) && floatedValue > maxNumber
            ? 'MAX'
            : null;
    };
};
