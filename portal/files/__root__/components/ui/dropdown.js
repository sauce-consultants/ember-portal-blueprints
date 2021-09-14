import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UiDropdownComponent extends Component {
  // Tracking

  @tracked showMenu = false;

  // Actions

  @action
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
