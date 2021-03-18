import { module, test } from "qunit";
import { visit, currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import setupCustomAssertions from "ember-cli-custom-assertions/test-support";
import {
  authenticateSession,
  currentSession,
  invalidateSession,
} from "ember-simple-auth/test-support";

import { AUTHENTICATED_ADMIN } from "<%= app %>/tests/helpers/authenticated-users";
import { LOGIN_URL, HOME_URL } from "<%= app %>/tests/helpers/test-urls";
import LoginPage from "<%= app %>/tests/pages/external/login";

module("Acceptance | external/login", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupCustomAssertions(hooks);

  test("visiting /auth/login", async function (assert) {
    await invalidateSession();

    await visit(LOGIN_URL);

    assert.equal(currentURL(), LOGIN_URL);

    assert.equal(
      this.element.querySelector("[data-test-title]").textContent.trim(),
      "Log in to Sauce Portal"
    );
  });

  test("visiting /auth/login when authenticated", async function (assert) {
    await authenticateSession(AUTHENTICATED_ADMIN);

    await visit(LOGIN_URL);

    assert.equal(currentURL(), HOME_URL);
  });

  test("submit /auth/login with valid details", async function (assert) {
    const user = AUTHENTICATED_ADMIN.data.attributes;

    this.server.create("user", user);

    await LoginPage.visit()
      .email("ada@demo.com")
      .password("correctpass")
      .submit();

    assert.equal(currentURL(), HOME_URL);

    let sessionData = currentSession().get("data.authenticated");

    assert.equal(sessionData.data.attributes.email, user.email);
  });

  test("submit /auth/login with validation errors", async function (assert) {
    const user = AUTHENTICATED_ADMIN.data.attributes;

    this.server.create("user", user);

    await assert.asyncThrows(() => {
      return LoginPage.visit()
        .email("adaatexampledotcom")
        .password("")
        .submit();
    }, "Validation Errors");

    assert.equal(currentURL(), LOGIN_URL);

    assert.equal(LoginPage.validationErrorsTitle, "Validation Errors");
    assert.equal(
      LoginPage.validationErrorsBody,
      "Email: Email must be a valid email address Password: Password can't be blank Password must be between 8 and 255 characters"
    );
  });

  test("submit /auth/login with invalid details", async function (assert) {
    const user = AUTHENTICATED_ADMIN.data.attributes;

    this.server.create("user", user);

    await assert.asyncThrows(() => {
      return LoginPage.visit()
        .email("ada-no@demo.com")
        .password("correctpass")
        .submit();
    }, "Server Error");

    assert.equal(currentURL(), LOGIN_URL, "URL correct");

    assert.equal(
      LoginPage.serverErrorsTitle,
      "Server Error",
      "Correct error title"
    );
    assert.equal(
      LoginPage.serverErrorsBody,
      "Email is incorrect.",
      "Correct error body"
    );
  });
});
