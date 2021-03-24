import { helper } from "@ember/component/helper";

export default helper(function split([text, separator] /*, hash*/) {
  if (!separator) {
    // default to new line regex
    separator = /\r?\n/;
  }
  return text.split(separator);
});
