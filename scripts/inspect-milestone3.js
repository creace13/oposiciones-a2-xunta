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
    '\nglobalThis.auditQuestions = questions;' +
    '\nglobalThis.auditRows = coverageRows();' +
    '\nglobalThis.auditSources = officialSources;',
  context
);

const questions = context.auditQuestions;

const targets = [
  'documentos/troncal/galicia/ley-6-2023-patrimonio-galicia.html',
  'documentos/troncal/galicia/decreto-legislativo-1-1999-regimen-financiero.html',
  'documentos/troncal/galicia/ley-9-2007-subvenciones-galicia.html'
];

const filtered = questions.filter(q => targets.includes(q.sourceUrl));

// Write to agents directory
const outputPath = path.join(
  'f:\\05_Proyectos [Aplicaciones]\\Oposicion [App] --Gemini',
  '.agents',
  'teamwork_preview_worker_milestone3',
  'milestone3_questions.json'
);

fs.writeFileSync(outputPath, JSON.stringify(filtered, null, 2), 'utf8');
console.log(`Saved ${filtered.length} questions to ${outputPath}`);
