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

  card.innerHTML = `<div class="quiz-meta"><span>${isExam ? 'Simulacro Oficial' : q.topic}</span>${isExam ? `<span id="examTimerDisplay" class="exam-timer">⏱ ${formatTimer(examTimeSeconds)}</span>` : ''}<span>Pregunta ${questionIndex + 1} de ${activeQuiz.length}</span></div><div class="quiz-body"><div class="question-topic">${isExam ? 'Modo examen · corrección al final' : escapeHTML(formatQualityForDisplay(q.quality))}</div><h2 class="question-text">${q.text}</h2><div class="answers">${q.options.map(([letter, text], optionIndex) => `<button class="answer ${selectedAns === optionIndex ? 'selected' : ''}" data-answer="${optionIndex}"><span class="answer-letter">${escapeHTML(letter)}</span><span>${escapeHTML(text)}</span></button>`).join('')}</div><div class="feedback hidden"></div></div><div class="quiz-footer"><span>${isExam ? 'Sin pistas · -0,25 por fallo · 0 en blanco' : '4 alternativas · aprendizaje con explicación'}</span><div class="quiz-footer-actions">${isExam ? `<button class="secondary-button leave-blank-btn">${selectedAns === -1 ? '✓ Dejada en blanco' : 'Dejar en blanco'}</button>` : '<button class="secondary-button finish-practice-early">Terminar por hoy</button>'}<button class="primary-button next-question ${isExam || selectedAns !== undefined ? '' : 'hidden'}">${questionIndex === activeQuiz.length - 1 ? (isExam ? 'Finalizar examen' : 'Finalizar práctica') : 'Siguiente'} <span>→</span></button></div></div>`;

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
  feedback.innerHTML = `<h3>${isCorrect ? 'Correcta. Buen criterio.' : 'Aquí está la clave.'}</h3><p>${escapeHTML(q.explanation)}</p><ul class="why-list">${q.options.map(([letter], i) => `<li><strong>${escapeHTML(letter)}.</strong> ${escapeHTML(q.whys[i])}</li>`).join('')}</ul><div class="feedback-actions"><a class="source-link" href="${escapeHTML(q.sourceUrl)}" target="_blank" rel="noreferrer">Base legal: ${escapeHTML(q.source)} ↗</a>${q.originUrl ? `<a class="source-link" href="${escapeHTML(q.originUrl)}" target="_blank" rel="noreferrer">Examen original ↗</a>` : ''}<button type="button" class="text-button feedback-report-button" data-feedback-id="${escapeHTML(q.id)}">💬 Reportar errata o sugerencia</button></div>`;
  feedback.querySelector('.feedback-report-button').addEventListener('click', buttonEvent => window.openFeedbackDialog(buttonEvent.currentTarget.dataset.feedbackId));
  const next = document.querySelector('.next-question'); next.classList.remove('hidden'); updateDashboard(); renderErrors();
}

function finishPractice(endedEarly = false) {
  const card = document.getElementById('quizCard');
  const heading = endedEarly ? 'Práctica terminada por hoy' : 'Sesión de práctica completada';
  const message = endedEarly
    ? `Has respondido ${practiceAnsweredCount} de ${activeQuiz.length} preguntas. Lo realizado queda guardado y puedes empezar otra práctica cuando quieras.`
    : `Has respondido las ${activeQuiz.length} preguntas. Tus aciertos y errores quedan guardados para futuros repasos.`;
  card.innerHTML = `<div class="quiz-meta"><span>${heading}</span><span>${practiceAnsweredCount} de ${activeQuiz.length} respondidas</span></div><div class="quiz-body"><div class="exam-summary exam-summary-single"><div><span class="stat-label">${endedEarly ? 'Sesión cerrada a tu ritmo' : '🎉 Sesión finalizada'}</span><strong>¡Buen trabajo de estudio!</strong></div></div><p class="practice-completion-message">${message}</p></div><div class="quiz-footer"><span>Progreso actualizado</span><button class="primary-button finish-practice">Volver al panel <span>→</span></button></div>`;
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
