import Component from '@glimmer/component';
import {
  get
} from '@ember/object';
import { isArray } from '@ember/array';

export default class UiFormHelperComponent extends Component {

  get errorText() {
    const changeset = this.args.changeset,
      name = this.args.name;
    if (changeset && changeset.isInvalid && name) {
      const errors = get(changeset.error, name);
      if (errors) {
        if (isArray(errors.validation)) {
          return errors.validation.firstObject;
        } else {
          return errors.validation;
        }
      }
    }
    return "";
  }

  get tipPositionClass() {
    if (this.args.invalid) {
      return "absolute top-0";
    }
    return "";
  }

  get errorPositionClass() {
    if (!this.args.invalid) {
      return "absolute top-0";
    }
    return "";
  }
}
