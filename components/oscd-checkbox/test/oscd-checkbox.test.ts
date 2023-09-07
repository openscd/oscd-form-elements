import { fixture } from "@open-wc/testing";
import { html } from "lit";

import { visualDiff } from "@web/test-runner-visual-regression";

import "../src/OscdCheckbox.js";
import { OscdCheckbox } from "../src/OscdCheckbox.js";

const factor = process.env.CI ? 2 : 1;

function timeout(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms * factor);
  });
}

mocha.timeout(2000 * factor);

describe("oscd-checkbox", () => {
  let element: OscdCheckbox;

  beforeEach(async () => {
    element = await fixture(html`<oscd-checkbox> </oscd-checkbox>`);
    document.body.prepend(element);
  });

  afterEach(() => element.remove());

  it("default checkbox", async () => {
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-checkbox");
  });

  it("checkbox with label", async () => {
    element.label = "label";
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-checkbox-label");
  });

  it("checkbox with label and helper", async () => {
    element.label = "label";
    element.helper = "helper";
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-checkbox-helper");
  });

  it("checkbox checked", async () => {
    element.checked = true;
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-checkbox-checked");
  });

  it("nullable checkbox checked", async () => {
    element.nullable = true;
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-checkbox-nullable");
  });

  it("nullable checkbox checked", async () => {
    element.nullable = true;
    element.checked = true;
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-checkbox-nullable-checked");
  });

  it("set checkbox to null", async () => {
    element.nullable = true;
    await element.updateComplete;
    element.nullSwitch?.click();
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-checkbox-nulled");
  });

  it("set checkbox to null and checked", async () => {
    element.nullable = true;
    element.defaultChecked = true;
    await element.updateComplete;
    element.nullSwitch?.click();
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-checkbox-nulled-checked");
  });
});
