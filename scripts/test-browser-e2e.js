const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { JSDOM } = require('jsdom');

console.log('--- SUITE DE INTEGRACIÓN DOM/JSDOM (HTML + APP.JS REALES) ---');

const rootDir = path.resolve(__dirname, '..');
const htmlPath = path.join(rootDir, 'index.html');
const bankPath = path.join(rootDir, 'question-bank.js');
const appPath = path.join(rootDir, 'app.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const bankContent = fs.readFileSync(bankPath, 'utf8');
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
  window.openedUrls = [];
  window.open = (url) => {
    window.openedUrls.push(String(url));
    return null;
  };
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

  // Evaluate both classic scripts in one shared lexical scope, matching index.html.
  window.eval(`${bankContent}\n${appContent}`);

  // Regression: métricas cuantitativas honestas y formato español
  console.log('Test DOM 0: Verificando presentación honesta de métricas...');
  window.updateDashboard();
  assert.strictEqual(document.querySelector('.readiness-panel .legend').textContent.includes('preguntas por bloque'), true, '❌ DOM 0 Fallido: la leyenda no describe la distribución');
  assert.strictEqual(document.getElementById('valBlock1').textContent, '302 preguntas', '❌ DOM 0 Fallido: Bloque I no muestra su recuento real');
  assert.strictEqual(document.getElementById('valBlock2').textContent, '905 preguntas', '❌ DOM 0 Fallido: Bloque II no muestra su recuento real');
  assert.strictEqual(document.getElementById('snapshotRatio').textContent, '1.522', '❌ DOM 0 Fallido: el banco disponible no muestra el total real');
  assert.strictEqual(document.getElementById('snapshotSub').textContent, '1.207 propias de temario + 315 oficiales', '❌ DOM 0 Fallido: el desglose del banco no es correcto');
  assert.strictEqual(document.getElementById('coverageSummary').textContent.includes('BANCO PROPIO1.207'), true, '❌ DOM 0 Fallido: el resumen no muestra el banco propio real');
  assert.strictEqual(document.getElementById('coverageSummary').textContent.includes('99.8%'), false, '❌ DOM 0 Fallido: reapareció el porcentaje engañoso');
  assert.strictEqual(document.body.textContent.includes('1.207/1.210'), false, '❌ DOM 0 Fallido: reapareció la comparación con la meta interna');
  assert.strictEqual(document.body.textContent.includes('OBJETIVO INTERNO DE VOLUMEN'), false, '❌ DOM 0 Fallido: reapareció una meta de producción interna');
  assert.strictEqual(htmlContent.includes('Preguntas Verificadas'), false, '❌ DOM 0 Fallido: reapareció una afirmación editorial retirada');
  assert.strictEqual(htmlContent.includes('servidores alojados en la Unión Europea'), false, '❌ DOM 0 Fallido: reapareció una región de Supabase no demostrada');
  assert.strictEqual(htmlContent.includes('oposiciones.a2.xunta@gmail.com'), false, '❌ DOM 0 Fallido: reapareció un contacto no reconocido por el titular');
  assert.strictEqual(document.querySelector('.repository-link').href, 'https://github.com/creace13/oposiciones-a2-xunta', '❌ DOM 0 Fallido: enlace al repositorio incorrecto');
  assert.strictEqual(document.getElementById('projectCreditsTitle').textContent.includes('colaboración entre inteligencias artificiales'), true, '❌ DOM 0 Fallido: créditos Inter-IA ausentes');
  assert.strictEqual(document.querySelector('.closing-quote').textContent.includes('La constancia no hace ruido'), true, '❌ DOM 0 Fallido: cierre motivador ausente');
  assert.strictEqual(document.getElementById('qualityLimitsTitle').textContent.includes('qué no pretende ser'), true, '❌ DOM 0 Fallido: aviso de límites de uso ausente');
  assert.strictEqual(document.body.textContent.includes('No es academia, temario oficial ni asesoramiento jurídico'), true, '❌ DOM 0 Fallido: falta aclaración de que no sustituye academia ni asesoramiento jurídico');
  assert.strictEqual(document.body.textContent.includes('prevalece siempre la fuente oficial BOE/DOG'), true, '❌ DOM 0 Fallido: falta prevalencia de fuentes oficiales');
  assert.strictEqual(htmlContent.includes('Versión 1.2.0 estable local'), true, '❌ DOM 0 Fallido: versión estable local no publicada en la interfaz');
  assert.strictEqual(htmlContent.includes('Cuentas remotas pausadas'), true, '❌ DOM 0 Fallido: falta advertencia sobre cuentas remotas pausadas');
  assert.strictEqual(document.getElementById('dashboardDate').textContent.includes('10 de julio'), false, '❌ DOM 0 Fallido: la fecha del panel sigue escrita a mano');
  assert.strictEqual(document.getElementById('totalAttempts').textContent, '0', '❌ DOM 0 Fallido: el histórico de respuestas no comienza en cero');
  assert.strictEqual(document.body.textContent.includes('Tiempo medio'), false, '❌ DOM 0 Fallido: se sigue mostrando un tiempo que la aplicación no mide');
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

  // Flow 2b: Integridad del barajado y de las letras de respuesta
  console.log('Test E2E 2b: Verificando barajado sin duplicados y opciones estables...');
  const sourceOrder = [1, 2, 3, 4];
  const deterministicShuffle = Array.from(window.shuffleArray(sourceOrder, () => 0));
  assert.strictEqual(sourceOrder.join(','), '1,2,3,4', '❌ E2E 2b Fallido: el barajado modificó la lista original');
  assert.strictEqual(deterministicShuffle.join(','), '2,3,4,1', '❌ E2E 2b Fallido: Fisher-Yates no produjo la permutación esperada');
  const mixedSet = Array.from(window.buildSet('mixto', 18));
  assert.strictEqual(new Set(mixedSet.map(question => question.id)).size, mixedSet.length, '❌ E2E 2b Fallido: aparecieron preguntas duplicadas');
  const officialSet = Array.from(window.buildSet('historico2025', 'full'));
  assert.strictEqual(officialSet.length, 105, '❌ E2E 2b Fallido: el histórico completo no contiene 105 preguntas');
  assert.strictEqual(officialSet[0].id, 'h2025-001', '❌ E2E 2b Fallido: se alteró el orden oficial del histórico');
  const originalOptions = JSON.stringify(officialSet[0].options);
  window.startQuiz([officialSet[0]], 'practice');
  const renderedAnswers = [...document.querySelectorAll('.answer')];
  assert.strictEqual(document.querySelector('.question-topic').textContent.startsWith('Revisión interna'), true, '❌ E2E 2b Fallido: la interfaz atribuye una verificación jurídica externa inexistente');
  assert.strictEqual(document.querySelector('.question-topic').textContent.startsWith('Verificada'), false, '❌ E2E 2b Fallido: reapareció la etiqueta editorial excesiva');
  assert.strictEqual(renderedAnswers.map(button => button.dataset.answer).join(','), '0,1,2,3', '❌ E2E 2b Fallido: las respuestas cambiaron de posición');
  assert.strictEqual(renderedAnswers.map(button => button.querySelector('.answer-letter').textContent).join(','), 'A,B,C,D', '❌ E2E 2b Fallido: las letras dejaron de coincidir con el examen');
  assert.strictEqual(JSON.stringify(officialSet[0].options), originalOptions, '❌ E2E 2b Fallido: la pregunta fue modificada durante el renderizado');
  renderedAnswers[0].click();
  assert.strictEqual([...document.querySelectorAll('#quizCard .feedback .why-list strong')].map(item => item.textContent).join(','), 'A.,B.,C.,D.', '❌ E2E 2b Fallido: las explicaciones no conservan las mismas letras');
  assert.strictEqual(document.getElementById('dailyProgress').textContent, '1/18', '❌ E2E 2b Fallido: el panel no cuenta la respuesta realizada hoy');
  assert.strictEqual(document.getElementById('weeklySessions').textContent, '1', '❌ E2E 2b Fallido: el panel no cuenta la sesión iniciada esta semana');
  assert.strictEqual(document.getElementById('totalAttempts').textContent, '1', '❌ E2E 2b Fallido: el histórico no cuenta la respuesta registrada');
  document.querySelector('.next-question').click();
  document.querySelector('.finish-practice').click();
  console.log('  PASADO: Barajado, ausencia de duplicados y correspondencia A-D verificados.');

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
  document.querySelector('.next-question').click();
  console.log('  PASADO: Práctica de 5 preguntas completada y respondida.');

  // Flow 3b: Terminar una práctica antes de completar todas las preguntas
  console.log('Test E2E 3b: Finalizando una práctica de forma anticipada...');
  document.querySelector('.finish-practice').click();
  document.getElementById('lengthSelect').value = '5';
  createTestBtn.click();
  document.querySelector('.answer').click();
  document.querySelector('.finish-practice-early').click();
  assert.strictEqual(quizCard.textContent.includes('Práctica terminada por hoy'), true, '❌ E2E 3b Fallido: no se mostró el cierre anticipado');
  assert.strictEqual(quizCard.textContent.includes('1 de 5 respondidas'), true, '❌ E2E 3b Fallido: el resumen no conserva el número respondido');
  const earlySavedState = JSON.parse(window.localStorage.getItem('opoA2State'));
  assert.strictEqual(earlySavedState.answered.length >= 6, true, '❌ E2E 3b Fallido: la respuesta realizada antes de terminar no quedó guardada');
  document.querySelector('.finish-practice').click();
  console.log('  PASADO: Cierre anticipado y conservación de progreso verificados.');

  // Flow 3c: Estudiar un histórico completo con explicación inmediata
  console.log('Test E2E 3c: Estudiando un histórico completo con explicación inmediata...');
  const topicSelect = document.getElementById('topicSelect');
  const lengthSelect = document.getElementById('lengthSelect');
  const fullHistoricalOption = document.getElementById('fullHistoricalOption');
  topicSelect.value = 'historico2025';
  topicSelect.dispatchEvent(new window.Event('change'));
  assert.strictEqual(fullHistoricalOption.hidden, false, '❌ E2E 3c Fallido: no se habilitó el histórico completo');
  assert.strictEqual(fullHistoricalOption.disabled, false, '❌ E2E 3c Fallido: el histórico completo continúa deshabilitado');
  lengthSelect.value = 'full';
  createTestBtn.click();
  assert.strictEqual(quizCard.textContent.includes('Pregunta 1 de 105'), true, '❌ E2E 3c Fallido: no se cargaron las 105 preguntas');
  document.querySelector('.answer').click();
  assert.strictEqual(document.querySelector('.feedback').classList.contains('hidden'), false, '❌ E2E 3c Fallido: no apareció la explicación inmediata');
  document.querySelector('.finish-practice-early').click();
  document.querySelector('.finish-practice').click();
  console.log('  PASADO: Histórico completo en modo aprendizaje verificado.');

  // Flow 3d: Acceso directo a estudiar desde la lista de históricos
  console.log('Test E2E 3d: Abriendo el modo estudiar desde la lista de históricos...');
  document.querySelector('.study-historical[data-set="historico2025"]').click();
  assert.strictEqual(quizCard.textContent.includes('Pregunta 1 de 105'), true, '❌ E2E 3d Fallido: el botón Estudiar no abrió el examen completo');
  assert.strictEqual(quizCard.textContent.includes('aprendizaje con explicación'), true, '❌ E2E 3d Fallido: el botón Estudiar abrió el modo incorrecto');
  document.querySelector('.answer').click();
  assert.strictEqual(document.querySelector('.feedback').classList.contains('hidden'), false, '❌ E2E 3d Fallido: Estudiar no mostró la explicación');
  document.querySelector('.finish-practice-early').click();
  document.querySelector('.finish-practice').click();
  console.log('  PASADO: Acceso directo a estudiar verificado.');

  // Flow 4: Iniciar simulacro con penalización –0.25 y calcular nota neta
  console.log('Test E2E 4: Iniciando simulacro oficial de 18 preguntas...');
  window.location.hash = '#simulations';
  window.dispatchEvent(new window.Event('hashchange'));
  const simStartBtn = document.getElementById('simulationStart');
  simStartBtn.click();

  // Answer 1 question, leave rest blank by finishing exam
  const firstOption = document.querySelector('.answer');
  if (firstOption) firstOption.click();
  assert.strictEqual(document.querySelector('.feedback').classList.contains('hidden'), true, '❌ E2E 4 Fallido: el simulacro mostró una corrección antes de terminar');

  // Trigger end of exam / render results
  window.renderExamResults();
  const summaryHeading = document.querySelector('#quizCard h2, #quizCard h3');
  assert.strictEqual(!!summaryHeading, true, '❌ E2E 4 Fallido: Resumen de examen no mostrado');
  const examValues = [...document.querySelectorAll('.exam-summary strong')].map(item => item.textContent);
  const expectedNet = Math.max(0, Number(examValues[0]) - (Number(examValues[2]) * 0.25)).toFixed(2);
  assert.strictEqual(examValues[3], expectedNet, '❌ E2E 4 Fallido: la nota neta no aplica exactamente -0,25 por fallo');
  console.log('  PASADO: Simulacro con penalización y nota neta verificado.');

  // Flow 4b: Historial conjunto de aciertos y errores
  console.log('Test E2E 4b: Verificando historial conjunto y migración segura...');
  const migrated = window.normalizeStoredState({
    answered: [
      { id: 'procedimiento-1', correct: false },
      { id: 'procedimiento-1', correct: true },
      { id: 'identificador-inexistente', correct: true }
    ],
    errors: ['procedimiento-1', 'identificador-inexistente'],
    sessions: 2
  });
  assert.strictEqual(migrated.version, 3, '❌ E2E 4b Fallido: el progreso no se migró a la versión actual');
  assert.deepStrictEqual(Array.from(migrated.sessionHistory), [], '❌ E2E 4b Fallido: las sesiones antiguas se presentaron falsamente como recientes');
  assert.strictEqual(migrated.answered.length, 2, '❌ E2E 4b Fallido: no se descartó un intento huérfano');
  assert.strictEqual(Array.from(migrated.errors).join(','), 'procedimiento-1', '❌ E2E 4b Fallido: no se descartó un error huérfano');
  window.showView('errors');
  document.querySelector('[data-history-filter="all"]').click();
  assert.strictEqual(document.querySelectorAll('.history-card').length > 0, true, '❌ E2E 4b Fallido: el historial no muestra preguntas realizadas');
  assert.strictEqual(document.getElementById('historySummary').textContent.includes('Preguntas realizadas'), true, '❌ E2E 4b Fallido: falta el resumen del historial');
  assert.strictEqual(document.querySelectorAll('.history-tab').length, 3, '❌ E2E 4b Fallido: faltan filtros del historial');
  const historyExplanationToggle = document.querySelector('.history-explanation-toggle');
  historyExplanationToggle.click();
  const historyExplanation = document.getElementById(historyExplanationToggle.getAttribute('aria-controls'));
  assert.strictEqual(historyExplanationToggle.getAttribute('aria-expanded'), 'true', '❌ E2E 4b Fallido: el control no comunica que la explicación está abierta');
  assert.strictEqual(historyExplanation.classList.contains('hidden'), false, '❌ E2E 4b Fallido: la explicación no se desplegó');
  assert.strictEqual(historyExplanation.querySelectorAll('.why-list li').length, 4, '❌ E2E 4b Fallido: la explicación no justifica las cuatro alternativas');
  assert.strictEqual(!!historyExplanation.querySelector('.source-link'), true, '❌ E2E 4b Fallido: falta el enlace a la base legal');
  historyExplanationToggle.click();
  assert.strictEqual(historyExplanation.classList.contains('hidden'), true, '❌ E2E 4b Fallido: la explicación no se pudo cerrar');
  assert.strictEqual(!!document.querySelector('.history-card .review-one'), true, '❌ E2E 4b Fallido: el acceso independiente a practicar desapareció');
  console.log('  PASADO: Historial conjunto, filtros y migración segura verificados.');

  // Flow 5: Probar escritura de persistencia local
  console.log('Test DOM 5: Verificando escritura de persistencia en localStorage...');
  const savedName = window.localStorage.getItem('opoA2UserName');
  assert.strictEqual(savedName, 'Opositor', '❌ E2E 5 Fallido: opoA2UserName no persistido en localStorage');
  const savedState = JSON.parse(window.localStorage.getItem('opoA2State'));
  assert.strictEqual(Array.isArray(savedState.answered), true, '❌ DOM 5 Fallido: el progreso no se serializó');
  assert.strictEqual(savedState.answered.length > 0, true, '❌ DOM 5 Fallido: no se guardaron respuestas');
  console.log('  PASADO: Escritura de persistencia local verificada.');

  // Flow 6: Probar que el acceso principal es local y no remoto
  console.log('Test E2E 6: Probando acceso local sin cuenta remota...');
  window.localStorage.clear();
  window.setAuthState('unauthenticated');

  const nameInput = document.getElementById('authPageName');
  nameInput.value = 'Ricardo';
  const authForm = document.getElementById('authPageForm');
  authForm.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  await new Promise(r => setTimeout(r, 100));

  assert.strictEqual(document.documentElement.dataset.authMode, 'guest', '❌ E2E 6 Fallido: el acceso local no activó modo guest');
  const statusMsg = document.getElementById('authPageStatusText').textContent;
  assert.strictEqual(statusMsg.includes('Modo local') || statusMsg.includes('guardará en este navegador'), true, '❌ E2E 6 Fallido: no muestra aviso local');
  console.log('  PASADO: Acceso local verificado sin cuenta remota.');

  // Flow 7: Probar apertura y cierre del modal de privacidad
  console.log('Test E2E 7: Probando apertura de modal de privacidad...');
  const privacyModal = document.getElementById('privacyModal');
  privacyModal.showModal();
  assert.strictEqual(privacyModal.open, true, '❌ E2E 7 Fallido: Modal de privacidad no abrió');
  assert.strictEqual(privacyModal.textContent.includes('Uso responsable'), true, '❌ E2E 7 Fallido: falta uso responsable en privacidad');
  assert.strictEqual(privacyModal.textContent.includes('No es academia, temario oficial, fuente oficial ni asesoramiento jurídico'), true, '❌ E2E 7 Fallido: privacidad no aclara límites de uso');
  privacyModal.close();
  assert.strictEqual(privacyModal.open, false, '❌ E2E 7 Fallido: Modal de privacidad no cerró');
  console.log('  PASADO: Modal de privacidad abre y cierra correctamente.');

  // Flow 7b: Probar canal público de erratas sin Supabase
  console.log('Test E2E 7b: Probando reporte de erratas por GitHub Issues...');
  const feedbackDialog = document.getElementById('feedbackDialog');
  assert.strictEqual(!!feedbackDialog, true, '❌ E2E 7b Fallido: feedbackDialog no existe');
  window.openFeedbackDialog('procedimiento-1');
  assert.strictEqual(feedbackDialog.open, true, '❌ E2E 7b Fallido: el modal de feedback no abrió');
  const feedbackText = document.getElementById('feedbackText');
  assert.strictEqual(feedbackText.value.includes('[Pregunta procedimiento-1]'), true, '❌ E2E 7b Fallido: no precarga ID de pregunta');
  feedbackText.value += ' Revisar posible errata con fuente oficial.';
  document.getElementById('feedbackForm').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  assert.strictEqual(window.openedUrls.some(url => url.includes('github.com/creace13/oposiciones-a2-xunta/issues/new')), true, '❌ E2E 7b Fallido: no abre GitHub Issues');
  assert.strictEqual(window.openedUrls.some(url => url.includes('procedimiento-1')), true, '❌ E2E 7b Fallido: no incluye el ID de pregunta en el reporte');
  feedbackDialog.close();
  console.log('  PASADO: Canal de erratas abre GitHub Issues sin depender de base de datos.');

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
