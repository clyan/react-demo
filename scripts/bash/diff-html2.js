const { exec } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const Diff2Html = require('diff2html')

// 运行 git diff 命令
exec('git diff  dbe0af4a7be2b9e7a6849ecdc836eaa2d7ff6eda 58bdf86b858871b37d1a6728d3d28825bd7d4f0a', (error, stdout) => {
  if (error) {
    console.error(`执行 git diff 时发生错误: ${error}`)
    return
  }
  fs.writeFile(path.join(__dirname, 'diff_output.txt'), stdout, (err) => {
    if (err)
      console.error(`写入文件时发生错误: ${err}`)
  })
  // 使用 diff2html 解析 git diff 的输出
  const diffJson = Diff2Html.parse(stdout)

  // 将 JSON 格式的 diff 写入文件
  fs.writeFile(path.join(__dirname, 'diffOutput.json'), JSON.stringify(diffJson, null, 2), (err) => {
    if (err) {
      console.error(`写入文件时发生错误: ${err}`)
      return
    }
    console.log('git diff 的输出已转换为 JSON 格式并写入 diffOutput.json 文件')
  })
})
