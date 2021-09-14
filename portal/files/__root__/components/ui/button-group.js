import Component from '@glimmer/component';

export default class UiButtonGroupComponent extends Component {
  get groupClasses() {
    const style = this.args.style ? this.args.style : 'centered';

    switch (style) {
      case 'left':
        return `flex flex-col sm:flex-row justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4 w-auto`;

      case 'right':
        return `flex flex-col sm:flex-row-reverse  justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse w-auto`;

      case 'centered':
      default:
        return `flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 w-auto`;
    }
  }

  get buttonClasses() {
    const style = this.args.style ? this.args.style : 'centered';

    switch (style) {
      case 'left':
      case 'right':
        return `w-full sm:w-auto  `;

      case 'centered':
      default:
        return `w-full flex-1`;
    }
  }
}
