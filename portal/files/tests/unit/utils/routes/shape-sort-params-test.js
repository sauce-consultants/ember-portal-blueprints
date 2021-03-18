import shapeSortParams from '<%= app %>/utils/routes/shape-sort-params';
import {
  module,
  test
} from 'qunit';

module('Unit | Utility | routes/shapeSortParams', function() {

  test('it shapes sort params', function(assert) {

    const params = {
      page: 1,
      size: 10,
      sort: 'foo',
      value: 'bar'
    }
    let sort = shapeSortParams(params);

    assert.equal(sort, 'foo');

    assert.equal(params.sort, undefined);
    assert.equal(params.value, 'bar');
  });
});