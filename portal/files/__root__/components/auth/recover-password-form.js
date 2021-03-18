import Component from "@glimmer/component";
import RecoverPasswordValidations from "<%= app %>/validations/recover-password";

export default class AuthRecoverPasswordFormComponent extends Component {
  // Validations

  RecoverPasswordValidations = RecoverPasswordValidations;
}
