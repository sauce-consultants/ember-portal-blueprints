import Route from "@ember/routing/route";

export default class ExternalRecoverPasswordRoute extends Route {
  model() {
    return this.store.createRecord("user");
  }
}
