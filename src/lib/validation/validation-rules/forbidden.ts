import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { isEmptyInputvalue, getValue } from './utils.js';

/**
 * Forbidden Validator
 *
 * Checks if the value is equal to one of the forbidden words
 *
 * @param string[] forbidden words
 * @returns null if valid, `FORBIDDEN` otherwise
 */
export const forbidden =
  (words: string[]): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);

    if (isEmptyInputvalue(words) || isEmptyInputvalue(value)) {
      return null;
    }

    return words.indexOf(value) > -1 ? 'FORBIDDEN' : null;
  };
