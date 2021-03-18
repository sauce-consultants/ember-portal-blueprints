import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';
import {
  computed
} from '@ember/object';

export default class UiLinkComponent extends Component {

  // Properties

  tagName = '';

  // Service

  @service router;

  // Computed

  @computed('activeWhen', 'route', 'router.{currentURL,currentRoute.name}', function() {

    const thisRoute = this.route + "",
      currentRoute = this.router.currentRoute.name + "",
      activeWhen = this.activeWhen ? this.activeWhen.split(',') : [];

    activeWhen.pushObject(thisRoute);

    return activeWhen.includes(currentRoute);
  }) isActive;
}