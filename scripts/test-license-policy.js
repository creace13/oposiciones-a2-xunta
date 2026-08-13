const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const read = relativePath => fs.readFileSync(path.join(root, relativePath), 'utf8');

const license = read('LICENSE');
const readme = read('README.md');
const contributing = read('CONTRIBUTING.md');
const guide = read(path.join('docs', 'LICENCIAS-Y-DERECHOS.md'));
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));

assert.ok(license.includes('PolyForm Noncommercial License 1.0.0'), 'Falta licencia no comercial específica para el código.');
assert.ok(license.includes('CC BY-NC-SA 4.0'), 'Falta licencia diferenciada para contenido original.');
assert.ok(license.includes('Materiales oficiales y de terceros'), 'Falta excluir materiales oficiales y ajenos.');
assert.ok(/autorización separada, previa y por\s+escrito/.test(license), 'Falta reservar la licencia comercial al titular.');

[readme, contributing, guide].forEach((content, index) => {
  assert.ok(content.includes('PolyForm Noncommercial'), `Documento ${index} no refleja la licencia del código.`);
  assert.ok(content.includes('CC BY-NC-SA'), `Documento ${index} no refleja la licencia del contenido.`);
});

assert.ok(!readme.includes('Non-Commercial Open Source'), 'README conserva una denominación Open Source incompatible.');
assert.ok(!readme.includes('Este proyecto es Open Source'), 'README conserva una afirmación Open Source incompatible.');
assert.ok(!contributing.includes('proyecto Open Source'), 'CONTRIBUTING conserva una afirmación Open Source incompatible.');
assert.strictEqual(pkg.license, 'SEE LICENSE IN LICENSE', 'package.json debe remitir al reparto de licencias.');
assert.strictEqual(lock.packages[''].license, pkg.license, 'package-lock debe reflejar el mismo reparto de licencias.');

console.log('LICENCIAS Y DERECHOS');
console.log('Código, contenido original, materiales oficiales y uso comercial separados.');
console.log('RESULTADO: OK');
