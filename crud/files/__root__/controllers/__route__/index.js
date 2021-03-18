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
  <%= config %>_ACTIONS,
} from '<%= appName %>/utils/const/<%= s %>';

export default class <%= sClass %>IndexController extends Controller {

  // Controllers

  @controller('internal.<%= sUpper %>') <%= s %>Controller;

  // Properties

  sidebarActions = <%= config %>_ACTIONS;


  // Computeds

  @alias('<%= s %>Controller.model.<%= s %>.value') <%= s %>;
  @alias('<%= s %>Controller.model.<%= s %>.isRunning') loading;
}
/* beautify ignore:end */