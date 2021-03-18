import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | internal", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    let controller = this.owner.lookup("controller:internal");
    assert.ok(controller);
  });
});
