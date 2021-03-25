import Controller from '@ember/controller';
import {task} from 'ember-concurrency';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';
import {t} from 'ember-intl';
import mapResponseErrors from '../../utils/map-response-errors';
import fetch from 'fetch';
import getAPIURL from '../../utils/get-api-url';

export default class ExternalRecoverPasswordController extends Controller {
  // Services

  @service flashMessages;

  @service session;

  // Tracking

  @tracked serverErrors = [];

  // Getters

  get authUser() {
    return this.model;
  }

  // Translations

  @t('external.recover.messages.success') successMessage;
  @t('external.recover.messages.validation') validationMessage;
  @t('external.recover.messages.server') serverMessage;

  // Actions

  // Tasks

  @task(function* (changeset) {
    this.serverErrors = [];

    yield changeset.validate();

    if (changeset.get('isValid')) {
      const url = getAPIURL('/recover-password'),
        headers = {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
        body = {
          attributes: {
            email: changeset.email,
          },
          type: 'user',
        };

      const response = yield fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      if (!response.ok) {
        const json = yield response.json();
        this.serverErrors = mapResponseErrors(json);
        this.flashMessages.alert(this.serverMessage);
        throw 'Server Error';
      }
    } else {
      this.flashMessages.alert(this.validationMessage);
      throw 'Validation Errors';
    }
  })
  onRecoverPassword;

  @task(function* (/*changeset*/) {
    yield this.flashMessages.success(this.successMessage);
    this.transitionToRoute('external.login');
  })
  afterRecoverPassword;
}
