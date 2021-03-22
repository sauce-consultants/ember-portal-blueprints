// You can delete the beautify comments in this file
// They are just used for the blueprint sytax

/* beautify ignore:start */
import Controller from '@ember/controller';
import {
  inject as controller
} from '@ember/controller';
import {
  alias
} from '@ember/object/computed';
import {
  <%= capitalizedSingular %>_ACTIONS,
} from '<%= appName %>/utils/const/<%= dasherizedSingular %>';

export default class <%= routeClassSingular %>IndexController extends Controller {

  // Controllers

  @controller('<%= routeNameSingular %>') <%= routeClassSingular %>Controller;

  // Properties

  sidebarActions = <%= capitalizedSingular %>_ACTIONS;


  // Computeds

  @alias('<%= routeClassSingular %>Controller.model.<%= camelSingular %>.value') <%= camelSingular %>;
  @alias('<%= routeClassSingular %>Controller.model.<%= camelSingular %>.isRunning') loading;
}
/* beautify ignore:end */
