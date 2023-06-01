import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Starts with Validator
 *
 * Checks if the value starts with a given string
 *
 * @param criteria Criteria to check
 * @returns null if valid, `STARTS_WITH` otherwise
 */
export const startsWith =
  (criteria: string): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);

    if (isEmptyInputvalue(value)) {
      return null;
    }

    return value.startsWith(criteria) ? null : 'STARTS_WITH';
  };
