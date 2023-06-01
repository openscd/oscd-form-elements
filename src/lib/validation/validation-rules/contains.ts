import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue, isEmptyInputvalue } from './utils.js';

/**
 * Contains Validator
 *
 * Checks if the value contains a given string
 *
 * @param criteria Criteria to check
 * @returns null if valid, `CONTAINS` otherwise
 */
export const contains =
  (criteria: string): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string => {
    const value: string = getValue(valueAccessor);

    if (isEmptyInputvalue(value)) {
      return null;
    }

    return value.includes(criteria) ? null : 'CONTAINS';
  };
