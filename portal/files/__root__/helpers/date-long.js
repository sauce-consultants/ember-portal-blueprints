import { helper } from "@ember/component/helper";
import moment from "moment";
import { DATE_LONG_FORMAT } from "<%= app %>/utils/const/dates";

export default helper(function dateLong([date]) {
  if (moment(date).isValid()) {
    return moment(date).format(DATE_LONG_FORMAT);
  }
  return "No date set";
});
