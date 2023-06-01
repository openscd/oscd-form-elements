import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Ends with Validator
 *
 * Checks if the value ends with a given string
 *
 * @param criteria Criteria to check
 * @returns null if valid, `ENDS_WITH` otherwise
 */
export const endsWith =
  (criteria: string): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);

    if (isEmptyInputvalue(value)) {
      return null;
    }

    return value.endsWith(criteria) ? null : 'ENDS_WITH';
  };
