import getApiUrl from "<%= app %>/utils/get-api-url";
import { module, test } from "qunit";
import ENV from "<%= app %>/config/environment";

module("Unit | Utility | get-api-url", function () {
  test("it returns the base api url ", function (assert) {
    let result = getApiUrl();
    assert.equal(result, `${ENV.rootApiURL}/${ENV.apiNamespace}`);
  });

  test("it returns an api url from a uri", function (assert) {
    let result = getApiUrl("/foo");
    assert.equal(result, `${ENV.rootApiURL}/${ENV.apiNamespace}/foo`);
  });

  test("it returns an api url from a full path", function (assert) {
    let result = getApiUrl("http://api.com/foo");
    assert.equal(result, "http://api.com/foo");
  });
});
