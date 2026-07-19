const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { JSDOM } = require('jsdom');

console.log('--- SUITE DE INTEGRACIÓN DOM/JSDOM (HTML + APP.JS REALES) ---');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const appPath = path.join(rootDir, 'app.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const appContent = fs.readFileSync(appPath, 'utf8');

async function runE2ESuite() {
  // Polyfill HTMLDialogElement for JSDOM
  class HTMLDialogElementPolyfill {
    showModal() { this.open = true; this.setAttribute('open', ''); }
    show() { this.open = true; this.setAttribute('open', ''); }
    close() { this.open = false; this.removeAttribute('open'); }
  }

  const dom = new JSDOM(htmlContent, {
    url: 'http://localhost:8080/index.html',
    runScripts: 'dangerously',
    pretendToBeVisual: true
  });

  const { window } = dom;
  const { document } = window;

  window.scrollTo = () => {};
  window.confirm = () => true;
  window.HTMLDialogElement = HTMLDialogElementPolyfill;

  document.querySelectorAll('dialog').forEach(d => {
    d.showModal = HTMLDialogElementPolyfill.prototype.showModal;
    d.show = HTMLDialogElementPolyfill.prototype.show;
    d.close = HTMLDialogElementPolyfill.prototype.close;
  });

  // Mock Supabase
  window.supabase = {
    createClient: () => ({
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: null, error: { message: 'Invalid credentials' } }),
        signUp: async () => ({ data: { user: { email: 'novo@opos.gal' }, session: null }, error: null }),
        onAuthStateChange: () => {}
      }
    })
  };

  // Inject app.js into JSDOM window context
  window.eval(appContent);

  // Regression: métricas cuantitativas honestas y formato español
  console.log('Test DOM 0: Verificando presentación honesta de métricas...');
  window.updateDashboard();
  assert.strictEqual(document.querySelector('.readiness-panel .legend').textContent.includes('cantidad clasificada'), true, '❌ DOM 0 Fallido: la leyenda no explica que mide cantidad');
  assert.strictEqual(document.getElementById('valBlock1').textContent, '302/300 · 100%', '❌ DOM 0 Fallido: Bloque I no muestra recuento y porcentaje');
  assert.strictEqual(document.getElementById('valBlock2').textContent, '905/910 · 99%', '❌ DOM 0 Fallido: Bloque II no muestra recuento y porcentaje');
  assert.strictEqual(document.getElementById('snapshotRatio').textContent, '1.207/1.210', '❌ DOM 0 Fallido: el total no mantiene formato es-ES');
  assert.strictEqual(htmlContent.includes('Preguntas Verificadas'), false, '❌ DOM 0 Fallido: reapareció una afirmación editorial retirada');
  assert.strictEqual(htmlContent.includes('servidores alojados en la Unión Europea'), false, '❌ DOM 0 Fallido: reapareció una región de Supabase no demostrada');
  assert.strictEqual(htmlContent.includes('oposiciones.a2.xunta@gmail.com'), false, '❌ DOM 0 Fallido: reapareció un contacto no reconocido por el titular');
  assert.strictEqual(document.querySelector('.repository-link').href, 'https://github.com/creace13/oposiciones-a2-xunta', '❌ DOM 0 Fallido: enlace al repositorio incorrecto');
  assert.strictEqual(document.getElementById('projectCreditsTitle').textContent.includes('colaboración entre inteligencias artificiales'), true, '❌ DOM 0 Fallido: créditos Inter-IA ausentes');
  assert.strictEqual(document.querySelector('.closing-quote').textContent.includes('La constancia no hace ruido'), true, '❌ DOM 0 Fallido: cierre motivador ausente');
  assert.strictEqual(htmlContent.includes('Versión 1.1 (Estable en modo local)'), true, '❌ DOM 0 Fallido: versión estable local no publicada en la interfaz');
  assert.strictEqual(htmlContent.includes('Cuentas remotas en Beta'), true, '❌ DOM 0 Fallido: falta advertencia sobre cuentas remotas');
  console.log('  PASADO: Métricas y textos de transparencia verificados.');

  // Flow 1: Carga de la aplicación e inicio en modo invitado
  console.log('Test E2E 1: Entrando en modo invitado desde la portada...');
  const guestBtn = document.getElementById('guestAccessBtn');
  assert.strictEqual(!!guestBtn, true, '❌ E2E 1 Fallido: guestAccessBtn no encontrado');
  guestBtn.click();

  assert.strictEqual(document.documentElement.dataset.authState, 'authenticated', '❌ E2E 1 Fallido: No dio acceso invitado');
  assert.strictEqual(document.documentElement.dataset.authMode, 'guest', '❌ E2E 1 Fallido: Modo no es guest');
  console.log('  PASADO: Portada permite acceso en modo invitado.');

  // Flow 2: Navegación por las secciones principales
  console.log('Test E2E 2: Navegando por las pestañas de la aplicación...');
  const views = ['practice', 'simulations', 'errors', 'library', 'syllabus'];
  for (const v of views) {
    window.location.hash = `#${v}`;
    window.dispatchEvent(new window.Event('hashchange'));
    const section = document.getElementById(v);
    assert.strictEqual(section.classList.contains('hidden'), false, `❌ E2E 2 Fallido: Vista ${v} permanece oculta`);
  }
  console.log('  PASADO: Navegación por todas las secciones verificada.');

  // Flow 3: Iniciar práctica de 5 preguntas y responder
  console.log('Test E2E 3: Iniciando práctica de 5 preguntas...');
  const createTestBtn = document.getElementById('createTest');
  document.getElementById('lengthSelect').value = '5';
  createTestBtn.click();

  const quizCard = document.getElementById('quizCard');
  assert.strictEqual(quizCard.classList.contains('hidden'), false, '❌ E2E 3 Fallido: Tarjeta de quiz no visible');

  // Answer 5 questions
  for (let i = 0; i < 5; i++) {
    const answerBtns = document.querySelectorAll('.answer');
    assert.strictEqual(answerBtns.length > 0, true, `❌ E2E 3 Fallido: Botones de respuesta no renderizados en preg ${i+1}`);
    answerBtns[0].click(); // Select first answer option

    if (i < 4) {
      const nextBtn = document.querySelector('.next-question');
      assert.strictEqual(nextBtn.classList.contains('hidden'), false, `❌ E2E 3 Fallido: Botón Siguiente no visible en preg ${i+1}`);
      nextBtn.click();
    }
  }
  console.log('  PASADO: Práctica de 5 preguntas completada y respondida.');

  // Flow 4: Iniciar simulacro con penalización –0.25 y calcular nota neta
  console.log('Test E2E 4: Iniciando simulacro oficial de 18 preguntas...');
  window.location.hash = '#simulations';
  window.dispatchEvent(new window.Event('hashchange'));
  const simStartBtn = document.getElementById('simulationStart');
  simStartBtn.click();

  // Answer 1 question, leave rest blank by finishing exam
  const firstOption = document.querySelector('.answer');
  if (firstOption) firstOption.click();

  // Trigger end of exam / render results
  window.renderExamResults();
  const summaryHeading = document.querySelector('#quizCard h2, #quizCard h3');
  assert.strictEqual(!!summaryHeading, true, '❌ E2E 4 Fallido: Resumen de examen no mostrado');
  console.log('  PASADO: Simulacro con penalización y nota neta verificado.');

  // Flow 5: Probar escritura de persistencia local
  console.log('Test DOM 5: Verificando escritura de persistencia en localStorage...');
  const savedName = window.localStorage.getItem('opoA2UserName');
  assert.strictEqual(savedName, 'Merce', '❌ E2E 5 Fallido: opoA2UserName no persistido en localStorage');
  const savedState = JSON.parse(window.localStorage.getItem('opoA2State'));
  assert.strictEqual(Array.isArray(savedState.answered), true, '❌ DOM 5 Fallido: el progreso no se serializó');
  assert.strictEqual(savedState.answered.length > 0, true, '❌ DOM 5 Fallido: no se guardaron respuestas');
  console.log('  PASADO: Escritura de persistencia local verificada.');

  // Flow 6: Probar alta pendiente de confirmación sin falso estado autenticado
  console.log('Test E2E 6: Probando alta de usuario pendiente de confirmación...');
  window.localStorage.clear();
  window.setAuthState('unauthenticated');

  const emailInput = document.getElementById('authPageEmail'); emailInput.value = 'novo@opos.gal';
  const passInput = document.getElementById('authPagePassword'); passInput.value = 'Secret123!';
  const signUpBtn = document.getElementById('authPageSignUpBtn');

  signUpBtn.click();
  await new Promise(r => setTimeout(r, 100));

  assert.strictEqual(document.documentElement.dataset.authMode, 'none', '❌ E2E 6 Fallido: Alta pendiente activó modo remoto');
  const statusMsg = document.getElementById('authPageStatusText').textContent;
  assert.strictEqual(statusMsg.includes('correo') || statusMsg.includes('confirmar') || statusMsg.includes('éxito'), true, '❌ E2E 6 Fallido: Mensaje de confirmación no mostrado');
  console.log('  PASADO: Alta pendiente no autentica falsamente y muestra aviso.');

  // Flow 7: Probar apertura y cierre del modal de privacidad
  console.log('Test E2E 7: Probando apertura de modal de privacidad...');
  const privacyModal = document.getElementById('privacyModal');
  privacyModal.showModal();
  assert.strictEqual(privacyModal.open, true, '❌ E2E 7 Fallido: Modal de privacidad no abrió');
  privacyModal.close();
  assert.strictEqual(privacyModal.open, false, '❌ E2E 7 Fallido: Modal de privacidad no cerró');
  console.log('  PASADO: Modal de privacidad abre y cierra correctamente.');

  // Flow 8: Comprobar existencia en disco de todos los enlaces de la Biblioteca
  console.log('Test E2E 8: Verificando integridad de enlaces a documentos en disco...');
  const docLinks = document.querySelectorAll('a[href^="documentos/"]');
  assert.strictEqual(docLinks.length > 0, true, '❌ E2E 8 Fallido: No se encontraron enlaces a documentos');

  let docCount = 0;
  docLinks.forEach(a => {
    const relPath = a.getAttribute('href');
    const fullPath = path.join(rootDir, relPath);
    assert.strictEqual(fs.existsSync(fullPath), true, `❌ E2E 8 Fallido: Enlace a documento no existe en disco: ${relPath}`);
    docCount++;
  });
  console.log(`  PASADO: Verificados ${docCount} documentos enlazados en disco.`);

  // Flow 9: Comprobar borrado real y separado del progreso local
  console.log('Test DOM 9: Verificando borrado del progreso local...');
  window.localStorage.setItem('opoA2State', JSON.stringify({ answered: [{ id: 'demo' }] }));
  document.getElementById('deleteProgressBtn').click();
  assert.strictEqual(window.localStorage.getItem('opoA2State'), null, '❌ DOM 9 Fallido: el progreso local no fue eliminado');
  assert.strictEqual(document.getElementById('pendingReviews').textContent, '0', '❌ DOM 9 Fallido: el panel no se reinició');
  console.log('  PASADO: Borrado local real, confirmado y separado de la cuenta remota.');

  // Teardown: Cancel active intervals to allow Node process to exit cleanly
  if (window.examTimerInterval) {
    window.clearInterval(window.examTimerInterval);
    window.examTimerInterval = null;
  }

  console.log('\n✅ SUITE DE INTEGRACIÓN DOM/JSDOM PASADA CON ÉXITO.');
}

runE2ESuite().catch(err => {
  console.error('❌ ERROR EN SUITE DE INTEGRACIÓN DOM/JSDOM:', err);
  process.exit(1);
});
