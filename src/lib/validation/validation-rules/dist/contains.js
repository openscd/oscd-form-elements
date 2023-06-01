"use strict";
exports.__esModule = true;
exports.contains = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Contains Validator
 *
 * Checks if the value contains a given string
 *
 * @param criteria Criteria to check
 * @returns null if valid, `CONTAINS` otherwise
 */
exports.contains = function (criteria) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return value.includes(criteria) ? null : 'CONTAINS';
    };
};
