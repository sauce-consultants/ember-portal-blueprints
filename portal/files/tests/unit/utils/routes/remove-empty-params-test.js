import routesRemoveEmptyParams from '<%= app %>/utils/routes/remove-empty-params';
import {
  module,
  test
} from 'qunit';

module('Unit | Utility | routes/removeEmptyParams', function() {

  test('it removes all empty params', function(assert) {
    const params = {
      aString: 'foo',
      emptyString: '',
      boolean: false,
      isNull: null,
    }
    let result = routesRemoveEmptyParams(params);

    assert.equal(result.aString, 'foo');
    assert.equal(result.emptyString, undefined);
    assert.equal(result.boolean, false);
    assert.equal(result.isNull, undefined);
  });
});