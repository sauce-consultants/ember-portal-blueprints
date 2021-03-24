import Helper from "@ember/component/helper";
import { inject as service } from "@ember/service";

export default class IsCurrentRoute extends Helper {
  // Service

  @service router;

  compute([route]) {
    const currentRoute = this.router.currentRoute.name + "";
    return route.includes(currentRoute);
  }
}
