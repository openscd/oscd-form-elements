import { fixture } from "@open-wc/testing";
import { html } from "lit";

import { visualDiff } from "@web/test-runner-visual-regression";

import "../src/OscdSelect.js";
import { OscdSelect } from "../src/OscdSelect.js";

const factor = process.env.CI ? 2 : 1;

function timeout(ms: number) {
  return new Promise((res) => {
    setTimeout(res, ms * factor);
  });
}

mocha.timeout(2000 * factor);

describe("oscd-select", () => {
  let element: OscdSelect;
  const items = ["one", "two", "three"];
  beforeEach(async () => {
    element = await fixture(
      html`<oscd-select
        >${items.map(
          (item) => html`<mwc-list-item value="${item}">${item}</mwc-list-item>`
        )}
      </oscd-select>`
    );
    document.body.prepend(element);
  });

  afterEach(() => element.remove());

  it("default select", async () => {
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-select");
  });

  it("select with label", async () => {
    element.label = "label";
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-select-label");
  });

  it("select with label and required flag", async () => {
    element.required = true;
    element.label = "label";
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-select-label-required");
  });

  it("select with label and helper", async () => {
    element.label = "label";
    element.helper = "helper";
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-select-helper");
  });

  it("select second element from list", async () => {
    element.value = items[1];
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-select-selected");
  });

  it("nullable select checked", async () => {
    element.value = items[1];
    element.nullable = true;
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-select-nullable");
  });

  it("set select to null", async () => {
    element.label = "label";
    element.value = items[1];
    element.nullable = true;
    await element.updateComplete;
    element.nullSwitch?.click();
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-select-nulled");
  });

  it("set select to null and with default value", async () => {
    element.label = "label";
    element.value = items[1];
    element.nullable = true;
    element.defaultValue = items[2];
    await element.updateComplete;
    element.nullSwitch?.click();
    await element.updateComplete;
    await timeout(500);
    await visualDiff(element, "oscd-select-nulled-checked");
  });
});
