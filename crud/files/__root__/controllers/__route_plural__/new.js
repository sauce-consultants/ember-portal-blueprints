import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';
import {
  tracked
} from '@glimmer/tracking';
import {
  action
} from '@ember/object';
import {
  alias
} from '@ember/object/computed';
import {
  task
} from 'ember-concurrency';
import { t } from "ember-intl";
import <%= classSingular %>Validations from '<%= appName %>/validations/<%= dasherizedSingular %>';

export default class <%= routeClassPlural %>NewController extends Controller {

  // Services

  @service flashMessages;

  // Properties

  <%= classSingular %>Validations = <%= classSingular %>Validations;

  // Tracking

  @tracked serverErrors = [];

  // Computeds

  @alias('model.<%= camelSingular %>.value') <%= camelSingular %>;
  @alias('model.<%= camelSingular %>.isRunning') loading;

  // Translations

  @t("<%= dasherizedSingular %>.new.messages.cancel") cancelMessage;
  @t("<%= dasherizedSingular %>.new.messages.success") successMessage;
  @t("<%= dasherizedSingular %>.new.messages.validation") validationMessage;
  @t("<%= dasherizedSingular %>.new.messages.server") serverMessage;

  // Actions

  @action cancel(changeset) {
    this.flashMessages.success(this.cancelMessage);
    return changeset.rollback();
  }

  // Tasks

  @task(function*(changeset) {

    this.serverErrors = [];

    yield changeset.validate();

    if (changeset.get("isValid")) {

      try {
        yield changeset.save();
      } catch (e) {
        window.console.error(e);
        this.flashMessages.alert(this.serverMessage);
        throw "Server Error";
      }

    } else {
      this.flashMessages.alert(this.validationMessage);
      throw "Validation Errors";
    }

  }) save;

  @task(function*( /*changeset*/ ) {
    yield this.flashMessages.success(this.successMessage);
    this.transitionToRoute('<%= routeNamePlural %>');
  })
  afterSave

}
