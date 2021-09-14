import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UiNavGroupComponent extends Component {
  // Properties

  @tracked open = false;

  // Actions

  @action
  toggle() {
    console.log('open', this.open);
    this.open = !this.open;
  }
}
