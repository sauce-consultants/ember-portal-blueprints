import Controller from "@ember/controller";
import { task } from "ember-concurrency";
import { inject as service } from "@ember/service";
import { alias } from "@ember/object/computed";
import { tracked } from "@glimmer/tracking";
import { t } from "ember-intl";
import mapResponseErrors from "../../utils/map-response-errors";

export default class ExternalLoginController extends Controller {
  // Services

  @service flashMessages;

  @service session;

  // Tracking

  @tracked serverErrors = [];

  // Computed

  @alias("model") authUser;
  @alias("session.data.authenticated.data.attributes.first-name") firstName;
  @alias("session.data.authenticated.data.attributes.last-name") lastName;

  // Translations

  @t("external.login.messages.success", { name: "firstName" }) successMessage;
  @t("external.login.messages.validation") validationMessage;
  @t("external.login.messages.server") serverMessage;

  // Tasks

  @task(function* (changeset) {
    this.serverErrors = [];

    yield changeset.validate();

    if (changeset.get("isValid")) {
      let { email, password } = changeset;

      try {
        yield this.session.authenticate("authenticator:basic", {
          email,
          password,
        });

        if (this.session.isAuthenticated) {
          // success
        }
      } catch (response) {
        const json = yield response.responseJSON;
        this.serverErrors = mapResponseErrors(json);
        this.flashMessages.alert(this.serverMessage);
        throw "Server Error";
      }
    } else {
      this.flashMessages.alert(this.validationMessage);
      throw "Validation Errors";
    }
  })
  onLogin;

  @task(function* (/*changeset*/) {
    if (this.session.isAuthenticated) {
      yield this.flashMessages.success(this.successMessage);
      // What to do with all this success?
      this.transitionToRoute("internal");
    }
  })
  afterLogin;
}
