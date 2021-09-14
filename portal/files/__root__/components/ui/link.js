import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class UiLinkComponent extends Component {
  // Service

  @service router;

  // Getters

  get isActive() {
    const thisRoute = this.args.route + '',
      currentRoute = this.router.currentRoute.name + '',
      activeWhen = this.args.activeWhen ? this.args.activeWhen.split(',') : [];

    activeWhen.pushObject(thisRoute);

    return activeWhen.includes(currentRoute);
  }
}
