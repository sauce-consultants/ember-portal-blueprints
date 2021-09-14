import Component from '@glimmer/component';

export default class UiModalAsideComponent extends Component {
  get baseClasses() {
    const style = this.args.style ? this.args.style : 'centered';

    switch (style) {
      case 'left':
        return `flex mb-3 sm:mb-5 sm:absolute sm:top-6 sm:left-6`;

      case 'right':
        return `flex mb-3 sm:mb-5 sm:absolute sm:top-6 sm:right-6`;

      case 'centered':
      default:
        return `flex mb-3 sm:mb-5`;
    }
  }
}
