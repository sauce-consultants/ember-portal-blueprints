// You can delete the beautify comments in this file
// They are just used for the blueprint sytax

/* beautify ignore:start */
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
import {
  <%= config %>_ACTIONS,
} from '<%= appName %>/utils/const/<%= s %>';
import <%= sUpper %>Validations from '<%= appName %>/validations/<%= s %>';

export default class <%= sClass %>EditController extends Controller {

  // Services

  @service flashMessages;

  // Controllers

  @controller('internal.<%= s %>') <%= s %>Controller;

  // Properties

  sidebarActions = <%= config %>_ACTIONS;

  <%= sUpper %>Validations = <%= sUpper %>Validations;

  // Tracking

  @tracked serverErrors = [];

  // Computeds

  @alias('<%= s %>Controller.model.<%= s %>.value') <%= s %>;
  @alias('<%= s %>Controller.model.<%= s %>.isRunning') loading;

  // Translations

  @t('<%= translations %>.edit.messages.cancel') cancelMessage;
  @t('<%= translations %>.edit.messages.success') successMessage;
  @t('<%= translations %>.edit.messages.validation') validationMessage;
  @t('<%= translations %>.edit.messages.server') serverMessage;

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
  })
  afterSave
}
/* beautify ignore:end */