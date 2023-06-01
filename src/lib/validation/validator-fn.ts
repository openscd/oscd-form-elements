import { ValueAccessor } from './value-accessor.js';

export type ValidatorFn = (
  valueAccessor: ValueAccessor | string
) => null | string;
