import EmberRouter from "@ember/routing/router";
import config from "<%= app %>/config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  //
  // Open Routes
  //
  this.route(
    "external",
    {
      path: "auth"
    },
    function() {
      this.route("login");
      this.route("invite", { path: "invite/:token" });
      this.route("recover-password");
      this.route("reset-password", { path: "reset-password/:token" });
    }
  );

  //
  // Authorised Routes
  //
  this.route("internal", { path: "/" }, function() {

    if (config.environment === "development") {
      this.route("tools", function () {
        this.route("portal");
        this.route("crud");
        this.route("form");
        this.route("details");
      });
    }
    
  });

  this.route("not-found", {
    path: "/*path"
  });
});
