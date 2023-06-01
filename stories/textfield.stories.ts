import { html, TemplateResult } from 'lit';

import { ifDefined } from 'lit/directives/if-defined.js';

import '../dist/src/textfield/oscd-textfield.js';

export default {
  title: 'OscdTextfield',
  component: 'oscd-textfield',
  argTypes: {
    value: { control: 'text' },
    maybeValue: { control: 'text' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    nullable: { control: 'boolean' },
    minLength: { control: 'range' },
    maxLength: { control: 'range' },
    helper: { control: 'text' },
    validationMessage: { control: 'text' },
    defaultValue: { control: 'text' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string;
  value: string;
  maybeValue?: string;
  disabled?: boolean;
  required?: boolean;
  nullable?: boolean;
  minLength?: number;
  maxLength?: number;
  helper?: string;
  validationMessage?: string;
  defaultValue?: string;
}

const Template: Story<ArgTypes> = ({
  label,
  value,
  maybeValue,
  disabled,
  required,
  nullable,
  minLength,
  maxLength,
  helper,
  validationMessage,
  defaultValue,
}: ArgTypes) => html`
  <oscd-textfield
    .label=${label}
    .value=${value}
    .maybeValue=${maybeValue || ''}
    .defaultValue=${defaultValue || ''}
    ?disabled=${disabled}
    ?required=${required}
    ?nullable=${nullable}
    minLength=${ifDefined(minLength)}
    maxLength=${ifDefined(maxLength)}
    helper=${helper || ''}
    .validationMessage=${validationMessage || ''}
    style="max-width:200px; display:block;"
  ></oscd-textfield>
`;

export const Regular = Template.bind({});

Regular.args = {
  label: 'Storybook',
  value: 'Test Value',
  disabled: false,
  required: false,
  minLength: -1,
  maxLength: -1,
  helper: 'Helper text',
  validationMessage: 'Validation Message',
  defaultValue: 'Default Value',
};
