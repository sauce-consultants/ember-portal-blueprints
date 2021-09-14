import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class UiFormInputComponent extends Component {
  // Methods

  getArgWithDefault(key, defaultValue) {
    let result = this.args[key];
    if (result === undefined) {
      result = defaultValue;
    }
    return result;
  }

  // Getters

  get invalid() {
    return this.getArgWithDefault('invalid', false);
  }

  get trailingIcon() {
    if (this.invalid) {
      return 'exclamation-circle';
    }
    return this.getArgWithDefault('trailingIcon', false);
  }
  get iconColor() {
    if (this.invalid) {
      return 'danger';
    }
    return 'gray';
  }
  get borderClasses() {
    if (this.invalid) {
      return 'rounded-md border border-danger-500';
    }
    return 'rounded-md border border-gray-300 dark:border-gray-700';
  }
  get focusClasses() {
    if (this.invalid) {
      return 'focus:outline-none focus:border-danger-600 dark:focus:border-danger-400  focus:ring-danger-500 focus:ring-2 focus:ring-opacity-50';
    }
    return 'focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 focus:ring-primary-500 focus:ring-2 focus:ring-opacity-50';
  }
  get textClasses() {
    if (this.invalid) {
      return 'text-danger-500 placeholder-danger-300 dark:placeholder-danger-700';
    }
    return 'text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600';
  }

  get disabledClasses() {
    return `disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed`;
  }

  get iconPadding() {
    let classArray = [];

    if (this.args.leadingIcon) {
      classArray.pushObject('pl-10');
    }
    if (this.args.trailingIcon || this.invalid) {
      classArray.pushObject('pr-10');
    }

    return classArray.join(' ');
  }

  @action onChange(event) {
    // check if we have defined an onChange action
    const changeAction = this.getArgWithDefault('onChange', () => {});
    // send to the onChange event the user has passed in
    changeAction(event.target.value);
  }
}
