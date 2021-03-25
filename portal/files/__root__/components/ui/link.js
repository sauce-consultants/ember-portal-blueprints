import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default class UiLinkComponent extends Component {
  // Properties

  tagName = '';

  // Service

  @service router;

  // Getters

  isActive() {
    const thisRoute = this.route + '',
      currentRoute = this.router.currentRoute.name + '',
      activeWhen = this.activeWhen ? this.activeWhen.split(',') : [];

    activeWhen.pushObject(thisRoute);

    return activeWhen.includes(currentRoute);
  }
}
