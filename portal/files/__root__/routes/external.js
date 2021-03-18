import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class ExternalRoute extends Route {
  // Services

  @service session;

  // Methods

  beforeModel(/*transition*/) {
    this.session.prohibitAuthentication("internal.index");
  }
}
