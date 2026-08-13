const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const plan = read(path.join('docs', 'PLAN-MANTENIMIENTO-TECNICO.md'));
const headers = read('_headers');
const app = read('app.js');
const bank = read('question-bank.js');
const reviews = read('historical-reviews.js');
const engineModules = ['app-state.js', 'dashboard.js', 'history.js', 'practice.js', 'simulation.js'];

[
  'data/temario-a2-2025.json',
  'parse_questions.js',
  'scratch_pac.js',
  'assets/og-image.jpg',
  'docs/og-image.jpg',
  'og-image.png'
].forEach(relative => assert.ok(fs.existsSync(path.join(root, relative)), `El inventario menciona un archivo ausente: ${relative}`));

assert.ok(plan.includes('No se elimina nada automáticamente'), 'El plan debe impedir borrados automáticos de residuos.');
assert.ok(plan.includes('1.522 identificadores'), 'La separación futura debe proteger la integridad del banco.');
assert.ok(plan.includes('scripts inline: endurecimiento inmediato completado'), 'Debe registrarse el alcance exacto del endurecimiento CSP.');
assert.ok(plan.includes('requiere decisión del titular'), 'Las retiradas deben permanecer apartadas para decisión.');
assert.ok(!headers.includes("script-src 'self' 'unsafe-inline'"), 'La CSP no debe reabrir scripts inline generales.');
assert.ok(app.length < 100_000, 'El motor debe permanecer separado del banco de preguntas.');
assert.ok(bank.length > 2_000_000, 'El banco extraído debe conservar el volumen completo de datos.');
assert.ok(plan.includes('C11-02'), 'El plan debe registrar la extracción efectiva del banco.');
assert.ok(reviews.length > 200_000, 'Las ampliaciones históricas deben conservar su contenido completo.');
assert.ok(plan.includes('C11-03'), 'El plan debe registrar la extracción efectiva de las ampliaciones históricas.');
engineModules.forEach(relative => assert.ok(fs.existsSync(path.join(root, relative)), `Falta módulo funcional: ${relative}`));
assert.ok(plan.includes('C11-04'), 'El plan debe registrar la separación funcional por checkpoints.');
assert.ok(plan.includes('C11-05'), 'El plan debe registrar la retirada de estilos inline.');
assert.ok(!headers.includes("style-src 'self' 'unsafe-inline'"), 'La CSP no debe reabrir estilos inline generales.');

console.log('MANTENIMIENTO TÉCNICO POR PIEZAS');
console.log('Monolito, CSP y residuos clasificados sin borrados: OK');
console.log('RESULTADO: OK');
