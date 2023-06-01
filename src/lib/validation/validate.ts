import { ValidatorFn } from './validator-fn.js';
import { ValueAccessor } from './value-accessor.js';

export interface ValidationResult {
  valid: boolean;
  messages: string[];
}

export const validate = (
  valueAccessor: ValueAccessor | string,
  rules: ValidatorFn[]
): ValidationResult => {
  const errors: string[] = rules
    .map(rule => rule(valueAccessor))
    .filter(x => x)
    .map(x => x!);

  return {
    valid: errors.length === 0,
    messages: errors,
  };
};
