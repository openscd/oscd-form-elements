import { html, TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import '@material/mwc-formfield';
// eslint-disable-next-line import/no-duplicates
import '@material/mwc-switch';

// eslint-disable-next-line import/no-duplicates
import { Switch } from '@material/mwc-switch';

import { FormControlImpl } from './form-control.impl.js';
import { OptionalFormControl } from './optional-form-control.js';

export abstract class OptionalFormControlImpl<T extends HTMLElement>
  extends FormControlImpl<T>
  implements OptionalFormControl
{
  @query(`mwc-switch`)
  protected nullSwitch?: Switch;

  /**
   * @prop {boolean} nullable - True if the Form Control can be nullable
   */
  @property({
    type: Boolean,
  })
  nullable: boolean = false;

  set maybeValue(value: string | undefined) {
    this._maybeValue = value;
    if (value) {
      this.value = value;
    }
    this.null = value === null || typeof value === 'undefined' || value === '';
  }

  /**
   * @prop {string | undefined} maybeValue - The maybeValue of the Form Control
   */
  @property({
    type: String,
    reflect: true,
  })
  get maybeValue(): string | undefined {
    return this._maybeValue;
  }

  protected _maybeValue: string | undefined = undefined;

  /**
   * @prop {string} defaultValue - The default value of the Form Control if no value is present
   */
  @property({
    type: String,
    reflect: true,
  })
  defaultValue: string = '';

  @state()
  get null(): boolean {
    return this.nullable && this.isNull;
  }

  set null(value: boolean) {
    if (!this.nullable || value === this.isNull) {
      return;
    }
    this.isNull = value;

    if (this.null) this.disable();
    else this.enable();
  }

  private isNull = false;

  protected nulled: string | null = null;

  abstract get formFieldLabel(): string;

  renderSwitch(): TemplateResult {
    if (this.nullable) {
      return html`<mwc-switch
        style="margin-left: 12px;"
        ?selected=${!this.null}
        @click=${() => {
          this.null = !this.nullSwitch!.selected;
        }}
      ></mwc-switch>`;
    }
    return html``;
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">
          <mwc-formfield .label=${this.formFieldLabel || ''}
            >${this.renderFormControl()}</mwc-formfield
          >
        </div>
        <div style="display: flex; align-items: center; height: 56px;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }

  protected enable(): void {
    if (this.nulled === null) return;
    this.value = this.nulled;
    this.nulled = null;
    this.helperPersistent = false;
    this.disabled = false;
  }

  protected disable(): void {
    if (this.nulled !== null) return;
    this.nulled = this.value;
    this.value = this.defaultValue;
    this.helperPersistent = true;
    this.disabled = true;
  }
}
