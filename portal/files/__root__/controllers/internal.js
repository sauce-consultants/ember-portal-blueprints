import {action} from '@ember/object';
import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {NAV_ITEMS} from '../utils/const/app';

export default class InternalController extends Controller {
  // Services

  @service session;

  // Properties

  isShowingNav = false;

  // Getters

  get options() {
    return this.menuItems.filter(
      (menuItem) =>
        !menuItem.roles || menuItem.roles.indexOf(this.authUser.role) > -1,
    );
  }

  get menuItems() {
    let menuItems = NAV_ITEMS;

    return menuItems;
  }

  @action
  toggleNav() {
    this.isShowingNav = !this.isShowingNav;
  }

  @action
  logout() {
    this.session.invalidate();
    this.transitionToRoute('external.login');
  }
}
