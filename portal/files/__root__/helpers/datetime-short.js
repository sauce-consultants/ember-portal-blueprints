import { helper } from "@ember/component/helper";
import moment from "moment";
import { DATETIME_SHORT_FORMAT } from "<%= app %>/utils/const/dates";

export default helper(function datetimeShort([date]) {
  if (moment(date).isValid()) {
    return moment(date).format(DATETIME_SHORT_FORMAT);
  }
  return "No date set";
});
