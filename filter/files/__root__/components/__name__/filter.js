// You can delete the beautify comments in this file
// They are just used for the blueprint sytax

/* beautify ignore:start */
import Component from '@glimmer/component';
import {
  <%= config %>_FILTER_ATTRS,
  <%= config %>_STATUS_OPTIONS
} from "<%= appName %>/utils/const/<%= s %>";
import {
  action,
} from '@ember/object';
import { debounce } from '@ember/runloop';
import {
  tracked
} from '@glimmer/tracking';
import <%= components %>FilterValidations from '<%= appName %>/validations/<%= s %>-filter';

export default class <%= components %>FilterComponent extends Component {

  //
  // NOTE TO SELF
  // ------------
  // Handle properties here as change set's
  // on a filter model on the component generated
  // by the route
  //

  // Properties

  validations = <%= components %>FilterValidations;

  filterAttrs = <%= config %>_FILTER_ATTRS;

  // Tracked

  // These properties hold our temporary filter state
  // until the user either commits or resets the form
<%= tracked %>

  // Methods

  constructor() {
    super(...arguments);
    // Set the initial state of our local filter vars
    this.filterAttrs.forEach((key) => {
      this[key] = this.args.filter[key];
    })
  }

  // Actions
<%= actions %>
}
/* beautify ignore:end */
