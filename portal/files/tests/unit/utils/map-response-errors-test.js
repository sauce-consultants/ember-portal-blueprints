import mapResponseErrors from "<%= app %>/utils/map-response-errors";
import { module, test } from "qunit";

module("Unit | Utility | map-response-errors", function () {
  test("it works", function (assert) {
    const errors = {
      errors: [
        {
          detail: "Error 1",
        },
        {
          detail: "Error 2",
        },
      ],
    };

    let result = mapResponseErrors(errors);
    assert.equal(result[0], "Error 1");
    assert.equal(result[1], "Error 2");
  });
});
