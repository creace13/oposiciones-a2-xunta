function formatCount(value) {
  return String(Math.trunc(Number(value))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}
function sameLocalDay(value, reference) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime())
    && date.getFullYear() === reference.getFullYear()
    && date.getMonth() === reference.getMonth()
    && date.getDate() === reference.getDate();
}
function startOfLocalWeek(reference) {
  const start = new Date(reference.getFullYear(), reference.getMonth(), reference.getDate());
  const mondayOffset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - mondayOffset);
  return start;
}
function calculateExamScore(correct, wrong) {
  return Math.max(0, Number(correct) - (Number(wrong) * 0.25));
}
function getPersonalMetrics(reference = new Date()) {
  const attempts = state.answered.length;
  const correct = state.answered.filter(attempt => attempt.correct).length;
  const todayAttempts = state.answered.filter(attempt => attempt.answeredAt && sameLocalDay(attempt.answeredAt, reference)).length;
  const weekStart = startOfLocalWeek(reference);
  const nextWeek = new Date(weekStart);
  nextWeek.setDate(nextWeek.getDate() + 7);
  const weeklySessions = state.sessionHistory.filter(value => {
    const date = new Date(value);
    return date >= weekStart && date < nextWeek;
  }).length;
  return {
    attempts,
    todayAttempts,
    weeklySessions,
    net: attempts ? Math.max(0, ((correct - (attempts - correct) * 0.25) / attempts) * 100) : null
  };
}
function formatDashboardDate(reference = new Date()) {
  const formatted = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' }).format(reference);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
function formatQualityForDisplay(value) {
  const quality = String(value || '').trim();
  if (!quality) return 'Redacción propia · revisión interna pendiente';
  return quality
    .replace(/^Verificada y /, 'Revisión interna · ')
    .replace(/^Verificada/, 'Revisión interna');
}
function showView(name, options = {}) {
  const { updateHash = true, scroll = true } = options;
  if (!validViews.includes(name)) name = 'dashboard';
  document.documentElement.dataset.activeView = name;
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === name));
  document.querySelectorAll('.nav-link').forEach(a => {
    const isCurrent = a.dataset.view === name;
    a.classList.toggle('active', isCurrent);
    if (isCurrent) {
      a.setAttribute('aria-current', 'page');
    } else {
      a.removeAttribute('aria-current');
    }
  });
  setLastView(name);
  if (name === 'syllabus') renderCoverage();
  if (updateHash && viewHashes[name] && window.location.hash !== `#${viewHashes[name]}`) {
    window.location.hash = viewHashes[name];
  }
  if (scroll && typeof window.scrollTo === 'function') window.scrollTo({ top: 0, behavior: 'smooth' });
}
function updateDashboard() {
  const metrics = getPersonalMetrics();
  document.getElementById('dashboardDate').textContent = formatDashboardDate();
  document.getElementById('dailyProgress').innerHTML = `${metrics.todayAttempts}<span>/18</span>`;
  document.querySelector('.ring span').textContent = `${Math.min(100, Math.round((metrics.todayAttempts / 18) * 100))}%`;
  document.getElementById('netScore').textContent = metrics.net === null ? '—' : `${Math.round(metrics.net)}%`;
  document.getElementById('totalAttempts').textContent = metrics.attempts;
  document.getElementById('pendingReviews').textContent = state.errors.length;
  document.getElementById('weeklySessions').textContent = metrics.weeklySessions;

  const focusText = document.getElementById('focusCardText');
  if (focusText) {
    const block1Count = questions.filter(q => { const t = coverageTopic(q); return !q.id.startsWith('h202') && t && t.startsWith('g1-'); }).length;
    const block2Count = questions.filter(q => { const t = coverageTopic(q); return !q.id.startsWith('h202') && t && t.startsWith('g2-'); }).length;
    focusText.textContent = `${formatCount(questions.length)} preguntas disponibles: ${formatCount(block1Count + block2Count)} propias distribuidas entre los 23 temas y 315 de exámenes históricos.`;
  }
  const snapRatio = document.getElementById('snapshotRatio');
  if (snapRatio) {
    const syllabusCount = questions.filter(q => !q.id.startsWith('h202') && Boolean(coverageTopic(q))).length;
    snapRatio.textContent = formatCount(questions.length);
    const snapSub = document.getElementById('snapshotSub');
    if (snapSub) snapSub.textContent = `${formatCount(syllabusCount)} propias de temario + 315 oficiales`;
  }
  const b1Val = document.getElementById('valBlock1');
  if (b1Val) {
    const b1Count = questions.filter(q => { const t = coverageTopic(q); return !q.id.startsWith('h202') && t && t.startsWith('g1-'); }).length;
    const ownCount = questions.filter(q => !q.id.startsWith('h202') && Boolean(coverageTopic(q))).length;
    const b1Share = ownCount ? Math.round((b1Count / ownCount) * 100) : 0;
    b1Val.textContent = `${formatCount(b1Count)} preguntas`;
    const b1Bar = document.getElementById('barBlock1');
    if (b1Bar) b1Bar.style.width = `${b1Share}%`;
  }
  const b2Val = document.getElementById('valBlock2');
  if (b2Val) {
    const b2Count = questions.filter(q => { const t = coverageTopic(q); return !q.id.startsWith('h202') && t && t.startsWith('g2-'); }).length;
    const ownCount = questions.filter(q => !q.id.startsWith('h202') && Boolean(coverageTopic(q))).length;
    const b2Share = ownCount ? Math.round((b2Count / ownCount) * 100) : 0;
    b2Val.textContent = `${formatCount(b2Count)} preguntas`;
    const b2Bar = document.getElementById('barBlock2');
    if (b2Bar) b2Bar.style.width = `${b2Share}%`;
  }
}
function renderGoals() {
  const list = document.getElementById('goalsList');
  list.innerHTML = state.goals.map(goal => `<label class="goal ${goal.done ? 'done' : ''}"><input type="checkbox" data-goal="${escapeHTML(goal.id)}" ${goal.done ? 'checked' : ''}><span>${escapeHTML(goal.text)}</span><small>${goal.done ? 'hecha' : 'pendiente'}</small></label>`).join('');
  list.querySelectorAll('[data-goal]').forEach(box => box.addEventListener('change', e => { const goal = state.goals.find(g => g.id === e.target.dataset.goal); goal.done = e.target.checked; persist(); renderGoals(); }));
}

function renderCoverage() {
  const rows = coverageRows();
  const current = rows.reduce((sum, row) => sum + row.current, 0);
  const historicalCount = questions.filter(q => q.id.startsWith('h202')).length;
  const dashboard = document.getElementById('coverageSnapshot');
  if (dashboard) {
    dashboard.innerHTML = `<div><span class="stat-label">Banco disponible</span><strong id="snapshotRatio">${formatCount(questions.length)}</strong><small id="snapshotSub">${formatCount(current)} propias de temario + ${formatCount(historicalCount)} oficiales</small></div><button class="secondary-button" data-view-target="syllabus">Ver distribución</button>`;
    dashboard.querySelector('[data-view-target]').addEventListener('click', () => showView('syllabus'));
  }
  const summary = document.getElementById('coverageSummary');
  if (summary) {
    const topicsWithQuestions = rows.filter(row => row.current > 0).length;
    summary.innerHTML = `<article class="coverage-hero"><div><p class="eyebrow">BANCO PROPIO</p><strong>${formatCount(current)}</strong><small>preguntas clasificadas en los ${rows.length} temas</small></div></article><article class="coverage-kpi"><span>Exámenes oficiales</span><strong>${formatCount(historicalCount)}</strong><small>preguntas históricas</small></article><article class="coverage-kpi warning"><span>Temas incluidos</span><strong>${topicsWithQuestions}/${rows.length}</strong><small>${topicsWithQuestions === rows.length ? 'todos contienen preguntas' : 'hay temas todavía sin preguntas'}</small></article><article class="coverage-kpi next"><span>Estado editorial</span><strong>Revisión continua</strong><small>la cantidad no acredita calidad jurídica</small></article>`;
  }
  const list = document.getElementById('coverageList');
  if (list) {
    const renderBlock = (blockName, subtitle) => {
      const blockRows = rows.filter(row => row.block === blockName);
      const blockCurrent = blockRows.reduce((sum, row) => sum + row.current, 0);
      return `<article class="coverage-block-card"><header><div><p class="eyebrow">${blockName.toUpperCase()}</p><h3>${subtitle}</h3><small>${blockRows.length} temas</small></div><strong>${formatCount(blockCurrent)} preguntas</strong></header><div class="coverage-topic-grid">${blockRows.map(row => `<article class="topic-progress-card ${row.current ? '' : 'empty'}"><div class="topic-main"><span>${row.id.toUpperCase()}</span><strong>${row.title}</strong><small>${row.current ? `${formatCount(row.current)} preguntas` : 'Sin preguntas'}</small></div></article>`).join('')}</div></article>`;
    };
    list.innerHTML = `<section class="coverage-dashboard-board">${renderBlock('Bloque I', 'Instituciones y organización básica')}${renderBlock('Bloque II', 'Procedimiento, contratación y empleo público')}</section>`;
  }
}
