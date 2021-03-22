import Controller from '@ember/controller';
import {
  inject as controller
} from '@ember/controller';
import {
  inject as service
} from '@ember/service';
import {
  action
} from '@ember/object';
import {
  task
} from 'ember-concurrency';
import {
  alias
} from '@ember/object/computed';
import {
  tracked
} from '@glimmer/tracking';
import {
  t
} from 'ember-intl';
import <%= classSingular %>Validations from '<%= appName %>/validations/<%= dasherizedSingular %>';
import {
  <%= capitalizedSingular %>_ACTIONS,
} from '<%= appName %>/utils/const/<%= dasherizedSingular %>';

export default class <%= routeClassSingular %>EditController extends Controller {

  // Services

  @service flashMessages;

  // Controllers

  @controller('<%= routeNameSingular %>') <%= routeClassSingular %>Controller;

  // Properties

  sidebarActions = <%= capitalizedSingular %>_ACTIONS;

  <%= classSingular %>Validations = <%= classSingular %>Validations;

  // Tracking

  @tracked serverErrors = [];

  // Computeds

  @alias('<%= routeClassSingular %>Controller.model.<%= camelSingular %>.value') <%= camelSingular %>;
  @alias('<%= routeClassSingular %>Controller.model.<%= camelSingular %>.isRunning') loading;

  // Translations

  @t('<%= dasherizedSingular %>.edit.messages.cancel') cancelMessage;
  @t('<%= dasherizedSingular %>.edit.messages.success') successMessage;
  @t('<%= dasherizedSingular %>.edit.messages.validation') validationMessage;
  @t('<%= dasherizedSingular %>.edit.messages.server') serverMessage;

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
        changeset.save();
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
  })
  afterSave
}
