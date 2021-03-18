// You can delete the beautify comments in this file
// They are just used for the blueprint sytax

/* beautify ignore:start */
import Route from '@ember/routing/route';
import {
  task
} from "ember-concurrency";

export default class <%= sClass %>Route extends Route {

  // Methods

  model(params) {
    return {
      <%= s %>: this.load<%= sUpper %>.perform(params.<%= s %>_id, {}),
    };
  }

  // Tasks

  @task(function*(<%= s %>Id, params) {
    const result = yield this.store.findRecord('<%= s %>', <%= s %>Id, params);
    return result;
  }) load<%= sUpper %>;
}
/* beautify ignore:end */