import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { action } from '@ember/object';
import { alias, or } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { t } from 'ember-intl';
import { task } from 'ember-concurrency';
import { <%= capitalizedSingular %>_ACTIONS } from '<%= appName %>/utils/const/<%= dasherizedSingular %>';
import sortBy from '<%= appName %>/utils/actions/sort-by';
import paginate from '<%= appName %>/utils/actions/paginate';
import {
  <%= manyCapitalizedSingular %>_ACTIONS,
  <%= manyCapitalizedSingular %>_SORT_OPTIONS,
  <%= manyCapitalizedSingular %>_FILTER_ATTRS,
} from '<%= appName %>/utils/const/<%= manyDasherizedSingular %>';
import shape<%= manyClassSingular %>FilterParams from '<%= appName %>/utils/routes/shape-<%= manyDasherizedSingular %>-filter-params';
import shapeSortParams from '<%= appName %>/utils/routes/shape-sort-params';
import getApiUrl from '<%= appName %>/utils/get-api-url';

export default class <%= routeClassSingular %><%= manyClassSingular %>Controller extends Controller {
  // Services

  @service store;

  // Controllers

  @controller('<%= routeNameSingular %>') <%= routeClassSingular %>Controller;

  // Properties

  sidebarActions = <%= capitalizedSingular %>_ACTIONS;
  <%= manyCamelSingular %>Actions = <%= manyCapitalizedSingular %>_ACTIONS;
  filterAttrs = <%= manyCapitalizedSingular %>_FILTER_ATTRS;
  sortOptions = <%= manyCapitalizedSingular %>_SORT_OPTIONS;
  queryParams = [
    'page',
    'search',
    'size',
    'sort',
    // add further query params here...
  ];
  exportPath = '/<%= manyDasherizedPlural %>';

  // Tracked

  // add default query values here...
  @tracked page = 1;
  @tracked search = '';
  @tracked size = 20;
  @tracked sort = <%= manyCapitalizedSingular %>_SORT_OPTIONS[0].value;

  // UI state of slide over/modals
  @tracked showFilter = false;
  @tracked showExport = false;

  // Computeds

  @alias('<%= routeClassSingular %>Controller.model.<%= camelSingular %>.value') <%= camelSingular %>;
  @alias('<%= routeClassSingular %>Controller.model.<%= camelSingular %>.isRunning') loading<%= classSingular %>;
  @alias('model.<%= manyCamelPlural %>.value') <%= manyCamelPlural %>;
  @alias('model.<%= manyCamelPlural %>.value.meta') meta;
  @alias('model.<%= manyCamelPlural %>.isRunning') loading<%= manyClassSingular %>;
  @or('loading<%= classSingular %>', 'loading<%= manyClassSingular %>') loading;
  @or('search', 'number') hasFilter;
  @alias('model.filter') filter;
  @or('search', 'status') filtered;

  // Translations

  @t('<%= manyDasherizedSingular %>.list.messages.export') exportMessage;

  // Action

  @action
  sortBy() {
    return sortBy(this, ...arguments);
  }

  @action
  paginateResults(props) {
    return paginate(this, props);
  }

  @action
  toggleExport() {
    this.toggleProperty('showExport');
  }

  @action
  export() {
    const params = this.getProperties(this.queryParams);

    this.showExport = false;

    this.exportTask.perform(params);
  }

  @action
  toggleFilter() {
    this.toggleProperty('showFilter');
  }

  @action
  async filterResults(changeset) {
    await changeset.validate();

    if (changeset.get('isValid')) {
      changeset.save();

      this.page = 1;

      this.filterAttrs.forEach((attr) => {
        this[attr] = changeset[attr];
      });

      this.showFilter = false;
    }
  }

  @action
  clearFilter() {
    this.filterAttrs.forEach((attr) => {
      this[attr] = null;
    });
    this.search = '';
    this.showFilter = false;
  }

  // Tasks

  @task(function* (params) {
    const filter = shape<%= manyClassSingular %>FilterParams(params),
      sort = shapeSortParams(params),
      resource = getApiUrl(this.exportPath, {
        sort,
        filter,
      });

    const presign = yield this.store.createRecord('presign', {
        resource,
      }),
      result = yield presign.save();

    window.open(result.signedResource);

    result.unloadRecord();

    this.flashMessages.success(this.exportMessage);
  })
  exportTask;
}
