import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { Response } from "miragejs";
import { setupMirage } from "ember-cli-mirage/test-support";
import setupCustomAssertions from "ember-cli-custom-assertions/test-support";
import {
  authenticateSession,
  invalidateSession,
} from "ember-simple-auth/test-support";

import { AUTHENTICATED_ADMIN } from "<%= app %>/tests/helpers/authenticated-users";
import {
  LOGIN_URL,
  RESET_URL,
  HOME_URL,
} from "<%= app %>/tests/helpers/test-urls";
import ResetPasswordPage from "<%= app %>/tests/pages/external/reset-password";

module("Acceptance | external/reset-password", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupCustomAssertions(hooks);

  test("visiting /auth/reset-password", async function (assert) {
    await invalidateSession();

    await visit(RESET_URL);

    assert.equal(currentURL(), RESET_URL, "Correct URL");

    assert.equal(
      this.element.querySelector("[data-test-title]").textContent.trim(),
      "Reset your password"
    );
  });

  test("visiting /auth/reset-password when authenticated", async function (assert) {
    await authenticateSession(AUTHENTICATED_ADMIN);

    await visit(RESET_URL);

    assert.equal(currentURL(), HOME_URL, "Correct URL");
  });

  test("submit /auth/reset-password with valid details", async function (assert) {
    const user = AUTHENTICATED_ADMIN.data.attributes;

    this.server.create("user", user);

    await ResetPasswordPage.visit()
      .password("correctpass")
      .passwordConfirmation("correctpass")
      .submit();

    assert.equal(currentURL(), LOGIN_URL, "Correct URL");
  });

  test("submit /auth/reset-password with validation errors", async function (assert) {
    const user = AUTHENTICATED_ADMIN.data.attributes;

    this.server.create("user", user);

    await assert.asyncThrows(() => {
      return ResetPasswordPage.visit()
        .password("foo")
        .passwordConfirmation("thisisnotapassword")
        .submit();
    }, "Validation Errors");

    assert.equal(currentURL(), RESET_URL, "Correct URL");

    assert.equal(ResetPasswordPage.validationErrorsTitle, "Validation Errors");
    assert.equal(
      ResetPasswordPage.validationErrorsBody,
      "New Password: Password must be between 8 and 255 characters Confirm Password: Password confirmation doesn't match password"
    );
  });

  test("submit /auth/reset-password with invalid token", async function (assert) {
    // const user = AUTHENTICATED_ADMIN.data.attributes;
    //
    // this.server.create("user", user);

    // set up reset password to return an error
    this.server.put("/reset-password", function () {
      return new Response(
        422,
        {
          "Content-Type": "application/vnd.api+json",
        },
        {
          errors: [
            {
              status: "422",
              source: { pointer: "/data/attributes/token" },
              title: "Invalid Attribute",
              detail: "Token is not valid",
            },
          ],
        }
      );
    });

    await assert.asyncThrows(() => {
      return ResetPasswordPage.visit()
        .password("correctpass")
        .passwordConfirmation("correctpass")
        .submit();
    }, "Server Error");

    assert.equal(currentURL(), RESET_URL, "Correct URL");

    assert.equal(
      ResetPasswordPage.serverErrorsTitle,
      "Server Error",
      "Correct error title"
    );
    assert.equal(
      ResetPasswordPage.serverErrorsBody,
      "Token is not valid",
      "Correct error body"
    );
  });
});
