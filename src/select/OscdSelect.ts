import { css, html } from 'lit';
import { query, state } from 'lit/decorators.js';

// eslint-disable-next-line import/no-duplicates
import '@material/mwc-select';

// eslint-disable-next-line import/no-duplicates
import { Select } from '@material/mwc-select';

import { OptionalFormControlImpl } from '../form-control/optional-form-control.impl.js';

export class OscdSelect extends OptionalFormControlImpl<Select> {
  public setCustomValidity(validity: string): void {
    this.formControl.setCustomValidity(validity);
  }

  public reportValidity(): boolean {
    return this.formControl.reportValidity();
  }

  @query('mwc-select')
  formControl!: Select;

  // eslint-disable-next-line class-methods-use-this
  @state()
  get formFieldLabel(): string {
    return '';
  }

  protected validate(): boolean {
    return this.formControl.checkValidity();
  }

  renderFormControl() {
    return html`<mwc-select
      .value=${this.value}
      ?disabled=${this.disabled}
      ?required=${this.required}
      min=${this.min}
      max=${this.max}
      minLength=${this.minLength}
      maxLength=${this.maxLength}
      .label=${this.label || ''}
      .helper=${this.helper}
      .validationMessage=${this.validationMessage}
      @selected=${() => {
        this.value = this.formControl.value;
      }}
      ><slot></slot
    ></mwc-select>`;
  }

  static styles = css`
    :host {
      --mdc-theme-primary: var(--oscd-color-primary);

      --mdc-select-focused-label-color: var(
        --oscd-color-select-focus,
        var(--oscd-color-primary)
      );
      --mdc-select-focused-dropdown-icon-color: var(
        --oscd-color-select-focus,
        var(--oscd-color-primary)
      );

      --mdc-select-error-dropdown-icon-color: var(
        --oscd-color-select-error,
        var(--oscd-color-state-error)
      );

      --mdc-select-error-color: var(
        --oscd-color-select-error,
        var(--oscd-color-state-error)
      );

      --mdc-theme-error: var(
        --oscd-color-select-error,
        var(--oscd-color-state-error)
      );
    }
  `;
}
