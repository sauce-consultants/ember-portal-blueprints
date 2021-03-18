import Component from "@glimmer/component";
import { action } from "@ember/object";

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
    return this.getArgWithDefault("invalid", false);
  }
  get trailingIcon() {
    if (this.invalid) {
      return "exclamation-circle";
    }
    return this.getArgWithDefault("trailingIcon", false);
  }
  get borderColor() {
    if (this.invalid) {
      return "red";
    }
    return "gray";
  }
  get iconColor() {
    if (this.invalid) {
      return "red";
    }
    return "gray";
  }
  get focusColor() {
    if (this.invalid) {
      return "red";
    }
    return "primary";
  }
  get textColor() {
    if (this.invalid) {
      return "red-500";
    }
    return "black";
  }

  get placeholderColor() {
    if (this.invalid) {
      return "placeholder-red-300";
    }
    return "";
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

  @action onChange(event) {
    // check if we have defined an onChange action
    const changeAction = this.getArgWithDefault("onChange", () => {});
    // send to the onChange event the user has passed in
    changeAction(event.target.value);
  }
}
