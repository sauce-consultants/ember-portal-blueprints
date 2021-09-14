import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UiSlideOverComponent extends Component {
  @action
  close() {
    const onClose = this.args.onClose;
    if (onClose) {
      onClose();
    }
  }
}
