"use strict";

const path = require("path");
const stringUtil = require("ember-cli-string-utils");
const EOL = require("os").EOL;
const inflection = require("inflection"); // https://www.npmjs.com/package/inflection
const Blueprint = require("ember-cli/lib/models/blueprint");
/* eslint-disable */
const fs = require("fs-extra");
const EmberRouterGenerator = require("ember-router-generator");
const chalk = require("chalk");
/* eslint-enable */

module.exports = {
  description: "Generate basic CRUD screen for a resource",

  // TODO
  // - Update routes.js with default CRUD routes ✓
  // - Update mirage/config with default API endpoints ✓
  // - Update scenarios with seeded model data ✓
  // - List ✓
  // - Add ✓
  // - View ✓
  // - Edit ✓
  // - Archive ✓
  // - Move controller flash messages to translation files ✓
  // - Call sub blueprints for components etc ✓
  // - Add the new resource to the main nav ✓
  // - Seed attribute data in factories ✓
  // - View Component Generator ✓
  // - Form Component Generator
  // - Check List/Form/Details components run independantly and allow custom namespace
  // - Create acceptance tests for each CRUD route
  // - Has Many
  // - Remove beautify ignore comments

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
  ],

  blueprints: ["model", "crumbs", "filter", "list", "details", "form"],

  locals(options) {
    const // team
      s = options.entity.name,
      // teams
      p = inflection.pluralize(s, options.plural),
      // Team
      sUpper = stringUtil.capitalize(s),
      // Teams
      pUpper = stringUtil.capitalize(p),
      // TEAM
      sCaps = s.toUpperCase(),
      // TEAM
      pCaps = p.toUpperCase(),
      // internal.team
      sRoute = getRoutePath(s, options),
      // internal.teams
      pRoute = getRoutePath(p, options),
      // internal/team
      sRouteFiles = getRouteDir(s, options),
      // internal/teams
      pRouteFiles = getRouteDir(p, options),
      // InternalTeam
      sClass = stringUtil.classify(sRoute).replace(".", ""),
      // InternalTeams
      pClass = stringUtil.classify(pRoute).replace(".", ""),
      // Team
      components = sUpper,
      // team
      translations = s,
      // TEAM
      config = s.toUpperCase(),
      // This is a list of any model attributes we wish to include after the model name
      // name:string slug:string size:number isActive:boolean
      // <attr-name>
      // <attr-name>:array
      // <attr-name>:boolean
      // <attr-name>:date
      // <attr-name>:object
      // <attr-name>:number
      // <attr-name>:string
      // <attr-name>:your-custom-transform
      // <attr-name>:belongs-to:<model-name>
      // <attr-name>:has-many:<model-name>
      entityOptions = options.entity.options,
      // Mirage factory attributes
      factoryAttrs = this.makeFactoryAttributes(entityOptions),
      //
      viewComponent = factoryAttrs
        ? `<${components}::Details @${s}={{this.${s}}}
        @loading={{this.loading}} class="p-6" />`
        : `<p class="p-6 text-center">Replace with detail component(s)</p>`,
      formComponent = factoryAttrs
        ? `<${components}::Form @form={{form}} @changeset={{changeset}}
          @loading={{this.loading}} class="p-6" />`
        : `<p class="p-6 text-center">Replace with form component(s)</p>`,
      // form test selectors
      detailTestSelectors = this.makeDetailTestSelectors(entityOptions),
      formTestSelectors = this.makeFormTestSelectors(entityOptions),
      // Make boilerplate validations
      validations = this.makeValidationRules(entityOptions),
      filterValidations = this.makeFilterValidationRules(entityOptions);

    // let modelAttrs = getModelAttrs(options);

    return {
      appName: options.project.pkg.name,
      s,
      p,
      sUpper,
      pUpper,
      sRoute,
      pRoute,
      sClass,
      pClass,
      sCaps,
      pCaps,
      sRouteFiles,
      pRouteFiles,
      components,
      translations,
      config,
      factoryAttrs,
      viewComponent,
      formComponent,
      validations,
      filterValidations,
      detailTestSelectors,
      formTestSelectors,
    };
  },

  fileMapTokens(options) {
    return {
      __route__() {
        return options.locals.sRouteFiles;
      },
      __routep__() {
        return options.locals.pRouteFiles;
      },
    };
  },

  beforeInstall: function (options) {
    this.blueprints.forEach((name) => {
      const blueprint = Blueprint.lookup(name, {
        paths: options.project.blueprintLookupPaths(),
      });
      blueprint.install(options);
    });
  },
  //
  beforeUninstall: function (options) {
    this.blueprints.forEach((name) => {
      const blueprint = Blueprint.lookup(name, {
        paths: options.project.blueprintLookupPaths(),
      });

      return blueprint.uninstall(options);
    });
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

  makeDetailTestSelectors: function (entityOptions) {
    const attrs = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || "",
        selector;

      if (type.indexOf(":") > -1) {
        type = type.split(":")[0];
      }

      switch (type) {
        case "string":
        case "boolean":
        case "number":
        case "date":
        default:
          selector = `    ${name}: text('[data-test-data-item-value="${name}"]'),`;
          break;
      }

      attrs.push(selector);
    }

    return attrs.join(EOL);
  },

  makeFormTestSelectors: function (entityOptions) {
    const attrs = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || "",
        selector;

      if (type.indexOf(":") > -1) {
        type = type.split(":")[0];
      }

      switch (type) {
        case "string":
        case "boolean":
        case "number":
        case "date":
        default:
          selector = `    ${name}:{
      value: value('[data-test-input-value="${name}"]'),
      fill: fillable('[data-test-input-value="${name}"]'),
    },`;
          break;
      }

      attrs.push(selector);
    }

    return EOL + attrs.join(EOL);
  },

  makeFactoryAttributes: function (entityOptions) {
    // this._writeStatusToUI(chalk['red'], 'makeFactoryAttributes', '');
    const attrs = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || "",
        foreignModelOrFakerMethod;

      if (type.indexOf(":") > -1) {
        foreignModelOrFakerMethod = type.split(":")[1];
        type = type.split(":")[0];
      }

      if (!foreignModelOrFakerMethod) {
        switch (type) {
          case "string":
            foreignModelOrFakerMethod = "lorem.words()";
            break;
          case "boolean":
            foreignModelOrFakerMethod = "random.boolean";
            break;
          case "number":
            foreignModelOrFakerMethod = "random.number";
            break;
          case "date":
            foreignModelOrFakerMethod = "date.recent";
            break;
          default:
            foreignModelOrFakerMethod = false;
        }
      }

      if (foreignModelOrFakerMethod) {
        // construct mirage factory attribute to seed data
        // e.g isAdmin: faker.random.boolean,
        // if the field is a belongsTo or hasMany we'll skip
        // adding to the factory for now... soon tho
        attrs.push(`  ${name}: faker.${foreignModelOrFakerMethod},`);
      }
    }

    return EOL + attrs.join(EOL);
  },

  makeValidationRules(entityOptions) {
    const attrs = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || "",
        validationRules;

      if (type.indexOf(":") > -1) {
        type = type.split(":")[0];
      }

      switch (type) {
        case "string":
          validationRules = `  ${name}:[
     validatePresence(true),
     validateLength({max:255})
   ],`;
          break;
        case "boolean":
          validationRules = `  ${name}:[
     validatePresence(true),
     validateInclusion({list:[true, false]})
   ],`;
          break;
        case "number":
          validationRules = `  ${name}:[
     validateNumber({max:255})
   ],`;
          break;
        case "date":
          validationRules = `  ${name}:[
     validatePresence(true),
     validateDate()
   ],`;
          break;
        default:
          validationRules = `  ${name}:[],`;
          break;
      }

      attrs.push(validationRules);
    }

    return EOL + attrs.join(EOL);
  },

  makeFilterValidationRules(entityOptions) {
    const attrs = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || "",
        validationRules;

      if (type.indexOf(":") > -1) {
        type = type.split(":")[0];
      }

      switch (type) {
        case "string":
          validationRules = `  ${name}:[
     validateLength({max:255})
   ],`;
          break;
        case "boolean":
          validationRules = `  ${name}:[
     validateInclusion({list:[true, false]})
   ],`;
          break;
        case "number":
          validationRules = `  ${name}:[
     validateNumber({max:255})
   ],`;
          break;
        case "date":
          validationRules = `  ${name}:[
     validateDate()
   ],`;
          break;
        default:
          validationRules = `  ${name}:[],`;
          break;
      }

      attrs.push(validationRules);
    }

    return EOL + attrs.join(EOL);
  },

  updateFiles: async function (action, options) {
    await this.updateMirageEndpoints(action, options);

    await this.updateMirageSeeds(action, options);

    await this.updateModel(action, options);

    await this.updateAppConfig(action, options);

    await this.updateRouteParams(action, options);

    await this.updateTestHelpers(action, options);

    await this.updateRootPageObject(action, options);
  },

  async updateTestHelpers(action, options) {
    const s = options.entity.name,
      p = inflection.pluralize(s, options.plural),
      sUC = s.toUpperCase(),
      pUC = p.toUpperCase(),
      file = "tests/helpers/test-urls.js",
      marker = {
        before: "// DO NOT REMOVE!",
      },
      content = `export const ${pUC}_URL = "/${p}";
export const ${pUC}_NEW_URL = "/${p}/new";
export const ${sUC}_INDEX_URL = "/${s}/:id";
export const ${sUC}_EDIT_URL = "/${s}/:id/edit";
export const ${sUC}_ARCHIVE_URL = "/${s}/:id/archive";`;

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

  // Add our CRUD routes to app/router.js
  async updateRoutes(action, options) {
    let name = options.entity.name,
      singularRouteDir = getRouteDir(name, options),
      pluralRouteDir = getRouteDir(inflection.pluralize(name), options),
      // internal/teams
      listRoute = pluralRouteDir,
      // internal/teams/new
      newRoute = `${pluralRouteDir}/new`,
      // internal/team
      viewRoute = singularRouteDir,
      // internal/team/edit
      editRoute = `${singularRouteDir}/edit`,
      // internal/team/archive
      archiveRoute = `${singularRouteDir}/archive`;

    await this.updateRouter(action, options, listRoute);
    await this.updateRouter(action, options, newRoute);
    await this.updateRouter(action, options, viewRoute);
    await this.updateRouter(action, options, editRoute);
    await this.updateRouter(action, options, archiveRoute);

    return true;
  },

  // Embers model generator doesn't allow you to add
  // route params to the router.js file. This code
  // will add that
  async updateRouteParams(action, options) {
    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === "add") {
      // updateRoutes will remove the params when it removes
      // the route so no need to add logic for that here
      const name = options.entity.name,
        file = "app/router.js",
        marker = {
          after: `this.route('${name}',`,
        },
        content = `{${EOL}        path: '${name}/:${name}_id'${EOL}      },`;

      let result = await this.insertIntoFile(file, content, marker);

      this.writeUpdateFileStatusToUI(result, action, "app/router.js");

      return result;
    }
  },

  async updateMirageEndpoints(action, options) {
    const name = options.entity.name,
      file = "mirage/config.js",
      marker = {
        before: "  // DO NOT REMOVE!",
      },
      endpoint = inflection.pluralize(name, options.plural),
      title = inflection.titleize(name),
      content =
        EOL +
        `  // ${title}
  this.get('/${endpoint}');
  this.put('/${endpoint}');
  this.get('/${endpoint}/:id');
  this.post('/${endpoint}/:id');
  this.patch('/${endpoint}/:id');
  this.delete('/${endpoint}/:id');
  `;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === "add") {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, "mirage endpoints");

    return result;
  },

  async updateMirageSeeds(action, options) {
    const name = options.entity.name,
      file = "mirage/scenarios/default.js",
      marker = {
        before: "  // DO NOT REMOVE!",
      },
      content = `  server.createList('${name}', 35);` + EOL;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === "add") {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, "mirage seeds");

    return result;
  },

  async updateModel(action, options) {
    const name = options.entity.name,
      className = inflection.classify(name),
      file = `app/models/${name}.js`;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === "add") {
      // First step is to add the import code
      let marker = {
          after: `from '@ember-data/model';` + EOL,
        },
        content = `import { alias } from "@ember/object/computed";`,
        result;

      result = await this.insertIntoFile(file, content, marker);

      // Now we add the computed property
      marker = {
        after: `export default class ${className}Model extends Model {` + EOL,
      };
      content =
        EOL +
        `  // Computeds

  @alias('id') describe;`;

      result = await this.insertIntoFile(file, content, marker);

      this.writeUpdateFileStatusToUI(result, action, "model");

      return result;
    } else {
      // the model will be removed by the model generator
      return;
    }
  },

  async updateAppConfig(action, options) {
    const name = options.entity.name,
      pRoutePath = getRoutePath(inflection.pluralize(name), options),
      sRoutePath = getRoutePath(name, options),
      file = "app/utils/const/app.js",
      marker = {
        before: "// DO NOT REMOVE!",
      },
      content = `  {
    label: '${name}.nav.label',
    route: '${pRoutePath}.index',
    icon: 'nav.users',
    activeWhen: '${pRoutePath}.index,${sRoutePath}.index,${sRoutePath}.edit,${sRoutePath}.archive',
  },`;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === "add") {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, "app config");

    return result;
  },

  // This method will update tests/pages/internal.js to add
  // the new routes core navigation selectors
  async updateRootPageObject(action, options) {
    const name = options.entity.name,
      pRoutePath = getRoutePath(inflection.pluralize(name), options),
      rootPage = options.nested ? options.nested : 'index.js',
      file = `tests/pages/${rootPage}.js`,
      desktopMarker = {
        before: "// DESKTOP NAV DO NOT REMOVE!",
      },
      desktopContent = `      ${camelName}: {
        click: clickable('[data-test-nav-item="${dashName}.nav.label"]', {
          scope: DESKTOP_SCOPE,
        }),
        isActive: isPresent(
          '[data-test-nav-item="${dashName}.nav.label"][data-test-active]',
          {
            scope: DESKTOP_SCOPE,
          }
        ),
      },`,
      mobileMarker = {
        before: "// MOBILE NAV DO NOT REMOVE!",
      },
      mobileContent = `      ${camelName}: {
        click: clickable('[data-test-nav-item="${dashName}.nav.label"]', {
          scope: MOBILE_SCOPE,
        }),
        isActive: isPresent(
          '[data-test-nav-item="${dashName}.nav.label"][data-test-active]',
          {
            scope: MOBILE_SCOPE,
          }
        ),
      },`;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === "add") {
      result = await this.insertIntoFile(file, desktopContent, desktopMarker);
      result = await this.insertIntoFile(file, desktopContent, desktopMarker);
    } else {
      result = await this.removeFromFile(file, mobileContent);
      result = await this.removeFromFile(file, mobileContent);
    }

    this.writeUpdateFileStatusToUI(result, action, "root page object");

    return result;
  }

  // WARNING - make sure the text you are wanting to remove
  // is unique. This is simple find replace operation running
  // here. E.g if you ask to remove "var = foo" - any instances
  // of "var = foobar would leave bar all alone :(
  async removeFromFile(fullPath, contentsToRemove) {
    let returnValue = {
      path: fullPath,
      originalContents: "",
      contents: "",
      removed: false,
    };

    let exists = await fs.existsSync(fullPath);

    if (exists) {
      let originalContents = "";

      originalContents = fs.readFileSync(fullPath, {
        encoding: "utf8",
      });

      let contentsToWrite = originalContents.replace(
        contentsToRemove + EOL,
        ""
      );

      if (contentsToWrite !== originalContents) {
        returnValue.removed = true;

        await fs.outputFile(fullPath, contentsToWrite);

        return returnValue;
      }
    }

    return Promise.resolve(returnValue);
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

function getRoutePath(route, options) {
  return options.nested ? `${options.nested}.${route}` : route;
}

function getRouteDir(route, options) {
  return options.nested ? `${options.nested}/${route}` : route;
}
