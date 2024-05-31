const path = require('node:path')
const { compareBranchesOrCommits } = require('./git-diff')
const { parseDiff } = require('./analysis-diff')
const { diffJsonOutputFileName, diffTxtOutputFileName } = require('./constant')
const { argv } = process

// 默认分支
const DEFAULT_BRANCH1 = 'main'
const DEFAULT_BRANCH2 = 'develop'

// 获取传入的参数
const branchOrCommit1 = argv[2] || DEFAULT_BRANCH1
const branchOrCommit2 = argv[3] || DEFAULT_BRANCH2

async function main() {
  await compareBranchesOrCommits(branchOrCommit1, branchOrCommit2)
  await parseDiff(path.join(__dirname, diffTxtOutputFileName), path.join(__dirname, diffJsonOutputFileName))
}

main()
