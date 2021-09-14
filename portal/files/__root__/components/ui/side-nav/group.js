import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UiSideNavGroupComponent extends Component {
  // Properties

  @tracked open = false;

  // Actions

  @action
  toggle() {
    this.open = !this.open;
  }
}
