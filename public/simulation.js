function calculateExamScore(correct, wrong) {
  return Math.max(0, Number(correct) - (Number(wrong) * 0.25));
}

let examTimerInterval = null;
let examTimeSeconds = 0;

function formatTimer(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
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
