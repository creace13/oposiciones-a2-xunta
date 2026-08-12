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
const reviewedIds = [
  ...Array.from({ length: 105 }, (_, index) => `h2025-${String(index + 1).padStart(3, '0')}`),
  ...Array.from({ length: 75 }, (_, index) => `h2024-pe-${String(index + 1).padStart(3, '0')}`)
];
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

const correctedDisabilityReference = questions.find(item => item.id === 'h2025-063');
if (correctedDisabilityReference.source !== 'RDL 1/2013, art. 23' || !correctedDisabilityReference.sourceUrl.includes('BOE-A-2013-12632')) {
  throw new Error('h2025-063 no conserva la referencia corregida al RDL 1/2013.');
}

for (const id of ['h2025-073', 'h2025-074', 'h2025-075', 'h2025-076', 'h2025-077']) {
  const question = questions.find(item => item.id === id);
  if (!question.quality.includes('Norma derogada') || !question.source.includes('Decreto legislativo 2/2015 (derogado)')) {
    throw new Error(`${id} no advierte de forma expresa que su norma histórica está derogada.`);
  }
  if (!question.sourceUrl.includes('DOG-g-2015-90667')) {
    throw new Error(`${id} no enlaza el texto histórico oficial correcto.`);
  }
}

for (const id of Array.from({ length: 20 }, (_, index) => `h2025-${String(index + 81).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2015-5677')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 2/2015.`);
  }
}

const nuancedDeadline = questions.find(item => item.id === 'h2025-082');
if (!nuancedDeadline.quality.includes('Regla matizada') || !nuancedDeadline.explanation.includes('convocatoria')) {
  throw new Error('h2025-082 no conserva la precisión sobre el plazo fijado por la convocatoria.');
}

const modifiedParentalLeave = questions.find(item => item.id === 'h2025-094');
if (!modifiedParentalLeave.quality.includes('Regla modificada') || !modifiedParentalLeave.explanation.includes('1 de enero de 2026')) {
  throw new Error('h2025-094 no advierte de su modificación posterior al examen.');
}

const currentWorksSolvency = questions.find(item => item.id === 'h2025-102');
if (!currentWorksSolvency.sourceUrl.includes('BOE-A-2017-12902')) {
  throw new Error('h2025-102 no enlaza la versión oficial consolidada de la Ley 9/2017.');
}

const currentGalicianOrganization = questions.find(item => item.id === 'h2025-105');
if (!currentGalicianOrganization.sourceUrl.includes('BOE-A-2011-2544')) {
  throw new Error('h2025-105 no enlaza la versión oficial consolidada de la Ley 16/2010.');
}

const defectiveAgreementQuestion = questions.find(item => item.id === 'h2024-pe-025');
if (defectiveAgreementQuestion.correct !== 1 || !defectiveAgreementQuestion.quality.includes('Pregunta defectuosa') || !defectiveAgreementQuestion.explanation.includes('cinco días hábiles') || !defectiveAgreementQuestion.explanation.includes('diez días hábiles')) {
  throw new Error('h2024-pe-025 no conserva la respuesta oficial y la advertencia sobre sus dos opciones incorrectas.');
}

const modifiedProcurementThreshold = questions.find(item => item.id === 'h2024-pe-031');
if (!modifiedProcurementThreshold.quality.includes('Umbral histórico modificado') || !modifiedProcurementThreshold.explanation.includes('5.538.000 euros')) {
  throw new Error('h2024-pe-031 no advierte de la actualización del umbral desde 2024.');
}

for (const id of Array.from({ length: 7 }, (_, index) => `h2024-pe-${String(index + 29).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2017-12902')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 9/2017.`);
  }
}

for (const id of Array.from({ length: 6 }, (_, index) => `h2024-pe-${String(index + 36).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2017-12902')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 9/2017.`);
  }
}

for (const id of Array.from({ length: 5 }, (_, index) => `h2024-pe-${String(index + 42).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2011-2544')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 16/2010.`);
  }
}

for (const id of Array.from({ length: 9 }, (_, index) => `h2024-pe-${String(index + 47).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.source.startsWith('Ley 4/2019, art.') || !question.sourceUrl.includes('AnuncioC3B0-180719-0001_gl.html')) {
    throw new Error(`${id} no conserva la referencia oficial correcta a la Ley 4/2019.`);
  }
}

const correctedDigitalSeatReference = questions.find(item => item.id === 'h2024-pe-048');
if (correctedDigitalSeatReference.source !== 'Ley 4/2019, art. 16.2') {
  throw new Error('h2024-pe-048 no conserva la referencia corregida al artículo 16.2 de la Ley 4/2019.');
}

for (const id of ['h2024-pe-056', 'h2024-pe-057', 'h2024-pe-058']) {
  const question = questions.find(item => item.id === id);
  if (!question.source.startsWith('Ley 53/1984, art.') || !question.sourceUrl.includes('BOE-A-1985-151')) {
    throw new Error(`${id} no conserva la referencia oficial correcta a la Ley 53/1984.`);
  }
}

for (const id of Array.from({ length: 7 }, (_, index) => `h2024-pe-${String(index + 59).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2013-12632')) {
    throw new Error(`${id} no enlaza el texto oficial del RDL 1/2013.`);
  }
}

for (const id of Array.from({ length: 6 }, (_, index) => `h2024-pe-${String(index + 67).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2016-3190')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 1/2016.`);
  }
}

const modifiedTransparencyBody = questions.find(item => item.id === 'h2024-pe-069');
if (!modifiedTransparencyBody.quality.includes('Regla histórica modificada') || !modifiedTransparencyBody.explanation.includes('1 de mayo de 2026') || !modifiedTransparencyBody.explanation.includes('Consejo Consultivo')) {
  throw new Error('h2024-pe-069 no distingue la respuesta histórica de la adscripción vigente desde mayo de 2026.');
}

for (const id of ['h2024-pe-073', 'h2024-pe-074', 'h2024-pe-075']) {
  const question = questions.find(item => item.id === id);
  if (!question.quality.includes('Norma derogada') || !question.source.includes('Decreto legislativo 2/2015 (derogado)') || !question.sourceUrl.includes('DOG-g-2015-90667')) {
    throw new Error(`${id} no identifica correctamente su norma histórica derogada.`);
  }
}

console.log('REVISIÓN JURÍDICA DE HISTÓRICOS OFICIALES');
console.log(`Preguntas revisadas acumuladas comprobadas: ${reviewedIds.length}`);
console.log('Explicación normativa y cuatro alternativas justificadas: OK');
console.log('RESULTADO: OK');
