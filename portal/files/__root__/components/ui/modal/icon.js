import Component from '@glimmer/component';

export default class UiModalIconComponent extends Component {
  get colorClass() {
    const color = this.args.color ? this.args.color : 'primary';

    switch (color) {
      case 'black':
        return `bg-black dark:bg-white text-white dark:text-black`;

      case 'white':
        return `bg-white dark:bg-black text-black dark:text-white`;

      default:
        return `bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-400`;
    }
  }
}
