const fs = require('node:fs')
const path = require('node:path')
const { $ } = require('zx')

async function main() {
  const txtFilePath = path.join(__dirname, './diff.txt')
  const txt = fs.readFileSync(txtFilePath)
}

main()
