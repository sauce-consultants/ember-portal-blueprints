import {
  task
} from "ember-concurrency";
import shape<%= classSingular %>FilterParams from '<%= appName %>/utils/routes/shape-<%= dasherizedSingular %>-filter-params';
import shapePageParams from '<%= appName %>/utils/routes/shape-page-params';
import shapeSortParams from '<%= appName %>/utils/routes/shape-sort-params';
import {
  <%= capitalizedSingular %>_FILTER_ATTRS,
} from '<%= appName %>/utils/const/<%= dasherizedSingular %>';

import Route from '@ember/routing/route';

export default class <%= routeClassPlural %>IndexRoute extends Route {

    // Properties

    queryParams = {
      page: {
        refreshModel: true
      },
      search: {
        refreshModel: true
      },
      size: {
        refreshModel: true
      },
      sort: {
        refreshModel: true
      },
      role: {
        refreshModel: true
      },
      isAgency: {
        refreshModel: true
      },
    }

    filterAttrs = <%= capitalizedSingular %>_FILTER_ATTRS;

    // Methods

    model(params) {

      return {
        <%= camelPlural %>: this.load<%= classPlural %>.perform(params),
        filter: this.getFilter(params),
      };
    }

    getFilter(params) {

      const filter = {};

      this.filterAttrs.forEach((key) => {
        return filter[key] = params[key];
      });

      return filter;
    }

    // Tasks

    @task(function*(params) {


      const filter = shape<%= classSingular %>FilterParams(params),
        sort = shapeSortParams(params),
        page = shapePageParams(params);

      return yield this.store.query("<%= dasherizedSingular %>", {
        filter,
        sort,
        page,
      });
    })
    load<%= classPlural %>;
  }
