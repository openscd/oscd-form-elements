import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Match Validator
 *
 * Checks if the value is equal to the given value accessor
 *
 * @param ValueAccessor other
 * @returns null if valid, `MATCH` otherwise
 */
export const match =
  (other: ValueAccessor): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);
    const otherValue: string = getValue(other);

    if (isEmptyInputvalue(value)) {
      return null;
    }

    return value === otherValue ? null : 'MATCH';
  };
