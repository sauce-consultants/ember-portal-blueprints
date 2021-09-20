'use strict';

const path = require('path');
const EOL = require('os').EOL;
const portalInflection = require('../portal-inflection');
const Blueprint = require('ember-cli/lib/models/blueprint');
/* eslint-disable */
const fs = require("fs-extra");
const EmberRouterGenerator = require("ember-router-generator");
const chalk = require("chalk");
/* eslint-enable */

module.exports = {
  description: 'Generate basic CRUD screen for a resource',

  // - TODO - CRUD Check List/Form/Details components run independantly and allow custom namespace
  // - TODO - CRUD Create acceptance tests for each CRUD route (new and edit)

  // Current Options
  // --plural employees
  // --nested internal
  availableOptions: [
    {
      name: 'nested',
      type: String,
      default: '',
    },
    {
      name: 'plural',
      type: String,
      default: '',
    },
  ],

  blueprints: ['model', 'crumbs', 'filter', 'list', 'details', 'form'],

  locals(options) {
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

    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      entityOptions = options.entity.options,
      // Mirage factory attributes
      factoryAttrs = this.makeFactoryAttributes(entityOptions),
      //
      viewComponent = factoryAttrs
        ? `<${tokens.classSingular}::Details @${tokens.camelSingular}={{this.${tokens.camelSingular}}}
        @loading={{this.loading}} class="p-6" />`
        : `<p class="p-6 text-center">Replace with detail component(s)</p>`,
      formComponent = factoryAttrs
        ? `<${tokens.classSingular}::Form @form={{form}} @changeset={{changeset}}
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
      ...tokens,
      appName: options.project.pkg.name,
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
      __route_singular__() {
        return options.locals.routePathSingular;
      },
      __route_plural__() {
        return options.locals.routePathPlural;
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
    await this.updateRoutes('add', options);

    await this.updateFiles('add', options);

    return true;
  },

  afterUninstall: async function (options) {
    await this.updateRoutes('remove', options);

    await this.updateFiles('remove', options);

    return true;
  },

  makeDetailTestSelectors: function (entityOptions) {
    const attrs = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || '',
        selector;

      if (type.indexOf(':') > -1) {
        type = type.split(':')[0];
      }

      switch (type) {
        case 'string':
        case 'boolean':
        case 'number':
        case 'date':
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
      let type = entityOptions[name] || '',
        selector;

      if (type.indexOf(':') > -1) {
        type = type.split(':')[0];
      }

      switch (type) {
        case 'string':
        case 'boolean':
        case 'number':
        case 'date':
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
      let type = entityOptions[name] || '',
        foreignModelOrFakerMethod;

      if (type.indexOf(':') > -1) {
        foreignModelOrFakerMethod = type.split(':')[1];
        type = type.split(':')[0];

        if (type != 'has-many' && type != 'belongs-to') {
          // it's a faker method
          foreignModelOrFakerMethod = foreignModelOrFakerMethod + '()';
        }
      }

      if (!foreignModelOrFakerMethod) {
        switch (type) {
          case 'string':
            foreignModelOrFakerMethod = 'lorem.words()';
            break;
          case 'boolean':
            foreignModelOrFakerMethod = 'random.boolean()';
            break;
          case 'number':
            foreignModelOrFakerMethod = 'random.number()';
            break;
          case 'date':
            foreignModelOrFakerMethod = 'date.recent()';
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
        attrs.push(
          `  ${name}() { return faker.${foreignModelOrFakerMethod};},`,
        );
      }
    }

    return EOL + attrs.join(EOL);
  },

  makeValidationRules(entityOptions) {
    const attrs = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || '',
        validationRules;

      if (type.indexOf(':') > -1) {
        type = type.split(':')[0];
      }

      switch (type) {
        case 'string':
          validationRules = `  ${name}:[
     validatePresence(true),
     validateLength({max:255})
   ],`;
          break;
        case 'boolean':
          validationRules = `  ${name}:[
     validatePresence(true),
     validateInclusion({list:[true, false]})
   ],`;
          break;
        case 'number':
          validationRules = `  ${name}:[
     validateNumber({max:255})
   ],`;
          break;
        case 'date':
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
      let type = entityOptions[name] || '',
        validationRules;

      if (type.indexOf(':') > -1) {
        type = type.split(':')[0];
      }

      switch (type) {
        case 'string':
          validationRules = `  ${name}:[
     validateLength({max:255})
   ],`;
          break;
        case 'boolean':
          validationRules = `  ${name}:[
     validateInclusion({list:[true, false]})
   ],`;
          break;
        case 'number':
          validationRules = `  ${name}:[
     validateNumber({max:255})
   ],`;
          break;
        case 'date':
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
    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      file = 'tests/helpers/test-urls.js',
      marker = {
        before: '// DO NOT REMOVE!',
      },
      content = `export const ${tokens.capitalizedPlural}_URL = "/${tokens.routePathPlural}";
export const ${tokens.capitalizedPlural}_NEW_URL = "/${tokens.routePathPlural}/new";
export const ${tokens.capitalizedSingular}_INDEX_URL = "/${tokens.routePathSingular}/:id";
export const ${tokens.capitalizedSingular}_EDIT_URL = "/${tokens.routePathSingular}/:id/edit";
export const ${tokens.capitalizedSingular}_ARCHIVE_URL = "/${tokens.routePathSingular}/:id/archive";`;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === 'add') {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, 'test helper urls');

    return result;
  },

  // Add our CRUD routes to app/router.js
  async updateRoutes(action, options) {
    let name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      // internal/teams
      listRoute = tokens.routePathPlural,
      // internal/teams/new
      newRoute = `${tokens.routePathPlural}/new`,
      // internal/team
      viewRoute = tokens.routePathSingular,
      // internal/team/edit
      editRoute = `${tokens.routePathSingular}/edit`,
      // internal/team/archive
      archiveRoute = `${tokens.routePathSingular}/archive`;

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
    } else if (action === 'add') {
      // updateRoutes will remove the params when it removes
      // the route so no need to add logic for that here
      const name = options.entity.name,
        nameUnderscored = name.replace('-', '_'),
        file = 'app/router.js',
        marker = {
          after: `this.route('${name}',`,
        },
        content = `{${EOL}        path: '${name}/:${nameUnderscored}_id'${EOL}      },`;

      let result = await this.insertIntoFile(file, content, marker);

      this.writeUpdateFileStatusToUI(result, action, 'app/router.js');

      return result;
    }
  },

  async updateMirageEndpoints(action, options) {
    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      file = 'mirage/config.js',
      marker = {
        before: '  // DO NOT REMOVE!',
      },
      content =
        EOL +
        `  // ${tokens.titlePlural}
  this.get('/${tokens.dasherizedPlural}');
  this.post('/${tokens.dasherizedPlural}');
  this.get('/${tokens.dasherizedPlural}/:id');
  this.put('/${tokens.dasherizedPlural}/:id');
  this.patch('/${tokens.dasherizedPlural}/:id');
  this.delete('/${tokens.dasherizedPlural}/:id');
  `;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === 'add') {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, 'mirage endpoints');

    return result;
  },

  async updateMirageSeeds(action, options) {
    const name = options.entity.name,
      file = 'mirage/scenarios/default.js',
      marker = {
        before: '  // DO NOT REMOVE!',
      },
      content = `  server.createList('${name}', 35);` + EOL;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === 'add') {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, 'mirage seeds');

    return result;
  },

  async updateModel(action, options) {
    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      file = `app/models/${name}.js`;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === 'add') {
      // First step is to add the import code
      let marker = {
          after: `from '@ember-data/model';` + EOL,
        },
        content = `import { alias } from "@ember/object/computed";`,
        result;

      result = await this.insertIntoFile(file, content, marker);

      // Now we add the computed property
      marker = {
        after:
          `export default class ${tokens.classSingular}Model extends Model {` +
          EOL,
      };
      content =
        EOL +
        `  // Computeds

  @alias('id') describe;`;

      result = await this.insertIntoFile(file, content, marker);

      this.writeUpdateFileStatusToUI(result, action, 'model');

      return result;
    } else {
      // the model will be removed by the model generator
      return;
    }
  },

  async updateAppConfig(action, options) {
    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      file = 'app/utils/const/app.js',
      marker = {
        before: '// DO NOT REMOVE!',
      },
      content = `  {
    label: '${tokens.dasherizedSingular}.nav.label',
    route: '${tokens.routeNamePlural}.index',
    enabled: true,
    icon: '${tokens.dasherizedSingular}.nav.icon',
    activeWhen: '${tokens.routeNamePlural}.index,${tokens.routeNameSingular}.index,${tokens.routeNameSingular}.edit,${tokens.routeNameSingular}.archive',
  },`;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === 'add') {
      result = await this.insertIntoFile(file, content, marker);
    } else {
      result = await this.removeFromFile(file, content);
    }

    this.writeUpdateFileStatusToUI(result, action, 'app config');

    return result;
  },

  // This method will update tests/pages/internal.js to add
  // the new routes core navigation selectors
  async updateRootPageObject(action, options) {
    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      file = `tests/pages/${tokens.dasherizedSingular}.js`,
      desktopMarker = {
        before: '// DESKTOP NAV DO NOT REMOVE!',
      },
      desktopContent =
        EOL +
        `      ${tokens.camelSingular}: {
        click: clickable('[data-test-nav-item="${tokens.dasherizedSingular}.nav.label"]', {
          scope: DESKTOP_SCOPE,
        }),
        isActive: isPresent(
          '[data-test-nav-item="${tokens.dasherizedSingular}.nav.label"][data-test-active]',
          {
            scope: DESKTOP_SCOPE,
          }
        ),
     n },` +
        EOL,
      mobileMarker = {
        before: '// MOBILE NAV DO NOT REMOVE!',
      },
      mobileContent =
        EOL +
        `      ${tokens.camelSingular}: {
        click: clickable('[data-test-nav-item="${tokens.dasherizedSingular}.nav.label"]', {
          scope: MOBILE_SCOPE,
        }),
        isActive: isPresent(
          '[data-test-nav-item="${tokens.dasherizedSingular}.nav.label"][data-test-active]',
          {
            scope: MOBILE_SCOPE,
          }
        ),
      },` +
        EOL;

    let result;

    if (options.dryRun) {
      return this.writeDryRunStatusToUI();
    } else if (action === 'add') {
      result = await this.insertIntoFile(file, desktopContent, desktopMarker);
      result = await this.insertIntoFile(file, mobileContent, mobileMarker);
    } else {
      result = await this.removeFromFile(file, desktopContent);
      result = await this.removeFromFile(file, mobileContent);
    }

    this.writeUpdateFileStatusToUI(result, action, 'root page object');

    return result;
  },

  // WARNING - make sure the text you are wanting to remove
  // is unique. This is simple find replace operation running
  // here. E.g if you ask to remove "var = foo" - any instances
  // of "var = foobar would leave bar all alone :(
  async removeFromFile(fullPath, contentsToRemove) {
    let returnValue = {
      path: fullPath,
      originalContents: '',
      contents: '',
      removed: false,
    };

    let exists = await fs.existsSync(fullPath);

    if (exists) {
      let originalContents = '';

      originalContents = fs.readFileSync(fullPath, {
        encoding: 'utf8',
      });

      let contentsToWrite = originalContents.replace(
        contentsToRemove + EOL,
        '',
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
      add: 'green',
      remove: 'red',
    };
    let color = actionColorMap[action] || 'gray';

    if (this.shouldTouchRouter(route, options)) {
      await this.writeRoute(action, route, options);

      this.ui.writeLine('updating router');

      this._writeStatusToUI(chalk[color], action + ' route', route);
    }

    entity.name = _name;
  },

  shouldTouchRouter(name, options) {
    var isIndex = name === 'index';
    var isBasic = name === 'basic';
    var isApplication = name === 'application';

    if (options.dryRun) {
      this._writeStatusToUI(
        chalk['yellow'],
        'You specified the dry-run flag, so no routes will be updated.',
        '',
      );
      return false;
    }

    return !isBasic && !isIndex && !isApplication;
  },

  writeRoute(action, name, options) {
    let routerPath = path.join.apply(null, this.findRouter(options));
    let source = fs.readFileSync(routerPath, 'utf-8');

    let routes = new EmberRouterGenerator(source);
    let newRoutes = routes[action](name, options);

    return Promise.resolve(fs.writeFileSync(routerPath, newRoutes.code()));
  },

  findRouter(options) {
    let routerPathParts = [options.project.root];
    let root = 'app';

    if (options.dummy && options.project.isEmberCLIAddon()) {
      routerPathParts = routerPathParts.concat([
        'tests',
        'dummy',
        root,
        'router.js',
      ]);
    } else {
      routerPathParts = routerPathParts.concat([root, 'router.js']);
    }

    return routerPathParts;
  },

  writeUpdateFileStatusToUI(fileUpdateResult, action, message) {
    if (action === 'add') {
      if (fileUpdateResult.inserted) {
        this._writeStatusToUI(chalk['green'], 'updated', message);
      } else {
        this._writeStatusToUI(chalk['red'], 'skipped', message);
      }
    } else {
      if (fileUpdateResult.removed) {
        this._writeStatusToUI(chalk['red'], 'updated', message);
      } else {
        this._writeStatusToUI(chalk['yellow'], 'skipped', message);
      }
    }
  },

  writeDryRunStatusToUI() {
    this._writeStatusToUI(
      chalk['yellow'],
      'You specified the dry-run flag, so no files will be updated.',
      '',
    );
  },
};
