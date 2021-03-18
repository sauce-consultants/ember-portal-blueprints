import {
  create,
  fillable,
  clickable,
  text,
  visitable,
} from "ember-cli-page-object";
import { RECOVER_URL } from "<%= app %>/tests/helpers/test-urls";

export default create({
  visit: visitable(RECOVER_URL),

  email: fillable('[data-test-input="email"]'),

  submit: clickable('[data-test-button="submit"]'),

  serverErrorsTitle: text("[data-test-server-errors-title]"),
  serverErrorsBody: text("[data-test-server-errors-body]"),
  validationErrorsTitle: text("[data-test-validation-errors-title]"),
  validationErrorsBody: text("[data-test-validation-errors-body]"),
});
