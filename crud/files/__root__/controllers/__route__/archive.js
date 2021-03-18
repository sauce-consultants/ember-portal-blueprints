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

export default class <%= classifiedModuleName %>ArchiveController extends Controller {

  // Services

  @service flashMessages;

  // Controllers

  @controller('internal.<%= s %>') <%= s %>Controller;

  // Properties

  sidebarActions = <%= config %>_ACTIONS;

  // Tracking

  @tracked serverErrors = [];

  // Computeds

  @alias('<%= s %>Controller.model.<%= s %>.value') <%= s %>;
  @alias('<%= s %>Controller.model.<%= s %>.isRunning') loading;
  
  // Translations

  @t('<%= translations %>.archive.messages.success') successMessage;
  @t('<%= translations %>.archive.messages.server') serverMessage;

  // Tasks

  @task(function*(model) {

    this.serverErrors = [];

    model.deleteRecord();

    try {
      yield model.save()
      yield this.flashMessages.success(this.successMessage);
      this.transitionToRoute('<%= pRoute %>');
    } catch (e) {
      console.log("Archive Error", e);
      this.flashMessages.alert(this.serverMessage);

      throw "Archive Error";
    }

  }) archive;
}
/* beautify ignore:end */