'use strict';

// TODO - write has many boilerplate
// TODO - update utils/const/singular.js  with new action
// TODO - update translations/singular/en-us.yaml  with translations
// TODO - update test-urls
const path = require("path");
const EOL = require("os").EOL;
const portalInflection = require("../portal-inflection");

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
  ],

  locals(options) {
    console.log(options);
    // This is a list of any model attributes we wish to include after the model name
    // name:string slug:string size:number isActive:boolean
  }


};
