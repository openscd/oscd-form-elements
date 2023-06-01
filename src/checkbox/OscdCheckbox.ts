import { html, css } from 'lit';
import { property, query, state } from 'lit/decorators.js';

// eslint-disable-next-line import/no-duplicates
import { Checkbox } from '@material/mwc-checkbox';

// eslint-disable-next-line import/no-duplicates
import '@material/mwc-checkbox';

import { OptionalFormControlImpl } from '../form-control/optional-form-control.impl.js';

/**
 *
 * @cssprop --oscd-checkbox-theme-background - Controls the color of the checkbox
 * @cssprop --oscd-theme-secondary - Fallback for --oscd-checkbox-theme-background
 *
 */
export class OscdCheckbox extends OptionalFormControlImpl<Checkbox> {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public setCustomValidity(validity: string): void {
    // Do nothing
  }

  // eslint-disable-next-line class-methods-use-this
  public reportValidity(): boolean {
    return true;
  }

  /**
   * @prop {boolean} defaultChecked - Checkbox should be checked by default
   */
  @property({ type: Boolean })
  defaultChecked = false;

  @query('mwc-checkbox')
  formControl!: Checkbox;

  private initChecked = false;

  @state()
  get checked(): boolean {
    return this.formControl?.checked ?? this.initChecked;
  }

  set checked(value: boolean) {
    if (this.formControl) this.formControl.checked = value;
    else this.initChecked = value;
  }

  @state()
  private deactivateCheckbox = false;

  @state()
  get formFieldLabel(): string {
    return this.helper ? `${this.helper} (${this.label})` : this.label || '';
  }

  // eslint-disable-next-line class-methods-use-this
  protected validate(): boolean {
    return true;
  }

  protected renderFormControl() {
    return html`<mwc-checkbox
      ?checked=${this.checked}
      ?disabled=${this.deactivateCheckbox || this.disabled}
      ?required=${this.required}
      .label=${this.label || ''}
      .helper=${this.helper}
      .validationMessage=${this.validationMessage}
    ></mwc-checkbox>`;
  }

  protected enable(): void {
    if (this.nulled === null) return;
    this.checked = this.nulled === 'true';
    this.nulled = null;
    this.deactivateCheckbox = false;
  }

  protected disable(): void {
    if (this.nulled !== null) return;
    this.nulled = this.checked.toString();
    this.checked = this.defaultChecked;
    this.deactivateCheckbox = true;
  }

  firstUpdated(): void {
    this.requestUpdate();
  }

  static styles = css`
    :host {
      --mdc-checkbox-checked-color: var(
        --oscd-checkbox-theme-background,
        var(--oscd-theme-secondary)
      );
    }
  `;
}
