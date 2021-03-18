import Controller from "@ember/controller";
import { tracked } from "@glimmer/tracking";

export default class InternalToolsController extends Controller {
  @tracked tabs = [
    { route: "internal.tools.portal", label: "Portal" },
    { route: "internal.tools.crud", label: "CRUD" },
    { route: "internal.tools.form", label: "Form" },
    { route: "internal.tools.details", label: "Details" },
  ];
}
