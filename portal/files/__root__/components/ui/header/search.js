import Component from '@glimmer/component';
import {
  guidFor
} from '@ember/object/internals';
import {
  computed
} from '@ember/object';
import {
  tracked
} from '@glimmer/tracking';
import {
  action
} from '@ember/object';

export default class UiHeaderSearchComponent extends Component {

  // Tracking
  @tracked searching = false;

  // Computed

  @computed(function() {
    return guidFor(this) + '-search';
  }) searchInputId;

  // Actions

  @action
  activate() {
    this.searching = true;
    document.getElementById(this.searchInputId).focus();
  }

}