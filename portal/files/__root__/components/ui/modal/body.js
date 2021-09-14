import Component from '@glimmer/component';

export default class UiModalBodyComponent extends Component {
  get baseClasses() {
    const style = this.args.style ? this.args.style : 'centered';

    switch (style) {
      case 'left':
        return `px-4 pt-5 pb-4 text-center sm:p-6 sm:pl-24 sm:text-left sm:relative`;

      case 'right':
        return `px-4 pt-5 pb-4 text-center sm:p-6 sm:pr-24 sm:text-left sm:relative`;

      case 'centered':
      default:
        return `px-4 pt-5 pb-4 sm:p-6 text-center`;
    }
  }
}
