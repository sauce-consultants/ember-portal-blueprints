import Route from '@ember/routing/route';
import {
  task
} from "ember-concurrency";
import shape<%= manyClassSingular %>FilterParams from '<%= appName %>/utils/routes/shape-<%= manyDasherizedSingular %>-filter-params';
import shapePageParams from '<%= appName %>/utils/routes/shape-page-params';
import shapeSortParams from '<%= appName %>/utils/routes/shape-sort-params';
import {
  <%= manyCapitalizedSingular %>_FILTER_ATTRS,
} from '<%= appName %>/utils/const/<%= manyDasherizedSingular %>';

export default class <%= routeClassSingular %><%= manyClassSingular %>Route extends Route {

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
  }

   

  filterAttrs = <%= manyCapitalizedSingular %>_FILTER_ATTRS;

  // Methods

  model(params) {

    const <%= camelSingular %>Id = this.paramsFor('<%= routeNameSingular %>.<%= manyRouteNamePlural %>').<%= underscoreSingular %>_id;

    return {
      <%= manyCamelPlural %>: this.load<%= manyClassPlural %>.perform(params, <%= camelSingular %>Id),
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

    const filter = shape<%= manyClassSingular %>FilterParams(params),
      sort = shapeSortParams(params),
      page = shapePageParams(params),
      include = '<%= dasherizedSingular %>';

    filter.<%= camelSingular %>Id = <%= camelSingular %>Id;

    return yield this.store.query("<%= manyDasherizedSingular %>", {
      filter,
      sort,
      page,
      include,
    });
  })
  load<%= manyClassPlural %>;

}
