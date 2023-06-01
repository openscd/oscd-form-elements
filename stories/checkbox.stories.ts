import { html, TemplateResult } from 'lit';

import '../dist/src/checkbox/oscd-checkbox.js';

export default {
  title: 'OscdCheckbox',
  component: 'oscd-checkbox',
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    nullable: { control: 'boolean' },
    helper: { control: 'text' },
    validationMessage: { control: 'text' },
    checked: { control: 'boolean' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label: string;
  disabled?: boolean;
  required?: boolean;
  nullable?: boolean;
  helper?: string;
  validationMessage?: string;
  checked: boolean;
  slot: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  label,
  disabled,
  required,
  nullable,
  helper,
  validationMessage,
  checked,
  slot,
}: ArgTypes) => html`
  <oscd-checkbox
    .label=${label}
    ?disabled=${disabled}
    ?required=${required}
    ?nullable=${nullable}
    helper=${helper || ''}
    .validationMessage=${validationMessage || ''}
    ?checked=${checked}
    style="max-width:200px; display:block;"
    >${slot}</oscd-checkbox
  >
`;

export const Regular = Template.bind({});

Regular.args = {
  label: 'Storybook',
  disabled: false,
  required: false,
  helper: 'Helper text',
  validationMessage: 'Validation Message',
};
