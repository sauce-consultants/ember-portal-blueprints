import Component from '@glimmer/component';

export default class UiAvatarComponent extends Component {
  get baseClasses() {
    if (this.args.ring) {
      return 'inline-block flex justify-center items-center uppercase tracking-tighter ring-2 ring-white dark:ring-black';
    } else {
      return 'inline-block flex justify-center items-center uppercase tracking-tighter';
    }
  }

  get reverseClasses() {
    if (this.args.reverse) {
      switch (this.args.size) {
        case 'xs':
          return '-ml-1';
        case 'sm':
          return '-ml-2';
        case 'lg':
          return '-ml-2';
        case 'xl':
          return '-ml-2';
        case 'md':
        default:
          return '-ml-2';
      }
    }
    return '';
  }

  get sizeClasses() {
    const reverse = this.args.reverse;

    switch (this.args.size) {
      case 'xs':
        return `h-6 w-6 text-xs ${reverse ? '-pl-1' : ''}`;
      case 'sm':
        return `h-8 w-8 text-sm ${reverse ? '-pl-2' : ''}`;
      case 'lg':
        return `h-12 w-12 text-lg ${reverse ? '-pl-2' : ''}`;
      case 'xl':
        return `h-14 w-14 text-xl ${reverse ? '-pl-2' : ''}`;
      case 'md':
      default:
        return `h-10 w-10 text-base ${reverse ? '-pl-2' : ''}`;
    }
  }

  get svgClasses() {
    switch (this.args.size) {
      case 'xs':
        return 'p-0.5';
      case 'sm':
        return 'p-1';
      case 'lg':
        return 'p-2';
      case 'xl':
        return 'p-2.5';
      case 'md':
      default:
        return 'p-1.5';
    }
  }

  get styleClasses() {
    switch (this.args.style) {
      case 'rounded':
        return 'rounded-md';
      case 'circular':
      default:
        return 'rounded-full';
    }
  }

  get colorClasses() {
    const color = this.args.color ? this.args.color : 'gray';

    switch (this.args.color) {
      case 'black':
        return 'bg-black text-white dark:bg-white dark:text-black';
      case 'white':
        return 'bg-white text-black dark:bg-black dark:text-white';
      default:
        return `bg-${color}-500 text-white dark:text-black`;
    }
  }
}
