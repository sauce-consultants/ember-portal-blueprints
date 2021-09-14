import Component from '@glimmer/component';
import { get } from '@ember/object';

export default class UiFormHelperComponent extends Component {
  get errorText() {
    const changeset = this.args.changeset,
      name = this.args.name;
    if (changeset && changeset.isInvalid && name) {
      const errors = get(changeset.error, name);
      if (errors) {
        return errors.validation.firstObject;
      }
    }
    return '';
  }

  get tipPositionClass() {
    if (this.args.invalid) {
      return 'absolute top-0';
    }
    return '';
  }

  get errorPositionClass() {
    if (!this.args.invalid) {
      return 'absolute top-0';
    }
    return '';
  }
}
