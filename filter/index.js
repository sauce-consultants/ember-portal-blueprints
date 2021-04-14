"use strict";
const EOL = require("os").EOL;
const inflection = require("inflection"); // https://www.npmjs.com/package/inflection
const portalInflection = require("../portal-inflection");

module.exports = {
  description: "Generate basic filter component for a resource",

  // Current Options
  // --plural employees
  // --parentRoute iternal
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

  locals(options) {
    let name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options),
      entityOptions = options.entity.options;

    // Return custom template variables here.
    return {
      ...tokens,
      appName: options.project.pkg.name,
      items: this.getFilterItems(name, entityOptions),
      tracked: this.getTrackedItems(name, entityOptions),
      actions: this.getActions(name, entityOptions),
      translations: this.getTranslations(name, entityOptions),
    };
  },

  getTrackedItems(model, entityOptions) {
    const items = [];

    for (let name in entityOptions) {
      items.push(`  @tracked ${name} = null;`);
    }
    return EOL + items.join(EOL);
  },

  getFilterItems(model, entityOptions) {
    const items = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || ""; //,
      // foreignModelOrFakerMethod;

      if (type.indexOf(":") > -1) {
        // foreignModelOrFakerMethod = type.split(':')[1];
        type = type.split(":")[0];
      }

      if (type === "belongs-to") {
        // we'll pass the describe method on the related model
        name = `${name}.describe`;
        // no form input support fo has belongs to
        continue;
      }

      if (type === "has-many") {
        // we'll pass a count of the related models
        name = `${name}.length`;
        // no form input support fo has many yet
        continue;
      }

      // Code will decide what form input to add for each attribute
      let inputType = this.getInputType(name, type);

      if (inputType === "select") {
        items.push(this.makeSelectControl(inputType, name, model));
      } else if (inputType === "multiselect") {
        items.push(this.makeMultiSelectControl(inputType, name, model));
      } else if (inputType === "checkbox") {
        items.push(this.makeCheckboxControl(inputType, name, model));
      } else if (inputType === "date") {
        items.push(this.makeDateControl(inputType, name, model));
      } else {
        // Must be a text input then
        items.push(this.makeTextControl(inputType, name, model));
      }
    }

    return EOL + items.join(EOL + EOL);
  },

  getActions(model, entityOptions) {
    const actions = [];

    for (let name in entityOptions) {
      let type = entityOptions[name] || ""; //,
      // foreignModelOrFakerMethod;

      if (type.indexOf(":") > -1) {
        // foreignModelOrFakerMethod = type.split(':')[1];
        type = type.split(":")[0];
      }

      if (type === "belongs-to") {
        // we'll pass the describe method on the related model
        name = `${name}.describe`;
        // no form input support fo has many yet
        continue;
      }

      if (type === "has-many") {
        // we'll pass a count of the related models
        name = `${name}.length`;
        // no form input support fo has many yet
        continue;
      }

      // Code will decide what form input to add for each attribute
      let inputType = this.getInputType(name, type);

      if (inputType === "select") {
        actions.push(this.makeUpdateAction(inputType, name, model));
      } else if (inputType === "multiselect") {
        actions.push(this.makeUpdateAction(inputType, name, model));
      } else if (inputType === "checkbox") {
        actions.push(this.makeToggleAction(inputType, name, model));
      } else if (inputType === "date") {
        actions.push(this.makeUpdateAction(inputType, name, model));
      } else {
        // Must be a text input then
        // no action required
      }
    }

    return EOL + actions.join(EOL + EOL);
  },

  getTranslations(name, entityOptions) {
    let lines = [];

    for (let fieldName in entityOptions) {
      let title = inflection.titleize(inflection.underscore(fieldName)),
        human = inflection.humanize(fieldName, false),
        line = `${fieldName}:
    label: ${title}
    placeholder: Filter ${human}
    tip: Filter ${inflection.capitalize(name)} by ${title}`;

      lines.push(line);
    }

    return EOL + lines.join(EOL);
  },

  getInputType(attrName, attrType) {
    switch (attrType) {
      case "has-many":
      case "array":
        return "multiselect";
      case "belongs-to":
        return "select";
      case "boolean":
        return "checkbox";
      case "number":
        return "number";
      case "date":
        return "date";
      case "string":
      default:
        // all custom or object attributes will get a text input
        return "text";
    }
  },

  makeSelectControl(inputType, name, model) {
    return this.makeTextControl("text", name, model);
  },

  makeMultiSelectControl(inputType, name, model) {
    return this.makeTextControl("text", name, model);
  },

  makeCheckboxControl(inputType, name, model) {
    const actionName = "toggle" + inflection.classify(name);
    return `     <Ui::Form::Control class="w-full"
        @changeset={{@changeset}}
        @name="${name}"
        @isSubmitting={{@form.isSubmitting}}
        @didSubmit={{@form.didSubmit}}
        as
        |control|>
        <control.Label @text={{t "${model}.filter.${name}.label"}} />
        <control.Checkbox @value={{@changeset.${name}}}
          @placeholder={{t "${model}.filter.${name}.placeholder"}}
          {{on "click" (fn this.${actionName} @changeset)}}
        />
        <control.Helper @tip={{t "${model}.filter.${name}.tip"}} />
      </Ui::Form::Control>`;
  },

  makeDateControl(inputType, name, model) {
    const actionName = "update" + inflection.classify(name);

    return `    <Ui::Form::Control class="w-full"
        @changeset={{@changeset}}
        @name="${name}"
        @isSubmitting={{@form.isSubmitting}}
        @didSubmit={{@form.didSubmit}}
        as
        |control|>
        <control.Label @text={{t "${model}.filter.${name}.label"}} />
        <control.Input @type="date"
        @value={{moment-format @changeset.${name} "YYYY-MM-DD"}}
        {{on "change" (fn this.${actionName} @changeset)}}
        placeholder={{t "${model}.filter.${name}.placeholder"}} />
        <control.Helper @tip={{t "${model}.filter.${name}.tip"}} />
      </Ui::Form::Control>`;
  },

  makeTextControl(inputType, name, model) {
    return `    <Ui::Form::Control class="w-full"
        @changeset={{@changeset}}
        @name="${name}"
        @isSubmitting={{@form.isSubmitting}}
        @didSubmit={{@form.didSubmit}}
        as
        |control|>
        <control.Label @text={{t "${model}.filter.${name}.label"}} />
        <control.Input @value={{@changeset.${name}}}
        @type="${inputType}"
        placeholder={{t "${model}.filter.${name}.placeholder"}} />
        <control.Helper @tip={{t "${model}.filter.${name}.tip"}} />
      </Ui::Form::Control>`;
  },

  makeUpdateAction(inputType, name) {
    const actionName = "update" + inflection.classify(name);
    return `  @action ${actionName}(changeset, event) {
    changeset.set('${name}', event.target.valueAsDate);
  }`;
  },

  makeToggleAction(inputType, name) {
    const actionName = "toggle" + inflection.classify(name);
    return `  @action ${actionName}(changeset) {
    changeset.set('${name}', !changeset.${name});
  }`;
  },
};
