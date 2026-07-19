const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const appPath = path.resolve(__dirname, '../app.js');
let code = fs.readFileSync(appPath, 'utf8');
code += '\nthis.questions = questions;\nthis.coverageTopic = coverageTopic;\nthis.filterQuestionsByCategory = filterQuestionsByCategory;\n';

const mockElement = {
  textContent: '',
  innerHTML: '',
  style: {},
  dataset: {},
  classList: { add: () => {}, remove: () => {} },
  addEventListener: () => {},
  querySelector: () => mockElement,
  querySelectorAll: () => []
};

const sandbox = {
  window: {
    location: { hash: '' },
    addEventListener: () => {}
  },
  document: {
    documentElement: { dataset: {} },
    getElementById: () => mockElement,
    querySelector: () => mockElement,
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  localStorage: {
    getItem: () => null,
    setItem: () => {}
  },
  console,
  setTimeout,
  clearTimeout
};

vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const questions = sandbox.questions;
const coverageTopic = sandbox.coverageTopic;
const filterQuestionsByCategory = sandbox.filterQuestionsByCategory;

assert.strictEqual(typeof filterQuestionsByCategory, 'function', '❌ ERROR: filterQuestionsByCategory no está definida en app.js');

console.log('--- TEST DE FILTROS TEMÁTICOS CON ASERCIONES (EJECUTANDO REAL filterQuestionsByCategory DE app.js) ---');

// Test Galicia
const galiciaSet = filterQuestionsByCategory('galicia', questions);
console.log(`Filtro 'galicia': ${galiciaSet.length} preguntas.`);
for (const q of galiciaSet) {
  const c = coverageTopic(q);
  assert.strictEqual(c !== 'g1-10', true, `❌ ERROR: Pregunta ${q.id} de LJCA (g1-10) incluida en filtro galicia`);
  assert.strictEqual(q.id.includes('ljca'), false, `❌ ERROR: Pregunta ${q.id} de LJCA incluida en filtro galicia`);
}
assert.strictEqual(galiciaSet.length, 149, `❌ ERROR: Esperadas 149 preguntas en galicia, obtenidas ${galiciaSet.length}`);
console.log('✅ Filtro galicia: ASERCIONES PASADAS (149 preguntas puras de organización autonómica, 0 LJCA)');

// Test Empleo
const empleoSet = filterQuestionsByCategory('empleo', questions);
console.log(`Filtro 'empleo': ${empleoSet.length} preguntas.`);
for (const q of empleoSet) {
  assert.strictEqual(q.id.startsWith('igualdad-'), false, `❌ ERROR: Pregunta ${q.id} de igualdad incluida en empleo`);
  assert.strictEqual(q.id.startsWith('discapacidad-'), false, `❌ ERROR: Pregunta ${q.id} de discapacidad incluida en empleo`);
}
assert.strictEqual(empleoSet.length, 138, `❌ ERROR: Esperadas 138 preguntas en empleo, obtenidas ${empleoSet.length}`);
console.log('✅ Filtro empleo: ASERCIONES PASADAS (138 preguntas puras de TREBEP y Empleo Galicia, 0 igualdad/discapacidad)');

// Test Procedimiento
const procSet = filterQuestionsByCategory('procedimiento', questions);
console.log(`Filtro 'procedimiento': ${procSet.length} preguntas.`);
assert.strictEqual(procSet.length, 227, `❌ ERROR: Esperadas 227 preguntas en procedimiento, obtenidas ${procSet.length}`);
console.log('✅ Filtro procedimiento: ASERCIONES PASADAS (227 preguntas puras de procedimiento y régimen jurídico)');

// Test de Regresión con preguntas sintéticas trampas
const syntheticQuestions = [
  { id: 'ljca-test-1', topic: 'Jurisdicción contencioso-administrativa', source: 'Ley 29/1998' },
  { id: 'igualdad-empleo-test-2', topic: 'Igualdad', source: 'Ley 7/2023' },
  { id: 'discapacidad-empleo-test-3', topic: 'Discapacidad', source: 'RDL 1/2013' }
];

const galiciaSynthetic = filterQuestionsByCategory('galicia', syntheticQuestions);
assert.strictEqual(galiciaSynthetic.length, 0, '❌ ERROR: La pregunta trampa de LJCA entró en el filtro galicia');

const empleoSynthetic = filterQuestionsByCategory('empleo', syntheticQuestions);
assert.strictEqual(empleoSynthetic.length, 0, '❌ ERROR: Las preguntas trampas de igualdad/discapacidad entraron en empleo');

console.log('✅ TEST SINTÉTICO DE REGRESIÓN: Preguntas trampas de LJCA e Igualdad excluidas correctamente.');
console.log('\n✅ TODAS LAS ASERCIONES DE FILTROS PASADAS CON ÉXITO SOBRE LA IMPLEMENTACIÓN REAL.');
