import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class UiMobileNavComponent extends Component {
  // Service

  @service session;

  // Getters

  get authUser() {
    return this.session.currentUser;
  }

  // Actions

  @action
  close() {
    const closeAction = this.args.onClose;
    if (closeAction) {
      closeAction();
    }
  }
}
