import {
  clickable,
  collection,
  create,
  fillable,
  text,
  value,
  visitable,
} from "ember-cli-page-object";
import { <%= capitalizedPlural %>_NEW_URL } from "<%= appName %>/tests/helpers/test-urls";

export default create({
  visit: visitable(<%= capitalizedPlural %>_NEW_URL),

  title: text("[data-test-header-title]"),
  crumbs: collection("[data-test-breadcrumbs-item]", {
    text: text("[data-test-breadcrumbs-item-text]"),
    click: clickable("a"),
  }),

  // Generate via CRUD
  form: {
<%= formTestSelectors %>
  },
});
