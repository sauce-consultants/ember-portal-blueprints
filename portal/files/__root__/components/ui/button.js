import Component from '@glimmer/component';

export default class UiButtonComponent extends Component {
  _color = 'gray';
  _size = 'md';
  _style = 'primary'; // primary, secondary, border, text
  _busyText = 'Loading...';
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

  get leadingIconClasses() {
    const size = this.size,
      busy = this.isBusy,
      opacity = busy ? 'opacity-0' : 'opacity-100',
      busyClasses = 'transition-opacity ease-in-out duration-300 ' + opacity;

    switch (size) {
      case 'xs':
        return `-ml-0.5 mr-2 h-4 w-4 ${busyClasses}`;
      case 'sm':
        return `-ml-0.5 mr-2 h-4 w-4 ${busyClasses}`;
      case 'md':
        return `-ml-1 mr-2 h-5 w-5 ${busyClasses}`;
      case 'lg':
        return `-ml-1 mr-3 h-5 w-5 ${busyClasses}`;
      case 'xl':
        return `-ml-1 mr-3 h-5 w-5 ${busyClasses}`;
      default:
        return '';
    }
  }

  get trailingIconClasses() {
    const size = this.size,
      busy = this.isBusy,
      opacity = busy ? 'opacity-0' : 'opacity-100',
      busyClasses = 'transition-opacity ease-in-out duration-300 ' + opacity;

    switch (size) {
      case 'xs':
        return `ml-2 -mr-0.5 h-4 w-4 ${busyClasses}`;
      case 'sm':
        return `ml-2 -mr-0.5 h-4 w-4 ${busyClasses}`;
      case 'md':
        return `ml-2 -mr-1 h-5 w-5 ${busyClasses}`;
      case 'lg':
        return `ml-3 -mr-1 h-5 w-5 ${busyClasses}`;
      case 'xl':
        return `ml-3 -mr-1 h-5 w-5 ${busyClasses}`;
      default:
        return '';
    }
  }

  get busyIconClasses() {
    const size = this.size,
      busy = this.isBusy,
      opacity = busy ? 'opacity-100' : 'opacity-0';

    switch (size) {
      case 'xs':
        return `absolute h-4 w-4 transition-opacity ease-in-out duration-300 ${opacity}`;
      case 'sm':
        return `absolute h-4 w-4 transition-opacity ease-in-out duration-300 ${opacity}`;
      case 'md':
        return `absolute h-5 w-5 transition-opacity ease-in-out duration-300 ${opacity}`;
      case 'lg':
        return `absolute h-5 w-5 transition-opacity ease-in-out duration-300 ${opacity}`;
      case 'xl':
        return `absolute h-5 w-5 transition-opacity ease-in-out duration-300 ${opacity}`;
      default:
        return '';
    }
  }

  get disabledClasses() {
    if (this.args.disabled) {
      return 'opacity-50 cursor-not-allowed';
    } else {
      return '';
    }
  }

  get buttonClasses() {
    const style = this.style,
      size = this.size,
      bgColor = this.isLoading ? 'gray' : this.color,
      disabledClasses = this.disabledClasses,
      transitionClasses = `transition ease-in-out duration-150`,
      additionalClasses = this.args.class,
      // remove sm:flex-none to allow group buttons to sit side by side
      commonClasses = `truncate inline-flex justify-center items-center align-center max-w-xs ${additionalClasses}`,
      loadingClasses = this.isLoading ? 'text-transparent' : '';
    let colorClasses = '';

    switch (style) {
      case 'primary':
        if (this.isLoading) {
          colorClasses = 'bg-gray-200 dark:bg-gray-800 text-transparent';
        } else if (bgColor === 'black') {
          colorClasses = `text-white dark:text-black 
          shadow-${size} 
          bg-black dark:bg-white
          hover:bg-gray-900 dark:hover:bg-gray-100 
          focus:border-gray-600 dark:focus:border-gray-400 
          focus:shadow-outline-black dark:focus:shadow-outline-white
          active:bg-gray-100 dark:active:bg-gray-900`;
        } else if (bgColor === 'white') {
          colorClasses = `text-black dark:text-white
          shadow-${size} 
          bg-white dark:bg-black
          hover:bg-gray-100 dark:hover:bg-gray-900 
          focus:border-gray-400 dark:focus:border-gray-500 
          focus:shadow-outline-white dark:focus:shadow-outline-black
          active:bg-gray-900 dark:active:bg-gray-100`;
        } else {
          colorClasses = `text-white dark:text-black 
          shadow-${size} 
          bg-${bgColor}-500
          hover:bg-${bgColor}-400 dark:hover:bg-${bgColor}-600 
          focus:border-${bgColor}-600 dark:focus:border-${bgColor}-400 
          focus:shadow-outline-${bgColor} 
          active:bg-${bgColor}-600`;
        }

        switch (size) {
          case 'xs':
            return `${commonClasses} px-2.5 py-1.5 border border-transparent text-xs leading-4 font-normal rounded focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'sm':
            return `${commonClasses} px-3 py-2 border border-transparent text-sm leading-4 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'md':
            return `${commonClasses} px-4 py-2 border border-transparent text-sm leading-5 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'lg':
            return `${commonClasses} px-4 py-2 border border-transparent text-base leading-6 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'xl':
            return `${commonClasses} px-6 py-3 border border-transparent text-base leading-6 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          default:
            return '';
        }

      case 'secondary':
        if (this.isLoading) {
          colorClasses = 'bg-gray-200 dark:bg-gray-800 text-transparent';
        } else if (bgColor === 'black') {
          colorClasses = `text-white dark:text-black 
          bg-gray-950 dark:bg-gray-50 
          hover:bg-gray-900 dark:hover:bg-gray-100 
          focus:outline-none 
          focus:border-gray-800 dark:focus:border-gray-200 
          focus:shadow-outline-gray 
          active:bg-gray-900 dark:active:bg-gray-100`;
        } else if (bgColor === 'white') {
          colorClasses = `text-black dark:text-white
          bg-gray-50 dark:bg-gray-950 
          hover:bg-gray-10 dark:hover:bg-gray-900 
          focus:outline-none 
          focus:border-gray-200 dark:focus:border-gray-800 
          focus:shadow-outline-gray 
          active:bg-gray-100 dark:active:bg-gray-900`;
        } else {
          colorClasses = `text-${bgColor}-700 dark:text-${bgColor}-300 
          bg-${bgColor}-100 dark:bg-${bgColor}-900 
          hover:bg-${bgColor}-50 dark:hover:bg-${bgColor}-950 
          focus:outline-none 
          focus:border-${bgColor}-300 dark:focus:border-${bgColor}-800 
          focus:shadow-outline-${bgColor} 
          active:bg-${bgColor}-200 dark:active:bg-${bgColor}-800`;
        }

        switch (size) {
          case 'xs':
            return `${commonClasses} px-2.5 py-1.5 border border-transparent text-xs leading-4 font-normal rounded focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'sm':
            return `${commonClasses} px-3 py-2 border border-transparent text-sm leading-4 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'md':
            return `${commonClasses} px-4 py-2 border border-transparent text-sm leading-5 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'lg':
            return `${commonClasses} px-4 py-2 border border-transparent text-base leading-6 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'xl':
            return `${commonClasses} px-6 py-3 border border-transparent text-base leading-6 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          default:
            return '';
        }

      case 'white':
      case 'border':
        if (this.isLoading) {
          colorClasses = 'bg-gray-200 dark:bg-gray-800 text-transparent';
        } else if (bgColor === 'black') {
          colorClasses = `text-black dark:text-white
          bg-white dark:bg-black 
          hover:text-gray-500 
          border-black  dark:border-white
          focus:border-gray-900 dark:focus:border-gray-100
          focus:shadow-outline-white 
          active:text-gray-800 dark:active:text-gray-200 
          active:bg-gray-50 dark:active:bg-gray-950`;
        } else if (bgColor === 'white') {
          colorClasses = `text-white dark:text-black 
          bg-black dark:bg-white 
          hover:text-gray-500 
          border-white dark:border-black
          focus:border-gray-100 dark:focus:border-gray-900
          focus:shadow-outline-black
          active:text-gray-200 dark:active:text-gray-800 
          active:bg-gray-950 dark:active:bg-gray-50`;
        } else {
          colorClasses = `text-${bgColor}-700 dark:text-${bgColor}-300 
          
          hover:text-${bgColor}-500 
          border-${bgColor}-700 dark:border-${bgColor}-300
          focus:border-${bgColor}-300 dark:focus:border-${bgColor}-700 
          focus:shadow-outline-${bgColor} 
          active:text-${bgColor}-800 dark:active:text-${bgColor}-200 
          active:bg-${bgColor}-50 dark:active:bg-${bgColor}-950`;
        }
        switch (size) {
          case 'xs':
            return `${commonClasses} px-2.5 py-1.5 border text-xs leading-4 font-normal rounded focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'sm':
            return `${commonClasses} px-3 py-2 border text-sm leading-4 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'md':
            return `${commonClasses} px-4 py-2 border text-sm leading-5 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'lg':
            return `${commonClasses} px-4 py-2 border text-base leading-6 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'xl':
            return `${commonClasses} px-6 py-3 border text-base leading-6 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          default:
            return '';
        }

      case 'text':
        // removing bg colors here for now: bg-white dark:bg-black
        if (this.isLoading) {
          colorClasses = 'bg-gray-200 dark:bg-gray-800 text-transparent';
        } else if (bgColor === 'black') {
          colorClasses = `text-black dark:text-white 
          hover:text-gray-900 dark:hover:text-gray-100 
          hover:bg-gray-50 dark:hover:bg-gray-950 
          focus:shadow-outline-black 
          focus:bg-gray-100 dark:focus:bg-gray-900 
          active:text-gray-950 dark:active:text-gray-50 
          active:bg-gray-50 dark:active:bg-gray-950`;
        } else if (bgColor === 'white') {
          colorClasses = `text-white dark:text-black
          hover:text-gray-50 dark:hover:text-gray-900 
          hover:bg-gray-950 dark:hover:bg-gray-50 
          focus:shadow-outline-white 
          focus:bg-gray-900 dark:focus:bg-gray-100 
          active:text-gray-50 dark:active:text-gray-950 
          active:bg-gray-950 dark:active:bg-gray-50`;
        } else {
          colorClasses = `text-${bgColor}-700  dark:text-${bgColor}-300 
          hover:text-${bgColor}-500 
          hover:bg-${bgColor}-50 dark:hover:bg-${bgColor}-950 
          focus:shadow-outline-${bgColor} 
          focus:bg-${bgColor}-200 dark:focus:bg-${bgColor}-800 
          active:text-${bgColor}-800 dark:active:text-${bgColor}-200 
          active:bg-${bgColor}-50 dark:active:bg-${bgColor}-950`;
        }
        switch (size) {
          case 'xs':
            return `${commonClasses} px-2.5 py-1.5 border border-transparent text-xs leading-4 font-normal rounded focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'sm':
            return `${commonClasses} px-3 py-2 border border-transparent text-sm leading-4 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'md':
            return `${commonClasses} px-4 py-2 border border-transparent text-sm leading-5 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'lg':
            return `${commonClasses} px-4 py-2 border border-transparent text-base leading-6 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          case 'xl':
            return `${commonClasses} px-6 py-3 border border-transparent text-base leading-6 font-normal rounded-md focus:outline-none ${colorClasses} ${transitionClasses} ${disabledClasses} ${loadingClasses}`;
          default:
            return '';
        }
      default:
        return '';
    }
  }

  // @action
  // onClick() {
  //   if (this.args.onClick) {
  //     return this.args.onClick();
  //   }
  // }
}
