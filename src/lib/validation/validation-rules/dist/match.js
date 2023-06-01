"use strict";
exports.__esModule = true;
exports.match = void 0;
var utils_js_1 = require("./utils.js");
/**
 * Match Validator
 *
 * Checks if the value is equal to the given value accessor
 *
 * @param ValueAccessor other
 * @returns null if valid, `MATCH` otherwise
 */
exports.match = function (other) {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        var otherValue = utils_js_1.getValue(other);
        if (utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return value === otherValue ? null : 'MATCH';
    };
};
