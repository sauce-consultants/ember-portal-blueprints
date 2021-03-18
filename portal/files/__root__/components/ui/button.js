import Component from '@glimmer/component';

export default class UiButtonComponent extends Component {

  _color = "primary";
  _size = "sm";
  _style = "primary"; // primary, secondary, border, text
  _runningText = "Loading...";
  _loading = false;
  _loadingIcon = "loading";
  _type = "button";

  // Methods

  getArgWithDefault(key, defaultValue) {
    let result = this.args[key];
    if (result === undefined) {
      result = defaultValue;
    }
    return result;
  }

  get onClick() {
    return this.getArgWithDefault("onClick", () => {});
  }
  get type() {
    return this.getArgWithDefault("type", this._type);
  }
  get color() {
    return this.getArgWithDefault("color", this._color);
  }
  get size() {
    return this.getArgWithDefault("size", this._size);
  }
  get style() {
    return this.getArgWithDefault("style", this._style);
  }
  get loading() {
    if (this.getArgWithDefault("task.isRunning", false)) {
      // task is running so show button in loading state
      return true;
    }
    // check if we have passed in a loading state
    return this.getArgWithDefault("loading", this._loading);
  }

  get disabled() {
    if (this.loading) {
      // if we're loading we should also disable the button
      return true;
    }
    // check if we have passed in a disabled state
    return this.getArgWithDefault('disabled', false);
  }

  get loadingIcon() {
    return this.getArgWithDefault("loadingIcon", this._loadingIcon);
  }

  get leadingIconClasses() {
    const size = this.size,
      loading = this.loading,
      opacity = loading ? "opacity-0" : "opacity-100",
      loadingClasses = "transition-opacity ease-in-out duration-300 " + opacity;

    switch (size) {
      case "xs":
        return `-ml-0.5 mr-2 h-4 w-4 ${loadingClasses}`;
      case "sm":
        return `-ml-0.5 mr-2 h-4 w-4 ${loadingClasses}`;
      case "md":
        return `-ml-1 mr-2 h-5 w-5 ${loadingClasses}`;
      case "lg":
        return `-ml-1 mr-3 h-5 w-5 ${loadingClasses}`;
      case "xl":
        return `-ml-1 mr-3 h-5 w-5 ${loadingClasses}`;
      default:
        return "";
    }
  }

  get trailingIconClasses() {
    const size = this.size,
      loading = this.loading,
      opacity = loading ? "opacity-0" : "opacity-100",
      loadingClasses = "transition-opacity ease-in-out duration-300 " + opacity;

    switch (size) {
      case "xs":
        return `ml-2 -mr-0.5 h-4 w-4 ${loadingClasses}`;
      case "sm":
        return `ml-2 -mr-0.5 h-4 w-4 ${loadingClasses}`;
      case "md":
        return `ml-2 -mr-1 h-5 w-5 ${loadingClasses}`;
      case "lg":
        return `ml-3 -mr-1 h-5 w-5 ${loadingClasses}`;
      case "xl":
        return `ml-3 -mr-1 h-5 w-5 ${loadingClasses}`;
      default:
        return "";
    }
  }

  get loadingIconClasses() {
    const size = this.size,
      loading = this.loading,
      opacity = loading ? "opacity-100" : "opacity-0";

    switch (size) {
      case "xs":
        return `absolute h-4 w-4 transition-opacity ease-in-out duration-300 ${opacity}`;
      case "sm":
        return `absolute h-4 w-4 transition-opacity ease-in-out duration-300 ${opacity}`;
      case "md":
        return `absolute h-5 w-5 transition-opacity ease-in-out duration-300 ${opacity}`;
      case "lg":
        return `absolute h-5 w-5 transition-opacity ease-in-out duration-300 ${opacity}`;
      case "xl":
        return `absolute h-5 w-5 transition-opacity ease-in-out duration-300 ${opacity}`;
      default:
        return "";
    }
  }


  get disabledClasses() {
    if (this.args.disabled) {
      return "opacity-50 cursor-not-allowed";
    } else {
      return "";
    }
  }

  get buttonClasses() {
    const style = this.style,
      size = this.size,
      bgColor = this.color,
      disabledClasses = this.disabledClasses,
      commonClasses = "truncate inline-flex justify-center items-center align-center flex-auto sm:flex-none";

    switch (style) {
      case "primary":

        switch (size) {
          case "xs":
            return `${commonClasses} px-2.5 py-1.5 border border-transparent text-xs leading-4 font-normal rounded text-white shadow-${size} bg-${bgColor}-500 hover:bg-${bgColor}-400 focus:outline-none focus:border-${bgColor}-600 focus:shadow-outline-${bgColor} active:bg-${bgColor}-600 transition ease-in-out duration-150 ${disabledClasses}`;
          case "sm":
            return `${commonClasses} px-3 py-2 border border-transparent text-sm leading-4 font-normal rounded-md text-white shadow-${size} bg-${bgColor}-500 hover:bg-${bgColor}-400 focus:outline-none focus:border-${bgColor}-600 focus:shadow-outline-${bgColor} active:bg-${bgColor}-600 transition ease-in-out duration-150 ${disabledClasses}`;
          case "md":
            return `${commonClasses} px-4 py-2 border border-transparent text-sm leading-5 font-normal rounded-md text-white shadow-${size} bg-${bgColor}-500 hover:bg-${bgColor}-400 focus:outline-none focus:border-${bgColor}-600 focus:shadow-outline-${bgColor} active:bg-${bgColor}-600 transition ease-in-out duration-150 ${disabledClasses}`;
          case "lg":
            return `${commonClasses} px-4 py-2 border border-transparent text-base leading-6 font-normal rounded-md text-white shadow-${size} bg-${bgColor}-500 hover:bg-${bgColor}-400 focus:outline-none focus:border-${bgColor}-600 focus:shadow-outline-${bgColor} active:bg-${bgColor}-600 transition ease-in-out duration-150 ${disabledClasses}`;
          case "xl":
            return `${commonClasses} px-6 py-3 border border-transparent text-base leading-6 font-normal rounded-md text-white shadow-${size} bg-${bgColor}-500 hover:bg-${bgColor}-400 focus:outline-none focus:border-${bgColor}-600 focus:shadow-outline-${bgColor} active:bg-${bgColor}-600 transition ease-in-out duration-150 ${disabledClasses}`;
          default:
            return "";
        }

        case "secondary":
          switch (size) {
            case "xs":
              return `${commonClasses} px-2.5 py-1.5 border border-transparent text-xs leading-4 font-normal rounded text-${bgColor}-700 bg-${bgColor}-100 hover:bg-${bgColor}-50 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:bg-${bgColor}-200 transition ease-in-out duration-150 ${disabledClasses}`;
            case "sm":
              return `${commonClasses} px-3 py-2 border border-transparent text-sm leading-4 font-normal rounded-md text-${bgColor}-700 bg-${bgColor}-100 hover:bg-${bgColor}-50 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:bg-${bgColor}-200 transition ease-in-out duration-150 ${disabledClasses}`;
            case "md":
              return `${commonClasses} px-4 py-2 border border-transparent text-sm leading-5 font-normal rounded-md text-${bgColor}-700 bg-${bgColor}-100 hover:bg-${bgColor}-50 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:bg-${bgColor}-200 transition ease-in-out duration-150 ${disabledClasses}`;
            case "lg":
              return `${commonClasses} px-4 py-2 border border-transparent text-base leading-6 font-normal rounded-md text-${bgColor}-700 bg-${bgColor}-100 hover:bg-${bgColor}-50 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:bg-${bgColor}-200 transition ease-in-out duration-150 ${disabledClasses}`;
            case "xl":
              return `${commonClasses} px-6 py-3 border border-transparent text-base leading-6 font-normal rounded-md text-${bgColor}-700 bg-${bgColor}-100 hover:bg-${bgColor}-50 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:bg-${bgColor}-200 transition ease-in-out duration-150 ${disabledClasses}`;
            default:
              return "";
          }

          case "white":
          case "border":
            switch (size) {
              case "xs":
                return `${commonClasses} px-2.5 py-1.5 border border-${bgColor}-300 text-xs leading-4 font-normal rounded text-${bgColor}-700 bg-white hover:text-${bgColor}-500 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
              case "sm":
                return `${commonClasses} px-3 py-2 border border-${bgColor}-300 text-sm leading-4 font-normal rounded-md text-${bgColor}-700 bg-white hover:text-${bgColor}-500 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
              case "md":
                return `${commonClasses} px-4 py-2 border border-${bgColor}-300 text-sm leading-5 font-normal rounded-md text-${bgColor}-700 bg-white hover:text-${bgColor}-500 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
              case "lg":
                return `${commonClasses} px-4 py-2 border border-${bgColor}-300 text-base leading-6 font-normal rounded-md text-${bgColor}-700 bg-white hover:text-${bgColor}-500 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
              case "xl":
                return `${commonClasses} px-6 py-3 border border-${bgColor}-300 text-base leading-6 font-normal rounded-md text-${bgColor}-700 bg-white hover:text-${bgColor}-500 focus:outline-none focus:border-${bgColor}-300 focus:shadow-outline-${bgColor} active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
              default:
                return "";
            }

            case 'text':
              switch (size) {
                case "xs":
                  return `${commonClasses} px-2.5 py-1.5 border border-transparent text-xs leading-4 font-normal rounded text-${bgColor}-700 bg-white hover:text-${bgColor}-500 hover:bg-${bgColor}-50 focus:outline-none focus:shadow-outline-${bgColor} focus:bg-${bgColor}-200 active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
                case "sm":
                  return `${commonClasses} px-3 py-2 border border-transparent text-sm leading-4 font-normal rounded-md text-${bgColor}-700 bg-white hover:text-${bgColor}-500 hover:bg-${bgColor}-50 focus:outline-none focus:shadow-outline-${bgColor} focus:bg-${bgColor}-200 active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
                case "md":
                  return `${commonClasses} px-4 py-2 border border-transparent text-sm leading-5 font-normal rounded-md text-${bgColor}-700 bg-white hover:text-${bgColor}-500 hover:bg-${bgColor}-50 focus:outline-none focus:shadow-outline-${bgColor} focus:bg-${bgColor}-200 active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
                case "lg":
                  return `${commonClasses} px-4 py-2 border border-transparent text-base leading-6 font-normal rounded-md text-${bgColor}-700 bg-white hover:text-${bgColor}-500 hover:bg-${bgColor}-50 focus:outline-none focus:shadow-outline-${bgColor} focus:bg-${bgColor}-200 active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
                case "xl":
                  return `${commonClasses} px-6 py-3 border border-transparent text-base leading-6 font-normal rounded-md text-${bgColor}-700 bg-white hover:text-${bgColor}-500 hover:bg-${bgColor}-50 focus:outline-none focus:shadow-outline-${bgColor} focus:bg-${bgColor}-200 active:text-${bgColor}-800 active:bg-${bgColor}-50 transition ease-in-out duration-150 ${disabledClasses}`;
                default:
                  return "";
              }
              default:
                return "";
    }

  }

  // @action
  // onClick() {
  //   if (this.args.onClick) {
  //     return this.args.onClick();
  //   }
  // }
}