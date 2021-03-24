import Base from 'ember-simple-auth/authenticators/base';
import ENV from "../config/environment";
import fetch from 'fetch';
import RSVP from 'rsvp';

export default class BasicAuthenticator extends Base {

  // Properties

  serverTokenEndpoint = `${ENV.rootApiURL}/${ENV.apiNamespace}/session`;

  restore(data) {
    const url = this.serverTokenEndpoint,
      token = data.data.attributes.token,
      headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`
      },
      options = {
        headers,
        method: 'GET'
      };

    return new RSVP.Promise((resolve, reject) => {
      fetch(url, options).then((response) => {
        response.text().then((text) => {
          try {
            let json = JSON.parse(text);
            // GET /session responds with token:null
            // so we need to add our token from localstorage
            // to ensure the session is not invalidated
            json.data.attributes.token = token;
            if (!response.ok) {
              response.responseJSON = json;
              reject(response);
            } else {
              resolve(json);
            }
          } catch (SyntaxError) {
            response.responseText = text;
            reject(response);
          }
        });
      }).catch(reject);
    });
  }

  authenticate(data) {
    const url = this.serverTokenEndpoint,
      postData = {
        email: data.email,
        password: data.password
      },
      headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
      },
      options = {
        body: JSON.stringify({
          data: {
            attributes: postData
          },
        }),
        headers,
        method: 'POST'
      };

    return new RSVP.Promise((resolve, reject) => {
      fetch(url, options).then((response) => {
        response.text().then((text) => {
          try {
            let json = JSON.parse(text);
            if (!response.ok) {
              response.responseJSON = json;
              reject(response);
            } else {
              resolve(json);
            }
          } catch (SyntaxError) {
            response.responseText = text;
            reject(response);
          }
        });
      }).catch(reject);
    });
  }

  invalidate(data) {
    const url = this.serverTokenEndpoint,
      token = data.data.attributes.token,
      headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
        'Authorization': `Bearer ${token}`
      },
      options = {
        headers,
        method: 'DELETE'
      };

    return new RSVP.Promise((resolve, reject) => {
      fetch(url, options).then((response) => {
        if (response.status === 204 && response.ok) {
          resolve();
        } else {
          reject(response);
        }
      }).catch(reject);
    });
  }
}
