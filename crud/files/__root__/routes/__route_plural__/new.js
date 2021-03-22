import Route from '@ember/routing/route';
import {
  task
} from "ember-concurrency";

export default class <%= routeClassPlural %>NewRoute extends Route {

  // Methods

  model( /*params*/ ) {
    // We don't usually need to load a new model via an async task
    // but moving the logic to one means our patterns are consistent
    // across the edit/archive routes and we also have the option to
    // load secondary data here if needed.
    return {
      <%= camelSingular %>: this.create<%= classSingular %>.perform({
        // add any default values for the new instance here
      }),
    };
  }

  // Tasks

  @task(function*(defaultValues) {
    const result = yield this.store.createRecord('<%= dasherizedSingular %>', defaultValues);
    return result;
  }) create<%= classSingular %>;

}
