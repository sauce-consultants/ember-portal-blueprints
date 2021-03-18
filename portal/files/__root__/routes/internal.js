import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class InternalRoute extends Route {
  // Services

  @service session;

  // Methods

  beforeModel(transition) {
    this.session.requireAuthentication(transition, "external.login");
  }
}
