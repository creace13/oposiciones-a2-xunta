const fs = require('fs');
const path = require('path');

function readSource(root, fileName) {
  return fs.readFileSync(path.join(root, fileName), 'utf8');
}

function readBankSource(root) {
  return readSource(root, 'question-bank.js');
}

function readRuntimeSource(root) {
  return `${readBankSource(root)}\n${readSource(root, 'app.js')}`;
}

module.exports = { readBankSource, readRuntimeSource };
