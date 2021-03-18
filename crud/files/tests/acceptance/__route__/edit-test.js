import { module, test } from "qunit";
import { currentURL } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { setupMirage } from "ember-cli-mirage/test-support";
import setupCustomAssertions from "ember-cli-custom-assertions/test-support";
import {
  authenticateSession,
  invalidateSession,
} from "ember-simple-auth/test-support";
import { AUTHENTICATED_ADMIN } from "tchw/tests/helpers/authenticated-users";
import {
  LOGIN_URL,
  <%= pCaps %>_URL,
  <%= sCaps %>_INDEX_URL,
  <%= sCaps %>_EDIT_URL,
  <%= sCaps %>_ARCHIVE_URL,
} from "tchw/tests/helpers/test-urls";
import Navigation from "tchw/tests/pages/internal";
import Page from "tchw/tests/pages/internal/<%= s %>/edit";

const PAGE_URL = <%= sCaps %>_EDIT_URL;

module("Acceptance | <%= sRouteFiles %>/edit", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupCustomAssertions(hooks);

  test("Auth: visiting /<%= sRouteFiles %>/edit unauthenticated", async function (assert) {
    const resource = this.server.create("<%= s %>")

    await invalidateSession();

    await Page.visit({
      id: resource.id,
    });

    assert.equal(currentURL(), LOGIN_URL);
  });

  test("Auth: visiting /<%= sRouteFiles %>/edit", async function (assert) {
    const resource = this.server.create("<%= s %>")

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
      `Edit <%= sUpper%>: <%= sUpper%> ${resource.id}`,
      "page heading is correct"
    );
    assert.equal(Page.crumbs.length, 3, "number of crumbs correct");
    assert.equal(
      Page.crumbs.objectAt(0).text,
      `<%= pUpper %>`,
      "first page crumb is correct"
    );
    assert.equal(
      Page.crumbs.objectAt(1).text,
      ${resource.id},
      "last page crumb is correct"
    );

    // Check menu item is active

    assert.equal(
      Navigation.desktop.menu.<%= p %>.isActive,
      true,
      "desktop nav item is active"
    );
    assert.equal(
      Navigation.mobile.menu.<%= p %>.isActive,
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

  test("Navigation: back to list view /<%= sRouteFiles %>/edit", async function (assert) {
    const resource = this.server.create("<%= s %>")

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

    assert.equal(currentURL(), <%= pCaps %>_URL, "url is correct");
    assert.equal(Page.title, "List <%= pUpper %>", "page heading is correct");
  });

  test("Navigation: load read view /<%= sRouteFiles %>/edit", async function (assert) {
    const resource = this.server.create("<%= s %>")

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(":id", resource.id),
      "url is correct"
    );

    assert.ok(Page.actions.edit.isActive, 'Edit action is active');

    // Click view action
    await Page.actions.view.click();

    assert.equal(currentURL(), <%= sCaps %>_INDEX_URL.replace(':id', resource.id), "url is correct");

    assert.notOk(Page.actions.edit.isActive, 'Edit action is unactive');
    assert.ok(Page.actions.view.isActive, 'View action is active');

    assert.equal(Page.title, `View <%= sUpper %>: ${resource.id}`, "page heading is correct");
  });

  test("Navigation: load archive view /<%= sRouteFiles %>/edit", async function (assert) {

    const resource = this.server.create("<%= s %>")

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(":id", resource.id),
      "url is correct"
    );

    assert.ok(Page.actions.edit.isActive, 'Edit action is active');

    // Click view action
    await Page.actions.archive.click();

    assert.equal(currentURL(), <%= sCaps %>_ARCHIVE_URL.replace(':id', resource.id), "url is correct");

    assert.notOk(Page.actions.view.isActive, 'Edit action is unactive');
    assert.ok(Page.actions.archive.isActive, 'Archive action is active');

    assert.equal(Page.title, `Archive <%= sUpper %>: ${resource.id}`, "page heading is correct");
  });

  test("Content: <%= s %> /<%= sRouteFiles %>/edit", async function (assert) {
    const resource = this.server.create("<%= s %>")

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
    // assert.equal(
    //   Page.details.firstName,
    //   resource.firstName,
    //   "firstName is correct"
    // );
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
