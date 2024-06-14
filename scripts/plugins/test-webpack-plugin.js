const { RawSource, ReplaceSource } = require('webpack-sources')
const diffOutput = require('../bash/diffOutput.json')

const diffMap = new Map()
diffOutput.forEach((item) => {
  const newName = item.newName
  const oldName = item.oldName
  if (!diffMap.has(newName))
    diffMap.set(newName, item)
  if (!diffMap.has(oldName))
    diffMap.set(newName, item)
})

const pluginName = 'TestWebpackPlugin'

class TestWebpackPlugin {
  apply(compiler) {
    const projectDir = compiler.context
    compiler.hooks.normalModuleFactory.tap(pluginName, (normalModuleFactory) => {
      normalModuleFactory.hooks.module.tap(pluginName, (module, createData, resolveData) => {
        // console.log(module, createData, resolveData)
      })
      normalModuleFactory.hooks.parser.for('javascript/auto').tap(pluginName, (parser, parserOptions) => {
        // console.log(parser, parserOptions)
        parser.hooks.program.tap(pluginName, (ast, comments) => {
          const context = parser.state.module.context
          const p = parser
          const resourcePath = parser.state.module.resource
          const fileRelative = resourcePath.replace(`${projectDir}/`, '')
          if (diffMap.has(fileRelative)) {
            const diffItem = diffMap.get(fileRelative)
            console.log(diffItem)
          }
          // console.log(ast, comments)
        })
      })
      normalModuleFactory.hooks.generator.for('javascript/auto').tap(pluginName, (generator, generatorOptions) => {
        // console.log(generator, generatorOptions)
      })
    })

    compiler.hooks.thisCompilation.tap(pluginName, (compilation, params) => {
      compilation.hooks.finishModules.tap(pluginName, (modules) => {
        // console.log(modules)
      })
    })

    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      // Access and modify assets
      Object.keys(compilation.assets).forEach((filename) => {
        const asset = compilation.assets[filename]
        const rawSource = new RawSource('console.log("Hello, world!");')
        console.log('rawSource', rawSource)
        // compilation.assets[filename] = modifiedSource
      })

      callback()
    })
  }
}

module.exports = { TestWebpackPlugin }
