"use strict";
exports.__esModule = true;
exports.getValue = exports.isEmptyInputvalue = void 0;
/**
 * Checks if the input value is empty
 *
 * @param value
 * @return boolean
 */
exports.isEmptyInputvalue = function (value) {
    return value === null ||
        ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
};
/**
 * Returns the value from a value accessor
 *
 * @param value accessor
 * @return string
 */
exports.getValue = function (valueAccessor) {
    return typeof valueAccessor === 'string' ? valueAccessor : valueAccessor.value;
};
