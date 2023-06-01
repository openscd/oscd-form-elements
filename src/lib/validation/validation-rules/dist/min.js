"use strict";
exports.__esModule = true;
exports.min = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Min Validator
 *
 * Checks if the value is more than the given min number
 *
 * @param length min number of the value
 * @returns null if valid, `MIN` otherwise
 */
exports.min = function (minNumber) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(exports.min) || utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        var floatedValue = parseFloat(value);
        return !Number.isNaN(floatedValue) && floatedValue < minNumber
            ? 'MIN'
            : null;
    };
};
