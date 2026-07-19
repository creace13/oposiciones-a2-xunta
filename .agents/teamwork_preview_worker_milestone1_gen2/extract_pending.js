const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const boundary = source.indexOf('const defaults');

if (boundary === -1) {
  console.error('ERROR: no se encontró el límite de carga de datos en app.js.');
  process.exit(1);
}

const context = {};
vm.createContext(context);
vm.runInContext(
  source.slice(0, boundary) +
    '\nglobalThis.auditQuestions = questions;',
  context
);

const questions = context.auditQuestions;
const targets = ['elecciones', 'valedor', 'consultivo', 'ljca'];

const filtered = questions.filter(q => {
  return targets.some(t => q.id.includes(t));
});

fs.writeFileSync(path.join(__dirname, 'pending_questions.json'), JSON.stringify(filtered, null, 2), 'utf8');
console.log(`Successfully wrote ${filtered.length} questions to pending_questions.json`);
