const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPlugin
} = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = override(
  addBabelPlugin('istanbul'), // For instrumented Code
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#43b99d',
      '@form-vertical-label-padding': '0'
    }
  }),
  (config, env) => {
    config = rewireReactHotLoader(config, env);
    return config;
  }
);
