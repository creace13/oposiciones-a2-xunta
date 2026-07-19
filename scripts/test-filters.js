const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const appPath = path.resolve(__dirname, '../app.js');
let code = fs.readFileSync(appPath, 'utf8');
code += '\nthis.questions = questions;\nthis.coverageTopic = coverageTopic;\n';

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

const categoryFilters = {
  procedimiento: q => {
    const c = coverageTopic(q);
    return ['Procedimiento administrativo común', 'Procedimiento administrativo', 'LPAC 39/2015', 'Ley 39/2015', 'Régimen jurídico del sector público'].includes(q.topic) || (c && ['g2-12', 'g2-13'].includes(c)) || q.id.startsWith('lpac-') || q.id.startsWith('procedimiento-');
  },
  galicia: q => {
    const c = coverageTopic(q);
    return ['Organización y sector público autonómico', 'Organización de Galicia', 'Ley 16/2010', 'Xunta y Presidencia', 'Valedor del Pueblo', 'Consejo Consultivo de Galicia'].includes(q.topic) || (c && ['g1-06', 'g1-08', 'g1-09'].includes(c)) || q.id.startsWith('organizacion-') || q.id.startsWith('xunta-') || q.id.startsWith('autonomia-');
  },
  empleo: q => {
    const c = coverageTopic(q);
    return (['Empleo público de Galicia', 'TREBEP', 'Ley 2/2015'].includes(q.topic) || (c && ['g2-18', 'g2-19'].includes(c)) || q.id.startsWith('trebep-') || q.id.startsWith('empleo-galicia-')) && !q.id.startsWith('igualdad-') && !q.id.startsWith('discapacidad-');
  }
};

console.log('--- TEST DE FILTROS TEMÁTICOS CON ASERCIONES ---');

// Test Galicia
const galiciaSet = questions.filter(categoryFilters.galicia);
console.log(`Filtro 'galicia': ${galiciaSet.length} preguntas.`);
for (const q of galiciaSet) {
  const c = coverageTopic(q);
  assert.strictEqual(c !== 'g1-10', true, `❌ ERROR: Pregunta ${q.id} de LJCA (g1-10) incluida en filtro galicia`);
  assert.strictEqual(q.id.includes('ljca'), false, `❌ ERROR: Pregunta ${q.id} de LJCA incluida en filtro galicia`);
}
assert.strictEqual(galiciaSet.length, 149, `❌ ERROR: Esperadas 149 preguntas en galicia, obtenidas ${galiciaSet.length}`);
console.log('✅ Filtro galicia: ASERCIONES PASADAS (149 preguntas puras de organización autonómica, 0 LJCA)');

// Test Empleo
const empleoSet = questions.filter(categoryFilters.empleo);
console.log(`Filtro 'empleo': ${empleoSet.length} preguntas.`);
for (const q of empleoSet) {
  assert.strictEqual(q.id.startsWith('igualdad-'), false, `❌ ERROR: Pregunta ${q.id} de igualdad incluida en empleo`);
  assert.strictEqual(q.id.startsWith('discapacidad-'), false, `❌ ERROR: Pregunta ${q.id} de discapacidad incluida en empleo`);
}
assert.strictEqual(empleoSet.length, 138, `❌ ERROR: Esperadas 138 preguntas en empleo, obtenidas ${empleoSet.length}`);
console.log('✅ Filtro empleo: ASERCIONES PASADAS (138 preguntas puras de TREBEP y Empleo Galicia, 0 igualdad/discapacidad)');

// Test Procedimiento
const procSet = questions.filter(categoryFilters.procedimiento);
console.log(`Filtro 'procedimiento': ${procSet.length} preguntas.`);
assert.strictEqual(procSet.length, 227, `❌ ERROR: Esperadas 227 preguntas en procedimiento, obtenidas ${procSet.length}`);
console.log('✅ Filtro procedimiento: ASERCIONES PASADAS (227 preguntas puras de procedimiento y régimen jurídico)');

console.log('\n✅ TODAS LAS ASERCIONES DE FILTROS PASADAS CON ÉXITO.');
