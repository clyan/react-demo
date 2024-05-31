const fs = require('node:fs').promises
const nearley = require('nearley')
const diffGrammar = require('./diff.js') // 编译后的 diff.ne 文件
async function parseDiff(inputFilePath, outputFilePath) {
  try {
    // 读取 diff 文件内容
    const diffText = await fs.readFile(inputFilePath, 'utf-8')

    // 创建解析器并解析 diff 内容
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(diffGrammar))
    parser.feed(diffText)

    if (parser.results.length > 1)
      console.warn('Warning: Ambiguous parse results.')

    const result = parser.results[0]

    // 将解析结果保存到文件
    await fs.writeFile(outputFilePath, JSON.stringify(result, null, 2))
    console.log(`Parsed JSON has been saved to ${outputFilePath}`)
  }
  catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

module.exports = { parseDiff }
