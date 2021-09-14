import Component from '@glimmer/component';

export default class UiFormLabelComponent extends Component {
  // Getters

  get invalid() {
    let invalid = this.args.invalid;
    if (invalid === undefined) {
      invalid = false;
    }
    return invalid;
  }
  get textClasses() {
    if (this.invalid) {
      return 'text-danger-700';
    }
    return 'text-gray-700';
  }
}
