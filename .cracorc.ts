import { CracoConfig } from "@craco/types";
import UnoCSS from '@unocss/webpack'
import {TsconfigPathsPlugin} from "tsconfig-paths-webpack-plugin";

const cracoConfig: CracoConfig = {
  
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const { plugins, resolve, optimization } = webpackConfig

      resolve?.plugins?.push(new TsconfigPathsPlugin())
      
      plugins?.push(UnoCSS())

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