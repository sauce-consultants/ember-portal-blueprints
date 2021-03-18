import Component from "@glimmer/component";
import ResetPasswordValidations from "<%= app %>/validations/reset-password";

export default class AuthResetPasswordFormComponent extends Component {
  // Validations

  ResetPasswordValidations = ResetPasswordValidations;
}
