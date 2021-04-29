'use strict';

const path = require("path");
const EOL = require("os").EOL;
const portalInflection = require("../portal-inflection");
const inflection = require("inflection");
// const Blueprint = require("ember-cli/lib/models/blueprint");
const fs = require("fs-extra");
const EmberRouterGenerator = require("ember-router-generator");
const chalk = require("chalk");

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
      tokens = this.generateTokens(name, options),
      entityOptions = options.entity.options;

      console.log(tokens);

    return {
      ...tokens,
      appName: options.project.pkg.name,
    };

    // dasherizedSingular: "sports-team",
    // dasherizedPlural: "sports-teams",
    // underscoreSingular: "sports_team",
    // underscorePlural: "sports_teams",
    // camelSingular: "sportsTeam",§
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

  generateTokens(name, options) {
    
    const tokens = portalInflection.nameTokens(name, options),
      manyName = options['many'],
      manyOptions = {plural: options['many-plural']},
      manyTokens = portalInflection.nameTokens(manyName, manyOptions);

      let prefixedManyTokens = {};

      Object.keys(manyTokens).forEach(
        (key) => {
          const prefixedKey = inflection.camelize('many_'+inflection.underscore(key), true)
          prefixedManyTokens[prefixedKey] = manyTokens[key];
        }
      );

      const routeNamePrefix = options.nested ? `${options.nested}.` : '';

      return {...prefixedManyTokens, ...tokens, routeNamePrefix};

  },

  // Add our CRUD routes to app/router.js
  async updateRoutes(action, options) {
    let name = options.entity.name,
      tokens = this.generateTokens(name, options),
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
    await this.updateTestHelpers(action, options);
    await this.updateTranslations(action, options);
  },

  async updateTestHelpers(action, options) {
    const name = options.entity.name,
      tokens = this.generateTokens(name, options),
      file = "tests/helpers/test-urls.js",
      marker = {
        before: "// DO NOT REMOVE!",
      },
      content = `export const ${tokens.capitalizedSingular}_${tokens.manyCapitalizedPlural}_URL = "/${tokens.routePathSingular}/:id/${tokens.manyRoutePathPlural}";`;

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

  async updateResourceActions (action, options) {
    const name = options.entity.name,
      tokens = this.generateTokens(name, options),
      file = `app/utils/const/${tokens.dasherizedSingular}.js`,
      marker = {
        after: `export const ${tokens.capitalizedSingular}_ACTIONS = [`,
      },
      content = `${EOL}    {
        title: 'section.${tokens.manyDasherizedPlural}.navTitle',
        route: 'internal.${tokens.dasherizedSingular}.${tokens.manyDasherizedPlural}',
      },`;

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

  async updateTranslations (action, options) {
        const name = options.entity.name,
      tokens = this.generateTokens(name, options),
      file = `translations/${tokens.dasherizedSingular}/en-us.yaml`,
      marker = {
        before: "archive:",
      },
      content = `${EOL}${tokens.manyCamelPlural}:
  title: ${tokens.titleSingular} ${tokens.manyTitlePlural}
  navTitle: ${tokens.manyTitlePlural}
  crumb: ${tokens.manyTitlePlural}
  actions:
    filter: Filter
    export:
      label: Export
      title: Export Employees
      button: Download
      text: Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius aliquam laudantium explicabo pariatur iste dolorem animi vitae error totam. At sapiente aliquam accusamus facere veritatis.
    search: Search
    sort:
      label: Sort
      options:
        name: id
        createdAt: Created
        updatedAt: Updated
    new: Add New ${tokens.manyTitleSingular}`;

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

  shouldTouchRouter(name, options) {
    var isIndex = name === "index";
    var isBasic = name === "basic";
    var isApplication = name === "application";

    if (options.dryRun) {
      this._writeStatusToUI(
        chalk["yellow"],
        "You specified the dry-run flag, so no routes will be updated.",
        ""
      );
      return false;
    }

    return !isBasic && !isIndex && !isApplication;
  },

  writeRoute(action, name, options) {
    let routerPath = path.join.apply(null, this.findRouter(options));
    let source = fs.readFileSync(routerPath, "utf-8");

    let routes = new EmberRouterGenerator(source);
    let newRoutes = routes[action](name, options);

    return Promise.resolve(fs.writeFileSync(routerPath, newRoutes.code()));
  },

  findRouter(options) {
    let routerPathParts = [options.project.root];
    let root = "app";

    if (options.dummy && options.project.isEmberCLIAddon()) {
      routerPathParts = routerPathParts.concat([
        "tests",
        "dummy",
        root,
        "router.js",
      ]);
    } else {
      routerPathParts = routerPathParts.concat([root, "router.js"]);
    }

    return routerPathParts;
  },

  writeUpdateFileStatusToUI(fileUpdateResult, action, message) {
    if (action === "add") {
      if (fileUpdateResult.inserted) {
        this._writeStatusToUI(chalk["green"], "updated", message);
      } else {
        this._writeStatusToUI(chalk["red"], "skipped", message);
      }
    } else {
      if (fileUpdateResult.removed) {
        this._writeStatusToUI(chalk["red"], "updated", message);
      } else {
        this._writeStatusToUI(chalk["yellow"], "skipped", message);
      }
    }
  },

  writeDryRunStatusToUI() {
    this._writeStatusToUI(
      chalk["yellow"],
      "You specified the dry-run flag, so no files will be updated.",
      ""
    );
  },


};
