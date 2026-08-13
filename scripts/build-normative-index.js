const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { readBankSource } = require('./lib/runtime-source');

const root = path.resolve(__dirname, '..');
const outputPath = path.join(root, 'docs', 'INDICE-NORMATIVO-PREGUNTAS.json');

function loadBank() {
  const source = readBankSource(root);
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    source +
      '\nglobalThis.auditQuestions = questions;' +
      '\nglobalThis.auditSources = officialSources;',
    context
  );
  return { questions: context.auditQuestions, officialSources: context.auditSources };
}

function unique(values) {
  return [...new Set(values)];
}

function sourceAliasesByUrl(officialSources) {
  const aliases = new Map();
  Object.entries(officialSources).forEach(([key, url]) => {
    aliases.set(url, [...(aliases.get(url) || []), key]);
  });
  return aliases;
}

function normaliseArticleToken(token) {
  return token
    .toLowerCase()
    .replace(/º/g, '')
    .replace(/\s+/g, '')
    .replace(/\)$/g, '')
    .replace(/bis$/i, 'bis');
}

function parseReference(sourceLabel) {
  const label = String(sourceLabel || '').trim();
  const specialReferences = [];
  if (/anexo\s+[ivxlcdm]+/i.test(label)) {
    specialReferences.push(label.match(/anexo\s+[ivxlcdm]+/i)[0].toLowerCase().replace(/\s+/g, '-'));
  }
  const disposition = label.match(/(?:disp\.?|disposici[oó]n)\s+(adic(?:ional)?|trans(?:itoria)?)\.?\s+([\wáéíóúüñ.-]+)/i);
  if (disposition) {
    specialReferences.push(`disposicion-${disposition[1].toLowerCase().startsWith('adic') ? 'adicional' : 'transitoria'}-${disposition[2].toLowerCase()}`);
  }

  const articleMarker = label.match(/\barts?\.?\s+/i);
  if (!articleMarker) {
    if (specialReferences.length) return { mappingStatus: 'EXACT', articles: specialReferences, reason: null };
    return { mappingStatus: 'WHOLE_SOURCE', articles: [], reason: 'La cita identifica la fuente completa, sin artículo concreto.' };
  }

  const tail = label.slice(articleMarker.index + articleMarker[0].length);
  const anotherNorm = /\b(?:constituci[oó]n|estatuto|ley(?:\s+org[aá]nica)?|trebep|rdl|real\s+decreto|decreto\s+legislativo)\b/i.test(tail);
  if (anotherNorm) {
    return { mappingStatus: 'MANUAL_REVIEW', articles: [], reason: 'La cita combina más de una norma y debe separarse manualmente.' };
  }

  const articlePattern = /\d+(?:\.\d+)*(?:\.[a-z])?(?:º)?(?:\s*bis)?(?:\s*-\s*\d+(?:\.\d+)*)?/gi;
  const articles = unique((tail.match(articlePattern) || []).map(normaliseArticleToken));
  if (!articles.length) {
    return { mappingStatus: 'MANUAL_REVIEW', articles: [], reason: 'Existe marcador de artículo, pero no se pudo interpretar con seguridad.' };
  }
  return { mappingStatus: 'EXACT', articles: unique([...articles, ...specialReferences]), reason: null };
}

function reviewMetadata(question) {
  const quality = String(question.quality || '');
  const contrastedDate = quality.match(/contrastad[oa]\s+(\d{2})\/(\d{2})\/(\d{4})/i);
  const reviewedOn = contrastedDate ? `${contrastedDate[3]}-${contrastedDate[2]}-${contrastedDate[1]}` : null;
  let legalStatus = 'CURRENT_OR_UNSPECIFIED';
  if (/norma derogada|\(derogado\)/i.test(`${quality} ${question.source}`)) legalStatus = 'HISTORICAL_REPEALED';
  else if (/hist[oó]rica oficial/i.test(quality)) legalStatus = 'HISTORICAL_OFFICIAL';
  return {
    legalStatus,
    reviewedOn,
    reviewDateStatus: reviewedOn ? 'DOCUMENTED' : 'NOT_DOCUMENTED',
    qualityLabel: quality
  };
}

function buildIndex(questions, officialSources, generatedOn = new Date().toISOString().slice(0, 10)) {
  const aliasesByUrl = sourceAliasesByUrl(officialSources);
  const indexedQuestions = questions.map(question => {
    const parsed = parseReference(question.source);
    return {
      id: question.id,
      topic: question.topic,
      sourceAliases: aliasesByUrl.get(question.sourceUrl) || [],
      sourceUrl: question.sourceUrl,
      sourceLabel: question.source,
      mappingStatus: parsed.mappingStatus,
      articles: parsed.articles,
      mappingReason: parsed.reason,
      ...reviewMetadata(question)
    };
  });

  const sourceGroups = new Map();
  indexedQuestions.forEach(question => {
    const group = sourceGroups.get(question.sourceUrl) || {
      sourceUrl: question.sourceUrl,
      sourceAliases: question.sourceAliases,
      questionIds: [],
      exactArticleQuestions: 0,
      wholeSourceQuestions: 0,
      manualReviewQuestions: 0
    };
    group.questionIds.push(question.id);
    if (question.mappingStatus === 'EXACT') group.exactArticleQuestions += 1;
    if (question.mappingStatus === 'WHOLE_SOURCE') group.wholeSourceQuestions += 1;
    if (question.mappingStatus === 'MANUAL_REVIEW') group.manualReviewQuestions += 1;
    sourceGroups.set(question.sourceUrl, group);
  });

  const count = status => indexedQuestions.filter(question => question.mappingStatus === status).length;
  const documentedReviewDates = indexedQuestions.filter(question => question.reviewedOn).length;
  return {
    schemaVersion: 1,
    generatedOn,
    generatedFrom: ['question-bank.js', 'historical-reviews.js'],
    purpose: 'Localizar preguntas potencialmente afectadas por cambios normativos sin declarar automáticamente su vigencia.',
    safetyRule: 'Una coincidencia crea una lista de revisión humana; nunca corrige, valida ni retira preguntas por sí sola.',
    summary: {
      totalQuestions: indexedQuestions.length,
      differentiatedSources: sourceGroups.size,
      exactArticleQuestions: count('EXACT'),
      wholeSourceQuestions: count('WHOLE_SOURCE'),
      manualReviewQuestions: count('MANUAL_REVIEW'),
      documentedReviewDates,
      undocumentedReviewDates: indexedQuestions.length - documentedReviewDates
    },
    sources: [...sourceGroups.values()].sort((a, b) => a.sourceUrl.localeCompare(b.sourceUrl)),
    questions: indexedQuestions
  };
}

function writeIndex(index, destination = outputPath) {
  fs.writeFileSync(destination, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
}

if (require.main === module) {
  const { questions, officialSources } = loadBank();
  const index = buildIndex(questions, officialSources);
  writeIndex(index);
  console.log('ÍNDICE NORMATIVO DE PREGUNTAS');
  console.log(`Preguntas inventariadas: ${index.summary.totalQuestions}`);
  console.log(`Fuentes diferenciadas: ${index.summary.differentiatedSources}`);
  console.log(`Mapeo exacto: ${index.summary.exactArticleQuestions}`);
  console.log(`Fuente completa: ${index.summary.wholeSourceQuestions}`);
  console.log(`Revisión manual de referencia: ${index.summary.manualReviewQuestions}`);
  console.log(`Salida: ${path.relative(root, outputPath)}`);
}

module.exports = { buildIndex, loadBank, normaliseArticleToken, parseReference, reviewMetadata, writeIndex, outputPath };
