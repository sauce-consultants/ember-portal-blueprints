import Component from '@ember/component';
import {
  inject as service
} from '@ember/service';
import {
  alias
} from '@ember/object/computed';


export default class UiSideNavComponent extends Component {

  // Properties

  tagName = '';

  // Service

  @service session;

  // Computed

  @alias('session.currentUser') authUser;

  // Actions

}