import { helper } from "@ember/component/helper";
import moment from "moment";
import { DATETIME_LONG_FORMAT } from "<%= app %>/utils/const/dates";

export default helper(function datetimeLong([date]) {
  if (moment(date).isValid()) {
    return moment(date).format(DATETIME_LONG_FORMAT);
  }
  return "No date set";
});
