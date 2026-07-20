const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const styles = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const dom = new JSDOM(html);
const { document } = dom.window;

function luminance(hex) {
  const rgb = hex.replace('#', '').match(/.{2}/g).map(value => parseInt(value, 16) / 255);
  const linear = rgb.map(value => (value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(a, b) {
  const first = luminance(a);
  const second = luminance(b);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function cssVar(name) {
  const match = styles.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  assert(match, `❌ No se encontró la variable CSS --${name}`);
  return match[1];
}

console.log('--- TEST DE ACCESIBILIDAD BÁSICA ---');

const navLinks = [...document.querySelectorAll('.nav-link')];
assert(navLinks.length >= 7, '❌ No se encontraron todos los enlaces de navegación principal');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
assert(mobileMenuToggle, '❌ Falta el botón de menú móvil');
assert.strictEqual(mobileMenuToggle.getAttribute('aria-expanded'), 'false', '❌ El menú móvil debe comenzar cerrado');
assert(sidebarOverlay, '❌ Falta la capa de cierre del menú móvil');
assert.strictEqual(
  document.querySelectorAll('.nav-link[aria-current="page"]').length,
  1,
  '❌ Debe existir un único enlace de navegación marcado como página actual'
);

for (const link of navLinks) {
  const icon = link.querySelector('span');
  assert(icon, `❌ El enlace ${link.textContent.trim()} no conserva su icono decorativo`);
  assert.strictEqual(icon.getAttribute('aria-hidden'), 'true', `❌ Icono decorativo no oculto en ${link.textContent.trim()}`);
}
console.log('  PASADO: Navegación principal con iconos decorativos ocultos y página actual.');

const requiredDialogs = ['pauseDialog', 'goalDialog', 'authDialog', 'resetPasswordModal', 'privacyModal'];
for (const id of requiredDialogs) {
  const dialog = document.getElementById(id);
  assert(dialog, `❌ Falta el diálogo ${id}`);
  const labelledBy = dialog.getAttribute('aria-labelledby');
  assert(labelledBy, `❌ El diálogo ${id} no tiene aria-labelledby`);
  assert(document.getElementById(labelledBy), `❌ aria-labelledby de ${id} apunta a un id inexistente`);
}
console.log('  PASADO: Diálogos principales con nombre accesible.');

for (const id of ['pauseDialog', 'authDialog', 'resetPasswordModal', 'privacyModal']) {
  const dialog = document.getElementById(id);
  const describedBy = dialog.getAttribute('aria-describedby');
  assert(describedBy, `❌ El diálogo ${id} no tiene aria-describedby`);
  assert(document.getElementById(describedBy), `❌ aria-describedby de ${id} apunta a un id inexistente`);
}
console.log('  PASADO: Diálogos informativos con descripción accesible.');

assert(
  app.includes("setAttribute('aria-current', 'page')") && app.includes("removeAttribute('aria-current')"),
  '❌ showView no actualiza aria-current al cambiar de sección'
);
console.log('  PASADO: showView actualiza aria-current dinámicamente.');

assert(styles.includes(':focus-visible'), '❌ No hay estilos de foco visible para teclado');
console.log('  PASADO: Existe foco visible para navegación por teclado.');

assert(
  contrastRatio(cssVar('muted'), cssVar('cream')) >= 4.5,
  '❌ El texto secundario sobre fondo crema no alcanza contraste AA 4.5:1'
);
assert(
  contrastRatio(cssVar('pine'), cssVar('paper')) >= 4.5,
  '❌ El texto principal sobre papel no alcanza contraste AA 4.5:1'
);
console.log('  PASADO: Contraste básico AA en colores principales.');

console.log('\n✅ TEST DE ACCESIBILIDAD BÁSICA PASADO CON ÉXITO.');
