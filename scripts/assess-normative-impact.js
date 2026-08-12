const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const defaultIndexPath = path.join(root, 'docs', 'INDICE-NORMATIVO-PREGUNTAS.json');

function unique(values) {
  return [...new Set(values)];
}

function normaliseReference(value) {
  const raw = String(value || '').trim().toLowerCase();
  if (!raw) return '';
  const disposition = raw.match(/(?:disp\.?|disposici[oó]n)\s+(adic(?:ional)?|trans(?:itoria)?)\.?\s+([\wáéíóúüñ.-]+)/i);
  if (disposition) {
    return `disposicion-${disposition[1].startsWith('adic') ? 'adicional' : 'transitoria'}-${disposition[2]}`;
  }
  const annex = raw.match(/anexo\s+([ivxlcdm]+)/i);
  if (annex) return `anexo-${annex[1]}`;
  return raw
    .replace(/^arts?\.?\s*/i, '')
    .replace(/º/g, '')
    .replace(/\s+/g, '')
    .replace(/\)$/g, '');
}

function numericRange(reference) {
  const match = String(reference).match(/^(\d+(?:\.\d+)*)(?:\.[a-z])?(?:bis)?(?:-(\d+(?:\.\d+)*))?$/i);
  if (!match) return null;
  const start = match[1].split('.').map(Number);
  const end = (match[2] || match[1]).split('.').map(Number);
  return { start, end, hasRange: Boolean(match[2]) };
}

function comparePaths(left, right) {
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    const difference = (left[index] || 0) - (right[index] || 0);
    if (difference) return difference;
  }
  return 0;
}

function pathIsPrefix(prefix, value) {
  return prefix.length < value.length && prefix.every((part, index) => part === value[index]);
}

function hierarchicalMatch(left, right) {
  return left === right || left.startsWith(`${right}.`) || right.startsWith(`${left}.`);
}

function referenceMatches(questionReference, changedReference) {
  const question = normaliseReference(questionReference);
  const changed = normaliseReference(changedReference);
  if (!question || !changed) return false;
  if (hierarchicalMatch(question, changed)) return true;
  const questionRange = numericRange(question);
  const changedRange = numericRange(changed);
  if (!questionRange || !changedRange) return false;
  if (!questionRange.hasRange && !changedRange.hasRange) return false;
  if (pathIsPrefix(questionRange.start, changedRange.start) || pathIsPrefix(changedRange.start, questionRange.start)) return true;
  return comparePaths(questionRange.start, changedRange.end) <= 0 && comparePaths(changedRange.start, questionRange.end) <= 0;
}

function resolveSource(index, sourceInput) {
  const sought = String(sourceInput || '').trim();
  if (!sought) throw new Error('Falta la fuente. Usa --source con un alias o una URL del índice.');
  const matches = index.sources.filter(source =>
    source.sourceUrl === sought || source.sourceAliases.some(alias => alias.toLowerCase() === sought.toLowerCase())
  );
  if (!matches.length) throw new Error(`La fuente "${sought}" no existe en el índice normativo.`);
  if (matches.length > 1) throw new Error(`La fuente "${sought}" no es unívoca. Usa su URL exacta.`);
  return matches[0];
}

function assessImpact(index, change, generatedOn = new Date().toISOString().slice(0, 10)) {
  const source = resolveSource(index, change.source);
  const changedArticles = unique((change.articles || []).map(normaliseReference).filter(Boolean));
  const sourceQuestions = index.questions.filter(question => question.sourceUrl === source.sourceUrl);
  const manualSafeguards = index.questions.filter(question => question.mappingStatus === 'MANUAL_REVIEW');
  const reviewPool = unique([...sourceQuestions, ...manualSafeguards].map(question => question.id))
    .map(id => index.questions.find(question => question.id === id));
  const sourceWide = changedArticles.length === 0;
  const candidates = [];

  reviewPool.forEach(question => {
    const belongsToSelectedSource = question.sourceUrl === source.sourceUrl;
    let selectionReason = null;
    let matchedReferences = [];
    if (question.mappingStatus === 'MANUAL_REVIEW') {
      selectionReason = 'MANUAL_REVIEW_SAFEGUARD';
    } else if (sourceWide && belongsToSelectedSource) {
      selectionReason = 'SOURCE_WIDE_CHANGE';
    } else if (belongsToSelectedSource && question.mappingStatus === 'WHOLE_SOURCE') {
      selectionReason = 'WHOLE_SOURCE_SAFEGUARD';
    } else if (belongsToSelectedSource) {
      matchedReferences = question.articles.filter(questionReference =>
        changedArticles.some(changedReference => referenceMatches(questionReference, changedReference))
      );
      if (matchedReferences.length) selectionReason = 'REFERENCE_MATCH';
    }
    if (!selectionReason) return;
    candidates.push({
      id: question.id,
      topic: question.topic,
      sourceUrl: question.sourceUrl,
      sourceAliases: question.sourceAliases,
      sourceLabel: question.sourceLabel,
      mappingStatus: question.mappingStatus,
      citedReferences: question.articles,
      matchedReferences,
      legalStatus: question.legalStatus,
      reviewedOn: question.reviewedOn,
      selectionReason
    });
  });

  const countReason = reason => candidates.filter(candidate => candidate.selectionReason === reason).length;
  return {
    schemaVersion: 1,
    generatedOn,
    type: 'NORMATIVE_IMPACT_CANDIDATES',
    safetyRule: 'Esta lista señala preguntas potencialmente afectadas. No declara vigencia, no corrige y no retira contenido automáticamente.',
    change: {
      sourceInput: change.source,
      sourceUrl: source.sourceUrl,
      sourceAliases: source.sourceAliases,
      scope: sourceWide ? 'WHOLE_SOURCE' : 'SPECIFIC_REFERENCES',
      changedReferences: changedArticles,
      officialNoticeUrl: change.officialNoticeUrl || null,
      effectiveOn: change.effectiveOn || null,
      note: change.note || null
    },
    summary: {
      questionsLinkedToSource: sourceQuestions.length,
      candidatesForHumanReview: candidates.length,
      directReferenceMatches: countReason('REFERENCE_MATCH'),
      wholeSourceSafeguards: countReason('WHOLE_SOURCE_SAFEGUARD'),
      manualReviewSafeguards: countReason('MANUAL_REVIEW_SAFEGUARD'),
      excludedByReferenceFilter: sourceQuestions.length - candidates.filter(candidate => candidate.sourceUrl === source.sourceUrl).length
    },
    candidates
  };
}

function parseArgs(args) {
  const parsed = { articles: [] };
  for (let index = 0; index < args.length; index += 1) {
    const key = args[index];
    if (key === '--json') parsed.json = true;
    else if (key === '--list-sources') parsed.listSources = true;
    else if (key === '--source') parsed.source = args[++index];
    else if (key === '--articles') parsed.articles = String(args[++index] || '').split(',');
    else if (key === '--notice-url') parsed.officialNoticeUrl = args[++index];
    else if (key === '--effective-on') parsed.effectiveOn = args[++index];
    else if (key === '--note') parsed.note = args[++index];
    else if (key === '--output') parsed.output = args[++index];
    else throw new Error(`Argumento no reconocido: ${key}`);
  }
  return parsed;
}

function printHumanReport(report) {
  console.log('LISTA DE REVISIÓN NORMATIVA');
  console.log(`Fuente: ${report.change.sourceAliases.join(', ')} (${report.change.sourceUrl})`);
  console.log(`Cambio: ${report.change.scope === 'WHOLE_SOURCE' ? 'norma completa' : report.change.changedReferences.join(', ')}`);
  console.log(`Preguntas vinculadas a la fuente: ${report.summary.questionsLinkedToSource}`);
  console.log(`Candidatas a revisión humana: ${report.summary.candidatesForHumanReview}`);
  console.log(`Coincidencia directa: ${report.summary.directReferenceMatches}`);
  console.log(`Incluidas por seguridad: ${report.summary.wholeSourceSafeguards + report.summary.manualReviewSafeguards}`);
  report.candidates.forEach(candidate => console.log(`- ${candidate.id} [${candidate.selectionReason}]`));
  console.log('No se ha modificado ni retirado ninguna pregunta.');
}

if (require.main === module) {
  try {
    const args = parseArgs(process.argv.slice(2));
    const index = JSON.parse(fs.readFileSync(defaultIndexPath, 'utf8'));
    if (args.listSources) {
      index.sources.forEach(source => console.log(`${source.sourceAliases.join(', ')}\t${source.sourceUrl}`));
      process.exit(0);
    }
    const report = assessImpact(index, args);
    if (args.output) {
      const destination = path.resolve(process.cwd(), args.output);
      fs.writeFileSync(destination, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
    }
    if (args.json) console.log(JSON.stringify(report, null, 2));
    else printHumanReport(report);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { assessImpact, comparePaths, normaliseReference, numericRange, parseArgs, referenceMatches, resolveSource };
