import {
  html,
  state,
  property,
  query,
  CSSResultGroup,
  TemplateResult,
} from "lit-element";

import { OscdElement } from "@openscd/oscd-component-core";

import "@material/mwc-switch";
import "@material/mwc-select";
import { Switch } from "@material/mwc-switch";
import { Select } from "@material/mwc-select";

import styles from "./oscd-select.styles.js";

export function redispatchEvent(element: OscdElement, event: Event) {
  element.requestUpdate();
  // For bubbling events in SSR light DOM (or composed), stop their propagation  // and dispatch the copy.
  const copy = Reflect.construct(event.constructor, [event.type, event]);
  if (event.bubbles && (!element.shadowRoot || event.composed)) {
    event.stopPropagation();
    copy.stopPropagation();
  }

  const dispatched = element.dispatchEvent(copy);
  if (!dispatched) {
    event.preventDefault();
  }
  return dispatched;
}

/**
 * @tag oscd-select
 */
export class OscdSelect extends OscdElement {
  static styles: CSSResultGroup = styles;

  /** Whether [[`maybeValue`]] may be `null` */
  @property({ type: Boolean })
  nullable = false;
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
  /** Replacement for `value`, can only be `null` if [[`nullable`]]. */
  @property({ type: String })
  get maybeValue(): string | null {
    return this.null ? null : this.value;
  }
  set maybeValue(value: string | null) {
    if (value === null) {
      this.null = true;
      if (!this.rendered) return;
      this.value = "";
    } else {
      this.null = false;
      this.value = value;
    }
  }
  /** The default `value` displayed if [[`maybeValue`]] is `null`. */
  @property({ type: String })
  defaultValue = "";
  /** Additional values that cause validation to fail. */
  @property({ type: Array })
  reservedValues: string[] = [];

  /**
   * @prop {String} value - The value of the Form Control
   */
  @property({
    type: String,
  })
  set value(value: string) {
    this._value = value;

    if (this.select) {
      this.select.value = value;
    }
  }

  get value(): string {
    return this.select ? this.select.value : this._value;
  }

  /**
   * @internal
   */
  private _value = "";

  @property({
    type: String,
  })
  label = "";

  @property({
    type: Boolean,
  })
  required = false;

  @property({
    type: String,
  })
  helper = "";

  @property({
    type: String,
  })
  validationMessage = "";

  @property({
    type: Boolean,
  })
  disabled = false;

  // FIXME: workaround to allow disable of the whole component - need basic refactor
  private disabledSwitch = false;

  @query("mwc-switch") nullSwitch?: Switch;

  @query("mwc-select")
  select!: Select;

  private nulled: string | null = null;

  private rendered = false;

  private enable(): void {
    if (this.nulled === null) return;
    this.value = this.nulled;
    this.nulled = null;
    this.disabled = false;
  }

  private disable(): void {
    if (this.nulled !== null) return;
    this.nulled = this.value;
    this.value = this.defaultValue;
    this.disabled = true;
  }

  async firstUpdated(
    _changedProperties: Map<string | number | symbol, unknown>
  ): Promise<void> {
    await super.firstUpdated(_changedProperties);
    this.select.requestUpdate;
    await this.select.updateComplete;
  }

  checkValidity(): boolean {
    if (this.nullable && !this.nullSwitch?.selected) return true;
    return this.select.checkValidity();
  }

  constructor() {
    super();
    this.addEventListener("selected", (event) => {
      redispatchEvent(this, event);
    });
    this.disabledSwitch = this.hasAttribute("disabled");
  }

  renderSwitch(): TemplateResult {
    if (this.nullable) {
      return html`<mwc-switch
        style="margin-left: 12px;"
        ?selected=${!this.null}
        ?disabled=${this.disabledSwitch}
        @click=${() => {
          this.null = !this.nullSwitch!.selected;
        }}
      ></mwc-switch>`;
    }
    return html``;
  }

  private renderSelect(): TemplateResult {
    return html`<mwc-select
      value=${this.value}
      ?nullable=${this.nullable}
      ?disabled=${this.disabled}
      ?required=${this.required}
      .label=${this.label}
      .helper=${this.helper}
      .validationMessage=${this.validationMessage}
      ><slot
    /></mwc-select>`;
  }

  render(): TemplateResult {
    this.rendered = true;
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">${this.renderSelect()}</div>
        <div style="display: flex; align-items: center; height: 56px;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }
}
