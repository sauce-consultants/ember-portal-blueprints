import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {alias} from '@ember/object/computed';
import {action} from '@ember/object';

export default class UiMobileNavComponent extends Component {
  // Properties

  tagName = '';

  // Service

  @service session;

  // Getters

  get authUser() {
    return this.session.currentUser;
  }

  // Actions

  @action
  close() {
    const closeAction = this.onClose;
    if (closeAction) {
      closeAction();
    }
  }
}
