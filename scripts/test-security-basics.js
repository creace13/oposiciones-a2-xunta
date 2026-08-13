const fs = require('fs');
const path = require('path');
const assert = require('assert');
const crypto = require('crypto');

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
const bank = read('question-bank.js');
const publicBank = read(path.join('public', 'question-bank.js'));
const reviews = read('historical-reviews.js');
const publicReviews = read(path.join('public', 'historical-reviews.js'));
const appState = read('app-state.js');
const publicAppState = read(path.join('public', 'app-state.js'));
const dashboard = read('dashboard.js');
const publicDashboard = read(path.join('public', 'dashboard.js'));
const history = read('history.js');
const publicHistory = read(path.join('public', 'history.js'));
const practice = read('practice.js');
const publicPractice = read(path.join('public', 'practice.js'));
const simulation = read('simulation.js');
const publicSimulation = read(path.join('public', 'simulation.js'));
const uiSources = [indexHtml, app, dashboard, history, practice, simulation, appState].join('\n');
const bootstrap = read('bootstrap.js');
const publicBootstrap = read(path.join('public', 'bootstrap.js'));
const pkg = JSON.parse(read('package.json'));

assertNotIncludes(indexHtml, 'cdn.jsdelivr.net/npm/@supabase/supabase-js', 'El HTML raíz no debe cargar Supabase desde CDN si remoto está pausado.');
assertNotIncludes(publicIndexHtml, 'cdn.jsdelivr.net/npm/@supabase/supabase-js', 'El HTML público no debe cargar Supabase desde CDN si remoto está pausado.');
assertIncludes(app, 'const REMOTE_AUTH_ENABLED = false;', 'Las cuentas remotas deben permanecer pausadas explícitamente.');
assertNotIncludes(app, 'sb_publishable_', 'No debe exponerse clave pública de Supabase si el remoto está pausado.');
assertNotIncludes(app, 'supabase.co', 'No debe exponerse URL de Supabase si el remoto está pausado.');
assertNotIncludes(indexHtml, '<script>\n', 'El arranque no debe depender de un script ejecutable inline.');
assertNotIncludes(indexHtml, 'onclick=', 'El HTML no debe depender de controladores de eventos inline.');
assertNotIncludes(app, 'onclick=', 'La interfaz dinámica no debe crear controladores de eventos inline.');
assertNotIncludes(worker, "script-src 'self' 'unsafe-inline'", 'La CSP de scripts no debe permitir ejecución inline general.');
assertNotIncludes(headersFile, "script-src 'self' 'unsafe-inline'", 'La CSP pública no debe permitir ejecución inline general.');
assertNotIncludes(worker, "style-src 'self' 'unsafe-inline'", 'La CSP no debe permitir estilos inline generales.');
assertNotIncludes(headersFile, "style-src 'self' 'unsafe-inline'", 'La CSP pública no debe permitir estilos inline generales.');
assert.ok(!/\sstyle\s*=/.test(uiSources), 'La interfaz no debe crear atributos style inline.');
assertNotIncludes(uiSources, '.style.', 'La interfaz no debe escribir estilos inline mediante JavaScript.');
assertIncludes(indexHtml, 'bootstrap.js?v=1', 'El arranque temprano debe cargarse desde un archivo propio.');
assertIncludes(indexHtml, 'question-bank.js?v=', 'El banco debe cargarse desde un archivo propio.');
assertIncludes(indexHtml, 'historical-reviews.js?v=', 'Las ampliaciones históricas deben cargarse desde un archivo propio.');
assertIncludes(indexHtml, 'app-state.js?v=', 'El estado debe cargarse desde un archivo propio.');
assertIncludes(indexHtml, 'dashboard.js?v=', 'El panel debe cargarse desde un archivo propio.');
assertIncludes(indexHtml, 'history.js?v=', 'El historial debe cargarse desde un archivo propio.');
assertIncludes(indexHtml, 'practice.js?v=', 'La práctica debe cargarse desde un archivo propio.');
assertIncludes(indexHtml, 'simulation.js?v=', 'El simulacro debe cargarse desde un archivo propio.');
assert.strictEqual(publicBank, bank, 'El banco público debe coincidir con la raíz.');
assert.strictEqual(publicReviews, reviews, 'Las ampliaciones históricas públicas deben coincidir con la raíz.');
assert.strictEqual(publicAppState, appState, 'El estado público debe coincidir con la raíz.');
assert.strictEqual(publicDashboard, dashboard, 'El panel público debe coincidir con la raíz.');
assert.strictEqual(publicHistory, history, 'El historial público debe coincidir con la raíz.');
assert.strictEqual(publicPractice, practice, 'La práctica pública debe coincidir con la raíz.');
assert.strictEqual(publicSimulation, simulation, 'El simulacro público debe coincidir con la raíz.');
assertIncludes(bootstrap, "localStorage.getItem('opoA2LastView')", 'El arranque externo debe conservar la restauración de vista.');
assert.strictEqual(publicBootstrap, bootstrap, 'El arranque público debe coincidir con la raíz.');
const jsonLd = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(jsonLd, 'Faltan los datos estructurados JSON-LD.');
const jsonLdHash = crypto.createHash('sha256').update(jsonLd[1], 'utf8').digest('base64');
assertIncludes(headersFile, `'sha256-${jsonLdHash}'`, 'La CSP debe autorizar exclusivamente el JSON-LD inline por su hash actual.');
assertIncludes(worker, `'sha256-${jsonLdHash}'`, 'La CSP del worker debe autorizar exclusivamente el JSON-LD inline por su hash actual.');

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
