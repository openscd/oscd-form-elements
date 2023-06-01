import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Max length Validator
 *
 * Checks if the length of the value is less than the given length
 *
 * @param length max length of the value
 * @returns null if valid, `MAX_LENGTH` otherwise
 */
export const maxLength =
  (length: number): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);
    if (isEmptyInputvalue(value)) {
      return null;
    }

    return value.length < length ? null : 'MAX_LENGTH';
  };
