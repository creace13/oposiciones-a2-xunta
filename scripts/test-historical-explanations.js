const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const boundary = source.indexOf('const defaults');

if (boundary === -1) throw new Error('No se encontró el límite de datos en app.js.');

const context = {};
vm.createContext(context);
vm.runInContext(
  source.slice(0, boundary) + '\nglobalThis.auditQuestions = questions;',
  context
);

const questions = context.auditQuestions;
const reviewedIds = Array.from({ length: 40 }, (_, index) =>
  `h2025-${String(index + 1).padStart(3, '0')}`
);
const genericPhrases = [
  'No coincide con la solución oficial',
  'Coincide expresamente con la respuesta oficial'
];

for (const id of reviewedIds) {
  const question = questions.find(item => item.id === id);
  if (!question) throw new Error(`Falta la pregunta revisada ${id}.`);
  if (!question.quality.startsWith('Verificada y ampliada')) {
    throw new Error(`${id} no conserva la marca de revisión jurídica ampliada.`);
  }
  if (!question.explanation.includes('artículo')) {
    throw new Error(`${id} no explica la base normativa de la respuesta.`);
  }
  if (question.whys.length !== question.options.length) {
    throw new Error(`${id} no explica individualmente sus cuatro alternativas.`);
  }
  const reviewedText = [question.explanation, ...question.whys].join(' ');
  for (const phrase of genericPhrases) {
    if (reviewedText.includes(phrase)) {
      throw new Error(`${id} todavía contiene una justificación automática genérica.`);
    }
  }
}

console.log('REVISIÓN JURÍDICA DEL HISTÓRICO 2025');
console.log(`Preguntas revisadas acumuladas comprobadas: ${reviewedIds.length}`);
console.log('Explicación normativa y cuatro alternativas justificadas: OK');
console.log('RESULTADO: OK');
