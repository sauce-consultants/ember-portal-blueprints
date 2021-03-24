import { helper } from "@ember/component/helper";
import { htmlSafe } from "@ember/string";

export default helper(function nlbr([text]) {
  let breakTag = "<br />";
  return new htmlSafe(
    text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + breakTag + "$2")
  );
});
