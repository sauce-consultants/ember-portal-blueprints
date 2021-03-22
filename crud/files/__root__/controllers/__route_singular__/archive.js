
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
  <%= capitalizedSingular %>_ACTIONS,
} from '<%= appName %>/utils/const/<%= dasherizedSingular %>';

export default class <%= routeClassSingular %>ArchiveController extends Controller {

  // Services

  @service flashMessages;

  // Controllers

  @controller('<%= routeNameSingular %>') <%= routeClassSingular %>Controller;

  // Properties

  sidebarActions = <%= capitalizedSingular %>_ACTIONS;

  // Tracking

  @tracked serverErrors = [];

  // Computeds

  @alias('<%= routeClassSingular %>Controller.model.<%= camelSingular %>.value') <%= camelSingular %>;
  @alias('<%= routeClassSingular %>Controller.model.<%= camelSingular %>.isRunning') loading;

  // Translations

  @t('<%= dasherizedSingular %>.archive.messages.success') successMessage;
  @t('<%= dasherizedSingular %>.archive.messages.server') serverMessage;

  // Tasks

  @task(function*(model) {

    this.serverErrors = [];

    model.deleteRecord();

    try {
      yield model.save()
      yield this.flashMessages.success(this.successMessage);
      this.transitionToRoute('<%= routeNamePlural %>');
    } catch (e) {
      window.console.error(e);
      this.flashMessages.alert(this.serverMessage);
      throw "Archive Error";
    }

  }) archive;
}
