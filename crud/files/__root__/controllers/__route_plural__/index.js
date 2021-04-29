import Controller from '@ember/controller';
import {
  task
} from 'ember-concurrency';
import {
  inject as service
} from '@ember/service';
import {
  action
} from '@ember/object';
import {
  alias,
  or
} from '@ember/object/computed';
import {
  tracked
} from '@glimmer/tracking';
import {
  t
} from 'ember-intl';
import sortBy from '<%= appName %>/utils/actions/sort-by';
import paginate from '<%= appName %>/utils/actions/paginate';
import {
  <%= capitalizedSingular %>_ACTIONS,
  <%= capitalizedSingular %>_FILTER_ATTRS,
  <%= capitalizedSingular %>_SORT_OPTIONS,
} from '<%= appName %>/utils/const/<%= dasherizedSingular %>';
import shape<%= classSingular %>FilterParams from '<%= appName %>/utils/routes/shape-<%= dasherizedSingular %>-filter-params';
import shapeSortParams from '<%= appName %>/utils/routes/shape-sort-params';
import getApiUrl from '<%= appName %>/utils/get-api-url';

export default class <%= routeClassPlural %>IndexController extends Controller {

    // Services

    @service store;
    @service flashMessages;

    // Properties

    filterAttrs = <%= capitalizedSingular %>_FILTER_ATTRS;
    sortOptions = <%= capitalizedSingular %>_SORT_OPTIONS;
    <%= camelSingular %>Actions = <%= capitalizedSingular %>_ACTIONS;
    queryParams = [
      'page',
      'search',
      'size',
      'sort',
      // add further query params here...
      'status', // example filter
    ];
    exportPath = '/<%= dasherizedPlural %>';

    // Tracked

    // add default query values here...
    @tracked page = 1;
    @tracked search = '';
    @tracked size = 20;
    @tracked sort = <%= capitalizedSingular %>_SORT_OPTIONS[0].value;
    @tracked state = null;  // example filter

    // UI state of slide over/modals
    @tracked showFilter = false;
    @tracked showExport = false;

    // Computed

    @or('search', 'number') hasFilter;
    @alias('model.<%= camelPlural %>.value') <%= camelPlural %>;
    @alias('model.<%= camelPlural %>.isRunning') loading;
    @alias('model.<%= camelPlural %>.value.meta') meta;
    @alias('model.filter') filter;
    @or('search', 'status') filtered;

    // Translations

    @t('<%= dasherizedSingular %>.list.messages.export') exportMessage;

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
    export () {

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

      if (changeset.get("isValid")) {

        changeset.save();

        this.page = 1;

        this.filterAttrs.forEach(attr => {
          this[attr] = changeset[attr];
        });

        this.showFilter = false;
      }

    }

    @action
    clearFilter() {
      this.filterAttrs.forEach(attr => {
        this[attr] = null;
      });
      this.search = "";
      this.showFilter = false;
    }

    // Tasks

    @task(function*(params) {

      const filter = shape<%= classSingular %>FilterParams(params),
        sort = shapeSortParams(params),
        resource = getApiUrl(this.exportPath, {
          sort,
          filter
        });

      const presign = yield this.store.createRecord('presign', {
          resource
        }),
        result = yield presign.save();

      window.open(result.signedResource);

      result.unloadRecord();

      this.flashMessages.success(this.exportMessage);

    }) exportTask;
  }
