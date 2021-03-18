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
import <%= sUpper %>Validations from '<%= appName %>/validations/<%= s %>';

export default class <%= pClass %>NewController extends Controller {

  // Services

  @service flashMessages;

  // Properties

  <%= sUpper %>Validations = <%= sUpper %>Validations;

  // Tracking

  @tracked serverErrors = [];

  // Computeds

  @alias('model.<%= s %>.value') <%= s %>;
  @alias('model.<%= s %>.isRunning') loading;

  // Translations

  @t("<%= translations %>.new.messages.cancel") cancelMessage;
  @t("<%= translations %>.new.messages.success") successMessage;
  @t("<%= translations %>.new.messages.validation") validationMessage;
  @t("<%= translations %>.new.messages.server") serverMessage;

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
      } catch {
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
    this.transitionToRoute('<%= pRoute %>');
  })
  afterSave

}
