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
  <%= capitalizedPlural %>_URL,
  <%= capitalizedSingular %>_INDEX_URL,
} from "tchw/tests/helpers/test-urls";
import Navigation from "tchw/tests/pages/internal";
import Page from "tchw/tests/pages/<%= routePathPlural %>/index";
import presignHandler from "tchw/mirage/helpers/presign-handler";

const PAGE_URL = <%= capitalizedPlural %>_URL;

module("Acceptance | <%= routePathPlural %>/index", function (hooks) {

  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupCustomAssertions(hooks);

  test("Auth: visiting /<%= routePathPlural %>/index unauthenticated", async function (assert) {
    await invalidateSession();

    await Page.visit();

    assert.equal(currentURL(), LOGIN_URL);
  });

  test("Auth: visiting /<%= routePathPlural %>/index", async function (assert) {
    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

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

  test("Pagination: loading page 1 of /<%= routePathPlural %>/index", async function (assert) {

    this.server.createList("<%= dasherizedSingular %>", 42);

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    // Pagination

    assert.ok(
      Page.topPagination.mobile.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.ok(
      Page.topPagination.desktop.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.ok(
      Page.bottomPagination.mobile.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.ok(
      Page.bottomPagination.desktop.prevIsDisabled,
      "previous pagination disabled"
    );

    assert.equal(
      Page.topPagination.mobile.label,
      "1 - 20 of 42",
      "top pagination label on mobile"
    );
    assert.equal(
      Page.topPagination.desktop.label,
      "1 - 20 of 42",
      "top pagination label on desktop"
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      "1 - 20 of 42",
      "bottom pagination label on mobile"
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      "1 - 20 of 42",
      "bottom pagination label on desktop"
    );

    assert.equal(Page.listItems.length, 20, "record list items");

    // Move to next page

    await Page.topPagination.mobile.next();

    assert.equal(currentURL(), `${PAGE_URL}?page=2`, "url is correct");

    assert.equal(
      Page.topPagination.mobile.label,
      "21 - 40 of 42",
      "top pagination label on mobile"
    );
    assert.equal(
      Page.topPagination.desktop.label,
      "21 - 40 of 42",
      "top pagination label on desktop"
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      "21 - 40 of 42",
      "bottom pagination label on mobile"
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      "21 - 40 of 42",
      "bottom pagination label on desktop"
    );

    assert.equal(Page.listItems.length, 20, "record list items");

    // Move to next page

    await Page.topPagination.desktop.next();

    assert.equal(currentURL(), `${PAGE_URL}?page=3`, "url is correct");

    assert.ok(
      Page.topPagination.mobile.nextIsDisabled,
      "next pagination disabled"
    );
    assert.ok(
      Page.topPagination.desktop.nextIsDisabled,
      "next pagination disabled"
    );
    assert.ok(
      Page.bottomPagination.mobile.nextIsDisabled,
      "next pagination disabled"
    );
    assert.ok(
      Page.bottomPagination.desktop.nextIsDisabled,
      "next pagination disabled"
    );

    assert.equal(
      Page.topPagination.mobile.label,
      "41 - 42 of 42",
      "top pagination label on mobile"
    );
    assert.equal(
      Page.topPagination.desktop.label,
      "41 - 42 of 42",
      "top pagination label on desktop"
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      "41 - 42 of 42",
      "bottom pagination label on mobile"
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      "41 - 42 of 42",
      "bottom pagination label on desktop"
    );

    assert.equal(Page.listItems.length, 2, "record list items");

    // Move back a page

    await Page.bottomPagination.mobile.prev();

    assert.equal(currentURL(), `${PAGE_URL}?page=2`, "url is correct");

    // Move back a page

    await Page.bottomPagination.desktop.prev();

    assert.equal(currentURL(), `${PAGE_URL}`, "url is correct");

    // Change page size

    await Page.topPagination.mobile.selectSize(10);

    assert.equal(
      currentURL(),
      `${PAGE_URL}?size=10`,
      "check page size query param is set"
    );

    // Move to next page and then change page size (should reset to page 1)

    await Page.bottomPagination.mobile.next();

    assert.equal(
      currentURL(),
      `${PAGE_URL}?page=2&size=10`,
      "check page param changes"
    );

    await Page.bottomPagination.mobile.selectSize(50);

    assert.equal(
      currentURL(),
      `${PAGE_URL}?size=50`,
      "check page size query param is update and page set default of 1"
    );
  });

  test("Pagination: loading page 2 with custom page size of /<%= routePathPlural %>/index", async function (assert) {
    this.server.createList("<%= dasherizedSingular %>", 42);

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      page: 2,
    });

    assert.equal(currentURL(), `${PAGE_URL}?page=2`);

    // Pagination

    assert.notOk(
      Page.topPagination.mobile.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.notOk(
      Page.topPagination.desktop.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.notOk(
      Page.bottomPagination.mobile.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.notOk(
      Page.bottomPagination.desktop.prevIsDisabled,
      "previous pagination disabled"
    );

    assert.equal(
      Page.topPagination.mobile.label,
      "21 - 40 of 42",
      "top pagination label on mobile"
    );
    assert.equal(
      Page.topPagination.desktop.label,
      "21 - 40 of 42",
      "top pagination label on desktop"
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      "21 - 40 of 42",
      "bottom pagination label on mobile"
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      "21 - 40 of 42",
      "bottom pagination label on desktop"
    );
  });

  test("Pagination: loading a page outside of limit of /<%= routePathPlural %>/index", async function (assert) {
    this.server.createList("<%= dasherizedSingular %>", 42);

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      page: 4,
    });

    assert.equal(currentURL(), `${PAGE_URL}?page=4`);

    // Pagination

    assert.notOk(
      Page.topPagination.mobile.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.notOk(
      Page.topPagination.desktop.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.notOk(
      Page.bottomPagination.mobile.prevIsDisabled,
      "previous pagination disabled"
    );
    assert.notOk(
      Page.bottomPagination.desktop.prevIsDisabled,
      "previous pagination disabled"
    );

    assert.equal(
      Page.topPagination.mobile.label,
      "0 - 0 of 42",
      "top pagination label on mobile"
    );
    assert.equal(
      Page.topPagination.desktop.label,
      "0 - 0 of 42",
      "top pagination label on desktop"
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      "0 - 0 of 42",
      "bottom pagination label on mobile"
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      "0 - 0 of 42",
      "bottom pagination label on desktop"
    );

    // List

    assert.equal(Page.listItems.length, 0, "record list items");
    assert.ok(Page.emptySplash.visible, "empty splash notice visible");
    assert.equal(
      Page.emptySplash.title,
      "No <%= titlePlural %> Found",
      "empty splash notice title"
    );
  });

  test("No Results: /<%= routePathPlural %>/index", async function (assert) {
    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    assert.equal(Page.listItems.length, 0, "record list items");
    assert.ok(Page.emptySplash.visible, "empty splash notice visible");
    assert.equal(
      Page.emptySplash.title,
      "No <%= titlePlural %> Found",
      "empty splash notice title"
    );
  });

  test("Sorting: /<%= routePathPlural %>/index", async function (assert) {

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    assert.notOk(Page.actions.sort.isVisible, "sort menu is hidden");

    // open search dropdown
    await Page.actions.sort.toggleMenu();

    assert.notOk(Page.actions.sort.isVisible, "sort menu is visible");

    assert.equal(Page.actions.sort.items.length, 3, "number of sort options");

    assert.ok(
      Page.actions.sort.items.objectAt(0).isAscending,
      "sort option is selected and ascending"
    );

    // click on sort option
    await Page.actions.sort.items.objectAt(1).click();

    assert.notOk(
      Page.actions.sort.items.objectAt(0).isAscending,
      "sort option is not selected"
    );
    assert.ok(
      Page.actions.sort.items.objectAt(1).isAscending,
      "sort option is selected and ascending"
    );

    assert.equal(currentURL(), `${PAGE_URL}?sort=createdAt`, "url is correct");

    // click on same item
    await Page.actions.sort.items.objectAt(1).click();
    assert.ok(
      Page.actions.sort.items.objectAt(1).isDescending,
      "sort option is selected and descending"
    );

    assert.equal(currentURL(), `${PAGE_URL}?sort=-createdAt`, "url is correct");
  });

  test("Searching /<%= routePathPlural %>/index", async function (assert) {

    // NOTE:
    // Update these seeds with your own to test the search functionality
    this.server.createList("<%= dasherizedSingular %>", 8, {
      firstName: "bar",
      lastName: "bar",
      email: "bar@mail.com",
    });
    this.server.createList("<%= dasherizedSingular %>", 2, {
      firstName: "foo",
    });

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    assert.equal(Page.actions.search.value, "", "no current search term");

    assert.equal(Page.listItems.length, 10, "list all records");

    assert.notOk(Page.filterNotice.visible, "filter notice is not present");

    // enter search term
    await Page.actions.search.fill("foo");

    assert.equal(currentURL(), `${PAGE_URL}?search=foo`, "url is correct");

    assert.equal(Page.actions.search.value, "foo", "has current search term");

    assert.equal(Page.listItems.length, 2, "list filtered records");

    assert.ok(Page.filterNotice.visible, "filter notice is present");

    assert.equal(
      Page.filterNotice.title,
      "Displaying Filtered Results",
      "filter message"
    );

    // clear search
    await Page.filterNotice.clear();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    assert.equal(Page.actions.search.value, "", "no current search term");

    assert.equal(Page.listItems.length, 10, "list all records");

    assert.notOk(Page.filterNotice.visible, "filter notice is not present");
  });

  /*
  These puppies are not ready for production just yet
  
  test("Filter: set filter /<%= routePathPlural %>/index", async function (assert) {

    // NOTE:
    // Update this test to suit your filter properties

    this.server.createList("<%= dasherizedSingular %>", 42);

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    assert.notOk(Page.actions.filter.visible, "filter is hidden");

    assert.notOk(Page.filterNotice.visible, "filter notice is hidden");

    // open filter menu
    await Page.actions.filter.open();

    assert.ok(Page.actions.filter.visible, "filter is visible");

    // fill in filter & submit filter
    await Page.actions.filter.fillFirstName("foo").submit();

    assert.equal(currentURL(), `${PAGE_URL}?firstName=foo`, "url is correct");

    assert.notOk(Page.actions.filter.visible, "filter is hidden");

    assert.ok(Page.filterNotice.visible, "filter notice is visible");

    // click filter
    await Page.actions.filter.open();

    // click clear filter
    await Page.actions.filter.clear();

    // url is correct
    assert.equal(currentURL(), PAGE_URL, "url is correct");

    // filter notice is hidden
    assert.notOk(Page.filterNotice.visible, "filter notice is hidden");

    // open filter
    await Page.actions.filter.open();

    // change a value and close - dont submit so filter will not update
    await Page.actions.filter.fillFirstName("bar").close();

    // check url
    assert.equal(currentURL(), `${PAGE_URL}`, "url is correct");
  });

  test("Filter: load filter from url /<%= routePathPlural %>/index", async function (assert) {

    // NOTE:
    // Update this test to suit your filter properties

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      firstName: "foo",
      page: 2,
    });

    assert.equal(
      currentURL(),
      `${PAGE_URL}?firstName=foo&page=2`,
      "url is correct"
    );

    assert.notOk(Page.actions.filter.visible, "filter is hidden");

    assert.ok(Page.filterNotice.visible, "filter notice is visible");

    // open filter menu
    await Page.actions.filter.open();

    assert.ok(Page.actions.filter.visible, "filter is visible");

    // fill in filter & submit filter
    await Page.actions.filter.fillFirstName("bar").submit();

    assert.equal(
      currentURL(),
      `${PAGE_URL}?firstName=bar`,
      "url is correct and page reset to 1"
    );

    assert.notOk(Page.actions.filter.visible, "filter is hidden");

    assert.ok(Page.filterNotice.visible, "filter notice is visible");

    await Page.filterNotice.clear();

    // url is correct
    assert.equal(currentURL(), `${PAGE_URL}`, "url is correct");

    // filter notice is hidden
    assert.notOk(Page.filterNotice.visible, "filter notice is hidden");
  });
  */

  test("Exporting: /<%= routePathPlural %>/index", async function (assert) {
    let presignApiCounter = 0;

    this.server.post(
      "/presigns",
      function (schema, request) {
        presignApiCounter++;
        return presignHandler(schema, request);
      },
      200
    );

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    assert.notOk(Page.actions.export.visible, "modal is hidden");

    await Page.actions.export.open();

    assert.ok(Page.actions.export.visible, "modal is visible");

    await Page.actions.export.cancel();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    assert.notOk(Page.actions.export.visible, "modal is hidden");

    await Page.actions.export.open();

    assert.ok(Page.actions.export.visible, "modal is visible");

    await Page.actions.export.confirm();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    assert.notOk(Page.actions.export.visible, "modal is hidden");

    assert.equal(presignApiCounter, 1, "presign API was called once");
  });

  test("Navigation: /<%= routePathPlural %>/index", async function (assert) {
    const resources = this.server.createList("<%= dasherizedSingular %>", 3);

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit();

    assert.equal(currentURL(), PAGE_URL, "url is correct");

    // Click on the second list item

    const id = Page.listItems.objectAt(1).idValue,
      resource = resources.findBy("id", id),
        describe = `<%= titleSingular %> ${resource.id}`;

    await Page.listItems.objectAt(1).click();

    assert.equal(currentURL(), `${<%= capitalizedSingular %>_INDEX_URL.replace(':id', id)}`, "url is correct");

    assert.equal(
      Page.title,
      `View <%= titleSingular %>: ${describe}`,
      "page heading is correct"
    );
    assert.equal(Page.crumbs.length, 3, "number of crumbs correct");
    assert.equal(
      Page.crumbs.objectAt(0).text,
      `<%= titlePlural %>`,
      "first page crumb is correct"
    );
    assert.equal(
      Page.crumbs.objectAt(1).text,
      describe,
      "last page crumb is correct"
    );
  });

});
