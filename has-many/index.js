'use strict';

// TODO - write has many boilerplate
// TODO - update utils/const/singular.js  with new action
// TODO - update translations/singular/en-us.yaml  with translations
// TODO - update test-urls
const path = require("path");
const EOL = require("os").EOL;
const portalInflection = require("../portal-inflection");
const inflection = require("inflection");

module.exports = {
  description: 'Generate a has many CRUD screen for a resource',

  // Current Options
  // --plural employees
  // --nested internal
  availableOptions: [
    {
      name: "nested",
      type: String,
      default: "",
    },
    {
      name: "plural",
      type: String,
      default: "",
    },
    {
      name: "many",
      type: String,
      default: "",
    },
    {
      name: "many-plural",
      type: String,
      default: "",
    },
  ],

  locals(options) {
    
    // ember g has-many section --many group --nested internal
    const name = options.entity.name,
      manyName = options['many'],
      manyOptions = {plural: options['many-plural']},
      tokens = portalInflection.nameTokens(name, options),
      manyTokens = portalInflection.nameTokens(manyName, manyOptions),
      entityOptions = options.entity.options;

      const prefixedManyOptions = {};

      Object.keys(manyTokens).forEach(key => {
        console.log(key);
        const prefixedKey = inflection.camelize('many_'+inflection.underscore(key), true)
        prefixedManyOptions[prefixedKey] = manyTokens[key];
      })

      // prefix 
      console.log(prefixedManyOptions);

    return {
      ...tokens,
      ...prefixedManyOptions,
      appName: options.project.pkg.name,
    };

    // dasherizedSingular: "sports-team",
    // dasherizedPlural: "sports-teams",
    // underscoreSingular: "sports_team",
    // underscorePlural: "sports_teams",
    // camelSingular: "sportsTeam",
    // camelPlural: "sportsTeams",
    // humananizedSingular: "sports team",
    // humananizedPlural: "sports teams",
    // titleSingular: "Sports Team",
    // titlePlural: "Sports Teams",
    // classSingular: "SportsTeam",
    // classPlural: "SportsTeams",
    // capitalizedSingular: "SPORTS_TEAM",
    // capitalizedPlural: "SPORTS_TEAMS",
    // routeClassSingular: "AdminSecretSportsTeam",
    // routeClassPlural: "AdminSecretSportsTeams",
    // routeNameSingular: "admin.secret.sports-team",
    // routeNamePlural: "admin.secret.sports-teams",
    // routePathSingular: "admin/secret/sports-team",
    // routePathPlural: "admin/secret/sports-teams",
    // ... all these variables are also available for the related 
    // many model - Prefixed with more e.g. moreClassPlural
  }


};
