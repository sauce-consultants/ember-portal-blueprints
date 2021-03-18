// You can delete the beautify comments in this file
// They are just used for the blueprint sytax

/* beautify ignore:start */
import {
  task
} from "ember-concurrency";
import shape<%= sUpper %>FilterParams from '<%= appName %>/utils/routes/shape-<%= s%>-filter-params';
import shapePageParams from '<%= appName %>/utils/routes/shape-page-params';
import shapeSortParams from '<%= appName %>/utils/routes/shape-sort-params';
import {
  <%= config %>_FILTER_ATTRS,
} from '<%= appName %>/utils/const/<%= s %>';

import Route from '@ember/routing/route';

export default class <%= pClass %>IndexRoute extends Route {

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

    filterAttrs = <%= config %>_FILTER_ATTRS;

    // Methods

    model(params) {

      return {
        <%= p %>: this.load<%= pUpper %>.perform(params),
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


      const filter = shape<%= sUpper %>FilterParams(params),
        sort = shapeSortParams(params),
        page = shapePageParams(params);

      return yield this.store.query("<%= s %>", {
        filter,
        sort,
        page,
      });
    })
    load<%= pUpper %>;
  }
/* beautify ignore:end */