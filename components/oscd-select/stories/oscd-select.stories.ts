import { html, TemplateResult } from "lit-element";
import "../src/OscdSelect.js";

const items = ["one", "two", "three"];

export default {
  title: "OscdSelect",
  component: "oscd-select",
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
    //required: { control: "boolean" },
    nullable: { control: "boolean" },
    defaultValue: { control: "text" },
    validationMessage: { control: "text" },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  value: string | null;
  label?: string;
  helper?: string;
  required: boolean;
  nullable: boolean;
  defaultValue?: string;
  validationMessage?: string;
}

const Template: Story<ArgTypes> = ({
  value = null,
  label = "Label",
  helper = "",
  nullable = false,
  required = false,
  defaultValue = "",
  validationMessage = "",
}: ArgTypes) => {
  return html` <oscd-select
    .maybeValue=${null}
    .label=${label}
    .helper=${helper}
    .nullSwitch.selected="false"
    ?nullable=${nullable}
    ?required=${required}
    .defaultValue=${defaultValue}
    .validationMessage=${validationMessage}
    >${items.map(
      (item) => html`<mwc-list-item value="${item}">${item}</mwc-list-item>`
    )}
  </oscd-select>`;
};
export const Regular = Template.bind({});

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helper: "some helper text",
};

export const RequiredField = Template.bind({});
RequiredField.args = {
  required: true,
};

export const WithNullSwitch = Template.bind({});
WithNullSwitch.args = {
  nullable: true,
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  nullable: true,
  defaultValue: "two",
  value: null,
};

export const WithValidationMessage = Template.bind({});
WithValidationMessage.args = {
  required: true,
  validationMessage: "Error: Incorrect value",
  value: "incorrect value",
};
