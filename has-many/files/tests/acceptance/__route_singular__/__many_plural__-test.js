import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import setupCustomAssertions from 'ember-cli-custom-assertions/test-support';
import {
  authenticateSession,
  invalidateSession,
} from 'ember-simple-auth/test-support';
import { AUTHENTICATED_ADMIN } from '<%= appName %>/tests/helpers/authenticated-users';
import {
  LOGIN_URL,
  <%= capitalizedPlural %>_URL,
  <%= capitalizedSingular %>_INDEX_URL,
  <%= capitalizedSingular %>_EDIT_URL,
  <%= capitalizedSingular %>_<%= manyCapitalizedPlural %>_URL,
  <%= capitalizedSingular %>_ARCHIVE_URL,
} from '<%= appName %>/tests/helpers/test-urls';
import Navigation from '<%= appName %>/tests/pages/internal';
import Page from '<%= appName %>/tests/pages/internal/<%= dasherizedSingular %>/<%= manyDasherizedPlural %>';
import { pluralize } from 'ember-inflector';

const PAGE_URL = <%= capitalizedSingular %>_<%= manyCapitalizedPlural %>_URL;

module('Acceptance | <%= routePathSingular %>/<%= manyRoutePathPlural %>', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupCustomAssertions(hooks);

  test('Auth: visiting /<%= routePathSingular %>/<%= manyRoutePathPlural %> unauthenticated', async function (assert) {
    const resource = this.server.create('<%= dasherizedSingular %>');

    await invalidateSession();

    await Page.visit({
      id: resource.id,
    });

    assert.equal(currentURL(), LOGIN_URL);
  });

  test('Auth: visiting /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const resource = this.server.create('<%= dasherizedSingular %>'),
      describe = `${resource.name}`;

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.equal(
      Page.title,
      `<%= titleSingular %> <%= manyTitlePlural %>: ${describe}`,
      'page heading is correct'
    );
    assert.equal(Page.crumbs.length, 3, 'number of crumbs correct');
    assert.equal(
      Page.crumbs.objectAt(0).text,
      `<%= titlePlural %>`,
      'first page crumb is correct'
    );
    assert.equal(
      Page.crumbs.objectAt(1).text,
      describe,
      'last page crumb is correct'
    );

    // Check menu item is active

    assert.equal(
      Navigation.desktop.menu.<%= camelPlural %>.isActive,
      true,
      'desktop nav item is active'
    );
    assert.equal(
      Navigation.mobile.menu.<%= camelPlural %>.isActive,
      true,
      'mobile nav item is active'
    );

    // Check User details are in desktop nav

    assert.equal(Navigation.desktop.userInitials, 'AA', 'User avatar');
    assert.equal(Navigation.desktop.userName, `Ada Admin`, 'User name');
    assert.equal(Navigation.desktop.userEmail, 'ada@demo.com', 'User email');

    // Check User details are in mobile nav

    assert.equal(Navigation.mobile.userInitials, 'AA', 'User avatar');
    assert.equal(Navigation.mobile.userName, `Ada Admin`, 'User name');
    assert.equal(Navigation.mobile.userEmail, 'ada@demo.com', 'User email');
  });

  test('Navigation: back to list view /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const resource = this.server.create('<%= dasherizedSingular %>');

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    // Click breadcrumb parent
    await Page.crumbs.objectAt(0).click();

    assert.equal(currentURL(), <%= capitalizedPlural %>_URL, 'url is correct');
    assert.equal(Page.title, 'List <%= titlePlural %>', 'page heading is correct');
  });

  test('Navigation: load index view /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const resource = this.server.create('<%= dasherizedSingular %>'),
      describe = `${resource.name}`;

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.ok(Page.actions.<%= manyCamelPlural %>.isActive, 'View action is active');

    // Click view action
    await Page.actions.view.click();

    assert.equal(
      currentURL(),
      <%= capitalizedSingular %>_INDEX_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.notOk(Page.actions.<%= manyCamelPlural %>.isActive, 'View action is unactive');
    assert.ok(Page.actions.view.isActive, 'Edit action is active');

    assert.equal(
      Page.title,
      `View <%= titleSingular %>: ${describe}`,
      'page heading is correct'
    );
  });

  test('Navigation: load edit view /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const resource = this.server.create('<%= dasherizedSingular %>'),
      describe = `${resource.name}`;

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.ok(Page.actions.<%= manyCamelPlural %>.isActive, 'View action is active');

    // Click edit action
    await Page.actions.edit.click();

    assert.equal(
      currentURL(),
      <%= capitalizedSingular %>_EDIT_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.notOk(Page.actions.<%= manyCamelPlural %>.isActive, 'View action is unactive');
    assert.ok(Page.actions.edit.isActive, 'Edit action is active');

    assert.equal(
      Page.title,
      `Edit <%= titleSingular %>: ${describe}`,
      'page heading is correct'
    );
  });

  test('Navigation: load archive view /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const resource = this.server.create('<%= dasherizedSingular %>'),
      describe = `${resource.name}`;

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.ok(Page.actions.<%= manyCamelPlural %>.isActive, 'View action is active');

    // Click edit action
    await Page.actions.archive.click();

    assert.equal(
      currentURL(),
      <%= capitalizedSingular %>_ARCHIVE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.notOk(Page.actions.<%= manyCamelPlural %>.isActive, 'View action is unactive');
    assert.ok(Page.actions.archive.isActive, 'Archive action is active');

    assert.equal(
      Page.title,
      `Archive <%= titleSingular %>: ${describe}`,
      'page heading is correct'
    );
  });

  test('Pagination: loading page 1 of /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    // create un related records
    this.server.createList('<%= manyDasherizedSingular %>', 38);

    const <%= manyCamelPlural %> = this.server.createList('<%= manyDasherizedSingular %>', 42),
      resource = this.server.create('<%= dasherizedSingular %>', { <%= manyCamelPlural %> });

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    // Pagination

    assert.ok(
      Page.topPagination.mobile.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.ok(
      Page.topPagination.desktop.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.ok(
      Page.bottomPagination.mobile.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.ok(
      Page.bottomPagination.desktop.prevIsDisabled,
      'previous pagination disabled'
    );

    assert.equal(
      Page.topPagination.mobile.label,
      '1 - 20 of 42',
      'top pagination label on mobile'
    );
    assert.equal(
      Page.topPagination.desktop.label,
      '1 - 20 of 42',
      'top pagination label on desktop'
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      '1 - 20 of 42',
      'bottom pagination label on mobile'
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      '1 - 20 of 42',
      'bottom pagination label on desktop'
    );

    assert.equal(Page.listItems.length, 20, 'record list items');

    // Move to next page

    await Page.topPagination.mobile.next();

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?page=2`,
      'url is correct'
    );

    assert.equal(
      Page.topPagination.mobile.label,
      '21 - 40 of 42',
      'top pagination label on mobile'
    );
    assert.equal(
      Page.topPagination.desktop.label,
      '21 - 40 of 42',
      'top pagination label on desktop'
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      '21 - 40 of 42',
      'bottom pagination label on mobile'
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      '21 - 40 of 42',
      'bottom pagination label on desktop'
    );

    assert.equal(Page.listItems.length, 20, 'record list items');

    // Move to next page

    await Page.topPagination.desktop.next();

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?page=3`,
      'url is correct'
    );

    assert.ok(
      Page.topPagination.mobile.nextIsDisabled,
      'next pagination disabled'
    );
    assert.ok(
      Page.topPagination.desktop.nextIsDisabled,
      'next pagination disabled'
    );
    assert.ok(
      Page.bottomPagination.mobile.nextIsDisabled,
      'next pagination disabled'
    );
    assert.ok(
      Page.bottomPagination.desktop.nextIsDisabled,
      'next pagination disabled'
    );

    assert.equal(
      Page.topPagination.mobile.label,
      '41 - 42 of 42',
      'top pagination label on mobile'
    );
    assert.equal(
      Page.topPagination.desktop.label,
      '41 - 42 of 42',
      'top pagination label on desktop'
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      '41 - 42 of 42',
      'bottom pagination label on mobile'
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      '41 - 42 of 42',
      'bottom pagination label on desktop'
    );

    assert.equal(Page.listItems.length, 2, 'record list items');

    // Move back a page

    await Page.bottomPagination.mobile.prev();

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?page=2`,
      'url is correct'
    );

    // Move back a page

    await Page.bottomPagination.desktop.prev();

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}`,
      'url is correct'
    );

    // Change page size

    await Page.topPagination.mobile.selectSize(10);

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?size=10`,
      'check page size query param is set'
    );

    // Move to next page and then change page size (should reset to page 1)

    await Page.bottomPagination.mobile.next();

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?page=2&size=10`,
      'check page param changes'
    );

    await Page.bottomPagination.mobile.selectSize(50);

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?size=50`,
      'check page size query param is update and page set default of 1'
    );
  });

  test('Pagination: loading page 2 with custom page size of /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const <%= manyCamelPlural %> = this.server.createList('<%= manyDasherizedSingular %>', 42),
      resource = this.server.create('<%= dasherizedSingular %>', { <%= manyCamelPlural %> });

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      page: 2,
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?page=2`
    );

    // Pagination

    assert.notOk(
      Page.topPagination.mobile.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.notOk(
      Page.topPagination.desktop.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.notOk(
      Page.bottomPagination.mobile.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.notOk(
      Page.bottomPagination.desktop.prevIsDisabled,
      'previous pagination disabled'
    );

    assert.equal(
      Page.topPagination.mobile.label,
      '21 - 40 of 42',
      'top pagination label on mobile'
    );
    assert.equal(
      Page.topPagination.desktop.label,
      '21 - 40 of 42',
      'top pagination label on desktop'
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      '21 - 40 of 42',
      'bottom pagination label on mobile'
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      '21 - 40 of 42',
      'bottom pagination label on desktop'
    );
  });

  test('Pagination: loading a page outside of limit of /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const <%= manyCamelPlural %> = this.server.createList('<%= manyDasherizedSingular %>', 42),
      resource = this.server.create('<%= dasherizedSingular %>', { <%= manyCamelPlural %> });

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
      page: 4,
    });

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?page=4`
    );

    // Pagination

    assert.notOk(
      Page.topPagination.mobile.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.notOk(
      Page.topPagination.desktop.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.notOk(
      Page.bottomPagination.mobile.prevIsDisabled,
      'previous pagination disabled'
    );
    assert.notOk(
      Page.bottomPagination.desktop.prevIsDisabled,
      'previous pagination disabled'
    );

    assert.equal(
      Page.topPagination.mobile.label,
      '0 - 0 of 42',
      'top pagination label on mobile'
    );
    assert.equal(
      Page.topPagination.desktop.label,
      '0 - 0 of 42',
      'top pagination label on desktop'
    );
    assert.equal(
      Page.bottomPagination.mobile.label,
      '0 - 0 of 42',
      'bottom pagination label on mobile'
    );
    assert.equal(
      Page.bottomPagination.desktop.label,
      '0 - 0 of 42',
      'bottom pagination label on desktop'
    );

    // List

    assert.equal(Page.listItems.length, 0, 'record list items');
    assert.ok(Page.emptySplash.visible, 'empty splash notice visible');
    assert.equal(
      Page.emptySplash.title,
      'No <%= manyTitlePlural %> Found',
      'empty splash notice title'
    );
  });

  test('No Results: /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const resource = this.server.create('<%= dasherizedSingular %>');

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({
      id: resource.id,
    });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.equal(Page.listItems.length, 0, 'record list items');
    assert.ok(Page.emptySplash.visible, 'empty splash notice visible');
    assert.equal(
      Page.emptySplash.title,
      'No <%= manyTitlePlural %> Found',
      'empty splash notice title'
    );
  });

  test('Sorting: /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const <%= manyCamelPlural %> = this.server.createList('<%= manyDasherizedSingular %>', 42),
      resource = this.server.create('<%= dasherizedSingular %>', { <%= manyCamelPlural %> });

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({ id: resource.id });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.notOk(Page.actions.sort.isVisible, 'sort menu is hidden');

    // open search dropdown
    await Page.actions.sort.toggleMenu();

    assert.notOk(Page.actions.sort.isVisible, 'sort menu is visible');

    assert.equal(Page.actions.sort.items.length, 2, 'number of sort options');

    assert.ok(
      Page.actions.sort.items.objectAt(0).isAscending,
      'sort option is selected and ascending'
    );

    // click on sort option
    await Page.actions.sort.items.objectAt(1).click();

    assert.notOk(
      Page.actions.sort.items.objectAt(0).isAscending,
      'sort option is not selected'
    );
    assert.ok(
      Page.actions.sort.items.objectAt(1).isAscending,
      'sort option is selected and ascending'
    );

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?sort=lastUpdated`,
      'url is correct'
    );

    // click on same item
    await Page.actions.sort.items.objectAt(1).click();
    assert.ok(
      Page.actions.sort.items.objectAt(1).isDescending,
      'sort option is selected and descending'
    );

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?sort=-lastUpdated`,
      'url is correct'
    );
  });

  test('Searching /<%= routePathSingular %>/<%= manyRoutePathPlural %>', async function (assert) {
    const <%= manyCamelPlural %> = [
        ...this.server.createList('<%= manyDasherizedSingular %>', 8, {
          name: 'bar',
        }),
        ...this.server.createList('<%= manyDasherizedSingular %>', 2, {
          name: 'foo',
        }),
      ],
      resource = this.server.create('<%= dasherizedSingular %>', { <%= manyCamelPlural %> });

    await authenticateSession(AUTHENTICATED_ADMIN);

    await Page.visit({ id: resource.id });

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.equal(Page.actions.search.value, '', 'no current search term');

    assert.equal(Page.listItems.length, 10, 'list all records');

    assert.notOk(Page.filterNotice.visible, 'filter notice is not present');

    // enter search term
    await Page.actions.search.fill('foo');

    assert.equal(
      currentURL(),
      `${PAGE_URL.replace(':id', resource.id)}?search=foo`,
      'url is correct'
    );

    assert.equal(Page.actions.search.value, 'foo', 'has current search term');

    assert.equal(Page.listItems.length, 2, 'list filtered records');

    assert.ok(Page.filterNotice.visible, 'filter notice is present');

    assert.equal(
      Page.filterNotice.title,
      'Displaying Filtered Results',
      'filter message'
    );

    // clear search
    await Page.filterNotice.clear();

    assert.equal(
      currentURL(),
      PAGE_URL.replace(':id', resource.id),
      'url is correct'
    );

    assert.equal(Page.actions.search.value, '', 'no current search term');

    assert.equal(Page.listItems.length, 10, 'list all records');

    assert.notOk(Page.filterNotice.visible, 'filter notice is not present');
  });
});
