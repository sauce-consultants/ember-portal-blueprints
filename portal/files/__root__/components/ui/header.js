import Component from '@glimmer/component';

export default class UiHeaderComponent extends Component {
  // Getters

  get colorClasses() {
    const loading = this.args.loading,
      color = this.args.color ? this.args.color : 'transparent';
    if (loading) {
      if (color === 'transparent') {
        return '';
      } else {
        return 'bg-gray-100 dark:bg-gray-900 text-black dark:text-white';
      }
    }

    if (color === 'black') {
      return `text-white dark:text-black bg-black dark:bg-white`;
    } else if (color === 'white') {
      return `text-black dark:text-white bg-white dark:bg-black`;
    } else {
      return `text-black dark:text-white bg-${color}-400 dark:bg-${color}-600`;
    }
  }
}
