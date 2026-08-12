const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
  assessImpact,
  normaliseReference,
  parseArgs,
  referenceMatches,
  resolveSource
} = require('./assess-normative-impact');

const root = path.resolve(__dirname, '..');
const index = JSON.parse(fs.readFileSync(path.join(root, 'docs', 'INDICE-NORMATIVO-PREGUNTAS.json'), 'utf8'));

assert.strictEqual(normaliseReference('art. 14.2'), '14.2');
assert.strictEqual(normaliseReference('Disposición adicional primera'), 'disposicion-adicional-primera');
assert.strictEqual(normaliseReference('Anexo I'), 'anexo-i');
assert.ok(referenceMatches('14', '14.2'), 'Una cita al artículo completo debe cubrir sus apartados.');
assert.ok(referenceMatches('14.2.a', '14.2'), 'Un cambio de apartado debe cubrir sus subapartados.');
assert.ok(referenceMatches('55-57', '56.2'), 'Un rango debe cubrir los artículos interiores.');
assert.ok(referenceMatches('56.1', '55-57'), 'Un cambio de rango debe cubrir citas interiores.');
assert.ok(referenceMatches('14.3', '14.2-14.4'), 'Los rangos de apartados deben interpretarse sin ampliar todo el artículo.');
assert.ok(!referenceMatches('14.9', '14.2-14.4'), 'Un rango de apartados no debe incluir apartados exteriores.');
assert.ok(!referenceMatches('14.2', '15'), 'No deben mezclarse artículos distintos.');
assert.ok(!referenceMatches('14.2', '14.3'), 'No deben mezclarse apartados distintos del mismo artículo.');
assert.deepStrictEqual(
  parseArgs(['--source', 'law39', '--articles', '14.2,16', '--json']),
  { articles: ['14.2', '16'], source: 'law39', json: true }
);

index.sources.forEach(source => {
  assert.ok(source.sourceAliases.length > 0, `La fuente ${source.sourceUrl} debe ser seleccionable por alias.`);
  source.sourceAliases.forEach(alias => assert.strictEqual(resolveSource(index, alias).sourceUrl, source.sourceUrl));
});

const law39Article = assessImpact(index, { source: 'law39', articles: ['14.2'] }, '2026-08-12');
assert.strictEqual(law39Article.summary.questionsLinkedToSource, 122);
assert.strictEqual(law39Article.summary.directReferenceMatches, 2);
assert.strictEqual(law39Article.summary.manualReviewSafeguards, 6);
assert.strictEqual(law39Article.summary.candidatesForHumanReview, 8);
assert.strictEqual(law39Article.summary.excludedByReferenceFilter, 120);
assert.strictEqual(law39Article.candidates.filter(candidate => candidate.selectionReason === 'REFERENCE_MATCH').length, 2);

const law39Whole = assessImpact(index, { source: 'law39' }, '2026-08-12');
assert.strictEqual(law39Whole.summary.candidatesForHumanReview, 128);
assert.strictEqual(law39Whole.summary.manualReviewSafeguards, 6);
assert.strictEqual(law39Whole.candidates.filter(candidate => candidate.selectionReason === 'SOURCE_WIDE_CHANGE').length, 122);

const contractsUnknownArticle = assessImpact(index, { source: 'lcspCurrent', articles: ['999'] }, '2026-08-12');
assert.strictEqual(contractsUnknownArticle.summary.directReferenceMatches, 0);
assert.strictEqual(contractsUnknownArticle.summary.wholeSourceSafeguards, 2);
assert.strictEqual(contractsUnknownArticle.summary.manualReviewSafeguards, 6);
assert.deepStrictEqual(
  contractsUnknownArticle.candidates.filter(candidate => candidate.selectionReason === 'WHOLE_SOURCE_SAFEGUARD').map(candidate => candidate.id),
  ['h2024-pe-029', 'h2024-pe-040']
);

const statuteChange = assessImpact(index, { source: 'statute', articles: ['15.1'] }, '2026-08-12');
assert.ok(statuteChange.summary.directReferenceMatches > 0);
assert.strictEqual(statuteChange.summary.manualReviewSafeguards, 6);
assert.ok(statuteChange.candidates.some(candidate => candidate.selectionReason === 'MANUAL_REVIEW_SAFEGUARD'));

assert.strictEqual(new Set(law39Whole.candidates.map(candidate => candidate.id)).size, law39Whole.candidates.length);
assert.ok(law39Article.candidates.every(candidate => law39Whole.candidates.some(all => all.id === candidate.id)));
assert.throws(() => resolveSource(index, 'fuente-inexistente'), /no existe/i);

console.log('IMPACTO NORMATIVO SELECTIVO');
console.log(`Ley 39/2015 completa: 122 vinculadas + 6 citas combinadas de seguridad.`);
console.log(`Ley 39/2015, art. 14.2: 2 coincidencias + 6 citas combinadas de seguridad.`);
console.log(`Ahorro de revisión en la simulación: ${law39Article.summary.excludedByReferenceFilter} preguntas no afectadas.`);
console.log('Salvaguardas de fuente completa y citas combinadas: OK');
console.log('RESULTADO: OK');
