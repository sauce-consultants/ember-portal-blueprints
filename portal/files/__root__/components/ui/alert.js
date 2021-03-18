import Component from '@glimmer/component';

export default class UiAlertComponent extends Component {

  tagName = "";

  get roundedClass() {
    let rounded = this.args.rounded;
    if (rounded === undefined) {
      rounded = true;
    }

    return rounded ? 'rounded-md' : '';
  }
  get theme() {

    switch (this.args.type) {
      case "warning":
        return "warning";
      case "error":
        return "danger";
      case "success":
        return "success";
      case "primary":
        return "primary";
      case "accent":
      case "secondary":
        return "accent";
      default:
        return "gray";
    }

  }

  get icon() {

    if (this.args.icon) {
      return this.args.icon;
    }
    switch (this.args.type) {
      case "warning":
        return "exclamation";
      case "error":
        return "x-circle";
      case "success":
        return "check-circle";
      default:
        return "information-circle";
    }

  }
}