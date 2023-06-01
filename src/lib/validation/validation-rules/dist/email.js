"use strict";
exports.__esModule = true;
exports.email = void 0;
var utils_js_1 = require("./utils.js");
var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/**
 * Email Validator
 *
 * Checks if the value is a valid email address
 *
 * @returns null if valid, `EMAIL` otherwise
 */
exports.email = function () {
    return function (valueAccessor) {
        var value = utils_js_1.getValue(valueAccessor);
        if (utils_js_1.isEmptyInputvalue(value)) {
            return null;
        }
        return EMAIL_REGEXP.test(value) ? null : 'EMAIL';
    };
};
