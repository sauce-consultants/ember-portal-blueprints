import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | external/login', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:external/login');
    assert.ok(route);
  });
});
