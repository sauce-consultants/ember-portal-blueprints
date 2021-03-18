import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | external/reset-password', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:external/reset-password');
    assert.ok(route);
  });
});
