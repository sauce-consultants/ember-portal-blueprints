import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

module("Unit | Controller | external/login", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    let controller = this.owner.lookup("controller:external/login");
    assert.ok(controller);
  });
});
