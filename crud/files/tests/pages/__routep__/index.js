import {
  attribute,
  clickable,
  collection,
  create,
  isPresent,
  isVisible,
  fillable,
  text,
  selectable,
  value,
  visitable,
} from "ember-cli-page-object";
import { <%= pCaps %>_URL } from "tchw/tests/helpers/test-urls";

const TEST_SELECTOR_VALUE = "<%= s %>";

// const DESKTOP_SCOPE = '[data-test-sidebar="desktop"]',
//   MOBILE_SCOPE = '[data-test-sidebar="mobile"]';

export default create({
  visit: visitable(<%= pCaps %>_URL),

  title: text("[data-test-header-title]"),
  crumbs: collection("[data-test-breadcrumbs-item]", {
    text: text("[data-test-breadcrumbs-item-text]"),
    click: clickable("a"),
  }),

  // Actions
  actions: {
    sort: {
      toggleMenu: clickable('[data-test-action="sort"]'),
      isVisible: isVisible('[data-test-dropdown-menu="sort"]'),
      items: collection(
        "[data-test-dropdown-menu-item]",
        {
          click: clickable(),
          isAscending: isVisible('[data-test-icon="arrow-narrow-up"]'),
          isDescending: isVisible('[data-test-icon="arrow-narrow-down"]'),
        },
        {
          scope: '[data-test-dropdown-menu="sort"]',
        }
      ),
    },
    filter: {
      open: clickable('[data-test-action="filter"]'),
      close: clickable("[data-test-slide-over-close]"),
      visible: isPresent(
        '[data-test-slide-over="filter"][data-test-slide-over-state="visible"]'
      ),
      // Generate via CRUD
      firstName: value('[data-test-input="firstName"]', {
        scope: '[data-test-form="filter"]',
      }),
      fillFirstName: fillable('[data-test-input="firstName"]', {
        scope: '[data-test-form="filter"]',
      }),
      lastName: value('[data-test-input="lastName"]', {
        scope: '[data-test-form="filter"]',
      }),
      email: value('[data-test-input="email"]', {
        scope: '[data-test-form="filter"]',
      }),
      role: value('[data-test-input="role"]', {
        scope: '[data-test-form="filter"]',
      }),
      lastLoginDate: value('[data-test-input="lastLoginDate"]', {
        scope: '[data-test-form="filter"]',
      }),
      createdAt: value('[data-test-input="createdAt"]', {
        scope: '[data-test-form="filter"]',
      }),
      updatedAt: value('[data-test-input="updatedAt"]', {
        scope: '[data-test-form="filter"]',
      }),
      submit: clickable('[data-test-button="filter"]', {
        scope: '[data-test-form="filter"]',
      }),
      clear: clickable('[data-test-button="clear"]', {
        scope: '[data-test-form="filter"]',
      }),
    },
    export: {
      open: clickable('[data-test-action="export"]'),
      visible: isPresent(
        '[data-test-modal="export"][data-test-modal-state="visible"]'
      ),
      confirm: clickable('[data-test-button="confirm"]', {
        scope: '[data-test-modal="export"]',
      }),
      cancel: clickable('[data-test-button="cancel"]', {
        scope: '[data-test-modal="export"]',
      }),
    },
    search: {
      fill: fillable('[data-test-action-input="search"]'),
      value: value('[data-test-action-input="search"]'),
    },
  },

  // Pagination
  topPagination: {
    mobile: {
      prev: clickable("[data-test-pagination-prev]", {
        scope: '[data-test-mobile-pagination="top"]',
      }),
      prevIsDisabled: attribute("disabled", "[data-test-pagination-prev]", {
        scope: '[data-test-mobile-pagination="top"]',
      }),
      next: clickable("[data-test-pagination-next]", {
        scope: '[data-test-mobile-pagination="top"]',
      }),
      nextIsDisabled: attribute("disabled", "[data-test-pagination-next]", {
        scope: '[data-test-mobile-pagination="top"]',
      }),
      label: text("[data-test-pagination-result-limit]", {
        scope: '[data-test-mobile-pagination="top"]',
      }),
      selectSize: selectable("[data-test-pagination-size]", {
        scope: '[data-test-mobile-pagination="top"]',
      }),
    },
    desktop: {
      prev: clickable("[data-test-pagination-prev]", {
        scope: '[data-test-desktop-pagination="top"]',
      }),
      prevIsDisabled: attribute("disabled", "[data-test-pagination-prev]", {
        scope: '[data-test-desktop-pagination="top"]',
      }),
      next: clickable("[data-test-pagination-next]", {
        scope: '[data-test-desktop-pagination="top"]',
      }),
      nextIsDisabled: attribute("disabled", "[data-test-pagination-next]", {
        scope: '[data-test-desktop-pagination="top"]',
      }),
      label: text("[data-test-pagination-result-limit]", {
        scope: '[data-test-desktop-pagination="top"]',
      }),
      selectSize: selectable("[data-test-pagination-size]", {
        scope: '[data-test-desktop-pagination="top"]',
      }),
    },
  },
  bottomPagination: {
    mobile: {
      prev: clickable("[data-test-pagination-prev]", {
        scope: '[data-test-mobile-pagination="bottom"]',
      }),
      prevIsDisabled: attribute("disabled", "[data-test-pagination-prev]", {
        scope: '[data-test-mobile-pagination="bottom"]',
      }),
      next: clickable("[data-test-pagination-next]", {
        scope: '[data-test-mobile-pagination="bottom"]',
      }),
      nextIsDisabled: attribute("disabled", "[data-test-pagination-next]", {
        scope: '[data-test-mobile-pagination="bottom"]',
      }),
      label: text("[data-test-pagination-result-limit]", {
        scope: '[data-test-mobile-pagination="bottom"]',
      }),
      selectSize: selectable("[data-test-pagination-size]", {
        scope: '[data-test-mobile-pagination="bottom"]',
      }),
    },
    desktop: {
      prev: clickable("[data-test-pagination-prev]", {
        scope: '[data-test-desktop-pagination="bottom"]',
      }),
      prevIsDisabled: attribute("disabled", "[data-test-pagination-prev]", {
        scope: '[data-test-desktop-pagination="bottom"]',
      }),
      next: clickable("[data-test-pagination-next]", {
        scope: '[data-test-desktop-pagination="bottom"]',
      }),
      nextIsDisabled: attribute("disabled", "[data-test-pagination-next]", {
        scope: '[data-test-desktop-pagination="bottom"]',
      }),
      label: text("[data-test-pagination-result-limit]", {
        scope: '[data-test-desktop-pagination="bottom"]',
      }),
      selectSize: selectable("[data-test-pagination-size]", {
        scope: '[data-test-desktop-pagination="bottom"]',
      }),
    },
  },

  // Content
  filterNotice: {
    visible: isVisible('[data-test-alert="filtered"]'),
    title: text('[data-test-alert-title="filtered"]'),
    clear: clickable('[data-test-alert-button="filtered"]'),
  },
  listItems: collection(`[data-test-list-item="${TEST_SELECTOR_VALUE}"]`, {
    click: clickable("[data-test-list-item-link]"),
    idValue: attribute(`data-test-list-item-id`, "[data-test-list-item-link]"),
  }),
  emptySplash: {
    visible: isVisible(`[data-test-splash-notice="empty"]`),
    title: text(`[data-test-splash-notice-title="empty"]`),
    text: text(`[data-test-splash-notice-text="empty"]`),
  },
});
