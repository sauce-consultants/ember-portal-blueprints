import JSONAPIAdapter from '@ember-data/adapter/json-api';
import {
  computed
} from '@ember/object';
import {
  inject as service
} from '@ember/service';
import ENV from "../config/environment";

export default class ApplicationAdapter extends JSONAPIAdapter {

  // Services

  @service session;

  // Properties

  host = ENV.rootApiURL;
  namespace = ENV.apiNamespace;

  // Computed

  @computed('session.{data.authenticated.data.attributes.token,isAuthenticated}')
  get headers() {
    let headers = {};

    if (this.session.isAuthenticated) {
      // OAuth 2
      headers['Authorization'] = `Bearer ${this.session.data.authenticated.data.attributes.token}`;
    }

    headers['Accept'] = 'application/vnd.api+json';
    headers['Content-Type'] = 'application/vnd.api+json';

    return headers;
  }

}
