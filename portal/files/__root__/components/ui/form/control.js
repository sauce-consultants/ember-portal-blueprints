import Component from '@glimmer/component';
import { get } from "@ember/object";

export default class UiFormControlComponent extends Component {

  get isInvalid() {
    return this.args.invalid || this.invalidChangeset
  }

  get invalidChangeset() {
    const changeset = this.args.changeset,
      name = this.args.name,
      didSubmit = this.args.didSubmit;

    // We only invalidate automatically if and changeset,
    // name and didSubmit flag are set
    if (changeset && name && didSubmit) {
      // check if there are errors in the changeset for this control
      return get(changeset.error, name);
    }

    return false;
  }

}
