import Component from '@glimmer/component';

export default class UiModalFooterComponent extends Component {
  get baseClasses() {
    const style = this.args.style ? this.args.style : 'centered';

    switch (style) {
      case 'left':
        return `px-4 pt-5 pb-4 sm:p-6 sm:pl-24`;

      case 'right':
        return `px-4 pt-5 pb-4 sm:p-6`;

      case 'centered':
      default:
        return `px-4 pt-5 pb-4 sm:p-6`;
    }
  }
}
