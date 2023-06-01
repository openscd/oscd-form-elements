import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { OscdTextfield } from '../src/textfield/OscdTextfield.js';
import '../src/textfield/oscd-textfield.js';
import { OptionalFormControl } from '../src/form-control/optional-form-control.js';

describe('oscd-textfield', () => {
  const createElement = async (
    options: Partial<OptionalFormControl>
  ): Promise<OscdTextfield> => {
    const el = await fixture<OscdTextfield>(
      html`<oscd-textfield
        .value=${options.value || ''}
        .maybeValue=${options.maybeValue}
        .defaultValue=${options.defaultValue || ''}
        ?disabled=${options.disabled}
        ?nullable=${options.nullable}
        ?required=${options.required}
      ></oscd-textfield>`
    );

    return el;
  };

  it('has value', async () => {
    const value: string = 'TEST VALUE';

    const el = await createElement({
      value,
    });

    expect(el.value).to.deep.equal(value);
  });

  it('has maybeValue', async () => {
    const maybeValue: string = 'TEST VALUE';

    const el = await createElement({
      maybeValue,
    });

    expect(el.maybeValue).to.deep.equal(maybeValue);
  });

  it('is disabled', async () => {
    const el = await createElement({
      disabled: true,
    });

    expect(el.disabled).is.true;
  });

  it('is required', async () => {
    const el = await createElement({
      required: true,
    });

    expect(el.required).is.true;
  });

  it('is nullable', async () => {
    const el = await createElement({
      nullable: true,
    });

    expect(el.nullable).is.true;
    expect(el.shadowRoot?.querySelector('mwc-switch')).to.have.property(
      'selected',
      true
    );
  });

  it('Has default value', async () => {
    const defaultValue: string = 'DEFAULT VALUE';

    const el = await createElement({
      defaultValue,
    });

    expect(el.defaultValue).to.equal(defaultValue);
  });

  it('Has value on maybeValue', async () => {
    const maybeValue: string = 'VALUE';

    const el = await createElement({
      maybeValue,
      nullable: true,
    });

    await el.updateComplete;

    expect(el.value).to.equal(maybeValue);
  });

  it('Shows default value when disabled', async () => {
    const defaultValue: string = 'DEFAULT_VALUE';
    const value: string = 'VALUE';

    const el = await createElement({
      value,
      defaultValue,
      nullable: true,
    });

    await el.updateComplete;

    expect(el.value).to.equal(value);

    const switchEl = el.shadowRoot!.querySelector('mwc-switch');

    switchEl?.click();

    await el.updateComplete;

    expect(el.value).to.equal(defaultValue);
  });
});
