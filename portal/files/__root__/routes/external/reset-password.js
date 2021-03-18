import Route from "@ember/routing/route";

export default class ExternalResetPasswordRoute extends Route {
  // Methods

  model(params) {
    return this.store.createRecord("user", {
      recoveryToken: params.token,
    });
  }
}
