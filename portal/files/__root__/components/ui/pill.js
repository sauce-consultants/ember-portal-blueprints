import Component from '@glimmer/component';

export default class UiPillComponent extends Component {
  get basicClasses() {
    return `inline-flex items-center font-medium`;
  }
  get styleClasses() {
    const style = this.args.style ? this.args.style : '';

    switch (style) {
      case 'rounded':
        return `rounded`;
      case 'circular':
      default:
        return `rounded-full`;
    }
  }
  get colorClasses() {
    const color = this.args.color ? this.args.color : '';

    if (this.args.loading) {
      return `bg-gray-200 dark:bg-gray-800 text-transparent`;
    } else if (color === 'black') {
      return `bg-black text-white dark:bg-white dark:text-black`;
    } else if (color === 'white') {
      return `bg-white text-black dark:bg-black dark:text-white`;
    } else {
      return `bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-200`;
    }
  }
  get sizeClasses() {
    const size = this.args.size ? this.args.size : '';

    switch (size) {
      case 'lg':
        return `px-3 py-0.5 text-sm `;
      case 'md':
      default:
        return `px-2.5 py-0.5 text-xs `;
    }
  }

  get pillClasses() {
    return `${this.basicClasses} ${this.styleClasses} ${this.colorClasses} ${this.sizeClasses}`;
  }
}
