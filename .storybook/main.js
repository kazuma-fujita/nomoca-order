const path = require('path');

module.exports = {
  // stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss',
    'storybook-addon-next-router',
  ],
  webpackFinal: async (config, { configType }) => {
    // baseUrl settings in tsconfig.json
    config.resolve.modules.push(path.resolve(__dirname, '../src'));
    // MUI settings
    delete config.resolve.alias['emotion-theming'];
    delete config.resolve.alias['@emotion/styled'];
    delete config.resolve.alias['@emotion/core'];
    return config;
  },
};
