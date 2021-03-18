import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";
import { action, computed } from "@ember/object";

export default class InternalToolsCrudController extends Controller {
  // Attribute types
  attributeTypes = [
    "",
    "array",
    "boolean",
    "date",
    "object",
    "number",
    "string",
    "your-custom-transform",
    "belongs-to",
    "has-many",
  ];

  // Tracking

  @tracked model = "widget";
  @tracked attributes = [];
  @tracked plural = "";
  @tracked nested = "internal";

  // Computeds

  @computed("attributes.@each.{name,type,meta}", function () {
    const attributes = [];

    this.attributes.forEach((f) => {
      const args = [];

      if (f.name) {
        args.pushObject(f.name);

        if (f.type) {
          args.pushObject(f.type);

          if (f.meta) {
            args.pushObject(f.meta);
          }
        }
      }

      attributes.pushObject(args.join(":"));
    });

    return attributes.join(" ") + " ";
  })
  attributesArgument;

  // Getters

  get command() {
    const model = this.model,
      attributes = this.attributesArgument,
      plural = this.plural ? `--plural ${this.plural} ` : ``,
      nested = this.nested ? `--nested ${this.nested} ` : ``;

    return `ember g crud ${model} ${attributes}${plural}${nested}`;
  }

  // Actions

  @action addAttribute() {
    this.attributes.pushObject({ name: "", type: "string", meta: "" });
  }

  @action removeAttribute(attribute) {
    this.attributes.removeObject(attribute);
  }

  @action setAttributeType(attribute, event) {
    attribute.type = event.target.value;
  }
}
