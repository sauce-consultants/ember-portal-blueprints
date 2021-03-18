import { module, test } from "qunit";
import { currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import setupCustomAssertions from "ember-cli-custom-assertions/test-support";
import {
  authenticateSession,
  invalidateSession,
} from "ember-simple-auth/test-support";
import { AUTHENTICATED_ADMIN } from "<%= app %>/tests/helpers/authenticated-users";
import { LOGIN_URL, HOME_URL } from "<%= app %>/tests/helpers/test-urls";
import Page from "<%= app %>/tests/pages/internal";

module("Acceptance | internal/index", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupCustomAssertions(hooks);

  test("visiting /internal/index unauthenticated", async function (assert) {
    await invalidateSession();

    await Page.visit();

    assert.equal(currentURL(), LOGIN_URL);
  });

  test("visiting /internal/index", async function (assert) {
    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), HOME_URL);

    // Check User details are in desktop nav

    assert.equal(Page.desktop.userInitials, "AA", "User adatar");
    assert.equal(Page.desktop.userName, `Ada Admin`, "User name");
    assert.equal(Page.desktop.userEmail, "ada@demo.com", "User email");

    // Check User details are in mobile nav

    assert.equal(Page.mobile.userInitials, "AA", "User adatar");
    assert.equal(Page.mobile.userName, `Ada Admin`, "User name");
    assert.equal(Page.mobile.userEmail, "ada@demo.com", "User email");
  });

  test("logout user from on desktop /internal/index", async function (assert) {
    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), HOME_URL);

    await Page.desktop.toggleUserItem().clickLogout();

    assert.equal(currentURL(), LOGIN_URL);
  });

  test("logout user from on mobile /internal/index", async function (assert) {
    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), HOME_URL);

    await Page.mobile.toggleUserItem().clickLogout();

    assert.equal(currentURL(), LOGIN_URL);
  });
});
