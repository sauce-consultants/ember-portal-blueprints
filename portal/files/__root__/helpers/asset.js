import { helper } from "@ember/component/helper";
import ENV from "../config/environment";

export default helper(function asset(params /*, hash*/) {
  return ENV.rootURL + params[0];
});
