const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const tracked = execSync('git ls-files', { cwd: root, encoding: 'utf8' })
  .split(/\r?\n/)
  .filter(Boolean)
  .map(file => file.replace(/\\/g, '/'));

[
  'Links_gestores.txt',
  'docs/psw_ddbb.txt',
  '.wrangler',
  '.env',
  'tmp/',
  'scratch/',
  'node_modules/',
  'test-results/'
].forEach(forbidden => {
  assert.ok(
    !tracked.some(file => file === forbidden || file.startsWith(forbidden)),
    `Archivo o carpeta privada/no publicable versionada: ${forbidden}`
  );
});

const gitignore = read('.gitignore');
[
  '.wrangler/',
  '.env',
  '.env.*',
  'Links_gestores.txt',
  'docs/psw_ddbb.txt'
].forEach(rule => {
  assert.ok(gitignore.includes(rule), `Falta regla de privacidad en .gitignore: ${rule}`);
});

const exposureDoc = read(path.join('docs', 'EXPOSICION-GITHUB.md'));
assert.ok(exposureDoc.includes('Qué no debe subirse nunca'), 'Falta política de no publicación.');
assert.ok(exposureDoc.includes('Tokens de Cloudflare'), 'Falta mención a tokens.');
assert.ok(exposureDoc.includes('GitHub Issues'), 'Falta canal de erratas.');

const issueTemplate = read(path.join('.github', 'ISSUE_TEMPLATE', 'errata.md'));
assert.ok(issueTemplate.includes('No incluyas datos personales'), 'La plantilla de erratas debe prohibir datos personales.');
assert.ok(issueTemplate.includes('ID de pregunta'), 'La plantilla debe pedir ID de pregunta.');

const indexHtml = read('index.html');
const app = read('app.js');
assert.ok(indexHtml.includes('feedbackDialog'), 'La app debe incluir diálogo de reporte.');
assert.ok(app.includes('github.com/creace13/oposiciones-a2-xunta/issues/new'), 'El feedback debe abrir GitHub Issues.');
assert.ok(app.includes('No incluyas datos personales'), 'El flujo de feedback debe recordar no incluir datos personales.');

console.log('EXPOSICIÓN PÚBLICA / GITHUB');
console.log('Archivos privados no versionados y canal de erratas configurado.');
console.log('RESULTADO: OK');

