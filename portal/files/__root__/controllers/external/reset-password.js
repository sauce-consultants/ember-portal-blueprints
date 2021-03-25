import Controller from '@ember/controller';
import {task} from 'ember-concurrency';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';
import {t} from 'ember-intl';
import mapResponseErrors from '../../utils/map-response-errors';
import fetch from 'fetch';
import getAPIURL from '../../utils/get-api-url';

export default class ExternalResetPasswordController extends Controller {
  // Services

  @service() flashMessages;
  @service() session;

  // Tracking

  @tracked serverErrors = [];

  // Getter

  get authUser() {
    return this.model;
  }

  // Translations

  @t('external.reset.messages.success') successMessage;
  @t('external.reset.messages.validation') validationMessage;
  @t('external.reset.messages.server') serverMessage;

  // Properties

  @tracked authErrors = null;
  @tracked serverError = false;

  // Tasks

  @task(function* (changeset) {
    this.serverErrors = [];

    yield changeset.validate();

    if (changeset.get('isValid')) {
      const url = getAPIURL('/reset-password'),
        headers = {
          Accept: 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
        },
        body = {
          attributes: {
            attributes: {
              password: changeset.password,
              recoveryToken: changeset.recoveryToken,
            },
          },
          type: 'user',
        };

      const response = yield fetch(url, {
        method: 'PUT',
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
  onResetPassword;

  @task(function* (/*changeset*/) {
    yield this.flashMessages.success(this.successMessage);
    this.transitionToRoute('external.login');
  })
  afterResetPassword;

  //
  // @task(function*(authUser) {
  //   this.set('authErrors', null);
  //   this.set('serverError', false);
  //   this.set('recoveryEmailSent', false);
  //
  //   // On the recover form we only want to validate the
  //   // email and password attributes
  //   let {
  //     validations
  //   } = yield authUser.validate({
  //     on: ['password', 'passwordConfirmation']
  //   });
  //
  //   if (!validations.isValid) {
  //     throw "Reset error: " + " - " + validations.messages;
  //   }
  //
  //   const
  //     url = getAPIURL('/reset-password'),
  //     json = {
  //       data: {
  //         attributes: {
  //           password: authUser.password,
  //           recoveryToken: authUser.recoveryToken,
  //         },
  //         type: 'user'
  //       }
  //     };
  //
  //
  //   yield fetch(url, {
  //       method: 'PUT',
  //       headers: {
  //         'Accept': 'application/vnd.api+json',
  //         'Content-Type': 'application/vnd.api+json',
  //       },
  //       body: json
  //     })
  //     .then(response => {
  //       if (!response.ok) {
  //         this.serverError = true;
  //         throw "Reset server error";
  //       }
  //
  //       this.flashMessages.success(`Password reset, you can now login`);
  //       this.transitionToRoute('external.login');
  //     });
  //
  // }) reset;
}
