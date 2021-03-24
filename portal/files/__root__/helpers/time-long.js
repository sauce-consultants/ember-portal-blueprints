import { helper } from "@ember/component/helper";
import moment from "moment";
import { TIME_LONG_FORMAT } from "<%= app %>/utils/const/dates";

export default helper(function timeLong([date]) {
  if (moment(date).isValid()) {
    return moment(date).format(TIME_LONG_FORMAT);
  }
  return "No time set";
});
