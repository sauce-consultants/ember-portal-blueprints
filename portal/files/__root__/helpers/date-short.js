import { helper } from "@ember/component/helper";
import moment from "moment";
import { DATE_SHORT_FORMAT } from "<%= app %>/utils/const/dates";

export default helper(function dateShort([date]) {
  if (moment(date).isValid()) {
    return moment(date).format(DATE_SHORT_FORMAT);
  }
  return "No date set";
});
