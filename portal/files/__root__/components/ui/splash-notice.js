import Component from '@glimmer/component';

export default class UiSplashNoticeComponent extends Component {
  // Getters
  get iconClasses() {
    const color = this.args.color ? this.args.color : 'gray';

    if (this.args.loading) {
      return `bg-gray-200 dark:bg-gray-800 rounded-full text-transparent`;
    } else if (color === 'black') {
      return `bg-black dark:bg-white text-white dark:text-black`;
    } else if (color === 'white') {
      return `bg-white dark:bg-black text-black dark:text-white`;
    } else {
      return `bg-${color}-100 dark:bg-${color}-900 text-${color}-600 dark:text-${color}-400`;
    }
  }
}
