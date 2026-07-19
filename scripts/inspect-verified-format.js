const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const boundary = source.indexOf('const defaults');

const context = {};
vm.createContext(context);
vm.runInContext(
  source.slice(0, boundary) +
    '\nglobalThis.auditQuestions = questions;',
  context
);

const questions = context.auditQuestions;
const verified = questions.filter(q => q.quality && q.quality.startsWith('Verificada') && q.id.includes('constitucion'));

console.log('Ejemplos de preguntas verificadas (Constitución):');
verified.slice(0, 5).forEach(q => {
  console.log(`ID: ${q.id}`);
  console.log(`  Source: ${q.source}`);
  console.log(`  Quality: ${q.quality}`);
});
