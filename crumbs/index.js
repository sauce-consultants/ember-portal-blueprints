'use strict';
const stringUtil = require('ember-cli-string-utils');

function getPlural(name, pluralOverride) {
  return pluralOverride ? pluralOverride : `${name}s`;
}

function getRoutePath(route, options) {
  return options.nested ? `${options.nested}.${route}` : route;
}

function getRouteDir(route, options) {
  return options.nested ? `${options.nested}/${route}` : route;
}

module.exports = {
  description: 'Generate basic breadcrumb component for a resource',

  // Current Options
  // --plural employees
  // --parentRoute iternal
  availableOptions: [{
      name: 'nested',
      type: String,
      default: ''
    },
    {
      name: 'plural',
      type: String,
      default: ''
    }
  ],

  locals(options) {

    const
      s = options.entity.name,
      p = getPlural(s, options.plural),
      sUpper = stringUtil.capitalize(s),
      pUpper = stringUtil.capitalize(p),
      sRoute = getRoutePath(s, options),
      pRoute = getRoutePath(p, options),
      sRouteFiles = getRouteDir(s, options),
      pRouteFiles = getRouteDir(p, options),
      components = sUpper,
      translations = s,
      config = s.toUpperCase();

    return {
      appName: options.project.pkg.name,
      s,
      p,
      sUpper,
      pUpper,
      sRoute,
      pRoute,
      sRouteFiles,
      pRouteFiles,
      components,
      translations,
      config
    }
  }
  // afterInstall(options) {
  //   // Perform extra work here.
  // }
};