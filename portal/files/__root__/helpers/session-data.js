import Helper from "@ember/component/helper";
import { inject as service } from "@ember/service";

export default class SessionData extends Helper {
  // Service

  @service session;

  compute([key]) {
    if (key) {
      return this.session.get(`data.authenticated.data.attributes.${key}`);
    }
  }
}
