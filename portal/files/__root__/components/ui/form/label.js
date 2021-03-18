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
  get textColor() {
    if (this.invalid) {
      return 'red';
    }
    return 'gray';
  }
}