import {
  clickable,
  create,
  isPresent,
  text,
  visitable,
} from "ember-cli-page-object";
import { HOME_URL } from "<%= app %>/tests/helpers/test-urls";

const DESKTOP_SCOPE = '[data-test-sidebar="desktop"]',
  MOBILE_SCOPE = '[data-test-sidebar="mobile"]';

export default create({
  visit: visitable(HOME_URL),
  desktop: {
    //
    toggleUserItem: clickable("[data-test-user-menu]", {
      scope: DESKTOP_SCOPE,
    }),
    clickLogout: clickable('[data-test-user-menu-item="logout"]', {
      scope: DESKTOP_SCOPE,
    }),
    //
    userInitials: text('[data-test-user-item="avatar"]', {
      scope: DESKTOP_SCOPE,
    }),
    userName: text('[data-test-user-item="name"]', {
      scope: DESKTOP_SCOPE,
    }),
    userEmail: text('[data-test-user-item="email"]', {
      scope: DESKTOP_SCOPE,
    }),
    // Nav Menu
    menu: {
      home: {
        click: clickable('[data-test-nav-item="Home"]', {
          scope: DESKTOP_SCOPE,
        }),
        isActive: isPresent('[data-test-nav-item="Home"][data-test-active]', {
          scope: DESKTOP_SCOPE,
        }),
      },
      // DESKTOP NAV DO NOT REMOVE!
    },
  },
  mobile: {
    //
    toggleUserItem: clickable("[data-test-user-menu]", {
      scope: MOBILE_SCOPE,
    }),
    clickLogout: clickable('[data-test-user-menu-item="logout"]', {
      scope: MOBILE_SCOPE,
    }),
    //
    userInitials: text('[data-test-user-item="avatar"]', {
      scope: MOBILE_SCOPE,
    }),
    userName: text('[data-test-user-item="name"]', {
      scope: MOBILE_SCOPE,
    }),
    userEmail: text('[data-test-user-item="email"]', {
      scope: MOBILE_SCOPE,
    }),
    // Nav Menu
    menu: {
      home: {
        click: clickable('[data-test-nav-item="Home"]', {
          scope: MOBILE_SCOPE,
        }),
        isActive: isPresent('[data-test-nav-item="Home"][data-test-active]', {
          scope: MOBILE_SCOPE,
        }),
      },
      // MOBILE NAV DO NOT REMOVE!
    },
  },
});
