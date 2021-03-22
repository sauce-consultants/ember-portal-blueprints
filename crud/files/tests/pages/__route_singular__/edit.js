import {
  clickable,
  collection,
  create,
  fillable,
  value,
  isPresent,
  text,
  visitable,
} from "ember-cli-page-object";
import { <%= capitalizedSingular %>_EDIT_URL } from "tchw/tests/helpers/test-urls";

export default create({
  visit: visitable(<%= capitalizedSingular %>_EDIT_URL),

  title: text("[data-test-header-title]"),
  crumbs: collection("[data-test-breadcrumbs-item]", {
    text: text("[data-test-breadcrumbs-item-text]"),
    click: clickable("a"),
  }),

  // Generate via CRUD
  form: {
<%= formTestSelectors %>
  },

  actions: {
    view: {
      click: clickable('[data-test-nav-item="view"]'),
      isActive: isPresent('[data-test-nav-item="view"][data-test-active]'),
    },
    edit: {
      click: clickable('[data-test-nav-item="edit"]'),
      isActive: isPresent('[data-test-nav-item="edit"][data-test-active]'),
    },
    archive: {
      click: clickable('[data-test-nav-item="archive"]'),
      isActive: isPresent('[data-test-nav-item="archive"][data-test-active]'),
    },
  },
});
