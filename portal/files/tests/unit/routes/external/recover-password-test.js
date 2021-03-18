import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | external/recover-password', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:external/recover-password');
    assert.ok(route);
  });
});
