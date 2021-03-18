import {
  helper
} from '@ember/component/helper';

const SORT_ASC_ICON = 'arrow-narrow-up',
  SORT_DESC_ICON = 'arrow-narrow-down';

export default helper(function sortMenuIcon(params /*, hash*/ ) {
  const sortValue = params[0],
    optionValue = params[1];

  if (sortValue === optionValue) {
    return SORT_ASC_ICON;
  } else if (sortValue === `-${optionValue}`) {
    return SORT_DESC_ICON;
  } else {
    return '';
  }
});