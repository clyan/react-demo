const path = require('node:path')
const { createWebpackDevConfig, createWebpackProdConfig } = require('@craco/craco')
const cracoConfig = require('./.cracorc.ts')
const webpackConfig = process.env.NODE_ENV === 'production' ? createWebpackProdConfig(cracoConfig) : createWebpackDevConfig(cracoConfig)

module.exports = {
  title: '组件文档示例',
  components: 'src/components/**/*.tsx',
  webpackConfig,
  template: {
    favicon: 'https://assets-cdn.github.com/favicon.ico',
  },
  theme: {
    fontFamily: {
      base: '"Comic Sans MS", "Comic Sans", cursive',
    },
  },
  printServerInstructions(config) {
    // eslint-disable-next-line no-console
    console.log(`View your styleguide at: http://${config.serverHost}:${config.serverPort}`)
  },
  // 原理是，使用自定义的组件替换原有的组件
  styleguideComponents: {
    LogoRenderer: path.join(__dirname, 'src/styleguide/components/logo'),
    // StyleGuideRenderer: path.join(__dirname, 'src/styleguide/components/style-guide'),
    SectionsRenderer: path.join(__dirname, 'src/styleguide/components/sections-renderer'),
  },
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json',
    {
      shouldExtractLiteralValuesFormEnum: true,
      skipChildrenPropWithoutDoc: false,
    },
  ).parse,
}
