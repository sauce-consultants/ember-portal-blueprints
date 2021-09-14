import Component from '@glimmer/component';

export default class UiButtonComponent extends Component {
  _color = 'gray';
  _size = 'md';
  _busy = false;
  _busyIcon = 'loading';
  _type = 'button';

  // Methods

  getArgWithDefault(key, defaultValue) {
    let result = this.args[key];
    if (result === undefined) {
      result = defaultValue;
    }
    return result;
  }

  get onClick() {
    return this.getArgWithDefault('onClick', () => {});
  }
  get type() {
    return this.getArgWithDefault('type', this._type);
  }
  get color() {
    return this.getArgWithDefault('color', this._color);
  }
  get size() {
    return this.getArgWithDefault('size', this._size);
  }
  get style() {
    return this.getArgWithDefault('style', this._style);
  }
  get isBusy() {
    if (this.getArgWithDefault('task.isRunning', false)) {
      // task is running so show button in busy state
      return true;
    }
    // check if we have passed in a busy flag
    return this.getArgWithDefault('busy', this._busy);
  }

  get isLoading() {
    return this.getArgWithDefault('loading', false);
  }

  get isDisabled() {
    if (this.isBusy) {
      // if we're busy we should also disable the button
      return true;
    }
    // check if we have passed in a disabled state
    return this.getArgWithDefault('disabled', false);
  }

  get busyIcon() {
    return this.getArgWithDefault('busyIcon', this._busyIcon);
  }

  get iconPath() {
    if (this.isBusy) {
      return this.busyIcon;
    } else {
      return this.args.icon;
    }
  }

  get sizeClasses() {
    const size = this.getArgWithDefault('size', this._size);

    switch (size) {
      case 'xs':
        return `p-1`;
      case 'sm':
        return `p-1.5`;
      case 'md':
        return `p-2`;
      case 'lg':
        return `p-2`;
      case 'xl':
        return `p-3`;
      default:
        return '';
    }
  }

  get svgClasses() {
    const size = this.getArgWithDefault('size', this._size);

    switch (size) {
      case 'xs':
        return `h-5 w-5`;
      case 'sm':
        return `h-5 w-5`;
      case 'md':
        return `h-5 w-5`;
      case 'lg':
        return `h-6 w-6`;
      case 'xl':
        return `h-6 w-6`;
      default:
        return '';
    }
  }

  get colorClasses() {
    const color = this.getArgWithDefault('color', this._color),
      style = this.getArgWithDefault('style', this._style);

    if (this.isLoading) {
      return 'bg-gray-200 dark:bg-gray-800 text-transparent';
    }

    if (style === 'fill') {
      if (color === 'black') {
        return `text-white dark:text-black 
            bg-black dark:bg-white 
            hover:bg-gray-900 dark:hover:bg-gray-100 
            focus:ring-gray-900 dark:focus:ring-gray-100
            focus:ring-offset-white dark:focus:ring-offset-black`;
      } else if (color === 'white') {
        return `text-black dark:text-white 
              bg-white dark:bg-black
              hover:bg-gray-100 dark:hover:bg-gray-900 
              focus:ring-gray-100 dark:focus:ring-gray-900
              focus:ring-offset-white dark:focus:ring-offset-black`;
      } else {
        return `text-white dark:text-black 
            bg-${color}-600 dark:bg-${color}-400 
            hover:bg-${color}-700 dark:hover:bg-${color}-300 
            focus:ring-${color}-500
            focus:ring-offset-white dark:focus:ring-offset-black`;
      }
    } else {
      if (color === 'black') {
        return `text-black dark:text-white 
              hover:bg-gray-100 dark:hover:bg-gray-900 
              focus:ring-gray-800 dark:focus:ring-gray-200
              focus:ring-offset-white dark:focus:ring-offset-black`;
      } else if (color === 'white') {
        return `text-white dark:text-black 
            hover:bg-gray-900 dark:hover:bg-gray-100 
            focus:ring-gray-200 dark:focus:ring-gray-800
            focus:ring-offset-white dark:focus:ring-offset-black`;
      } else {
        return `text-${color}-500
            hover:bg-${color}-100 dark:hover:bg-${color}-900 
            focus:ring-${color}-200 dark:focus:ring-${color}-800
            focus:ring-offset-white dark:focus:ring-offset-black`;
      }
    }
  }

  get disabledClasses() {
    if (this.args.disabled) {
      return 'opacity-50 cursor-not-allowed';
    } else {
      return '';
    }
  }
}
