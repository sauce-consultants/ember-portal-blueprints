import Route from '@ember/routing/route';

export default class ExternalLoginRoute extends Route {

  // Methods

  model() {
    return this.store.createRecord('user');
  }
}