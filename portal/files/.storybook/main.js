/* global module */
module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-a11y',
    '@storybook/addon-storysource',
  ],
};
