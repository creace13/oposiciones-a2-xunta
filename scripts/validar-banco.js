const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
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
    '\nglobalThis.auditQuestions = questions;' +
    '\nglobalThis.auditRows = coverageRows();' +
    '\nglobalThis.auditSources = officialSources;',
  context
);

const questions = context.auditQuestions;
const rows = context.auditRows;
const sources = context.auditSources;
const ids = questions.map(question => question.id);
const duplicatedIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
const incomplete = questions.filter(question =>
  !question.id ||
  !question.text ||
  !Array.isArray(question.options) ||
  question.options.length !== 4 ||
  !Number.isInteger(question.correct) ||
  question.correct < 0 ||
  question.correct > 3 ||
  !question.explanation ||
  !Array.isArray(question.whys) ||
  question.whys.length !== 4 ||
  !question.source ||
  !question.sourceUrl
);

const localSources = Object.entries(sources).filter(([, value]) => !/^https?:/i.test(value));
const missingLocalSources = localSources.filter(([, value]) => !fs.existsSync(path.join(root, value)));
const verified = questions.filter(question => question.quality?.startsWith('Verificada'));
const blockI = rows.filter(row => row.block === 'Bloque I').reduce((total, row) => total + row.current, 0);
const blockII = rows.filter(row => row.block === 'Bloque II').reduce((total, row) => total + row.current, 0);

console.log('VALIDACIÓN DEL BANCO');
console.log(`Preguntas totales: ${questions.length}`);
console.log(`Preguntas clasificadas: ${rows.reduce((total, row) => total + row.current, 0)}`);
console.log(`Bloque I: ${blockI}`);
console.log(`Bloque II: ${blockII}`);
console.log(`Verificadas sistemáticamente: ${verified.length}`);
console.log(`Preguntas incompletas: ${incomplete.length}`);
console.log(`Identificadores duplicados: ${duplicatedIds.length}`);
console.log(`Fuentes locales declaradas: ${localSources.length}`);
console.log(`Fuentes locales ausentes: ${missingLocalSources.length}`);

if (incomplete.length) console.log(`Incompletas: ${incomplete.map(question => question.id).join(', ')}`);
if (duplicatedIds.length) console.log(`Duplicadas: ${duplicatedIds.join(', ')}`);
if (missingLocalSources.length) console.log(`Fuentes ausentes: ${missingLocalSources.map(([key, value]) => `${key}=${value}`).join(', ')}`);

if (incomplete.length || duplicatedIds.length || missingLocalSources.length) process.exit(1);

console.log('RESULTADO: OK');

