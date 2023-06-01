import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import { OscdSelect } from '../src/select/OscdSelect.js';
import '../src/select/oscd-select.js';
import { OptionalFormControl } from '../src/form-control/optional-form-control.js';

describe('oscd-select', () => {
  const createElement = async (
    options: Partial<OptionalFormControl>,
    values: string[]
  ): Promise<OscdSelect> => {
    const el = await fixture<OscdSelect>(
      html`<oscd-select
        .value=${options.value || ''}
        .maybeValue=${options.maybeValue}
        .defaultValue=${options.defaultValue || ''}
        ?disabled=${options.disabled}
        ?nullable=${options.nullable}
        ?required=${options.required}
      >
        ${values.map(
          value => html`<mwc-list-item .value=${value}>value</mwc-list-item>`
        )}
      </oscd-select>`
    );

    return el;
  };

  it('has value', async () => {
    const value: string = 'TEST VALUE';

    const el = await createElement(
      {
        value,
      },
      ['TEST', 'TEST VALUE']
    );

    expect(el.value).to.deep.equal(value);
  });

  it('has maybeValue', async () => {
    const maybeValue: string = 'TEST VALUE';

    const el = await createElement(
      {
        maybeValue,
      },
      ['TEST', 'TEST VALUE']
    );

    expect(el.maybeValue).to.deep.equal(maybeValue);
  });

  it('is disabled', async () => {
    const el = await createElement(
      {
        disabled: true,
      },
      ['TEST', 'TEST VALUE']
    );

    expect(el.disabled).is.true;
  });

  it('is required', async () => {
    const el = await createElement(
      {
        required: true,
      },
      ['TEST', 'TEST VALUE']
    );

    expect(el.required).is.true;
  });

  it('is nullable', async () => {
    const el = await createElement(
      {
        nullable: true,
      },
      ['TEST', 'TEST VALUE']
    );

    expect(el.nullable).is.true;
    expect(el.shadowRoot?.querySelector('mwc-switch')).to.have.property(
      'selected',
      true
    );
  });

  it('Has default value', async () => {
    const defaultValue: string = 'DEFAULT VALUE';

    const el = await createElement(
      {
        defaultValue,
      },
      ['TEST', 'TEST VALUE']
    );

    expect(el.defaultValue).to.equal(defaultValue);
  });

  it('Has value on maybeValue', async () => {
    const maybeValue: string = 'VALUE';

    const el = await createElement(
      {
        maybeValue,
        nullable: true,
      },
      ['TEST', 'VALUE']
    );

    await el.updateComplete;

    expect(el.value).to.equal(maybeValue);
  });

  it('Shows default value when disabled', async () => {
    const defaultValue: string = 'DEFAULT_VALUE';
    const value: string = 'VALUE';

    const el = await createElement(
      {
        value,
        defaultValue,
        nullable: true,
      },
      ['TEST', 'VALUE', 'DEFAULT_VALUE']
    );

    await el.updateComplete;

    expect(el.value).to.equal(value);

    const switchEl = el.shadowRoot!.querySelector('mwc-switch');

    switchEl?.click();

    await el.updateComplete;

    expect(el.value).to.equal(defaultValue);
  });

  it('should report validity', async () => {
    const el = await createElement(
      {
        maybeValue: undefined,
        required: true,
      },
      ['TEST', 'TEST VALUE']
    );

    await el.updateComplete;

    expect(el.validationMessage).is.empty;

    const isValid = el.reportValidity();

    await el.updateComplete;

    expect(isValid).to.be.false;
  });
});
