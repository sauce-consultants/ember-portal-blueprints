import Model, {attr} from '@ember-data/model';

export default class UserModel extends Model {
  // Attributes

  @attr('string') email;
  @attr('string') password;
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') token;

  // Computeds

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
