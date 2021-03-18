// You can delete the beautify comments in this file
// They are just used for the blueprint sytax

/* beautify ignore:start */
import Route from '@ember/routing/route';
import {
  task
} from "ember-concurrency";

export default class <%= pClass %>NewRoute extends Route {

  // Methods

  model( /*params*/ ) {
    // We don't usually need to load a new model via an async task
    // but moving the logic to one means our patterns are consistent
    // across the edit/archive routes and we also have the option to
    // load secondary data here if needed.
    return {
      <%= s %>: this.create<%= sUpper %>.perform({
        // add any default values for the new <%= s %> here
      }),
    };
  }

  // Tasks

  @task(function*(defaultValues) {
    const result = yield this.store.createRecord('<%= s %>', defaultValues);
    return result;
  }) create<%= sUpper %>;

}
/* beautify ignore:end */