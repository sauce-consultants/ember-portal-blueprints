import Component from '@glimmer/component';
import {
  action,
  computed
} from '@ember/object';
import moment from 'moment';
import {
  guidFor
} from '@ember/object/internals';

export default class UiFormDateRangeComponent extends Component {

  // Properties

  format = "YYYY-MM-DD";

  // Methods

  getArgWithDefault(key, defaultValue) {
    let result = this.args[key];
    if (result === undefined) {
      result = defaultValue;
    }
    return result;
  }

  // Getters

  get start() {
    if (this.args.value) {
      return this.args.value.split('~')[0];
    }
    return null;
  }

  get end() {
    if (this.args.value) {
      return this.args.value.split('~')[1];
    }
    return null;
  }
  get invalid() {
    return this.getArgWithDefault('invalid', false);
  }
  get trailingIcon() {
    if (this.invalid) {
      return 'exclamation-circle';
    }
    return this.getArgWithDefault('trailingIcon', false);
  }
  get borderColor() {
    if (this.invalid) {
      return 'red';
    }
    return 'gray';
  }
  get iconColor() {
    if (this.invalid) {
      return 'red';
    }
    return 'gray';
  }
  get focusColor() {
    if (this.invalid) {
      return 'red';
    }
    return 'orange';
  }
  get textColor() {
    if (this.invalid) {
      return 'red-500';
    }
    return 'black';
  }

  get placeholderColor() {
    if (this.invalid) {
      return 'placeholder-red-300';
    }
    return '';
  }

  get iconPadding() {
    let classArray = [];

    if (this.args.leadingIcon) {
      classArray.pushObject("pl-10");
    }
    if (this.args.trailingIcon || this.invalid) {
      classArray.pushObject("pr-10");
    }

    return classArray.join(" ");
  }

  // Computed

  @computed(function() {
    return guidFor(this) + '-date';
  }) dateInputId;

  // Actions

  @action setDateRange(startDate, endDate, picker) {

    const value = `${startDate}~${endDate}`,
      onChange = this.args.onChange;

    let string = '';
    if (startDate === endDate) {
      string = moment(startDate).format('DD/MM/YYYY');
    } else {
      string = `${moment(startDate).format('DD/MM/YYYY')} - ${moment(endDate).format('DD/MM/YYYY')}`;
    }
    picker.element.val(string)

    if (onChange) {
      onChange(value);
    }
  }
  @action hideDatePicker() {}
  @action cancelDatePicker() {

    let el = document.querySelector(`#${this.dateInputId} .daterangepicker-input`);
    if (el.value) {
      el.value = '';
    }

    const onChange = this.args.onChange;

    if (onChange) {
      onChange(null);
    }
  }

}