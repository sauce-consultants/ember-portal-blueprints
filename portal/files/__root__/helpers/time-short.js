import { helper } from "@ember/component/helper";
import moment from "moment";
import { TIME_SHORT_FORMAT } from "<%= app %>/utils/const/dates";

export default helper(function timeShort([date]) {
  if (moment(date).isValid()) {
    return moment(date).format(TIME_SHORT_FORMAT);
  }
  return "No time set";
});
