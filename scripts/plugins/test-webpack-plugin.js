const pluginName = 'TestWebpackPlugin'

const diffOutput = require('../bash/diffOutput.json')

class TestWebpackPlugin {
  apply(compiler) {
    compiler.hooks.normalModuleFactory.tap(pluginName, (normalModuleFactory) => {
      normalModuleFactory.hooks.module.tap(pluginName, (module, createData, resolveData) => {
        console.log(module, createData, resolveData)
      })
      normalModuleFactory.hooks.parser.for('javascript/auto').tap(pluginName, (parser, parserOptions) => {
        console.log(parser, parserOptions)
        parser.hooks.program.tap(pluginName, (ast, comments) => {
          console.log(ast, comments)
        })
      })
      normalModuleFactory.hooks.generator.for('javascript/auto').tap(pluginName, (generator, generatorOptions) => {
        console.log(generator, generatorOptions)
      })
    })

    compiler.hooks.thisCompilation.tap(pluginName, (compilation, params) => {
      compilation.hooks.finishModules.tap(pluginName, (modules) => {
        console.log(modules)
      })
    })
  }
}

module.exports = { TestWebpackPlugin }
