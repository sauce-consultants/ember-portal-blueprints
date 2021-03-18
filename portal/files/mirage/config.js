import ENV from "<%= app %>/config/environment";
import {
  getSession,
  postSession,
  deleteSession,
} from "./helpers/session-handlers";
import { Response } from "miragejs";

import presignHandler from "./helpers/presign-handler";

export default function () {
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // make this `http://localhost:8080`, for example, if your API is on a different server
  this.urlPrefix = ENV.rootApiURL;
  // make this `api`, for example, if your API is namespaced
  this.namespace = ENV.apiNamespace;
  // delay for each request, automatically set to 0 during testing
  this.timing = 1000;

  // Authentication
  this.get("/session", getSession);
  this.post("/session", postSession);
  this.delete("/session", deleteSession);

  // Export Presign
  this.post("/presigns", presignHandler, 200);

  // Forgot Password & Reset Passwords
  this.post("/recover-password", function () {
    return new Response(
      202,
      {
        "Content-Type": "application/vnd.api+json",
      },
      "OK"
    );
  });

  this.put("/reset-password", function () {
    return new Response(
      204,
      {
        "Content-Type": "application/vnd.api+json",
      },
      ""
    );
  });

  // DO NOT REMOVE!
}
