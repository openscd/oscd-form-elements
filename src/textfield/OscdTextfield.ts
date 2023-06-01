import { css, html } from 'lit';
import { query, state } from 'lit/decorators.js';

// eslint-disable-next-line import/no-duplicates
import '@material/mwc-textfield';

// eslint-disable-next-line import/no-duplicates
import { TextField } from '@material/mwc-textfield';

import { OptionalFormControlImpl } from '../form-control/optional-form-control.impl.js';

export class OscdTextfield extends OptionalFormControlImpl<TextField> {
  @query('mwc-textfield')
  formControl!: TextField;

  // eslint-disable-next-line class-methods-use-this
  @state()
  get formFieldLabel(): string {
    return '';
  }

  public setCustomValidity(validity: string): void {
    this.formControl.setCustomValidity(validity);
  }

  protected validate(): boolean {
    return this.formControl.checkValidity();
  }

  renderFormControl() {
    return html`<mwc-textfield
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
    ></mwc-textfield>`;
  }

  static styles = css`
    :host {
      --mdc-theme-primary: var(--oscd-color-primary);
      --mdc-theme-error: var(--oscd-color-state-error);
    }
  `;
}
