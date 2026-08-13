const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { readBankSource } = require('./lib/runtime-source');

const root = path.resolve(__dirname, '..');
const source = readBankSource(root);

const context = {};
vm.createContext(context);
vm.runInContext(
  source + '\nglobalThis.auditQuestions = questions;',
  context
);

const questions = context.auditQuestions;
const reviewedIds = [
  ...Array.from({ length: 105 }, (_, index) => `h2025-${String(index + 1).padStart(3, '0')}`),
  ...Array.from({ length: 105 }, (_, index) => `h2024-pe-${String(index + 1).padStart(3, '0')}`),
  ...Array.from({ length: 105 }, (_, index) => `h2024-func-${String(index + 1).padStart(3, '0')}`)
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

const derogatedEqualityQuestion76 = questions.find(item => item.id === 'h2024-pe-076');
if (!derogatedEqualityQuestion76.quality.includes('Norma derogada') || !derogatedEqualityQuestion76.source.includes('Decreto legislativo 2/2015 (derogado)') || !derogatedEqualityQuestion76.sourceUrl.includes('DOG-g-2015-90667')) {
  throw new Error('h2024-pe-076 no identifica correctamente su norma histórica derogada.');
}

for (const id of Array.from({ length: 9 }, (_, index) => `h2024-pe-${String(index + 77).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2015-5677')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 2/2015.`);
  }
}

const nuancedHistoricalDeadline = questions.find(item => item.id === 'h2024-pe-082');
if (!nuancedHistoricalDeadline.quality.includes('Regla matizada') || !nuancedHistoricalDeadline.explanation.includes('convocatoria')) {
  throw new Error('h2024-pe-082 no conserva la precisión sobre el plazo fijado por la convocatoria.');
}

for (const id of Array.from({ length: 10 }, (_, index) => `h2024-pe-${String(index + 86).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2015-5677')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 2/2015.`);
  }
}

const expandedBirthLeave = questions.find(item => item.id === 'h2024-pe-093');
if (!expandedBirthLeave.quality.includes('Regla vigente ampliada') || !expandedBirthLeave.explanation.includes('treinta y dos semanas')) {
  throw new Error('h2024-pe-093 no explica la ampliación vigente para familias monoparentales.');
}

const modifiedOtherParentLeave = questions.find(item => item.id === 'h2024-pe-094');
if (!modifiedOtherParentLeave.quality.includes('Regla modificada') || !modifiedOtherParentLeave.explanation.includes('1 de enero de 2026') || !modifiedOtherParentLeave.explanation.includes('diecinueve semanas')) {
  throw new Error('h2024-pe-094 no distingue la respuesta histórica de la regulación vigente desde 2026.');
}

for (const id of Array.from({ length: 5 }, (_, index) => `h2024-pe-${String(index + 96).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2015-5677')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 2/2015.`);
  }
}

for (const id of Array.from({ length: 18 }, (_, index) => `h2024-func-${String(index + 1).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2015-10565')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 39/2015.`);
  }
}

for (const id of Array.from({ length: 11 }, (_, index) => `h2024-func-${String(index + 19).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2015-10566')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 40/2015.`);
  }
}

const currentCooperationThreshold = questions.find(item => item.id === 'h2024-func-030');
if (!currentCooperationThreshold.sourceUrl.includes('BOE-A-2017-12902') || !currentCooperationThreshold.explanation.includes('20 %')) {
  throw new Error('h2024-func-030 no conserva el umbral vigente ni el enlace consolidado de la Ley 9/2017.');
}

const prescriptionTrap = questions.find(item => item.id === 'h2024-func-017');
if (!prescriptionTrap.explanation.includes('prescripción') || !prescriptionTrap.explanation.includes('caducidad')) {
  throw new Error('h2024-func-017 no explica la diferencia entre prescripción y caducidad.');
}

const reusableApplicationCost = questions.find(item => item.id === 'h2024-func-029');
if (!reusableApplicationCost.explanation.includes('permite expresamente') || !reusableApplicationCost.explanation.includes('coste')) {
  throw new Error('h2024-func-029 no explica la posible repercusión del coste de la aplicación cedida.');
}

for (const id of Array.from({ length: 12 }, (_, index) => `h2024-func-${String(index + 31).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2017-12902')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 9/2017.`);
  }
}

for (const id of Array.from({ length: 5 }, (_, index) => `h2024-func-${String(index + 43).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2011-2544')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 16/2010.`);
  }
}

for (const id of Array.from({ length: 3 }, (_, index) => `h2024-func-${String(index + 48).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2019-13518')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 4/2019.`);
  }
}

const changingServicesThreshold = questions.find(item => item.id === 'h2024-func-035');
if (!changingServicesThreshold.quality.includes('Umbral temporal explicado') || !changingServicesThreshold.explanation.includes('143.000 euros') || !changingServicesThreshold.explanation.includes('1 de enero de 2026')) {
  throw new Error('h2024-func-035 no explica la evolución temporal del umbral de servicios de la AGE.');
}

const disabilityEmploymentQuota = questions.find(item => item.id === 'h2024-func-040');
if (!disabilityEmploymentQuota.explanation.includes('2 %') || !disabilityEmploymentQuota.explanation.includes('5 %')) {
  throw new Error('h2024-func-040 no explica la diferencia entre la cuota legal y el distractor.');
}

for (const id of Array.from({ length: 3 }, (_, index) => `h2024-func-${String(index + 51).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.source.startsWith('Ley 4/2019, art.') || !question.sourceUrl.includes('BOE-A-2019-13518')) {
    throw new Error(`${id} no conserva la referencia consolidada correcta a la Ley 4/2019.`);
  }
}

for (const id of Array.from({ length: 17 }, (_, index) => `h2024-func-${String(index + 54).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2015-5677')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 2/2015.`);
  }
}

const negativeMeetingQuestion = questions.find(item => item.id === 'h2024-func-066');
if (!negativeMeetingQuestion.explanation.includes('quién no está legitimado') || !negativeMeetingQuestion.explanation.includes('40 %')) {
  throw new Error('h2024-func-066 no explica correctamente la formulación negativa sobre el derecho de reunión.');
}

const bereavementLeave = questions.find(item => item.id === 'h2024-func-067');
if (!bereavementLeave.explanation.includes('cinco días hábiles') || !bereavementLeave.explanation.includes('consecutivos')) {
  throw new Error('h2024-func-067 no conserva la duración y forma de disfrute vigentes del permiso por fallecimiento.');
}

for (const id of Array.from({ length: 3 }, (_, index) => `h2024-func-${String(index + 71).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2015-5677')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 2/2015.`);
  }
}

for (const id of Array.from({ length: 3 }, (_, index) => `h2024-func-${String(index + 74).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.source.startsWith('Ley 53/1984, art.') || !question.sourceUrl.includes('BOE-A-1985-151')) {
    throw new Error(`${id} no conserva la referencia correcta a la Ley 53/1984.`);
  }
}

const currentA2CompatibilityLimit = questions.find(item => item.id === 'h2024-func-074');
if (!currentA2CompatibilityLimit.quality.includes('Equivalencia de grupos explicada') || !currentA2CompatibilityLimit.explanation.includes('antiguo grupo B') || !currentA2CompatibilityLimit.explanation.includes('subgrupo A2')) {
  throw new Error('h2024-func-074 no explica la equivalencia necesaria para aplicar el límite del 35 % al subgrupo A2.');
}

for (const id of Array.from({ length: 8 }, (_, index) => `h2024-func-${String(index + 77).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2013-12632')) {
    throw new Error(`${id} no enlaza el texto consolidado del RDL 1/2013.`);
  }
}

const correctedAccessibilityAuthority = questions.find(item => item.id === 'h2024-func-081');
if (correctedAccessibilityAuthority.source !== 'RDL 1/2013, art. 23.1' || !correctedAccessibilityAuthority.quality.includes('Referencia corregida')) {
  throw new Error('h2024-func-081 no conserva la referencia corregida sobre condiciones básicas de accesibilidad.');
}

for (const id of Array.from({ length: 6 }, (_, index) => `h2024-func-${String(index + 85).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.sourceUrl.includes('BOE-A-2016-3190')) {
    throw new Error(`${id} no enlaza la versión oficial consolidada de la Ley 1/2016.`);
  }
}

const currentIncompatibilitiesOffice = questions.find(item => item.id === 'h2024-func-091');
if (!currentIncompatibilitiesOffice.sourceUrl.includes('BOE-A-2016-3190')) {
  throw new Error('h2024-func-091 no enlaza la versión consolidada de la Ley 1/2016.');
}

for (const id of Array.from({ length: 9 }, (_, index) => `h2024-func-${String(index + 92).padStart(3, '0')}`)) {
  const question = questions.find(item => item.id === id);
  if (!question.quality.includes('Norma derogada desde 31/12/2023') || !question.source.includes('Decreto legislativo 2/2015 (derogado)') || !question.sourceUrl.includes('DOG-g-2015-90667')) {
    throw new Error(`${id} no advierte correctamente que su norma histórica está derogada.`);
  }
}

const negativeInteradministrativePrinciple = questions.find(item => item.id === 'h2024-func-101');
if (!negativeInteradministrativePrinciple.explanation.includes('se pide señalar la incorrecta') || !negativeInteradministrativePrinciple.explanation.includes('eficiencia') || !negativeInteradministrativePrinciple.sourceUrl.includes('BOE-A-2015-10566')) {
  throw new Error('h2024-func-101 no explica la diferencia entre eficacia y eficiencia en la pregunta negativa.');
}

const finalProcurementQuestion = questions.find(item => item.id === 'h2024-func-102');
if (!finalProcurementQuestion.sourceUrl.includes('BOE-A-2017-12902')) {
  throw new Error('h2024-func-102 no enlaza la Ley 9/2017 consolidada.');
}

const finalOrganizationQuestion = questions.find(item => item.id === 'h2024-func-103');
if (!finalOrganizationQuestion.sourceUrl.includes('BOE-A-2011-2544')) {
  throw new Error('h2024-func-103 no enlaza la Ley 16/2010 consolidada.');
}

const correctedFinalDigitalQuestion = questions.find(item => item.id === 'h2024-func-104');
if (correctedFinalDigitalQuestion.source !== 'Ley 4/2019, art. 16.2' || !correctedFinalDigitalQuestion.sourceUrl.includes('BOE-A-2019-13518')) {
  throw new Error('h2024-func-104 no conserva la referencia corregida a la Ley 4/2019.');
}

const negativeFinalEmploymentQuestion = questions.find(item => item.id === 'h2024-func-105');
if (!negativeFinalEmploymentQuestion.explanation.includes('se pregunta cuál no es un principio') || !negativeFinalEmploymentQuestion.sourceUrl.includes('BOE-A-2015-5677')) {
  throw new Error('h2024-func-105 no explica correctamente su formulación negativa ni enlaza la Ley 2/2015 consolidada.');
}

const currentHistoricalWorksSolvency = questions.find(item => item.id === 'h2024-pe-102');
if (!currentHistoricalWorksSolvency.sourceUrl.includes('BOE-A-2017-12902')) {
  throw new Error('h2024-pe-102 no enlaza la versión oficial consolidada de la Ley 9/2017.');
}

const currentHistoricalGalicianOrganization = questions.find(item => item.id === 'h2024-pe-105');
if (!currentHistoricalGalicianOrganization.sourceUrl.includes('BOE-A-2011-2544')) {
  throw new Error('h2024-pe-105 no enlaza la versión oficial consolidada de la Ley 16/2010.');
}

console.log('REVISIÓN JURÍDICA DE HISTÓRICOS OFICIALES');
console.log(`Preguntas revisadas acumuladas comprobadas: ${reviewedIds.length}`);
console.log('Explicación normativa y cuatro alternativas justificadas: OK');
console.log('RESULTADO: OK');
