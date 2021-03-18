import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Helper | find-option-by", function (hooks) {
  setupRenderingTest(hooks);

  test("it returns the object by given key value", async function (assert) {
    this.set("options", [
      {
        label: "Foo",
        value: "foo",
      },
      {
        label: "Bar",
        value: "bar",
      },
      {
        label: "Foo Bar",
        value: "foobar",
      },
    ]);

    this.set("value", "bar");

    await render(hbs`{{find-option-by this.options "value" this.value}}`);

    assert.equal(this.element.textContent.trim(), "[object Object]");
  });

  test("it returns the object by given key boolean value", async function (assert) {
    this.set("options", [
      {
        label: "Yes",
        value: true,
      },
      {
        label: "No",
        value: false,
      },
    ]);

    this.set("value", true);

    await render(hbs`{{find-option-by this.options "value" this.value}}`);

    assert.equal(this.element.textContent.trim(), "[object Object]");
  });

  test("it returns the null if no option found", async function (assert) {
    this.set("options", [
      {
        label: "Foo",
        value: "foo",
      },
      {
        label: "Bar",
        value: "bar",
      },
      {
        label: "Foo Bar",
        value: "foobar",
      },
    ]);

    this.set("value", "barbar");

    await render(hbs`{{find-option-by this.options "value" this.value}}`);

    assert.equal(this.element.textContent.trim(), "");
  });
});
