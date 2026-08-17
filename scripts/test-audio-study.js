const assert = require('assert');
const {
  audioLanguageForQuestion,
  buildAudioStudySegments,
  selectAudioVoice
} = require('../audio-study.js');

console.log('--- MODO DE ESCUCHA BETA ---');

const spanishQuestion = {
  id: 'procedimiento-audio-test',
  text: '¿Cuál es la respuesta correcta?',
  options: [['A', 'Primera'], ['B', 'Segunda'], ['C', 'Tercera'], ['D', 'Cuarta']],
  correct: 1,
  explanation: 'La segunda alternativa es la correcta.'
};
const galicianQuestion = {
  ...spanishQuestion,
  id: 'h2025-001',
  text: 'Cal é a resposta correcta?',
  options: [['A', 'Primeira'], ['B', 'Segunda'], ['C', 'Terceira'], ['D', 'Cuarta']]
};

const originalSpanish = JSON.stringify(spanishQuestion);
const spanishSegments = buildAudioStudySegments(spanishQuestion);
const galicianSegments = buildAudioStudySegments(galicianQuestion);

assert.strictEqual(audioLanguageForQuestion(spanishQuestion), 'es-ES', 'Las preguntas propias deben solicitar voz española.');
assert.strictEqual(audioLanguageForQuestion(galicianQuestion), 'gl-ES', 'Las preguntas históricas deben solicitar voz gallega.');
assert.strictEqual(spanishSegments.length, 8, 'Deben leerse pregunta, cuatro opciones, solución, texto correcto y explicación.');
assert.deepStrictEqual(spanishSegments.map(segment => segment.kind), ['question', 'option', 'option', 'option', 'option', 'solution-label', 'solution', 'explanation']);
assert.strictEqual(spanishSegments[5].text, 'La respuesta correcta es la opción B.');
assert.strictEqual(spanishSegments[6].text, 'Segunda');
assert.ok(spanishSegments[7].text.includes(spanishQuestion.explanation), 'La explicación debe formar parte de la escucha.');
assert.strictEqual(galicianSegments[0].lang, 'gl-ES');
assert.strictEqual(galicianSegments[4].lang, 'gl-ES');
assert.strictEqual(galicianSegments[5].lang, 'es-ES');
assert.strictEqual(galicianSegments[6].lang, 'gl-ES');
assert.strictEqual(galicianSegments[7].lang, 'es-ES');
assert.strictEqual(JSON.stringify(spanishQuestion), originalSpanish, 'Construir la lectura no debe modificar la pregunta.');

const voices = [
  { name: 'Español remoto', lang: 'es-ES', localService: false },
  { name: 'Español local', lang: 'es-ES', localService: true },
  { name: 'Galego local', lang: 'gl-ES', localService: true }
];
assert.strictEqual(selectAudioVoice(voices, 'es-ES').name, 'Español local', 'Debe priorizarse la voz local exacta.');
assert.strictEqual(selectAudioVoice(voices, 'gl-ES').name, 'Galego local', 'Debe seleccionarse la voz gallega cuando exista.');
assert.strictEqual(selectAudioVoice(voices, 'fr-FR'), null, 'No debe fingirse una voz que el dispositivo no ofrece.');

console.log('Idiomas, orden de lectura, voz local y banco inmutable: OK');
