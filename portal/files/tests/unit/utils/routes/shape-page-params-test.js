import shapePageParams from '<%= app %>/utils/routes/shape-page-params';
import {
  module,
  test
} from 'qunit';

module('Unit | Utility | routes/shapePageParams', function() {

  test('it shapes page params', function(assert) {

    const params = {
      page: 1,
      size: 10,
      sort: 'foo',
      value: 'bar'
    }

    let result = shapePageParams(params);

    assert.equal(result.number, 1);
    assert.equal(result.size, 10);

    assert.equal(params.page, undefined);
    assert.equal(params.size, undefined);
    assert.equal(params.sort, 'foo');
    assert.equal(params.value, 'bar');

  });
});