const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const plan = read(path.join('docs', 'PLAN-MANTENIMIENTO-TECNICO.md'));
const headers = read('_headers');
const app = read('app.js');

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
assert.ok(app.length > 2_000_000, 'Si el monolito ya fue dividido, este plan y su prueba deben actualizarse.');

console.log('MANTENIMIENTO TÉCNICO POR PIEZAS');
console.log('Monolito, CSP y residuos clasificados sin borrados: OK');
console.log('RESULTADO: OK');
