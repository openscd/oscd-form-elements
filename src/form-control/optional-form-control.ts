import { FormControl } from './form-control.js';

export interface OptionalFormControl extends FormControl {
  nullable?: boolean;
  maybeValue: string | undefined;
  defaultValue?: string;
  null?: boolean;
}
