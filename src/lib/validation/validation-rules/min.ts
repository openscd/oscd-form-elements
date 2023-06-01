import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Min Validator
 *
 * Checks if the value is more than the given min number
 *
 * @param length min number of the value
 * @returns null if valid, `MIN` otherwise
 */
export const min =
  (minNumber: number): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);

    if (isEmptyInputvalue(min) || isEmptyInputvalue(value)) {
      return null;
    }

    const floatedValue = parseFloat(value);

    return !Number.isNaN(floatedValue) && floatedValue < minNumber
      ? 'MIN'
      : null;
  };
