const fs = require('fs');
const path = require('path');
const assert = require('assert');

const root = path.resolve(__dirname, '..');

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function assertIncludes(file, needle, message) {
  assert.ok(file.includes(needle), message);
}

function assertNotIncludes(file, needle, message) {
  assert.ok(!file.includes(needle), message);
}

const indexHtml = read('index.html');
const publicIndexHtml = read(path.join('public', 'index.html'));
const worker = read('index.js');
const headersFile = read('_headers');
const app = read('app.js');
const pkg = JSON.parse(read('package.json'));

assertNotIncludes(indexHtml, 'cdn.jsdelivr.net/npm/@supabase/supabase-js', 'El HTML raíz no debe cargar Supabase desde CDN si remoto está pausado.');
assertNotIncludes(publicIndexHtml, 'cdn.jsdelivr.net/npm/@supabase/supabase-js', 'El HTML público no debe cargar Supabase desde CDN si remoto está pausado.');
assertIncludes(app, 'const REMOTE_AUTH_ENABLED = false;', 'Las cuentas remotas deben permanecer pausadas explícitamente.');
assertNotIncludes(app, 'sb_publishable_', 'No debe exponerse clave pública de Supabase si el remoto está pausado.');
assertNotIncludes(app, 'supabase.co', 'No debe exponerse URL de Supabase si el remoto está pausado.');

[
  'Content-Security-Policy',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'X-Frame-Options',
  'Permissions-Policy',
  'Strict-Transport-Security',
  'Cross-Origin-Opener-Policy'
].forEach(header => assertIncludes(worker, header, `Falta cabecera de seguridad: ${header}`));

[
  'Content-Security-Policy',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'X-Frame-Options',
  'Permissions-Policy',
  'Strict-Transport-Security',
  'Cross-Origin-Opener-Policy'
].forEach(header => assertIncludes(headersFile, header, `Falta cabecera de seguridad en _headers: ${header}`));

[
  "default-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "connect-src 'self'"
].forEach(rule => assertIncludes(worker, rule, `Falta regla CSP básica: ${rule}`));

assert.deepStrictEqual(pkg.dependencies || {}, {}, 'No debe haber dependencias de producción no auditadas.');

[
  'SERVICE_ROLE',
  'service_role',
  'supabase_service',
  'JWT_SECRET',
  'PRIVATE_KEY'
].forEach(secretMarker => assertNotIncludes(app, secretMarker, `Posible secreto o marcador sensible expuesto: ${secretMarker}`));

console.log('✅ Seguridad básica OK: sin CDN Supabase activo, remoto pausado, cabeceras mínimas y sin dependencias de producción.');
