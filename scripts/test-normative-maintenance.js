const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const source = read('app.js');
const boundary = source.indexOf('const defaults');

assert.notStrictEqual(boundary, -1, 'No se encontró el límite de carga de datos en app.js.');

const context = {};
vm.createContext(context);
vm.runInContext(
  source.slice(0, boundary) +
    '\nglobalThis.auditQuestions = questions;' +
    '\nglobalThis.auditSources = officialSources;',
  context
);

const questions = context.auditQuestions;
const officialSources = context.auditSources;
const maintenanceDoc = read(path.join('docs', 'MANTENIMIENTO-NORMATIVO.md'));
const officialSourcesDoc = read(path.join('docs', 'FUENTES_OFICIALES.md'));

[
  'Responsable',
  'Cadencia de revisión',
  'Estados de una fuente o pregunta',
  'Protocolo ante una norma modificada',
  'Retirada segura de preguntas',
  'Simulación de control'
].forEach(section => {
  assert.ok(maintenanceDoc.includes(section), `Falta sección obligatoria en mantenimiento normativo: ${section}`);
});

assert.ok(
  officialSourcesDoc.includes('Regla de publicación de preguntas'),
  'FUENTES_OFICIALES.md debe mantener la regla de publicación de preguntas.'
);

const sourceUsage = questions.reduce((accumulator, question) => {
  accumulator.set(question.sourceUrl, (accumulator.get(question.sourceUrl) || 0) + 1);
  return accumulator;
}, new Map());

assert.ok(questions.length >= 1500, 'La prueba normativa debe ejecutarse sobre el banco completo.');
assert.ok(sourceUsage.size >= 20, 'El inventario debe reconocer un conjunto amplio de fuentes normativas.');

const missingSourceFields = questions.filter(question => !question.source || !question.sourceUrl);
assert.strictEqual(missingSourceFields.length, 0, 'Todas las preguntas deben conservar fuente y sourceUrl.');

Object.entries(officialSources)
  .filter(([, value]) => !/^https?:/i.test(value))
  .forEach(([key, value]) => {
    assert.ok(fs.existsSync(path.join(root, value)), `Fuente local ausente en officialSources.${key}: ${value}`);
  });

const simulatedChangedSource = officialSources.law39;
assert.ok(simulatedChangedSource, 'Debe existir officialSources.law39 para simular una modificación normativa.');

const affectedBySimulation = questions.filter(question =>
  question.sourceUrl === simulatedChangedSource ||
  /Ley 39\/2015/i.test(question.source || '') ||
  /Ley 39\/2015/i.test(question.explanation || '')
);

assert.ok(
  affectedBySimulation.length > 0,
  'La simulación de cambio normativo debe localizar preguntas afectadas.'
);

const incompleteAffected = affectedBySimulation.filter(question =>
  !question.id ||
  !question.text ||
  !question.source ||
  !question.sourceUrl ||
  !question.explanation ||
  !Array.isArray(question.whys) ||
  question.whys.length !== 4
);

assert.strictEqual(
  incompleteAffected.length,
  0,
  `Preguntas afectadas incompletas en simulación: ${incompleteAffected.map(question => question.id).join(', ')}`
);

const simulationPlan = {
  norma: 'Ley 39/2015',
  fuente: simulatedChangedSource,
  estadoInicial: 'EN_REVISION',
  accion: 'Revisar artículos citados, corregir si cambia la respuesta y retirar temporalmente las preguntas ambiguas.',
  preguntasAfectadas: affectedBySimulation.map(question => question.id)
};

assert.strictEqual(simulationPlan.estadoInicial, 'EN_REVISION');
assert.ok(simulationPlan.preguntasAfectadas.length === affectedBySimulation.length);

console.log('MANTENIMIENTO NORMATIVO');
console.log(`Fuentes usadas por el banco: ${sourceUsage.size}`);
console.log(`Simulación: ${simulationPlan.norma} -> ${simulationPlan.preguntasAfectadas.length} preguntas en revisión.`);
console.log(`Primeros IDs afectados: ${simulationPlan.preguntasAfectadas.slice(0, 8).join(', ')}`);
console.log('RESULTADO: OK');

