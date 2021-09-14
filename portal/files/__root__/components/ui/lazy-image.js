import Component from '@glimmer/component';
import {
  action
} from '@ember/object';
import {
  tracked
} from '@glimmer/tracking';
import {
  later
} from '@ember/runloop';

export default class LazyImageComponent extends Component {

  @tracked imageLoaded = false;

  @action onLoad( /*event*/ ) {

    later(this, function() {
      this.imageLoaded = true;
    }, 100)

  }

}