import Component from '@glimmer/component';

export default class UiFormErrorComponent extends Component {
  get invalid() {
    let invalid = this.args.invalid;
    if (invalid === undefined) {
      invalid = false;
    }
    return invalid;
  }
  get opacity() {
    if (this.invalid) {
      return '100';
    }
    return '0';
  }
}