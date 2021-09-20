'use strict';

const portalInflection = require('../portal-inflection');

module.exports = {
  description: 'Generate basic breadcrumb component for a resource',

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

  locals(options) {
    const name = options.entity.name,
      tokens = portalInflection.nameTokens(name, options);

    return {
      ...tokens,
      appName: options.project.pkg.name,
    };
  },

  // afterInstall(options) {
  //   // Perform extra work here.
  // }
};
