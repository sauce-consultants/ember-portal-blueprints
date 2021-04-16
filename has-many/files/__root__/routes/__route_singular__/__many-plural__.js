import Route from '@ember/routing/route';
import {
    task
  } from "ember-concurrency";
  import shape<%= moreClassSingular %>FilterParams from '<%= appName %>/utils/routes/shape-<%= moreDasherizedSingular %>-filter-params';
  import shapePageParams from '<%= appName %>/utils/routes/shape-page-params';
  import shapeSortParams from '<%= appName %>/utils/routes/shape-sort-params';
  import {
    <%= moreCapitalizedSingular %>_FILTER_ATTRS,
  } from '<%= appName %>/utils/const/<%= moreDasherizedSingular %>';

export default class <%= routeClassSingular %><%= moreClassSingular %>Route extends Route {
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

    filterAttrs = <%= moreCapitalizedSingular %>_FILTER_ATTRS;

    // Methods

    model(params) {

    const <%= camelSingular %>Id = this.paramsFor('<%= routeNameSingular %>').<%= underscoreSingular: %>_id;

      return {
        <%= moreCamelPlural %>: this.load<%= moreClassPlural %>.perform(params),
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

    @task(function*(params, <%= camelSingular %>Id) {


      const filter = shape<%= moreClassSingular %>FilterParams(params),
        sort = shapeSortParams(params),
        page = shapePageParams(params),
        include = '<%= dasherizedSingular %>';


    filter.<%= camelSingular %>Id = <%= camelSingular %>Id;

      return yield this.store.query("<%= moreDasherizedSingular %>", {
        filter,
        sort,
        page,
        include,
      });
    })
    load<%= moreClassPlural %>;
  }
