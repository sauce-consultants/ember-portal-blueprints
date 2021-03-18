import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | external/reset-password", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    let controller = this.owner.lookup("controller:external/reset-password");
    assert.ok(controller);
  });
});
