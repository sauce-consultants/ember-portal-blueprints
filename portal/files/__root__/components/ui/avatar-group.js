import Component from '@glimmer/component';

export default class UiAvatarGroupComponent extends Component {
  get groupClasses() {
    const size = this.args.size ? this.args.size : 'md',
      reverse = this.args.reverse ? this.args.reverse : false;

    let classNames = 'flex flex-wrap overflow-hidden';

    if (reverse) {
      switch (size) {
        case 'xs':
          classNames = classNames + ' flex-row-reverse pl-1';
          break;
        case 'sm':
          classNames = classNames + ' flex-row-reverse pl-2';
          break;
        case 'lg':
          classNames = classNames + ' flex-row-reverse pl-2';
          break;
        case 'xl':
          classNames = classNames + ' flex-row-reverse pl-2';
          break;
        case 'md':
        default:
          classNames = classNames + ' flex-row-reverse pl-2';
          break;
      }
    } else {
      switch (size) {
        case 'xs':
          classNames = classNames + ' -space-x-1';
          break;
        case 'sm':
          classNames = classNames + ' -space-x-2';
          break;
        case 'lg':
          classNames = classNames + ' -space-x-2';
          break;
        case 'xl':
          classNames = classNames + ' -space-x-2';
          break;
        case 'md':
        default:
          classNames = classNames + ' -space-x-2';
          break;
      }
    }

    return classNames;
  }
}
