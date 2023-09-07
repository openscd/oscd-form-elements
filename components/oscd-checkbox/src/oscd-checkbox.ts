import {
  html,
  property,
  query,
  state,
  CSSResultGroup,
  TemplateResult,
} from "lit-element";

import { OscdElement } from "@openscd/oscd-component-core";

import "@material/mwc-formfield";
import "@material/mwc-switch";
import "@material/mwc-checkbox";
import { Checkbox } from "@material/mwc-checkbox";
import { Switch } from "@material/mwc-switch";

import styles from "./oscd-checkbox.styles.js";

/**
 * @prop {string} label - Text label rendered after the checkbox.
 * @prop {string} helper - Parenthetical information rendered after the label: `label (helper)`
 * @prop {boolean} nullable - Whether [[`maybeValue`]] may be `null`
 * @prop {string} defaultChecked - The default `checked` state while [[`maybeValue`]] is `null`.
 * @prop {string} maybeValue - Is `"true"` when checked, `"false"` un-checked, `null` if [[`nullable`]].
 * @prop {boolean} disabled - Disables component including null switch
 *
 * @tagname  oscd-checkbox
 */
export class OscdCheckbox extends OscdElement {
  static styles: CSSResultGroup = styles;

  @property({ type: String })
  label = "";

  @property({ type: String })
  helper = "";

  @property({ type: Boolean })
  nullable = false;

  @property({ type: Boolean })
  defaultChecked = false;

  @property({ type: String })
  get maybeValue(): string | null {
    return this.null ? null : this.checked ? "true" : "false";
  }
  set maybeValue(check: string | null) {
    if (check === null) this.null = true;
    else {
      this.null = false;
      this.checked = check === "true" ? true : false;
    }
  }

  @property({ type: Boolean })
  disabled = false;

  private isNull = false;

  @state()
  private get null(): boolean {
    return this.nullable && this.isNull;
  }
  private set null(value: boolean) {
    if (!this.nullable || value === this.isNull) return;
    this.isNull = value;
    if (this.null) this.disable();
    else this.enable();
  }

  private initChecked = false;

  @state()
  get checked(): boolean {
    return this.checkbox?.checked ?? this.initChecked;
  }
  set checked(value: boolean) {
    if (this.checkbox) this.checkbox.checked = value;
    else this.initChecked = value;
  }

  @state()
  private deactivateCheckbox = false;
  @state()
  get formfieldLabel(): string {
    return this.helper ? `${this.label} (${this.helper})` : this.label;
  }

  @query("mwc-switch") nullSwitch?: Switch;
  @query("mwc-checkbox") checkbox?: Checkbox;

  private nulled: boolean | null = null;

  private enable(): void {
    if (this.nulled === null) return;
    this.checked = this.nulled;
    this.nulled = null;
    this.deactivateCheckbox = false;
  }

  private disable(): void {
    if (this.nulled !== null) return;
    this.nulled = this.checked;
    this.checked = this.defaultChecked;
    this.deactivateCheckbox = true;
  }

  firstUpdated(): void {
    this.requestUpdate();
  }

  renderSwitch(): TemplateResult {
    if (this.nullable) {
      return html`<mwc-switch
        style="margin-left: 12px;"
        ?selected=${!this.null}
        ?disabled=${this.disabled}
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
          <mwc-formfield
            label="${this.formfieldLabel}"
            style="${this.deactivateCheckbox || this.disabled
              ? `--mdc-theme-text-primary-on-background:rgba(0, 0, 0, 0.38)`
              : ``}"
            ><mwc-checkbox
              ?checked=${this.initChecked}
              ?disabled=${this.deactivateCheckbox || this.disabled}
            ></mwc-checkbox
          ></mwc-formfield>
        </div>
        <div style="display: flex; align-items: center;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }
}
