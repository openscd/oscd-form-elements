import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Min length Validator
 *
 * Checks if the length of the value is more or equal than the given length
 *
 * @param length min length of the value
 * @returns null if valid, `MIN_LENGTH` otherwise
 */
export const minLength =
  (length: number): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);

    if (isEmptyInputvalue(length) || isEmptyInputvalue(value)) {
      return null;
    }

    return value.length >= length ? null : 'MIN_LENGTH';
  };
