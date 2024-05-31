const fs = require('node:fs')
const path = require('node:path')
const { $ } = require('zx')
const { diffTxtOutputFileName } = require('./constant')

async function compareBranchesOrCommits(branchOrCommit1, branchOrCommit2) {
  try {
    // 获取 diff 输出
    const diff = await $`git diff ${branchOrCommit1} ${branchOrCommit2}`

    // 如果你想将 diff 输出保存到文件中，可以使用以下代码：
    await fs.writeFile(path.join(__dirname, diffTxtOutputFileName), diff.stdout, (error) => {
      console.error(error)
    })
  }
  catch (error) {
    console.error(`Error: ${error.message}`)
  }
}

module.exports = { compareBranchesOrCommits }
