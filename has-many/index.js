'use strict';

// TODO - update utils/const/singular.js  with new action
// TODO - update translations/singular/en-us.yaml  with translations
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
  },

  fileMapTokens(options) {
    return {
      __route_singular__() {
        return options.locals.routePathSingular;
      },
      __route_plural__() {
        return options.locals.routePathPlural;
      },
      __many_singular__() {
        return options.locals.manyRoutePathSingular;
      },
      __many_plural__() {
        return options.locals.manyRoutePathPlural;
      },
    };
  },

  afterInstall: async function (options) {
    await this.updateRoutes("add", options);

    await this.updateFiles("add", options);

    return true;
  },

  afterUninstall: async function (options) {
    await this.updateRoutes("remove", options);

    await this.updateFiles("remove", options);

    return true;
  },

  // Add our CRUD routes to app/router.js
  async updateRoutes(action, options) {
    let name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      // internal/team/edit
      manyRoute = `${tokens.routePathSingular}/${tokens.manyRoutePathPlural}`;

    await this.updateRouter(action, options, manyRoute);

    return true;
  },

  async updateRouter(action, options, route) {
    let entity = options.entity,
      _name = entity.name;
    // we tweaked this bit so we can add multiple routes to router.js
    entity.name = route;
    let actionColorMap = {
      add: "green",
      remove: "red",
    };
    let color = actionColorMap[action] || "gray";

    if (this.shouldTouchRouter(route, options)) {
      await this.writeRoute(action, route, options);

      this.ui.writeLine("updating router");

      this._writeStatusToUI(chalk[color], action + " route", route);
    }

    entity.name = _name;
  },

  updateFiles: async function (action, options) {

    await this.updateTestHelpers(action, options);

    // await this.updateRootPageObject(action, options);
  },
  async updateTestHelpers(action, options) {
    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      file = "tests/helpers/test-urls.js",
      marker = {
        before: "// DO NOT REMOVE!",
      },
      content = `export const ${tokens.capitalizedSingular}_${tokens.moreCapitalizedSingular}_URL = "/${tokens.routePathSingular}/:id/${tokens.moreRoutePathSingular}";`;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === "add") {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, "test helper urls");

    return result;
  },


};
