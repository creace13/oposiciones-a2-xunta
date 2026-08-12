const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const agents = read('AGENTS.md');
const protocol = read(path.join('.ia', 'PROTOCOLO.md'));
const resume = read(path.join('.ia', 'REANUDACION-RAPIDA.md'));
const state = read(path.join('.ia', 'ESTADO-PROYECTO.md'));
const queue = read(path.join('.ia', 'COLA-ACTIVA.md'));
const legalGuide = read(path.join('docs', 'GUIA-ACTUALIZACION-LEGAL.md'));
const continuityGuide = read(path.join('docs', 'CONTINUIDAD-DEL-PROYECTO.md'));
const maintenanceGuide = read(path.join('docs', 'MANTENIMIENTO-NORMATIVO.md'));
const gitignore = read('.gitignore');

[
  '.ia/PROTOCOLO.md',
  '.ia/REANUDACION-RAPIDA.md',
  '.ia/ESTADO-PROYECTO.md',
  '.ia/COLA-ACTIVA.md'
].forEach(reference => {
  assert.ok(
    agents.includes(reference),
    `AGENTS.md debe conducir a la memoria canónica: ${reference}`
  );
});

assert.ok(protocol.includes('.ia/REANUDACION-RAPIDA.md'), 'El protocolo debe incluir el mapa de reanudación.');
assert.ok(resume.includes('No asumir que la memoria del chat es completa'), 'Falta la regla de reconstrucción independiente del chat.');
assert.ok(resume.includes('4f19c03'), 'La fotografía de reentrada debe conservar el último checkpoint anterior a C09.');
assert.ok(state.includes('4f19c03'), 'El estado canónico debe conservar el cierre de C07.');

const inProgressItems = queue
  .split(/\r?\n/)
  .filter(line => /^\| \*\*C\d{2}-\d{2}\*\*/.test(line) && line.includes('`EN CURSO`'));
assert.ok(inProgressItems.length <= 1, 'La cola no puede contener más de una tarea EN CURSO.');
assert.ok(queue.includes('C09-01'), 'C09-01 debe estar registrado en la cola activa.');

[
  'Lo único que necesita hacer la persona titular',
  'Qué hace Codex después del aviso',
  'Cómo se evita revisar las 1.522 preguntas',
  'Qué ocurre con una pregunta dudosa',
  'Límite de seguridad'
].forEach(section => {
  assert.ok(legalGuide.includes(section), `Falta una sección humana de actualización legal: ${section}`);
});

assert.ok(maintenanceGuide.includes('GUIA-ACTUALIZACION-LEGAL.md'), 'El manual técnico debe enlazar la guía humana.');
assert.ok(continuityGuide.includes('Si se elimina o cambia el chat'), 'La continuidad debe explicar la pérdida del chat.');
assert.ok(continuityGuide.includes('Si se borra toda la carpeta o falla el equipo'), 'La continuidad debe explicar la pérdida de la carpeta.');
assert.ok(continuityGuide.includes('no se publican en el repositorio público'), 'Debe explicarse el límite del respaldo público.');

['.ia/', '.agents/', 'AGENTS.md'].forEach(privatePath => {
  assert.ok(gitignore.includes(privatePath), `La memoria privada debe seguir protegida: ${privatePath}`);
});

console.log('CONTINUIDAD DEL PROYECTO');
console.log('Entrada automática, memoria canónica, guía legal y límites de recuperación: OK');
console.log('Cola protegida contra tareas simultáneas: OK');
console.log('RESULTADO: OK');
