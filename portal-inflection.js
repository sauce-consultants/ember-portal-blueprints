/* global require, module */

const inflection = require("inflection"); // https://www.npmjs.com/package/inflection

module.exports = {
  description: "Useful string functions for the portal generators",

  pluralize: function (string, plural) {
    // clear plural if TRUE
    plural = plural === true ? null : plural;

    return inflection.pluralize(string, plural);
  },
  camelize: function (string, lowFirstLetter = false, plural = false) {
    if (plural) {
      return inflection.camelize(
        this.pluralize(string, plural).replace("-", "_"),
        lowFirstLetter
      );
    } else {
      return inflection.camelize(string.replace("-", "_"), lowFirstLetter);
    }
  },
  uppercase: function (string, plural = false) {
    let result = string.replace("-", "_");

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
      ? `${options.nested.replace("/", ".")}.${string}`
      : string;
  },
  routeClass: function (string, options, plural = false) {
    string = plural ? this.pluralize(string, plural) : string;

    let result = options.nested
      ? `${options.nested.replace("/", "_")}-${string.replace("-", "_")}`
      : string;

    result = this.camelize(result);

    return result;
  },
};
