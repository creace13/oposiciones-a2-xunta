const fs = require('fs');
const assert = require('assert');
const {
  buildIndex,
  loadBank,
  outputPath,
  parseReference
} = require('./build-normative-index');

const { questions, officialSources } = loadBank();
assert.ok(fs.existsSync(outputPath), 'Debe existir el índice generado.');
const written = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
assert.match(written.generatedOn, /^\d{4}-\d{2}-\d{2}$/, 'La fecha de generación debe ser trazable.');
const index = buildIndex(questions, officialSources, written.generatedOn);

assert.strictEqual(index.summary.totalQuestions, 1522, 'El índice debe cubrir las 1.522 preguntas.');
assert.strictEqual(index.questions.length, questions.length, 'Cada pregunta debe tener una entrada en el índice.');
assert.strictEqual(new Set(index.questions.map(question => question.id)).size, questions.length, 'No puede haber IDs duplicados.');
assert.strictEqual(index.summary.differentiatedSources, 32, 'El inventario debe conservar las 32 fuentes diferenciadas actuales.');
assert.strictEqual(
  index.summary.exactArticleQuestions + index.summary.wholeSourceQuestions + index.summary.manualReviewQuestions,
  questions.length,
  'Todos los registros deben quedar clasificados.'
);
assert.ok(index.questions.every(question => question.sourceUrl && question.sourceLabel), 'Ninguna entrada puede perder su fuente.');
assert.ok(index.questions.every(question => ['EXACT', 'WHOLE_SOURCE', 'MANUAL_REVIEW'].includes(question.mappingStatus)), 'Estado de mapeo desconocido.');

assert.deepStrictEqual(parseReference('Ley 39/2015, art. 14.2').articles, ['14.2']);
assert.deepStrictEqual(parseReference('Ley 16/2010, art. 25.1 y 25.2').articles, ['25.1', '25.2']);
assert.deepStrictEqual(parseReference('Ley 9/2007, art. 55-57').articles, ['55-57']);
assert.deepStrictEqual(parseReference('Ley 7/2023, disp. adic. primera').articles, ['disposicion-adicional-primera']);
assert.strictEqual(parseReference('Ley 9/2017').mappingStatus, 'WHOLE_SOURCE');
assert.strictEqual(
  parseReference('Estatuto de autonomía para Galicia, art. 15.1, y Ley 1/1983, art. 10').mappingStatus,
  'MANUAL_REVIEW'
);

const law39Url = officialSources.law39;
const law39All = index.questions.filter(question => question.sourceUrl === law39Url);
const law39Article14 = index.questions.filter(question => question.sourceUrl === law39Url && question.articles.includes('14.2'));
assert.ok(law39All.length > 100, 'La Ley 39/2015 debe tener un conjunto amplio de preguntas.');
assert.ok(law39Article14.length > 0, 'Debe localizar preguntas concretas del artículo 14.2.');
assert.ok(law39Article14.length < law39All.length, 'El filtro por artículo debe evitar revisar toda la ley.');

assert.strictEqual(written.summary.totalQuestions, questions.length, 'El archivo generado no coincide con el banco.');
assert.deepStrictEqual(written, JSON.parse(JSON.stringify(index)), 'El índice generado está desactualizado respecto al banco.');

console.log('ÍNDICE NORMATIVO SELECTIVO');
console.log(`Preguntas: ${index.summary.totalQuestions}`);
console.log(`Fuentes: ${index.summary.differentiatedSources}`);
console.log(`Mapeo exacto: ${index.summary.exactArticleQuestions}`);
console.log(`Fuente completa: ${index.summary.wholeSourceQuestions}`);
console.log(`Revisión manual: ${index.summary.manualReviewQuestions}`);
console.log(`Ejemplo Ley 39/2015: ${law39Article14.length} del artículo 14.2 frente a ${law39All.length} de toda la norma.`);
console.log('RESULTADO: OK');
