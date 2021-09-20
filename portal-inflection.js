/* global require, module */

const inflection = require('inflection'); // https://www.npmjs.com/package/inflection

module.exports = {
  description: 'Useful string functions for the portal generators',

  pluralize: function (string, plural) {
    // clear plural if TRUE
    plural = plural === true ? null : plural;

    return inflection.pluralize(string, plural);
  },
  camelize: function (string, lowFirstLetter = false, plural = false) {
    if (plural) {
      return inflection.camelize(
        this.pluralize(string, plural).replace('-', '_'),
        lowFirstLetter,
      );
    } else {
      return inflection.camelize(string.replace('-', '_'), lowFirstLetter);
    }
  },
  uppercase: function (string, plural = false) {
    let result = string.replace('-', '_');

    if (plural) {
      result = this.pluralize(result, plural);
    }
    return result.toUpperCase();
  },
  urlPath: function (string, options, plural = false) {
    string = plural ? this.pluralize(string, plural) : string;

    return options.nested ? `${options.nested}/${string}` : string;
  },
  routePath: function (string, options, plural = false) {
    string = plural ? this.pluralize(string, plural) : string;

    return options.nested
      ? `${options.nested.replace('/', '.')}.${string}`
      : string;
  },
  routeClass: function (string, options, plural = false) {
    string = plural ? this.pluralize(string, plural) : string;

    let result = options.nested
      ? `${options.nested.replace('/', '_')}-${string.replace('-', '_')}`
      : string;

    result = this.camelize(result);

    return result;
  },
  nameTokens: function (string, options = {}) {
    let plural = options.plural ? options.plural : null;

    const dasherizedSingular = inflection.dasherize(string),
      dasherizedPlural = this.pluralize(string, plural),
      underscoreSingular = dasherizedSingular.replace('-', '_'),
      underscorePlural = dasherizedPlural.replace('-', '_'),
      camelSingular = inflection.camelize(underscoreSingular, true),
      camelPlural = inflection.camelize(underscorePlural, true),
      humananizedSingular = inflection.humanize(underscoreSingular, true),
      humananizedPlural = inflection.humanize(underscorePlural, true),
      titleSingular = inflection.titleize(underscoreSingular, true),
      titlePlural = inflection.titleize(underscorePlural, true),
      classSingular = inflection.camelize(underscoreSingular),
      classPlural = inflection.camelize(underscorePlural),
      capitalizedSingular = underscoreSingular.toUpperCase(),
      capitalizedPlural = underscorePlural.toUpperCase(),
      routeClassSingular = this.routeClass(underscoreSingular, options),
      routeClassPlural = this.routeClass(dasherizedPlural, options),
      routePathSingular = this.urlPath(dasherizedSingular, options),
      routePathPlural = this.urlPath(dasherizedPlural, options),
      routeNameSingular = routePathSingular.replace(/\//g, '.'),
      routeNamePlural = routePathPlural.replace(/\//g, '.');

    return {
      capitalizedPlural,
      capitalizedSingular,
      camelSingular,
      camelPlural,
      classPlural,
      classSingular,
      dasherizedPlural,
      dasherizedSingular,
      humananizedPlural,
      humananizedSingular,
      routeClassPlural,
      routeClassSingular,
      routeNamePlural,
      routeNameSingular,
      routePathPlural,
      routePathSingular,
      titlePlural,
      titleSingular,
      underscorePlural,
      underscoreSingular,
    };
  },
};
