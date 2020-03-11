const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#38b7df',
      '@link-color': '#38b7df',
      '@error-color': '#ff5b5d',
      '@border-radius-base': '5px',
      '@border-color-base': '#e4e4e4',
      '@text-color': '#2c2c2c',
    },
  }),
);
