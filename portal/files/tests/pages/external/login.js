import {
  create,
  fillable,
  clickable,
  text,
  visitable,
} from "ember-cli-page-object";
import { LOGIN_URL } from "<%= app %>/tests/helpers/test-urls";

export default create({
  visit: visitable(LOGIN_URL),

  email: fillable('[data-test-input="email"]'),
  password: fillable('[data-test-input="password"]'),

  submit: clickable('[data-test-button="submit"]'),

  serverErrorsTitle: text("[data-test-server-errors-title]"),
  serverErrorsBody: text("[data-test-server-errors-body]"),
  validationErrorsTitle: text("[data-test-validation-errors-title]"),
  validationErrorsBody: text("[data-test-validation-errors-body]"),
});
