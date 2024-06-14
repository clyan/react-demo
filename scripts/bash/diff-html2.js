const { exec } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const Diff2Html = require('diff2html')
const { Parser } = require('acorn')

const defaultParserOptions = {
  ranges: true,
  locations: true,
  ecmaVersion: 'latest',
  sourceType: 'module',
  allowAwaitOutsideFunction: true,
  onComment: null,
}

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

  const isNonEmptyObj = obj => JSON.stringify(obj) !== '{}'

  // const finalDiffJson = diffJson?.map((item) => {
  //   return {
  //     ...item,
  //     blocks: item.blocks?.map((block) => {
  //       const lines = []
  //       let tempLineObj = {}
  //       block.lines?.forEach((line, index) => {
  //         if (isNonEmptyObj(tempLineObj)) {
  //           if (tempLineObj.type !== line.type) {
  //             lines.push({ ...tempLineObj })
  //             tempLineObj = {}
  //           }
  //           else {
  //             // TODO：
  //             tempLineObj = {
  //               ...tempLineObj,
  //             }
  //           }
  //         }
  //         else {
  //           tempLineObj = {
  //             ...line,
  //             content: line.content?.slice(0),
  //           }
  //         }
  //       })
  //       return {
  //         ...block,
  //         lines: block.lines?.map((line) => {
  //           const content = 'import { useEffect, useRef, useState } from \'react\''
  //           return {
  //             ...line,
  //             content,
  //             contentAst: Parser.parse(content, { ...defaultParserOptions }),
  //           }
  //         }) ?? [],
  //       }
  //     }) ?? [],
  //   }
  // })

  // 将 JSON 格式的 diff 写入文件
  fs.writeFile(path.join(__dirname, 'diffOutput.json'), JSON.stringify(diffJson, null, 2), (err) => {
    if (err) {
      console.error(`写入文件时发生错误: ${err}`)
      return
    }
    console.log('git diff 的输出已转换为 JSON 格式并写入 diffOutput.json 文件')
  })
})
