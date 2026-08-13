function recordAttempt(questionId, correct) {
  state.answered.push({ id: questionId, correct, answeredAt: new Date().toISOString() });
}
function getHistoryRows() {
  const rowsById = new Map();
  state.answered.forEach((attempt, index) => {
    const question = questions.find(item => item.id === attempt.id);
    if (!question) return;
    const row = rowsById.get(attempt.id) || { question, attempts: 0, correct: 0, incorrect: 0, lastCorrect: false, lastIndex: -1 };
    row.attempts += 1;
    if (attempt.correct) row.correct += 1; else row.incorrect += 1;
    row.lastCorrect = attempt.correct;
    row.lastIndex = index;
    rowsById.set(attempt.id, row);
  });
  return [...rowsById.values()].sort((a, b) => b.lastIndex - a.lastIndex);
}
function renderErrors() {
  const target = document.getElementById('errorList');
  const allRows = getHistoryRows();
  const pendingIds = new Set(state.errors);
  const pendingRows = allRows.filter(row => pendingIds.has(row.question.id));
  const correctRows = allRows.filter(row => row.correct > 0);
  const summary = document.getElementById('historySummary');
  if (summary) {
    summary.innerHTML = `<article><span>Preguntas realizadas</span><strong>${allRows.length}</strong></article><article class="success"><span>Con algún acierto</span><strong>${correctRows.length}</strong></article><article class="attention"><span>Pendientes de repaso</span><strong>${pendingRows.length}</strong></article>`;
  }
  document.querySelectorAll('[data-history-filter]').forEach(button => {
    const active = button.dataset.historyFilter === historyFilter;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  const rows = historyFilter === 'pending' ? pendingRows : (historyFilter === 'correct' ? correctRows : allRows);
  if (!rows.length) {
    const emptyMessages = {
      pending: ['TODO DESPEJADO', 'No tienes preguntas pendientes de repaso.', 'Cuando falles una pregunta, aparecerá aquí hasta que vuelvas a acertarla.'],
      correct: ['PRIMEROS PASOS', 'Aún no hay aciertos registrados.', 'Las preguntas acertadas aparecerán aquí con el número de intentos realizados.'],
      all: ['SIN ACTIVIDAD TODAVÍA', 'Aún no has respondido preguntas.', 'Empieza una práctica y este espacio irá formando tu historial.']
    };
    const [label, title, copy] = emptyMessages[historyFilter];
    target.innerHTML = `<article class="error-card empty"><p class="eyebrow">${label}</p><h2>${title}</h2><p>${copy}</p></article>`;
    return;
  }
  target.innerHTML = rows.map(row => {
    const q = row.question;
    const pending = pendingIds.has(q.id);
    const attemptsLabel = `${row.attempts} ${row.attempts === 1 ? 'intento' : 'intentos'}`;
    const detailId = `history-detail-${q.id}`;
    const correctOption = q.options[q.correct];
    return `<article class="error-card history-card"><div class="history-card-summary"><div class="history-card-heading"><p class="eyebrow">${escapeHTML(q.topic.toUpperCase())}</p><span class="history-status ${pending ? 'pending-review' : 'learned'}">${pending ? 'Pendiente' : 'Última correcta'}</span></div><h2>${escapeHTML(q.text)}</h2><p>${escapeHTML(q.source)}</p><p class="attempt-summary"><strong>${row.correct}</strong> ${row.correct === 1 ? 'acierto' : 'aciertos'} · <strong>${row.incorrect}</strong> ${row.incorrect === 1 ? 'fallo' : 'fallos'} · ${attemptsLabel}</p></div><div class="history-card-actions"><button type="button" class="secondary-button history-explanation-toggle" data-id="${escapeHTML(q.id)}" aria-expanded="false" aria-controls="${escapeHTML(detailId)}">Ver explicación</button><button type="button" class="secondary-button review-one" data-id="${escapeHTML(q.id)}">Practicar</button></div><div class="history-explanation hidden" id="${escapeHTML(detailId)}"><p class="eyebrow">RESPUESTA CORRECTA</p><p class="history-correct-answer"><strong>${escapeHTML(correctOption[0])}.</strong> ${escapeHTML(correctOption[1])}</p><h3>Explicación</h3><p>${escapeHTML(q.explanation)}</p><h3>Por qué cada alternativa</h3><ul class="why-list">${q.options.map(([letter], optionIndex) => `<li><strong>${escapeHTML(letter)}.</strong> ${escapeHTML(q.whys[optionIndex])}</li>`).join('')}</ul><div class="history-source-links"><a class="source-link" href="${escapeHTML(q.sourceUrl)}" target="_blank" rel="noreferrer">Base legal: ${escapeHTML(q.source)} ↗</a>${q.originUrl ? `<a class="source-link" href="${escapeHTML(q.originUrl)}" target="_blank" rel="noreferrer">Examen original ↗</a>` : ''}</div></div></article>`;
  }).join('');
  target.querySelectorAll('.history-explanation-toggle').forEach(button => button.addEventListener('click', () => {
    const detail = document.getElementById(button.getAttribute('aria-controls'));
    const willOpen = detail.classList.contains('hidden');
    target.querySelectorAll('.history-explanation-toggle').forEach(otherButton => {
      otherButton.setAttribute('aria-expanded', 'false');
      otherButton.textContent = 'Ver explicación';
    });
    target.querySelectorAll('.history-explanation').forEach(otherDetail => otherDetail.classList.add('hidden'));
    if (willOpen) {
      detail.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
      button.textContent = 'Ocultar explicación';
    }
  }));
  target.querySelectorAll('.review-one').forEach(button => button.addEventListener('click', () => startQuiz([questions.find(q => q.id === button.dataset.id)])));
}
