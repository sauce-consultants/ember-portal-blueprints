import Component from '@ember/component';
import {
  action,
  computed
} from '@ember/object';
import {
  alias
} from '@ember/object/computed';
import {
  tracked
} from '@glimmer/tracking';
import {
  inject as service
} from '@ember/service';

export default class UiSideNavUserComponent extends Component {

  // Service

  @service session;

  // Properties

  tagName = "";

  // Tracked

  @tracked open = false;

  // Computed

  @alias('session.data.authenticated.data.attributes.first-name') firstName;

  @alias('session.data.authenticated.data.attributes.last-name') lastName;

  @alias('session.data.authenticated.data.attributes.email') email;

  @computed('firstName', 'lastName')
  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  @computed('firstName', 'lastName')
  get initials() {
    if (this.firstName && this.lastName) {
      return this.firstName.charAt(0).toUpperCase() + this.lastName.charAt(0).toUpperCase();
    }
    return '??'
  }

  // Actions

  @action
  toggle() {
    this.toggleProperty('open');
  }

}