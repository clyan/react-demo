const { declare } = require('@babel/helper-plugin-utils')
const types = require('@babel/types')

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`)

module.exports = declare((api, options, dirname) => {
  return {
    visitor: {
      CallExpression(path, state) {
        // 给console加上行号
        const calleeName = path.get('callee').toString()
        if (
          targetCalleeName.includes(calleeName)
        ) {
          const { line, column } = path.node.loc.start
          path.node.arguments.unshift(types.stringLiteral(`filename: (${line}, ${column})`))
        }
      },
    },
  }
})
