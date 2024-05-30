const UnoCSS =  require('@unocss/webpack').default
const  {TsconfigPathsPlugin} = require("tsconfig-paths-webpack-plugin") ;

const cracoConfig = {
  babel: {
    plugins: ["./scripts/plugins/babel-plugin-test.js"],
    loaderOptions: {  },
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      return babelLoaderOptions;
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const { plugins, resolve, optimization } = webpackConfig

      resolve?.plugins?.push(new TsconfigPathsPlugin())
      plugins?.push(UnoCSS())

      // 删除 ModuleScopePlugin
      const index = resolve.plugins?.findIndex(item => {
        return item.constructor.name ===  'ModuleScopePlugin'
      });

      if(index !== undefined && index > -1) {
        resolve.plugins?.splice(index, 1)
      }

      return {
        ...webpackConfig,
        optimization: {
          ...optimization,
          realContentHash: true
        }
      }
    },
  },
}

module.exports = cracoConfig