"use strict";
exports.__esModule = true;
exports.startsWith = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Starts with Validator
 *
 * Checks if the value starts with a given string
 *
 * @param criteria Criteria to check
 * @returns null if valid, `STARTS_WITH` otherwise
 */
exports.startsWith = function (criteria) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return value.startsWith(criteria) ? null : 'STARTS_WITH';
    };
};
