@{%
const moo = require("moo");

const lexer = moo.compile({
  ws: /[ \t]+/,
  newline: { match: /\n/, lineBreaks: true },
  diffStart: "diff --git",
  deleted: "-",
  added: "+",
  range: /@@\s*-[\d,]+ \+[\d,]+\s*@@/,
  filename: /[ab]\/[\w\/.-]+/,
  mode: /[0-7]{6}/,
  hash: /[a-f0-9]{7}/,
  changeType: /modified|added|deleted|renamed/,
  text: /[-+].*/,
});
%}

@lexer lexer

Diff -> DiffHeader FileName ModeInfo ChangeInfo {% ([header, file, mode, changes]) => ({ header, file, mode, changes }) %}

DiffHeader -> diffStart FileName FileName IndexLine

FileName -> filename

IndexLine -> hash ".." hash mode

ModeInfo -> mode mode

ChangeInfo -> "-" range text+ {% ([_, range, text]) => ({ type: "-", range, text }) %}
ChangeInfo -> "+" range text+ {% ([_, range, text]) => ({ type: "+", range, text }) %}
ChangeInfo -> deleted range text+ {% ([_, range, text]) => ({ type: "deleted", range, text }) %}
ChangeInfo -> added range text+ {% ([_, range, text]) => ({ type: "added", range, text }) %}
ChangeInfo -> changeType range text+ {% ([type, range, text]) => ({ type: type[0], range, text }) %}