import { html, TemplateResult } from "lit-element";
import "../src/OscdCheckbox.js";

export default {
  title: "OscdCheckbox",
  component: "oscd-checkbox",
  argTypes: {
    label: { control: "text" },
    helper: { control: "text" },
    nullable: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    maybeValue: { control: "text" },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  label?: string;
  helper?: string;
  nullable: boolean;
  defaultChecked: boolean;
  maybeValue: string | null;
}

const Template: Story<ArgTypes> = ({
  label = "",
  helper = "",
  nullable = false,
  defaultChecked = false,
  maybeValue = null,
}: ArgTypes) => {
  return html` <oscd-checkbox
    .label=${label}
    .helper=${helper}
    ?nullable=${nullable}
    ?defaultChecked=${defaultChecked}
    .maybeValue=${maybeValue}
  >
  </oscd-checkbox>`;
};
export const Regular = Template.bind({});
