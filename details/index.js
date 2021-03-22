"use strict";
const EOL = require("os").EOL;
const portalInflection = require("../portal-inflection");
const inflection = require("inflection");

module.exports = {
  description: "Generate a details view component to view a model",

  locals(options) {
    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      entityOptions = options.entity.options;

    // Return custom template variables here.
    return {
      ...tokens,
      items: this.getDataItems(name, entityOptions, tokens),
      translations: this.getTranslations(name, entityOptions, tokens),
    };
  },

  getDataItems(model, entityOptions, tokens) {
    const items = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || ""; //,
      // foreignModelOrFakerMethod;

      if (type.indexOf(":") > -1) {
        // foreignModelOrFakerMethod = type.split(':')[1];
        type = type.split(":")[0];
      }

      if (type === "belongsTo") {
        // we'll pass the describe method on the related model
        name = `${name}.describe`;
      }

      if (type === "hasMany") {
        // we'll pass a count of the related models
        name = `${name}.length`;
      }

      let item = `  <data.Item @loading={{@loading}}
    @name="${name}"
    @label={{t "${tokens.dasherizedSingular}.details.${name}.label"}}
    @value={{@${tokens.camelSingular}.${name}}}
    @tip={{t "${tokens.dasherizedSingular}.details.${name}.tip"}} />`;

      items.push(item);
    }

    return EOL + items.join(EOL + EOL);
  },

  getTranslations(name, entityOptions) {
    let lines = [];

    for (let fieldName in entityOptions) {
      let title = inflection.titleize(inflection.underscore(fieldName)),
        human = inflection.humanize(fieldName, false),
        line = `${fieldName}:
  label: ${title}
  tip: This is a tip for ${human}`;

      lines.push(line);
    }

    return lines.join(EOL);
  },
};
