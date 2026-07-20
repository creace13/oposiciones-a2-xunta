const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function parseJson(relativePath) {
  return JSON.parse(read(relativePath));
}

const pkg = parseJson('package.json');
const lock = parseJson('package-lock.json');
const indexHtml = read('index.html');
const publicIndexHtml = read(path.join('public', 'index.html'));
const readme = read('README.md');
const manifest = parseJson('manifest.json');
const publicManifest = parseJson(path.join('public', 'manifest.json'));
const acceptance = read(path.join('docs', 'ACEPTACION-VERSION-1.2.0.md'));
const queue = read(path.join('.ia', 'COLA-ACTIVA.md'));

assert.strictEqual(pkg.version, '1.2.0', 'package.json debe declarar la versión estable 1.2.0.');
assert.strictEqual(lock.version, '1.2.0', 'package-lock.json debe declarar la versión estable 1.2.0.');
assert.strictEqual(lock.packages[''].version, '1.2.0', 'package-lock debe alinear el paquete raíz a 1.2.0.');

[
  indexHtml,
  publicIndexHtml,
  readme
].forEach((content, index) => {
  assert.ok(content.includes('1.2.0'), `Falta 1.2.0 en documento de salida ${index}.`);
  assert.ok(!content.includes('Versión 1.2 candidata'), `Sigue apareciendo etiqueta candidata en documento de salida ${index}.`);
});

assert.ok(indexHtml.includes('v22-feedback-20260720'), 'index.html debe usar el identificador de caché vigente.');
assert.ok(publicIndexHtml.includes('v22-feedback-20260720'), 'public/index.html debe usar el identificador de caché vigente.');
assert.ok(readme.includes('estable local'), 'README debe declarar claramente la estabilidad local.');
assert.ok(readme.includes('No es una academia'), 'README debe aclarar que la app no sustituye una academia.');
assert.ok(readme.includes('asesoramiento jurídico profesional'), 'README debe aclarar que la app no sustituye asesoramiento jurídico profesional.');
assert.ok(indexHtml.includes('No es academia, temario oficial ni asesoramiento jurídico'), 'La web debe mostrar límites de uso responsables.');
assert.ok(indexHtml.includes('Política de Privacidad y Protección de Datos'), 'La web debe enlazar privacidad.');
assert.ok(indexHtml.includes('No es academia, temario oficial, fuente oficial ni asesoramiento jurídico'), 'Privacidad debe repetir los límites de uso responsables.');

assert.ok(
  manifest.description.includes('clasificadas en revisión continua'),
  'manifest.json debe evitar prometer verificación jurídica absoluta.'
);
assert.deepStrictEqual(publicManifest, manifest, 'public/manifest.json debe estar sincronizado con manifest.json.');

assert.ok(acceptance.includes('Versión aceptada como **1.2.0 estable local**'), 'Falta dictamen de aceptación final.');
assert.ok(queue.includes('| **C02-09** | P1'), 'La cola debe conservar C02-09.');
assert.ok(queue.includes('`BLOQUEADO`'), 'C02-09 debe seguir documentado como bloqueo externo.');

console.log('ACEPTACIÓN FINAL');
console.log('Versión: 1.2.0 estable local');
console.log('C02-09: bloqueo externo documentado');
console.log('RESULTADO: OK');
