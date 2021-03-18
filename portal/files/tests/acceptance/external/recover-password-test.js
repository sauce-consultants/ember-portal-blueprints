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
  RECOVER_URL,
  HOME_URL,
} from "<%= app %>/tests/helpers/test-urls";
import RecoverPasswordPage from "<%= app %>/tests/pages/external/recover-password";

module("Acceptance | external/recover-password", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupCustomAssertions(hooks);

  test("visiting /auth/recover-password", async function (assert) {
    await invalidateSession();

    await visit(RECOVER_URL);

    assert.equal(currentURL(), RECOVER_URL, "Correct URL");

    assert.equal(
      this.element.querySelector("[data-test-title]").textContent.trim(),
      "Forgot your password?"
    );
  });

  test("visiting /auth/recover-password when authenticated", async function (assert) {
    await authenticateSession(AUTHENTICATED_ADMIN);

    await visit(RECOVER_URL);

    assert.equal(currentURL(), HOME_URL, "Correct URL");
  });

  test("submit /auth/recover-password with valid details", async function (assert) {
    const user = AUTHENTICATED_ADMIN.data.attributes;

    this.server.create("user", user);

    await RecoverPasswordPage.visit().email("ada@demo.com").submit();

    assert.equal(currentURL(), LOGIN_URL, "Correct URL");
  });

  test("submit /auth/recover-password with validation errors", async function (assert) {
    const user = AUTHENTICATED_ADMIN.data.attributes;

    this.server.create("user", user);

    await assert.asyncThrows(() => {
      return RecoverPasswordPage.visit().email("ada@democom").submit();
    }, "Validation Errors");

    assert.equal(currentURL(), RECOVER_URL, "Correct URL");

    assert.equal(
      RecoverPasswordPage.validationErrorsTitle,
      "Validation Errors"
    );
    assert.equal(
      RecoverPasswordPage.validationErrorsBody,
      "Email: Email must be a valid email address"
    );
  });

  test("submit /auth/recover-password with invalid email", async function (assert) {
    // const user = AUTHENTICATED_ADMIN.data.attributes;
    //
    // this.server.create("user", user);

    // set up recover password to return an error
    this.server.post("/recover-password", function () {
      return new Response(
        422,
        {
          "Content-Type": "application/vnd.api+json",
        },
        {
          errors: [
            {
              status: "422",
              source: { pointer: "/data/attributes/email" },
              title: "Invalid Attribute",
              detail: "Email not found",
            },
          ],
        }
      );
    });

    await assert.asyncThrows(() => {
      return RecoverPasswordPage.visit().email("me@notfound.com").submit();
    }, "Server Error");

    assert.equal(currentURL(), RECOVER_URL, "Correct URL");

    assert.equal(
      RecoverPasswordPage.serverErrorsTitle,
      "Server Error",
      "Correct error title"
    );
    assert.equal(
      RecoverPasswordPage.serverErrorsBody,
      "Email not found",
      "Correct error body"
    );
  });
});
