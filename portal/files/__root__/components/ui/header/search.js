import Component from '@glimmer/component';
import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UiHeaderSearchComponent extends Component {
  // Tracking
  @tracked searching = false;

  // Getters

  get searchInputId() {
    return guidFor(this) + '-search';
  }

  // Actions

  @action
  activate() {
    this.searching = true;
    document.getElementById(this.searchInputId).focus();
  }
}
