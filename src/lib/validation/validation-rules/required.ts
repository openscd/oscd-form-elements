import { ValidatorFn } from '../validator-fn.js';
import { ValueAccessor } from '../value-accessor.js';
import { getValue } from './utils.js';

/**
 * Required Validator
 *
 * Checks if the value is present
 *
 * @returns null if valid, `REQUIRED` otherwise
 */
export const required =
  (): ValidatorFn =>
  (valueAccessor: ValueAccessor): null | string =>
    getValue(valueAccessor) ? null : 'REQUIRED';
