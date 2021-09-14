import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default class UiSideNavComponent extends Component {
  // Properties

  tagName = '';

  // Service

  @service session;

  // Setters

  get authUser() {
    return this.session.currentUser;
  }

  // Actions
}
