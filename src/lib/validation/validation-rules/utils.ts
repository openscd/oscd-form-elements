import { ValueAccessor } from '../value-accessor.js';

/**
 * Checks if the input value is empty
 *
 * @param value
 * @return boolean
 */
export const isEmptyInputvalue = (value: any): boolean =>
  value === null ||
  ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);

/**
 * Returns the value from a value accessor
 *
 * @param value accessor
 * @return string
 */
export const getValue = (valueAccessor: ValueAccessor): string =>
  typeof valueAccessor === 'string' ? valueAccessor : valueAccessor.value;
