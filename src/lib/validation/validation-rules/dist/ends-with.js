"use strict";
exports.__esModule = true;
exports.endsWith = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Ends with Validator
 *
 * Checks if the value ends with a given string
 *
 * @param criteria Criteria to check
 * @returns null if valid, `ENDS_WITH` otherwise
 */
exports.endsWith = function (criteria) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return value.endsWith(criteria) ? null : 'ENDS_WITH';
    };
};
