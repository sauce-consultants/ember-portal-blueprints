import Component from '@glimmer/component';
import LoginValidations from '<%= app %>/validations/login';

export default class AuthLoginFormComponent extends Component {

  // Validations

  LoginValidations = LoginValidations;

}
