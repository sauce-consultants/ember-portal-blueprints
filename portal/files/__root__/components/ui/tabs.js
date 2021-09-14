import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UiTabsComponent extends Component {
  // Services

  @service router;

  // Actions

  @action selectTab(event) {
    // Action fired when the mobile friendly select element is changed
    this.router.transitionTo(event.target.value);
  }
}
