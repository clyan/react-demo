const fs = require('node:fs')
const path = require('node:path')
const { $ } = require('zx')

function analysisDiff(txt) {
  const splitByFileRegx = /diff --git a\/(.+) b\/(.+)/g
  const splitByFileRegxText = txt.split(splitByFileRegx)
  const match = txt.match(splitByFileRegx)
  splitByFileRegxText.forEach((element, i) => {
    const txtFilePath = path.join(__dirname, `./${i}.txt`)
    fs.writeFileSync(txtFilePath, element)
  })
}

async function main() {
  const tempBranch = await $`git branch --show-current`
  const branch = tempBranch.stdout.replace('\n', '')
  console.log(branch)

  const tempDiffText = await $`git diff dbe0af4a7be2b9e7a6849ecdc836eaa2d7ff6eda 58bdf86b858871b37d1a6728d3d28825bd7d4f0a`
  const diffText = tempDiffText.stdout
  const txtFilePath = path.join(__dirname, './diff.txt')
  fs.writeFileSync(txtFilePath, diffText)
  analysisDiff(diffText)
}

main()
