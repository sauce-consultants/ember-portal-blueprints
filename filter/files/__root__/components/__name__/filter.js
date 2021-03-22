import Component from '@glimmer/component';
import {
  <%= capitalizedSingular %>_FILTER_ATTRS,
  <%= capitalizedPlural %>_STATUS_OPTIONS
} from "<%= appName %>/utils/const/<%= dasherizedSingular %>";
import {
  action,
} from '@ember/object';
import { debounce } from '@ember/runloop';
import {
  tracked
} from '@glimmer/tracking';
import <%= classSingular %>FilterValidations from '<%= appName %>/validations/<%= dasherizedSingular %>-filter';

export default class <%= classSingular %>FilterComponent extends Component {

  //
  // NOTE TO SELF
  // ------------
  // Handle properties here as change set's
  // on a filter model on the component generated
  // by the route
  //

  // Properties

  validations = <%= classSingular %>FilterValidations;

  filterAttrs = <%= capitalizedSingular %>_FILTER_ATTRS;

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
