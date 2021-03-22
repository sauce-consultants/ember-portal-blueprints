import Route from '@ember/routing/route';
import {
  task
} from "ember-concurrency";

export default class <%= routeClassSingular %>Route extends Route {

  // Methods

  model(params) {
    return {
      <%= camelSingular %>: this.load<%= classSingular %>.perform(params.<%= underscoreSingular %>_id, {}),
    };
  }

  // Tasks

  @task(function*(<%= camelSingular %>Id, params) {
    const result = yield this.store.findRecord('<%= dasherizedSingular %>', <%= camelSingular %>Id, params);
    return result;
  }) load<%= classSingular %>;
}
