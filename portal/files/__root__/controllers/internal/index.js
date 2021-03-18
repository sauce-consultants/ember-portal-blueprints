import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';
import {
  action,
  computed
} from '@ember/object';

export default class InternalIndexController extends Controller {

  // Services

  @service session;

  // Getters

  @computed('session.data.authenticated.data.attributes')
  get currentUser() {
    return this.session.data.authenticated.data.attributes;
  }

  @action
  logout() {
    this.session.invalidate();
  }
}