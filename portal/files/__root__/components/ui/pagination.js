import Component from '@glimmer/component';
import {
  computed,
} from '@ember/object';
import {
  action
} from '@ember/object';

export default class UiPaginationComponent extends Component {

  // Properties

  tagName = '';

  countPrefix = '';
  countSuffix = '';

  // Getters

  get resultsText() {
    const countPrefix = this.countPrefix,
      start = this.start,
      end = this.end,
      total = this.args.total,
      countSuffix = this.countSuffix;

    if (start > total) {
      return `${countPrefix} 0 - 0 of ${total} ${countSuffix}`;
    } else if (start && end) {
      return `${countPrefix} ${start} - ${end} of ${total} ${countSuffix}`;
    } else {
      return '';
    }
  }

  get pages() {
    return this.args.total / this.args.size
  }

  get start() {
    const page = this.args.page - 1;
    const size = this.args.size;

    return (page * size) + 1;
  }

  get end() {
    const start = this.start;
    const size = this.args.size;
    const total = this.args.total;

    return Math.min(total, start + size - 1);
  }

  // Computed

  @computed.lte('args.page', 1) isPreviousButtonDisabled;

  get isNextButtonDisabled() {
    return this.end >= this.args.total;
  }

  // Methods

  handleChange(props) {
    const onChangeAction = this.args.onChange;
    if (onChangeAction) {
      return onChangeAction(props)
    }
  }

  // Actions

  @action changeSize(e) {
    const props = {
      page: 1,
      size: parseInt(e.target.value),
    };
    this.handleChange(props);
  }

  @action changePage(page) {
    const props = {
      page: parseInt(page)
    };
    this.handleChange(props);
  }
}