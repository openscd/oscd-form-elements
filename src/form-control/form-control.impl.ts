/* eslint-disable max-classes-per-file */
import { LitElement, TemplateResult } from 'lit';

import { property, state } from 'lit/decorators.js';
import { isFormInputElement } from '../lib/foundation.js';
import { validate, ValidationResult } from '../lib/validation/validate.js';
import { ValidatorFn } from '../lib/validation/validator-fn.js';
import { FormControl } from './form-control.js';

export type InvalidEvent = CustomEvent<string>;
export type ValidEvent = CustomEvent<string>;

export const newInvalidEvent = (target: string): InvalidEvent =>
  new CustomEvent('invalid', {
    detail: target,
  });

export const newValidEvent = (): ValidEvent => new CustomEvent('valid');

/**
 * @event {InvalidEvent} invalid - Event thrown when the form control is invalid
 * @event {ValidEvent} valid - Event thrown when the form control is valid
 */
export abstract class FormControlImpl<T extends HTMLElement>
  extends LitElement
  implements FormControl
{
  /**
   * @prop {String} value - The value of the Form Control
   */
  @property({
    type: String,
  })
  set value(value: string) {
    this._value = value;

    if (isFormInputElement(this.formControl)) {
      this.formControl.value = value;
    }
  }

  get value(): string {
    return isFormInputElement(this.formControl)
      ? this.formControl.value
      : this._value;
  }

  /**
   * @internal
   */
  private _value: string = '';

  /**
   * @prop {boolean} required - Form Control is required
   */
  @property({
    type: Boolean,
  })
  required: boolean = false;

  /**
   * @prop {boolean} disabled - Form Control is disabled
   */
  @property({
    type: Boolean,
    reflect: true,
  })
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  private _disabled: boolean = false;

  /**
   * @prop {string|undefined} label - The label for the Form Control
   */
  @property({
    type: String,
    reflect: true,
  })
  label?: string;

  /**
   * @prop {string} helper - The helper text for the Form Control
   */
  @property({
    type: String,
  })
  helper: string = '';

  /**
   * @prop {string} validationMessage - The validation message for the Form Control
   */
  @property({
    type: String,
  })
  validationMessage: string = '';

  /**
   * @prop {number} min - The minimum number for the Form Control
   */
  @property({
    type: Number,
  })
  min: number = -1;

  /**
   * @prop {number} max - The maximum number for the Form Control
   */
  @property({
    type: Number,
  })
  max: number = -1;

  /**
   * @prop {number} minLength - The minimum length for the Form Control
   */
  @property({
    type: Number,
  })
  minLength: number = -1;

  /**
   * @prop {number} maxLength - The maximum length for the Form Control
   */
  @property({
    type: Number,
  })
  maxLength: number = -1;

  /**
   * @prop {boolean} helperPersistent - Helper text should be visible at all times
   */
  @property({
    type: Boolean,
  })
  helperPersistent: boolean = false;

  @state()
  get valid(): boolean {
    return isFormInputElement(this.formControl)
      ? this.formControl.checkValidity()
      : this.validate();
  }

  @property({
    type: Array,
  })
  validationRules: ValidatorFn[] = [];

  protected abstract validate(): boolean;

  public checkValidity(): boolean {
    if (isFormInputElement(this.formControl)) {
      return this.formControl.checkValidity();
    }

    return true;
  }

  public abstract setCustomValidity(validity: string): void;

  public reportValidity(): boolean {
    if (isFormInputElement(this.formControl)) {
      const validationResult: ValidationResult = validate(
        this.formControl,
        this.validationRules
      );
      if (!validationResult.valid) {
        this.setCustomValidity(validationResult.messages[0]);
      }

      this.formControl.reportValidity();
      return validationResult.valid;
    }

    const validationResult: ValidationResult = validate(
      this,
      this.validationRules
    );

    if (!validationResult.valid) {
      this.setCustomValidity(validationResult.messages[0]);
    }

    return validationResult.valid;
  }

  protected abstract get formControl(): T;

  protected abstract renderFormControl(): TemplateResult;

  protected firstUpdated(): void {
    if (this.formControl && isFormInputElement(this.formControl)) {
      const { formControl } = this;

      formControl.oninvalid = () => {
        /**
         *
         * @fires {InvalidEvent} invalid - Emitted when Form Control is invalid
         */
        const invalidValidity: string | undefined = Object.keys(
          formControl.validity
        ).find(key => !formControl.validity[key as keyof ValidityState]);

        this.dispatchEvent(newInvalidEvent(invalidValidity!));
      };

      formControl.onblur = () => {
        /**
         * @fires {ValidEvent} valid - Emitted when Form control is valid
         */
        if (formControl.validity.valid) {
          this.dispatchEvent(newValidEvent());
        }
      };
    }
  }
}
