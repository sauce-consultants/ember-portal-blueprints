import { module, test } from "qunit";
import { currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import setupCustomAssertions from "ember-cli-custom-assertions/test-support";
import {
  authenticateSession,
  invalidateSession,
} from "ember-simple-auth/test-support";
import { AUTHENTICATED_ADMIN } from "<%= appName %>/tests/helpers/authenticated-users";
import {
  LOGIN_URL,
  <%= capitalizedPlural %>_URL,
  <%= capitalizedSingular %>_INDEX_URL,
  <%= capitalizedSingular %>_EDIT_URL,
  <%= capitalizedSingular %>_ARCHIVE_URL,
} from "<%= appName %>/tests/helpers/test-urls";
import Navigation from "<%= appName %>/tests/pages/internal";
import Page from "<%= appName %>/tests/pages/internal/<%= dasherizedSingular %>/index";

const PAGE_URL = <%= capitalizedSingular %>_INDEX_URL;

module("Acceptance | <%= routePathSingular %>/index", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupCustomAssertions(hooks);

  test("Auth: visiting /<%= routePathSingular %>/index unauthenticated", async function (assert) {
    const resource = this.server.create("<%= dasherizedSingular %>")

    await invalidateSession();

    await Page.visit({
      id: resource.id,
    });

    assert.equal(currentURL(), LOGIN_URL);
  });

  test("Auth: visiting /<%= routePathSingular %>/index", async function (assert) {
    const resource = this.server.create("<%= dasherizedSingular %>"),
      describe = `<%= titleSingular %> ${resource.id}`;

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(":id", resource.id),
      "url is correct"
    );

    assert.equal(
      Page.title,
      `View <%= titleSingular %>: ${describe}`,
      "page heading is correct"
    );
    assert.equal(Page.crumbs.length, 3, "number of crumbs correct");
    assert.equal(
      Page.crumbs.objectAt(0).text,
      `<%= titlePlural%>`,
      "first page crumb is correct"
    );
    assert.equal(
      Page.crumbs.objectAt(1).text,
      describe,
      "last page crumb is correct"
    );

    // Check menu item is active

    assert.equal(
      Navigation.desktop.menu.<%= camelPlural %>.isActive,
      true,
      "desktop nav item is active"
    );
    assert.equal(
      Navigation.mobile.menu.<%= camelPlural %>.isActive,
      true,
      "mobile nav item is active"
    );

    // Check User details are in desktop nav

    assert.equal(Navigation.desktop.userInitials, "AA", "User avatar");
    assert.equal(Navigation.desktop.userName, `Ada Admin`, "User name");
    assert.equal(Navigation.desktop.userEmail, "ada@demo.com", "User email");

    // Check User details are in mobile nav

    assert.equal(Navigation.mobile.userInitials, "AA", "User avatar");
    assert.equal(Navigation.mobile.userName, `Ada Admin`, "User name");
    assert.equal(Navigation.mobile.userEmail, "ada@demo.com", "User email");
  });

  test("Navigation: back to list view /<%= routePathSingular %>/index", async function (assert) {
    const resource = this.server.create("<%= dasherizedSingular %>")

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(":id", resource.id),
      "url is correct"
    );

    // Click breadcrumb parent
    await Page.crumbs.objectAt(0).click();

    assert.equal(currentURL(), <%= capitalizedPlural %>_URL, "url is correct");
    assert.equal(Page.title, "List <%= titlePlural %>", "page heading is correct");
  });

  test("Navigation: load edit view /<%= routePathSingular %>/index", async function (assert) {
    const resource = this.server.create("<%= dasherizedSingular %>"),
      describe = `<%= titleSingular %> ${resource.id}`;

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(":id", resource.id),
      "url is correct"
    );

    assert.ok(Page.actions.view.isActive, 'View action is active');

    // Click edit action
    await Page.actions.edit.click();

    assert.equal(currentURL(), <%= capitalizedSingular %>_EDIT_URL.replace(':id', resource.id), "url is correct");

    assert.notOk(Page.actions.view.isActive, 'View action is unactive');
    assert.ok(Page.actions.edit.isActive, 'Edit action is active');

    assert.equal(Page.title, `Edit <%= titleSingular %>: ${describe}`, "page heading is correct");
  });

  test("Navigation: load archive view /<%= routePathSingular %>/index", async function (assert) {
    const resource = this.server.create("<%= dasherizedSingular %>"),
      describe = `<%= titleSingular %> ${resource.id}`;

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(":id", resource.id),
      "url is correct"
    );

    assert.ok(Page.actions.view.isActive, 'View action is active');

    // Click edit action
    await Page.actions.archive.click();

    assert.equal(currentURL(), <%= capitalizedSingular %>_ARCHIVE_URL.replace(':id', resource.id), "url is correct");

    assert.notOk(Page.actions.view.isActive, 'View action is unactive');
    assert.ok(Page.actions.archive.isActive, 'Archive action is active');

    assert.equal(Page.title, `Archive <%= titleSingular %>: ${describe}`, "page heading is correct");
  });

  test("Content: /<%= routePathSingular %>/index", async function (assert) {
    const resource = this.server.create("<%= dasherizedSingular %>")

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(":id", resource.id),
      "url is correct"
    );

    // Details Card
    assert.equal(
      Page.details.firstName,
      resource.firstName,
      "firstName is correct"
    );
    // assert.equal(Page.details.lastName, resource.lastName, "lastName is correct");
    // assert.equal(Page.details.email, resource.email, "email is correct");
    // assert.equal(Page.details.role, resource.role, "role is correct");
    // assert.equal(
    //   Page.details.lastLoginDate,
    //   resource.lastLoginDate,
    //   "lastLoginDate is correct"
    // );
    // assert.equal(
    //   Page.details.createdAt,
    //   resource.createdAt,
    //   "createdAt is correct"
    // );
    // assert.equal(
    //   Page.details.updatedAt,
    //   resource.updatedAt,
    //   "updatedAt is correct"
    // );
  });
});
