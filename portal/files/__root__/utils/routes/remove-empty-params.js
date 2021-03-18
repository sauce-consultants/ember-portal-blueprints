import {
  isEmpty
} from '@ember/utils';

export default function routesRemoveEmptyParams(obj) {
  for (var k in obj) {
    if (isEmpty(obj[k])) {
      delete obj[k];
    }
  }
  return obj;
}