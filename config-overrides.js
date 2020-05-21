const rewireReactHotLoader = require('react-app-rewire-hot-loader');

/* config-overrides.js */
module.exports = function override(config, env) {
  let newConfig = config;

  newConfig = rewireReactHotLoader(newConfig, env);

  return newConfig;
};
