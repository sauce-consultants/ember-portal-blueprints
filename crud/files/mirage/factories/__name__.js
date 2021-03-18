// You can delete the beautify comments in this file
// They are just used for the blueprint sytax

/* beautify ignore:start */
import {
  Factory,
  // trait,
} from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  <%= factoryAttrs %>
  
})
/* beautify ignore:end */