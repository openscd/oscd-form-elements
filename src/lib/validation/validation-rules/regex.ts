import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Regex Validator
 *
 * Checks if the value adheres to the given regex
 *
 * @param regex regex to check
 * @returns null if valid, `REGEX` otherwise
 */
export const regexp =
  (regex: RegExp | string): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);

    if (isEmptyInputvalue(regex) || isEmptyInputvalue(value)) {
      return null;
    }
    return (typeof regex === 'string' ? new RegExp(regex) : regex).test(value)
      ? null
      : 'REGEXP';
  };
