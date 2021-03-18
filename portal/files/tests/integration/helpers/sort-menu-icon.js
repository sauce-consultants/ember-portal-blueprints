import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";

module("Integration | Helper | find-option-by", function (hooks) {
  setupRenderingTest(hooks);

  test("it returns the asc icon", async function (assert) {
    this.set("sort", "foo");

    this.set("value", "foo");

    await render(hbs`{{sort-menu-icon this.sort this.value}}`);

    assert.equal(this.element.textContent.trim(), "arrow-narrow-up");
  });

  test("it returns the desc icon", async function (assert) {
    this.set("sort", "-foo");

    this.set("value", "foo");

    await render(hbs`{{sort-menu-icon this.sort this.value}}`);

    assert.equal(this.element.textContent.trim(), "arrow-narrow-down");
  });

  test("it returns no icon", async function (assert) {
    this.set("sort", "-bar");

    this.set("value", "foo");

    await render(hbs`{{sort-menu-icon this.sort this.value}}`);

    assert.equal(this.element.textContent.trim(), "");
  });
});
