const fs = require('fs');
const path = require('path');

function readSource(root, fileName) {
  return fs.readFileSync(path.join(root, fileName), 'utf8');
}

function readBankSource(root) {
  return `${readSource(root, 'question-bank.js')}\n${readSource(root, 'historical-reviews.js')}`;
}

function readRuntimeSource(root) {
  return `${readBankSource(root)}\n${readSource(root, 'app.js')}`;
}

module.exports = { readBankSource, readRuntimeSource };
