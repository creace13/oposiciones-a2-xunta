const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { readBankSource } = require('./runtime-source');

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((result, key) => {
        result[key] = canonicalize(value[key]);
        return result;
      }, {});
  }
  return value;
}

function sha256(value) {
  const canonical = JSON.stringify(canonicalize(value));
  return crypto.createHash('sha256').update(canonical, 'utf8').digest('hex');
}

function loadBank(root) {
  const source = readBankSource(root);

  const context = {};
  vm.createContext(context);
  vm.runInContext(
    source
      + '\nglobalThis.auditQuestions = questions;'
      + '\nglobalThis.auditSources = officialSources;'
      + '\nglobalThis.auditRows = coverageRows();',
    context
  );

  return {
    questions: context.auditQuestions,
    sources: context.auditSources,
    rows: context.auditRows
  };
}

function createSnapshot(root) {
  const { questions, sources, rows } = loadBank(root);
  const historical = questions.filter(question => /^h\d{4}-/.test(question.id));
  const classified = questions.length - historical.length;
  const blockI = rows.filter(row => row.block === 'Bloque I').reduce((sum, row) => sum + row.current, 0);
  const blockII = rows.filter(row => row.block === 'Bloque II').reduce((sum, row) => sum + row.current, 0);

  return {
    schemaVersion: 1,
    questionCount: questions.length,
    classifiedCount: classified,
    historicalCount: historical.length,
    topicCount: rows.length,
    blockI,
    blockII,
    hashes: {
      fullBank: sha256(questions),
      identityAndOrder: sha256(questions.map(question => question.id)),
      promptsAndOptions: sha256(questions.map(({ id, text, options }) => ({ id, text, options }))),
      answers: sha256(questions.map(({ id, correct }) => ({ id, correct }))),
      sources: sha256(questions.map(({ id, source, sourceUrl }) => ({ id, source, sourceUrl }))),
      explanations: sha256(questions.map(({ id, explanation, whys, quality }) => ({ id, explanation, whys, quality }))),
      officialSources: sha256(sources)
    }
  };
}

module.exports = { createSnapshot };
