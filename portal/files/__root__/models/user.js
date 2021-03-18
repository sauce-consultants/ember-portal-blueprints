import Model, {
  attr
} from '@ember-data/model';
import {
  computed
} from '@ember/object';

export default class UserModel extends Model {

  // Attributes

  @attr('string') email;
  @attr('string') password;
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') token;

  // Computeds

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}