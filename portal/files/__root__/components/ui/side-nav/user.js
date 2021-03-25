import Component from '@ember/component';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';
import {inject as service} from '@ember/service';

export default class UiSideNavUserComponent extends Component {
  // Service

  @service session;

  // Properties

  tagName = '';

  // Tracked

  @tracked open = false;

  // Getters

  get sessionData() {
    return this.session.data.authenticated.data;
  }

  get firstName() {
    return this.sessionData.attributes['first-name'];
  }

  get lastName() {
    return this.sessionData.attributes['last-name'];
  }

  get email() {
    return this.sessionData.attributes['email'];
  }

  get name() {
    return this.firstName + ' ' + this.lastName;
  }

  get initials() {
    if (this.firstName && this.lastName) {
      return (
        this.firstName.charAt(0).toUpperCase() +
        this.lastName.charAt(0).toUpperCase()
      );
    }
    return '??';
  }

  // Actions

  @action
  toggle() {
    this.open = !this.open;
  }
}
