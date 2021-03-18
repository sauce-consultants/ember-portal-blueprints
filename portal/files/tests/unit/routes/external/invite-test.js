import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | external/invite', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:external/invite');
    assert.ok(route);
  });
});
