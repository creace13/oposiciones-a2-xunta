const defaults = [
  { id: 'goal-1', text: 'Completar 3 prácticas de procedimiento', done: false },
  { id: 'goal-2', text: 'Revisar los errores recientes', done: false },
  { id: 'goal-3', text: 'Hacer un simulacro corto sin pausas', done: false }
];

function getStoredState() {
  try { return JSON.parse(localStorage.getItem('opoA2State') || 'null'); } catch (_) { return null; }
}

function normalizeStoredState(stored) {
  const source = stored && typeof stored === 'object' ? stored : {};
  const validQuestionIds = new Set(fullQuestionBank.map(question => question.id));
  const answered = Array.isArray(source.answered)
    ? source.answered.filter(attempt => attempt && validQuestionIds.has(attempt.id) && typeof attempt.correct === 'boolean').map(attempt => ({
        id: attempt.id,
        correct: attempt.correct,
        ...(typeof attempt.answeredAt === 'string' ? { answeredAt: attempt.answeredAt } : {})
      }))
    : [];
  const errors = Array.isArray(source.errors)
    ? [...new Set(source.errors.filter(id => validQuestionIds.has(id)))]
    : [];
  const sessionHistory = Array.isArray(source.sessionHistory)
    ? source.sessionHistory.filter(value => typeof value === 'string' && !Number.isNaN(Date.parse(value)))
    : [];
  return {
    version: 3,
    goals: Array.isArray(source.goals) ? source.goals : defaults.map(goal => ({ ...goal })),
    answered,
    errors,
    sessions: Number.isFinite(source.sessions) && source.sessions >= 0 ? source.sessions : 0,
    sessionHistory,
    current: Array.isArray(source.current) ? source.current : []
  };
}

const state = normalizeStoredState(getStoredState());
let activeQuiz = [];
let questionIndex = 0;
let quizMode = 'practice';
let examAnswers = [];
let practiceAnsweredCount = 0;
let historyFilter = 'pending';
const validViews = ['dashboard', 'practice', 'simulations', 'errors', 'library', 'syllabus', 'methodology'];
const viewHashes = {
  dashboard: 'inicio',
  practice: 'practicar',
  simulations: 'simulacros',
  errors: 'errores',
  library: 'biblioteca',
  syllabus: 'temario',
  methodology: 'metodologia'
};
const hashViews = {
  ...Object.fromEntries(Object.entries(viewHashes).map(([view, hash]) => [hash, view])),
  ...Object.fromEntries(validViews.map(view => [view, view])),
  guia: 'methodology'
};

function viewFromHash() {
  const hash = decodeURIComponent(window.location.hash.replace('#', '')).trim();
  return hashViews[hash] || null;
}

function getLastView() {
  try { return localStorage.getItem('opoA2LastView'); } catch (_) { return null; }
}

function setLastView(name) {
  try { localStorage.setItem('opoA2LastView', name); } catch (_) {}
}

function persist() {
  try { localStorage.setItem('opoA2State', JSON.stringify(state)); } catch (_) {}
}
