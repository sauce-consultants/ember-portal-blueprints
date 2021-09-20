'use strict';

const inflection = require('inflection'); // https://www.npmjs.com/package/inflection

module.exports = {
  description: '',

  locals(options) {
    const appName = options.project.pkg.name;
    // Return custom template variables here.
    return {
      app: appName,
      appTitle: inflection.humanize(appName),
    };
  },
};
