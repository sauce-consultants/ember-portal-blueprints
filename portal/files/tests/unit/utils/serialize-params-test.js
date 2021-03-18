import serializeParams from '<%= app %>/utils/serialize-params';
import {
  module,
  test
} from 'qunit';

module('Unit | Utility | serialize-params', function() {

  test('serailize object', function(assert) {
    let params = {
        sort: 'date',
        filter: {
          isAdmin: true,
          role: 'admin'
        }
      },
      result = serializeParams(params);

    assert.equal(result, 'sort=date&filter%5BisAdmin%5D=true&filter%5Brole%5D=admin');
  });

  test('serailize empty object', function(assert) {
    let params = {},
      result = serializeParams(params);

    assert.equal(result, '');
  });

  test('serailize null', function(assert) {
    let result = serializeParams();

    assert.equal(result, '');
  });
});