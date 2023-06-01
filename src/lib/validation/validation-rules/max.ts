import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Max Validator
 *
 * Checks if the value is less than the given max number
 *
 * @param length max number of the value
 * @returns null if valid, `MAX` otherwise
 */
export const max =
  (maxNumber: number): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);

    if (isEmptyInputvalue(max) || isEmptyInputvalue(value)) {
      return null;
    }

    const floatedValue = parseFloat(value);

    return !Number.isNaN(floatedValue) && floatedValue > maxNumber
      ? 'MAX'
      : null;
  };
