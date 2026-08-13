// Motor y presentacion. El banco se carga antes desde question-bank.js.

function shuffleArray(array, random = Math.random) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function filterQuestionsByCategory(topic, questionsPool) {
  const pool = questionsPool || questions;
  const categoryFilters = {
    procedimiento: q => {
      const c = coverageTopic(q);
      return ['Procedimiento administrativo común', 'Procedimiento administrativo', 'LPAC 39/2015', 'Ley 39/2015', 'Régimen jurídico del sector público'].includes(q.topic) || (c && ['g2-12', 'g2-13'].includes(c)) || q.id.startsWith('lpac-') || q.id.startsWith('procedimiento-');
    },
    galicia: q => {
      const c = coverageTopic(q);
      return ['Organización y sector público autonómico', 'Organización de Galicia', 'Ley 16/2010', 'Xunta y Presidencia', 'Valedor del Pueblo', 'Consejo Consultivo de Galicia'].includes(q.topic) || (c && ['g1-06', 'g1-08', 'g1-09'].includes(c)) || q.id.startsWith('organizacion-') || q.id.startsWith('xunta-') || q.id.startsWith('autonomia-');
    },
    empleo: q => {
      const c = coverageTopic(q);
      return (['Empleo público de Galicia', 'TREBEP', 'Ley 2/2015'].includes(q.topic) || (c && ['g2-18', 'g2-19'].includes(c)) || q.id.startsWith('trebep-') || q.id.startsWith('empleo-galicia-')) && !q.id.startsWith('igualdad-') && !q.id.startsWith('discapacidad-');
    }
  };
  if (categoryFilters[topic]) {
    return pool.filter(categoryFilters[topic]);
  }
  return pool.filter(q => q.topic === topic || coverageTopic(q) === topic);
}

function buildSet(topic, length) {
  let pool = [];
  if (topic === 'troncal') {
    pool = questions.filter(q => { const t = coverageTopic(q); return t && t.startsWith('g1-'); });
  } else if (topic && topic.startsWith('historico')) {
    const targetTopicName = {
      historico2025: 'Histórico oficial 2025',
      historico2024: 'Histórico oficial 2024',
      historico2024pe: 'Histórico oficial 2024',
      historico2024func: 'Histórico oficial Funcionarización',
      historico2021: 'Histórico oficial Funcionarización'
    }[topic];
    const prefixMap = {
      historico2025: 'h2025-',
      historico2024: 'h2024-pe-',
      historico2024pe: 'h2024-pe-',
      historico2024func: 'h2024-func-',
      historico2021: 'h2024-func-'
    };
    const prefix = prefixMap[topic] || 'h202';
    pool = questions.filter(q => q.topic === targetTopicName || q.id.startsWith(prefix));
    if (!length || length === 'full') return pool; // El histórico completo conserva el orden oficial
  } else if (topic === 'mixto') {
    pool = questions;
  } else {
    pool = filterQuestionsByCategory(topic, questions);
  }
  if (!pool.length) pool = questions;
  const shuffled = shuffleArray(pool);
  const count = length ? Math.min(Number(length), shuffled.length) : Math.min(18, shuffled.length);
  return shuffled.slice(0, count);
}
let examTimerInterval = null;
let examTimeSeconds = 0;

function formatTimer(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function startQuiz(set, mode = 'practice') {
  activeQuiz = set;
  questionIndex = 0;
  quizMode = mode;
  examAnswers = [];
  practiceAnsweredCount = 0;
  state.sessions += 1;
  state.sessionHistory.push(new Date().toISOString());
  persist();

  if (examTimerInterval) clearInterval(examTimerInterval);
  if (quizMode === 'exam') {
    examTimeSeconds = activeQuiz.length * 60; // 1 minuto por pregunta
    examTimerInterval = setInterval(() => {
      examTimeSeconds--;
      const timerEl = document.getElementById('examTimerDisplay');
      if (timerEl) timerEl.textContent = `⏱ ${formatTimer(examTimeSeconds)}`;
      if (examTimeSeconds <= 0) {
        clearInterval(examTimerInterval);
        renderExamResults();
      }
    }, 1000);
  }

  showView('practice');
  document.getElementById('practiceSetup').parentElement.classList.add('hidden');
  document.getElementById('quizCard').classList.remove('hidden');
  renderQuestion();
  updateDashboard();
}

function renderQuestion() {
  const q = activeQuiz[questionIndex]; const card = document.getElementById('quizCard');
  const isExam = quizMode === 'exam';
  const selectedAns = examAnswers[questionIndex];

  card.innerHTML = `<div class="quiz-meta"><span>${isExam ? 'Simulacro Oficial' : q.topic}</span>${isExam ? `<span id="examTimerDisplay" style="font-weight:bold;color:var(--primary);">⏱ ${formatTimer(examTimeSeconds)}</span>` : ''}<span>Pregunta ${questionIndex + 1} de ${activeQuiz.length}</span></div><div class="quiz-body"><div class="question-topic">${isExam ? 'Modo examen · corrección al final' : escapeHTML(formatQualityForDisplay(q.quality))}</div><h2 class="question-text">${q.text}</h2><div class="answers">${q.options.map(([letter, text], optionIndex) => `<button class="answer ${selectedAns === optionIndex ? 'selected' : ''}" data-answer="${optionIndex}"><span class="answer-letter">${escapeHTML(letter)}</span><span>${escapeHTML(text)}</span></button>`).join('')}</div><div class="feedback hidden"></div></div><div class="quiz-footer"><span>${isExam ? 'Sin pistas · -0,25 por fallo · 0 en blanco' : '4 alternativas · aprendizaje con explicación'}</span><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:flex-end;">${isExam ? `<button class="secondary-button leave-blank-btn">${selectedAns === -1 ? '✓ Dejada en blanco' : 'Dejar en blanco'}</button>` : '<button class="secondary-button finish-practice-early">Terminar por hoy</button>'}<button class="primary-button next-question ${isExam || selectedAns !== undefined ? '' : 'hidden'}">${questionIndex === activeQuiz.length - 1 ? (isExam ? 'Finalizar examen' : 'Finalizar práctica') : 'Siguiente'} <span>→</span></button></div></div>`;

  card.querySelectorAll('.answer').forEach(button => button.addEventListener('click', () => answerQuestion(Number(button.dataset.answer))));
  
  const blankBtn = card.querySelector('.leave-blank-btn');
  if (blankBtn) {
    blankBtn.addEventListener('click', () => {
      examAnswers[questionIndex] = -1;
      nextQuestion();
    });
  }
  const nextBtn = card.querySelector('.next-question');
  if (nextBtn) {
    nextBtn.addEventListener('click', nextQuestion);
  }
  const finishEarlyBtn = card.querySelector('.finish-practice-early');
  if (finishEarlyBtn) {
    finishEarlyBtn.addEventListener('click', () => finishPractice(true));
  }
}

function updatePracticeLengthOptions() {
  const topicSelect = document.getElementById('topicSelect');
  const lengthSelect = document.getElementById('lengthSelect');
  const fullOption = document.getElementById('fullHistoricalOption');
  if (!topicSelect || !lengthSelect || !fullOption) return;
  const isHistorical = String(topicSelect.value || '').startsWith('historico');
  fullOption.hidden = !isHistorical;
  fullOption.disabled = !isHistorical;
  if (!isHistorical && lengthSelect.value === 'full') lengthSelect.value = '5';
}

function answerQuestion(index) {
  const q = activeQuiz[questionIndex]; const isCorrect = index === q.correct;
  if (quizMode === 'exam') {
    examAnswers[questionIndex] = index;
    document.querySelectorAll('.answer').forEach((button) => button.classList.toggle('selected', Number(button.dataset.answer) === index));
    const next = document.querySelector('.next-question');
    if (next) next.classList.remove('hidden');
    return;
  }
  recordAttempt(q.id, isCorrect);
  practiceAnsweredCount += 1;
  if (!isCorrect && !state.errors.includes(q.id)) state.errors.push(q.id);
  if (isCorrect) state.errors = state.errors.filter(id => id !== q.id);
  persist();
  document.querySelectorAll('.answer').forEach((button) => {
    const btnAns = Number(button.dataset.answer);
    button.disabled = true;
    button.classList.toggle('correct', btnAns === q.correct);
    button.classList.toggle('incorrect', btnAns === index && !isCorrect);
  });
  const feedback = document.querySelector('.feedback');
  feedback.classList.remove('hidden');
  feedback.innerHTML = `<h3>${isCorrect ? 'Correcta. Buen criterio.' : 'Aquí está la clave.'}</h3><p>${escapeHTML(q.explanation)}</p><ul class="why-list">${q.options.map(([letter], i) => `<li><strong>${escapeHTML(letter)}.</strong> ${escapeHTML(q.whys[i])}</li>`).join('')}</ul><div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:12px;"><a class="source-link" href="${escapeHTML(q.sourceUrl)}" target="_blank" rel="noreferrer">Base legal: ${escapeHTML(q.source)} ↗</a>${q.originUrl ? `<a class="source-link" href="${escapeHTML(q.originUrl)}" target="_blank" rel="noreferrer">Examen original ↗</a>` : ''}<button type="button" class="text-button feedback-report-button" data-feedback-id="${escapeHTML(q.id)}" style="font-size:12px;color:var(--muted);text-decoration:underline;">💬 Reportar errata o sugerencia</button></div>`;
  feedback.querySelector('.feedback-report-button').addEventListener('click', buttonEvent => window.openFeedbackDialog(buttonEvent.currentTarget.dataset.feedbackId));
  const next = document.querySelector('.next-question'); next.classList.remove('hidden'); updateDashboard(); renderErrors();
}

function renderExamResults() {
  if (examTimerInterval) { clearInterval(examTimerInterval); examTimerInterval = null; }
  const results = activeQuiz.map((q, index) => {
    const selected = examAnswers[index];
    const isBlank = selected === undefined || selected === null || selected === -1;
    const isCorrect = !isBlank && selected === q.correct;
    return { q, selected, isBlank, correct: isCorrect };
  });
  const correct = results.filter(r => r.correct).length;
  const blank = results.filter(r => r.isBlank).length;
  const wrong = results.length - correct - blank;
  const net = calculateExamScore(correct, wrong);

  results.forEach(({ q, isBlank, correct }) => {
    if (!isBlank) {
      recordAttempt(q.id, correct);
      if (!correct && !state.errors.includes(q.id)) state.errors.push(q.id);
      if (correct) state.errors = state.errors.filter(id => id !== q.id);
    }
  });
  persist();
  updateDashboard();
  renderErrors();
  const card = document.getElementById('quizCard');
  card.innerHTML = `<div class="quiz-meta"><span>Resultado del simulacro</span><span>${activeQuiz.length} preguntas</span></div><div class="quiz-body"><div class="exam-summary"><div><span class="stat-label">Aciertos (+1,00)</span><strong>${correct}</strong></div><div><span class="stat-label">En blanco (0,00)</span><strong>${blank}</strong></div><div><span class="stat-label">Fallos (-0,25)</span><strong>${wrong}</strong></div><div><span class="stat-label">Nota neta</span><strong>${net.toFixed(2)}</strong></div></div><div class="exam-review">${results.map(({ q, selected, isBlank, correct }) => `<article class="exam-review-item ${isBlank ? 'blank' : (correct ? 'correct' : 'incorrect')}"><p class="eyebrow">${q.topic}</p><h3>${q.text}</h3><p><strong>Tu respuesta:</strong> ${isBlank ? '⚪ Dejada en blanco (0 puntos)' : `${q.options[selected]?.[0] || '—'} · ${q.options[selected]?.[1] || ''}`}</p><p><strong>Correcta:</strong> ${q.options[q.correct][0]} · ${q.options[q.correct][1]}</p><p>${q.explanation}</p><ul class="why-list">${q.options.map(([letter], i) => `<li><strong>${letter}.</strong> ${q.whys[i]}</li>`).join('')}</ul><a class="source-link" href="${q.sourceUrl}" target="_blank" rel="noreferrer">Base legal: ${q.source} ↗</a></article>`).join('')}</div></div><div class="quiz-footer"><span>Resultados consolidados en tu perfil local</span><button class="primary-button finish-exam">Volver al inicio <span>→</span></button></div>`;
  card.querySelector('.finish-exam').addEventListener('click', () => { card.classList.add('hidden'); document.getElementById('practiceSetup').parentElement.classList.remove('hidden'); showView('dashboard'); });
}

function finishPractice(endedEarly = false) {
  const card = document.getElementById('quizCard');
  const heading = endedEarly ? 'Práctica terminada por hoy' : 'Sesión de práctica completada';
  const message = endedEarly
    ? `Has respondido ${practiceAnsweredCount} de ${activeQuiz.length} preguntas. Lo realizado queda guardado y puedes empezar otra práctica cuando quieras.`
    : `Has respondido las ${activeQuiz.length} preguntas. Tus aciertos y errores quedan guardados para futuros repasos.`;
  card.innerHTML = `<div class="quiz-meta"><span>${heading}</span><span>${practiceAnsweredCount} de ${activeQuiz.length} respondidas</span></div><div class="quiz-body"><div class="exam-summary" style="grid-template-columns: 1fr;"><div><span class="stat-label">${endedEarly ? 'Sesión cerrada a tu ritmo' : '🎉 Sesión finalizada'}</span><strong>¡Buen trabajo de estudio!</strong></div></div><p style="margin-top:16px;color:var(--text);line-height:1.6;">${message}</p></div><div class="quiz-footer"><span>Progreso actualizado</span><button class="primary-button finish-practice">Volver al panel <span>→</span></button></div>`;
  card.querySelector('.finish-practice').addEventListener('click', () => {
    card.classList.add('hidden');
    document.getElementById('practiceSetup').parentElement.classList.remove('hidden');
    showView('dashboard');
  });
}

function nextQuestion() {
  if (questionIndex < activeQuiz.length - 1) {
    questionIndex += 1;
    renderQuestion();
  } else {
    if (quizMode === 'exam') {
      renderExamResults();
    } else {
      finishPractice();
    }
  }
}

window.addEventListener('hashchange', () => {
  const hashView = viewFromHash();
  if (hashView) showView(hashView, { updateHash: false });
});

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebarOverlay = document.getElementById('sidebarOverlay');
function closeMobileMenu() {
  document.body.classList.remove('sidebar-open');
  if (mobileMenuToggle) {
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Abrir menu de navegacion');
  }
}
function toggleMobileMenu() {
  const open = !document.body.classList.contains('sidebar-open');
  document.body.classList.toggle('sidebar-open', open);
  if (mobileMenuToggle) {
    mobileMenuToggle.setAttribute('aria-expanded', String(open));
    mobileMenuToggle.setAttribute('aria-label', open ? 'Cerrar menu de navegacion' : 'Abrir menu de navegacion');
  }
}
if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', toggleMobileMenu);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobileMenu(); });
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', e => { e.preventDefault(); showView(link.dataset.view); closeMobileMenu(); }));
document.querySelectorAll('[data-view-target]').forEach(button => button.addEventListener('click', () => showView(button.dataset.viewTarget)));
document.querySelectorAll('[data-history-filter]').forEach(button => button.addEventListener('click', () => {
  historyFilter = button.dataset.historyFilter;
  renderErrors();
}));
document.querySelectorAll('.start-test').forEach(button => button.addEventListener('click', () => startQuiz(buildSet(button.dataset.set, 5))));
document.querySelectorAll('.start-historical').forEach(button => button.addEventListener('click', e => startQuiz(buildSet(e.currentTarget.dataset.set), 'exam')));
document.querySelectorAll('.study-historical').forEach(button => button.addEventListener('click', e => startQuiz(buildSet(e.currentTarget.dataset.set, 'full'), 'practice')));
document.getElementById('topicSelect').addEventListener('change', updatePracticeLengthOptions);
updatePracticeLengthOptions();
document.getElementById('createTest').addEventListener('click', () => startQuiz(buildSet(document.getElementById('topicSelect').value, document.getElementById('lengthSelect').value)));
document.getElementById('simulationStart').addEventListener('click', () => startQuiz(buildSet('mixto', 18), 'exam'));

function applyUserProfile(name) {
  if (!name) return;
  try { localStorage.setItem('opoA2UserName', name); } catch (_) {}
  const initial = name.charAt(0).toUpperCase();
  document.querySelectorAll('.profile strong').forEach(el => el.textContent = name);
  document.querySelectorAll('.avatar').forEach(el => el.textContent = initial);
  const headerGreeting = document.querySelector('#dashboard .page-header h1');
  if (headerGreeting) headerGreeting.textContent = `Buenos días, ${name}.`;
}

function setAuthState(mode) {
  const isAuthenticatedOrGuest = mode === 'authenticated' || mode === 'guest' || mode === true;
  document.documentElement.dataset.authState = isAuthenticatedOrGuest ? 'authenticated' : 'unauthenticated';
  document.documentElement.dataset.authMode = mode === 'guest' ? 'guest' : (mode === 'authenticated' || mode === true ? 'supabase' : 'none');
}

function loadSavedProfile() {
  try {
    const savedName = localStorage.getItem('opoA2UserName');
    if (savedName && savedName !== 'Invitado') {
      applyUserProfile(savedName);
      setAuthState('guest');
      document.querySelectorAll('.profile small').forEach(el => el.textContent = 'Perfil local · Modo invitado');
      const targetView = (window.location.hash || '#dashboard').replace('#', '').trim() || 'dashboard';
      showView(targetView);
    } else {
      localStorage.removeItem('opoA2UserName');
      setAuthState('unauthenticated');
    }
  } catch (_) {
    setAuthState('unauthenticated');
  }
}

let supabaseClient = null;
const REMOTE_AUTH_ENABLED = false;

const resetPasswordModal = document.getElementById('resetPasswordModal');

function normalizeAuthEmail(email) {
  return (email || '').trim().toLowerCase();
}

function explainAuthError(error) {
  const rawMessage = error?.message || String(error || '');
  const normalized = rawMessage.toLowerCase();
  if (normalized.includes('invalid login credentials')) {
    return 'No se ha podido iniciar sesión con ese correo y contraseña. Comprueba que el correo sea el mismo con el que creaste la cuenta; si acabas de registrarte, confirma el email. Si en otro dispositivo sigue fallando, usa "¿Olvidaste tu contraseña?" para sincronizar una nueva contraseña.';
  }
  if (normalized.includes('email not confirmed') || normalized.includes('not confirmed')) {
    return 'La cuenta todavía no está confirmada. Revisa el correo de confirmación antes de iniciar sesión en otro dispositivo.';
  }
  if (normalized.includes('rate limit')) {
    return 'Has hecho varios intentos en poco tiempo. Espera 2 o 3 minutos y vuelve a intentarlo.';
  }
  return rawMessage ? `Error de autenticación: ${rawMessage}` : 'No se ha podido completar la autenticación. Vuelve a intentarlo en unos minutos.';
}

function openResetPasswordModal() {
  if (resetPasswordModal) {
    const status = document.getElementById('resetPasswordStatus');
    if (status) status.textContent = '';
    resetPasswordModal.showModal();
  }
}

function initSupabase(url, key) {
  if (!REMOTE_AUTH_ENABLED) {
    supabaseClient = null;
    loadSavedProfile();
    const pageStatus = document.getElementById('authPageStatusText');
    const modalStatus = document.getElementById('authStatusText');
    const msg = 'Cuentas remotas pausadas: usa el modo local en este navegador.';
    if (pageStatus) pageStatus.textContent = msg;
    if (modalStatus) modalStatus.textContent = msg;
    return;
  }
  if (window.supabase && url && key) {
    supabaseClient = window.supabase.createClient(url, key);

    const hash = window.location.hash || '';
    if (hash.includes('error_code=otp_expired') || hash.includes('error=access_denied')) {
      const pageStatus = document.getElementById('authPageStatusText');
      const modalStatus = document.getElementById('authStatusText');
      const msg = 'El enlace de recuperación ha caducado o ya fue utilizado. Solicita un nuevo enlace desde "¿Olvidaste tu contraseña?".';
      if (pageStatus) pageStatus.textContent = msg;
      if (modalStatus) modalStatus.textContent = msg;
    } else if (hash.includes('type=recovery') || hash.includes('access_token=')) {
      setAuthState('authenticated');
      setTimeout(openResetPasswordModal, 300);
    }

    supabaseClient.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setAuthState('authenticated');
        setTimeout(openResetPasswordModal, 300);
      }
    });
    checkAuthUser();
  }
}

initSupabase();

async function checkAuthUser() {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.classList.remove('hidden');
  if (!supabaseClient) { loadSavedProfile(); return; }
  try {
    const { data, error } = await supabaseClient.auth.getSession();
    if (data && data.session && data.session.user) {
      const user = data.session.user;
      const name = user.user_metadata?.name || user.email.split('@')[0];
      applyUserProfile(name);
      setAuthState('authenticated');
      document.querySelectorAll('.profile small').forEach(el => el.textContent = 'Sesión remota Supabase activa');
      const statusText = document.getElementById('authStatusText');
      if (statusText) statusText.textContent = `Conectado como ${user.email} · Sesión remota activa`;
      const targetView = (window.location.hash || '#dashboard').replace('#', '').trim() || 'dashboard';
      showView(targetView);
    } else {
      loadSavedProfile();
    }
  } catch (err) {
    console.warn('Supabase offline or unconfigured:', err);
    loadSavedProfile();
  }
}

const pauseDialog = document.getElementById('pauseDialog');
const goalDialog = document.getElementById('goalDialog');
const authDialog = document.getElementById('authDialog');
const feedbackDialog = document.getElementById('feedbackDialog');

document.getElementById('pauseButton').addEventListener('click', () => pauseDialog.showModal());
document.getElementById('newGoal').addEventListener('click', () => goalDialog.showModal());
const openAuthModalBtn = document.getElementById('openAuthModalBtn');
if (openAuthModalBtn) {
  openAuthModalBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (authDialog) {
      const nameInput = document.getElementById('authName');
      if (nameInput) nameInput.value = localStorage.getItem('opoA2UserName') || 'Merce';
      authDialog.showModal();
    }
  });
}
const sidebarLogoutBtn = document.getElementById('sidebarLogoutBtn');
if (sidebarLogoutBtn) {
  sidebarLogoutBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (supabaseClient) {
      try { await supabaseClient.auth.signOut(); } catch (err) { console.warn('Logout:', err); }
    }
    localStorage.removeItem('opoA2UserName');
    setAuthState(false);
  });
}
const deleteProgressBtn = document.getElementById('deleteProgressBtn');
if (deleteProgressBtn) {
  deleteProgressBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const confirmed = window.confirm('¿Borrar de este navegador todas las respuestas, errores, sesiones y metas? Esta acción no afecta a otros dispositivos.');
    if (!confirmed) return;
    localStorage.removeItem('opoA2State');
    localStorage.removeItem('opoA2LastView');
    state.goals = defaults.map(goal => ({ ...goal }));
    state.answered = [];
    state.errors = [];
    state.sessions = 0;
    state.sessionHistory = [];
    state.current = [];
    activeQuiz = [];
    questionIndex = 0;
    examAnswers = [];
    updateDashboard();
    renderGoals();
    renderErrors();
    renderCoverage();
    showView('dashboard');
  });
}
document.querySelectorAll('.dialog-close,.dialog-action').forEach(button => button.addEventListener('click', () => {
  const privacyModal = document.getElementById('privacyModal');
  pauseDialog.close(); goalDialog.close(); if (authDialog) authDialog.close(); if (feedbackDialog) feedbackDialog.close(); if (resetPasswordModal) resetPasswordModal.close(); if (privacyModal) privacyModal.close();
}));
document.getElementById('saveGoal').addEventListener('click', () => { const input = document.getElementById('goalInput'); const text = input.value.trim(); if (!text) return; state.goals.push({ id:`goal-${Date.now()}`, text, done:false }); input.value = ''; persist(); renderGoals(); goalDialog.close(); });

const resetPasswordForm = document.getElementById('resetPasswordForm');
if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('newPasswordInput');
    const newPass = input ? input.value.trim() : '';
    const status = document.getElementById('resetPasswordStatus');
    if (!newPass || newPass.length < 6) {
      if (status) status.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      return;
    }
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.updateUser({ password: newPass });
        if (error) throw error;
        if (status) status.textContent = '¡Contraseña actualizada con éxito! Redirigiendo...';
        setTimeout(() => {
          if (resetPasswordModal) resetPasswordModal.close();
          window.location.hash = '#inicio';
        }, 1500);
      } catch (err) {
        if (status) status.textContent = `Error: ${err.message}`;
      }
    }
  });
}

const authForm = document.getElementById('authForm');
if (authForm) {
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('authName');
    const statusText = document.getElementById('authStatusText');
    const name = nameInput ? nameInput.value.trim() : '';

    if (REMOTE_AUTH_ENABLED && supabaseClient) {
      const emailInput = document.getElementById('authEmail');
      const passInput = document.getElementById('authPassword');
      const email = normalizeAuthEmail(emailInput ? emailInput.value : '');
      const pass = passInput ? passInput.value.trim() : '';
      if (statusText) statusText.textContent = 'Comprobando cuenta remota...';
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data && data.session && data.session.user) {
          const uName = name || data.session.user.user_metadata?.name || data.session.user.email.split('@')[0];
          applyUserProfile(uName);
          setAuthState('authenticated');
          if (authDialog) authDialog.close();
          return;
        } else if (data && data.user && !data.session) {
          if (statusText) statusText.textContent = 'Registro recibido. Comprueba tu correo para confirmar tu cuenta antes de acceder.';
          return;
        }
      } catch (err) {
        if (statusText) statusText.textContent = explainAuthError(err);
        return;
      }
    }
    if (name) {
      applyUserProfile(name);
      setAuthState('guest');
      if (statusText) statusText.textContent = 'Perfil local guardado en este navegador.';
      if (authDialog) authDialog.close();
    }
  });
}

const authPageForm = document.getElementById('authPageForm');
if (authPageForm) {
  authPageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('authPageName');
    const statusText = document.getElementById('authPageStatusText');
    const name = nameInput ? nameInput.value.trim() : '';

    if (REMOTE_AUTH_ENABLED && supabaseClient) {
      const emailInput = document.getElementById('authPageEmail');
      const passInput = document.getElementById('authPagePassword');
      const email = normalizeAuthEmail(emailInput ? emailInput.value : '');
      const pass = passInput ? passInput.value.trim() : '';
      if (statusText) statusText.textContent = 'Comprobando cuenta remota...';
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data && data.session && data.session.user) {
          const uName = name || data.session.user.user_metadata?.name || data.session.user.email.split('@')[0];
          applyUserProfile(uName);
          setAuthState('authenticated');
          return;
        } else if (data && data.user && !data.session) {
          if (statusText) statusText.textContent = 'Por favor, comprueba tu correo electrónico para confirmar el registro antes de acceder.';
          return;
        }
      } catch (err) {
        if (statusText) statusText.textContent = explainAuthError(err);
        return;
      }
    }
    if (name) {
      applyUserProfile(name);
      setAuthState('guest');
      if (statusText) statusText.textContent = 'Modo local activado. Tu progreso se guardará en este navegador.';
    }
  });
}

const authPageSignUpBtn = document.getElementById('authPageSignUpBtn');
if (authPageSignUpBtn) {
  authPageSignUpBtn.addEventListener('click', async () => {
    const statusText = document.getElementById('authPageStatusText');
    if (!REMOTE_AUTH_ENABLED) {
      if (statusText) statusText.textContent = 'Las cuentas remotas están pausadas. Entra en modo local para estudiar sin depender de una base de datos.';
      return;
    }
    const nameInput = document.getElementById('authPageName');
    const emailInput = document.getElementById('authPageEmail');
    const passInput = document.getElementById('authPagePassword');
    const name = nameInput ? nameInput.value.trim() : '';
    const email = normalizeAuthEmail(emailInput ? emailInput.value : '');
    const pass = passInput ? passInput.value.trim() : '';

    if (!email || !pass) {
      if (statusText) statusText.textContent = 'Introduce correo y contraseña para crear tu cuenta.';
      return;
    }

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email,
          password: pass,
          options: { data: { name: name || 'Opositor' } }
        });
        if (error) throw error;
        if (data && data.session && data.session.user) {
          const uName = name || data.session.user.user_metadata?.name || data.session.user.email.split('@')[0];
          applyUserProfile(uName);
          setAuthState('authenticated');
        } else {
          if (statusText) statusText.textContent = 'Cuenta registrada con éxito. Comprueba tu correo electrónico para confirmar tu acceso.';
        }
      } catch (err) {
        if (statusText) statusText.textContent = explainAuthError(err);
      }
    }
  });
}

const guestAccessBtn = document.getElementById('guestAccessBtn');
if (guestAccessBtn) {
  guestAccessBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('authPageName');
    const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Opositor';
    applyUserProfile(name);
    setAuthState('guest');
  });
}

const authPageForgotPassBtn = document.getElementById('authPageForgotPassBtn');
if (authPageForgotPassBtn) {
  authPageForgotPassBtn.addEventListener('click', async () => {
    if (!REMOTE_AUTH_ENABLED) {
      const statusText = document.getElementById('authPageStatusText');
      if (statusText) statusText.textContent = 'La recuperación remota está pausada. El modo local no necesita contraseña.';
      return;
    }
    const emailInput = document.getElementById('authPageEmail');
    const email = normalizeAuthEmail(emailInput ? emailInput.value : '');
    const statusText = document.getElementById('authPageStatusText');
    if (!email) {
      if (statusText) statusText.textContent = 'Escribe tu correo arriba para enviarte el enlace de recuperación.';
      return;
    }
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
          redirectTo: 'https://oposiciones-xunta.opos-galicia.workers.dev',
        });
        if (error) throw error;
        if (statusText) statusText.textContent = `Enlace enviado a ${email}. Revisa tu correo.`;
      } catch (err) {
        if (statusText) statusText.textContent = explainAuthError(err);
      }
    } else {
      if (statusText) statusText.textContent = `Enlace enviado a ${email}. (Se activará al conectar Supabase).`;
    }
  });
}

const forgotPassBtn = document.getElementById('forgotPassBtn');
if (forgotPassBtn) {
  forgotPassBtn.addEventListener('click', async () => {
    if (!REMOTE_AUTH_ENABLED) {
      const statusText = document.getElementById('authStatusText');
      if (statusText) statusText.textContent = 'La recuperación remota está pausada. El perfil local no necesita contraseña.';
      return;
    }
    const emailInput = document.getElementById('authEmail');
    const email = normalizeAuthEmail(emailInput ? emailInput.value : '');
    const statusText = document.getElementById('authStatusText');
    if (!email) {
      if (statusText) statusText.textContent = 'Escribe tu correo arriba para enviarte el enlace de recuperación.';
      return;
    }
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
          redirectTo: 'https://oposiciones-xunta.opos-galicia.workers.dev',
        });
        if (error) throw error;
        if (statusText) statusText.textContent = `Enlace enviado a ${email}. Revisa tu bandeja de entrada.`;
      } catch (err) {
        if (statusText) statusText.textContent = explainAuthError(err);
      }
    } else {
      if (statusText) statusText.textContent = `Enlace simulado para ${email}. (Se activará al conectar la base de datos).`;
    }
  });
}

const feedbackForm = document.getElementById('feedbackForm');
const feedbackIssueBaseUrl = 'https://github.com/creace13/oposiciones-a2-xunta/issues/new';

function buildFeedbackIssueUrl(type, text) {
  const typeLabels = {
    errata: 'Posible errata jurídica',
    fuente: 'Fuente o enlace roto',
    explicacion: 'Explicación mejorable',
    sugerencia: 'Sugerencia general'
  };
  const label = typeLabels[type] || typeLabels.sugerencia;
  const questionMatch = text.match(/\[Pregunta ([^\]]+)\]/);
  const title = questionMatch
    ? `[${label}] ${questionMatch[1]}`
    : `[${label}] Revisión solicitada`;
  const body = [
    '## Aviso',
    'No incluyas datos personales. Este reporte se abrirá como incidencia pública en GitHub.',
    '',
    '## Tipo de reporte',
    label,
    '',
    '## Detalle',
    text,
    '',
    '## Fuente oficial o referencia',
    'Añade enlace BOE/DOG o convocatoria si procede.',
    '',
    '## Contexto técnico',
    `Versión pública: 1.2.0 estable local · ${new Date().toISOString().slice(0, 10)}`
  ].join('\n');
  const params = new URLSearchParams({
    template: 'errata.md',
    title,
    labels: 'errata,contenido',
    body
  });
  return `${feedbackIssueBaseUrl}?${params.toString()}`;
}

if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('feedbackType').value;
    const text = document.getElementById('feedbackText').value.trim();
    if (!text) return;

    const issueUrl = buildFeedbackIssueUrl(type, text);
    const thanks = document.getElementById('feedbackThanks');
    if (thanks) thanks.classList.remove('hidden');
    window.open(issueUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      if (thanks) thanks.classList.add('hidden');
      document.getElementById('feedbackText').value = '';
      if (feedbackDialog) feedbackDialog.close();
    }, 2000);
  });
}

window.openFeedbackDialog = function(prefill = '') {
  if (feedbackDialog) {
    const textarea = document.getElementById('feedbackText');
    if (textarea) textarea.value = prefill ? `[Pregunta ${prefill}]: ` : '';
    feedbackDialog.showModal();
  }
};

const privacyModalTrigger = document.getElementById('privacyModal');
[document.getElementById('footerPrivacyLink'), document.getElementById('authPrivacyButton')].filter(Boolean).forEach(button => {
  button.addEventListener('click', () => privacyModalTrigger?.showModal());
});
const generalFeedbackBtn = document.getElementById('generalFeedbackBtn');
if (generalFeedbackBtn) generalFeedbackBtn.addEventListener('click', () => window.openFeedbackDialog());

const initialView = viewFromHash() || getLastView() || 'dashboard';
loadSavedProfile(); updateDashboard(); renderGoals(); renderErrors(); renderCoverage(); showView(initialView, { scroll: false });

