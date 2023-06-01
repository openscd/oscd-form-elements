"use strict";
exports.__esModule = true;
exports.required = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Required Validator
 *
 * Checks if the value is present
 *
 * @returns null if valid, `REQUIRED` otherwise
 */
exports.required = function () {
    return function (valueAccessor) {
        return utils_js_1.getValue(valueAccessor) ? null : 'REQUIRED';
    };
};
