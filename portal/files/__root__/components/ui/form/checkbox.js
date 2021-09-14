import Component from '@glimmer/component';

export default class UiFormCheckboxComponent extends Component {
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

  get borderClasses() {
    if (this.invalid) {
      return 'border-danger-300 dark:border-danger-700';
    }
    return 'border-gray-300 dark:border-gray-700';
  }

  get focusClasses() {
    if (this.invalid) {
      return 'focus:ring-danger-500 dark:ring-offset-black';
    }
    return 'focus:ring-primary-500 dark:ring-offset-black';
  }

  get textClasses() {
    if (this.invalid) {
      return 'text-danger-600 dark:text-danger-400';
    }
    return 'text-primary-600 dark:text-primary-400';
  }

  get disabledClasses() {
    return ` disabled:opacity-50 disabled:cursor-not-allowed`;
  }
}
