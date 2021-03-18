import {
  helper
} from '@ember/component/helper';
import {
  get
} from '@ember/object';

export function findOptionBy([collection, attrName, attrValue, isBoolean]) {

  if (isBoolean) {
    if (attrValue === "true") {
      attrValue = true;
    } else if (attrValue === "false") {
      attrValue = false;
    }
  }
  return collection.find(el => get(el, attrName) === attrValue);
}

export default helper(findOptionBy);