const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const holdsSource = fs.readFileSync(path.join(root, 'maintenance-holds.js'), 'utf8');
const procedure = fs.readFileSync(path.join(root, 'docs', 'MANTENIMIENTO-NORMATIVO.md'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const syncSource = fs.readFileSync(path.join(root, 'scripts', 'sync-public.js'), 'utf8');
const boundary = appSource.indexOf('const defaults');
const stateBoundary = appSource.indexOf('const state = normalizeStoredState');

if (boundary === -1 || stateBoundary === -1) throw new Error('No se encontraron los límites esperados de app.js.');

function loadBank(holds) {
  const context = {};
  if (holds) context.NORMATIVE_MAINTENANCE_HOLDS = holds;
  vm.createContext(context);
  vm.runInContext(
    appSource.slice(0, boundary) +
      '\nglobalThis.auditActiveQuestions = questions;' +
      '\nglobalThis.auditFullQuestionBank = fullQuestionBank;',
    context
  );
  return {
    activeQuestions: context.auditActiveQuestions,
    fullQuestionBank: context.auditFullQuestionBank
  };
}

const currentHoldsContext = {};
vm.createContext(currentHoldsContext);
vm.runInContext(holdsSource, currentHoldsContext);
const currentHolds = currentHoldsContext.NORMATIVE_MAINTENANCE_HOLDS;
const baseline = loadBank();
const bankIds = new Set(baseline.fullQuestionBank.map(question => question.id));

assert.ok(Array.isArray(currentHolds), 'El registro de retiradas debe ser una lista.');
assert.strictEqual(new Set(currentHolds.map(hold => hold.questionId)).size, currentHolds.length, 'No puede haber retiradas duplicadas.');
currentHolds.forEach(hold => {
  assert.ok(bankIds.has(hold.questionId), `La retirada ${hold.questionId} no existe en el banco.`);
  assert.ok(['HELD', 'RELEASED'].includes(hold.status), `Estado no permitido en ${hold.questionId}.`);
  assert.match(hold.openedOn, /^\d{4}-\d{2}-\d{2}$/, `Fecha de apertura inválida en ${hold.questionId}.`);
  assert.ok(typeof hold.reason === 'string' && hold.reason.trim(), `Falta el motivo de ${hold.questionId}.`);
  assert.ok(typeof hold.officialNoticeUrl === 'string' && hold.officialNoticeUrl.trim(), `Falta la fuente oficial de ${hold.questionId}.`);
  if (hold.status === 'RELEASED') {
    assert.match(hold.resolvedOn || '', /^\d{4}-\d{2}-\d{2}$/, `Falta la fecha de resolución de ${hold.questionId}.`);
    assert.ok(typeof hold.resolution === 'string' && hold.resolution.trim(), `Falta la resolución de ${hold.questionId}.`);
  }
});

assert.strictEqual(baseline.fullQuestionBank.length, 1522);
assert.strictEqual(baseline.activeQuestions.length, 1522 - currentHolds.filter(hold => hold.status === 'HELD').length);

const simulatedId = 'procedimiento-1';
const simulatedHold = [{
  questionId: simulatedId,
  status: 'HELD',
  openedOn: '2026-08-12',
  reason: 'Ensayo reversible de mantenimiento.',
  officialNoticeUrl: 'https://www.boe.es/'
}];
const held = loadBank(simulatedHold);
assert.strictEqual(held.fullQuestionBank.length, 1522, 'La retirada no debe borrar la pregunta del banco completo.');
assert.strictEqual(held.activeQuestions.length, 1521, 'La retirada debe excluir una sola pregunta de uso.');
assert.ok(held.fullQuestionBank.some(question => question.id === simulatedId), 'La pregunta debe conservarse para revisión y restauración.');
assert.ok(!held.activeQuestions.some(question => question.id === simulatedId), 'La pregunta retenida no debe aparecer en sesiones.');

const released = loadBank([{ ...simulatedHold[0], status: 'RELEASED', resolvedOn: '2026-08-12', resolution: 'Ensayo finalizado.' }]);
assert.strictEqual(released.activeQuestions.length, 1522, 'Una pregunta liberada debe volver a estar disponible.');

const progressContext = {
  NORMATIVE_MAINTENANCE_HOLDS: simulatedHold,
  auditStoredState: {
    answered: [{ id: simulatedId, correct: false, answeredAt: '2026-08-12T10:00:00.000Z' }],
    errors: [simulatedId],
    goals: [],
    sessions: 1,
    current: []
  }
};
vm.createContext(progressContext);
vm.runInContext(
  appSource.slice(0, stateBoundary) +
    '\nglobalThis.auditNormalizedState = normalizeStoredState(globalThis.auditStoredState);',
  progressContext
);
assert.strictEqual(progressContext.auditNormalizedState.answered.length, 1, 'La retirada no debe borrar intentos guardados.');
assert.deepStrictEqual(Array.from(progressContext.auditNormalizedState.errors), [simulatedId], 'La retirada no debe borrar el pendiente de repaso.');

assert.match(appSource, /validQuestionIds = new Set\(fullQuestionBank\.map/, 'El progreso debe validarse contra el banco completo.');
assert.ok(html.indexOf('maintenance-holds.js') < html.indexOf('app.js?v='), 'Las retiradas deben cargarse antes que la aplicación.');
assert.ok(syncSource.includes("'maintenance-holds.js'"), 'El registro debe sincronizarse con la aplicación publicada.');
assert.ok(procedure.includes('Rutina mensual'), 'Falta la rutina mensual.');
assert.ok(procedure.includes('Rutina trimestral'), 'Falta la rutina trimestral.');
assert.ok(procedure.includes('Actuación inmediata'), 'Falta el procedimiento urgente.');
assert.ok(procedure.includes('Retirada temporal reversible'), 'Falta el procedimiento de retirada reversible.');

console.log('RUTINA DE MANTENIMIENTO NORMATIVO');
console.log(`Preguntas en el banco completo: ${baseline.fullQuestionBank.length}`);
console.log(`Retiradas activas reales: ${currentHolds.filter(hold => hold.status === 'HELD').length}`);
console.log('Ensayo de retirada: 1.522 conservadas, 1.521 disponibles.');
console.log('Ensayo de liberación: 1.522 disponibles de nuevo.');
console.log('Progreso conservado contra el banco completo: OK');
console.log('RESULTADO: OK');
