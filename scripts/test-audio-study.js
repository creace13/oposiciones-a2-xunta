const assert = require('assert');
const {
  AUDIO_RATE_PRESETS,
  normalizeAudioRate,
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
assert.strictEqual(spanishSegments.length, 3, 'La lectura debe agrupar enunciado y opciones para evitar cortes del sintetizador.');
assert.deepStrictEqual(spanishSegments.map(segment => segment.kind), ['prompt', 'solution', 'explanation']);
assert.ok(spanishSegments[0].text.startsWith(spanishQuestion.text), 'El bloque inicial debe comenzar por la pregunta.');
assert.ok(spanishSegments[0].text.includes('Opción A. Primera'), 'El bloque inicial debe incluir la opción A sin depender de otra locución.');
assert.ok(spanishSegments[0].text.includes('Opción D. Cuarta'), 'El bloque inicial debe incluir la opción D sin depender de otra locución.');
assert.strictEqual(spanishSegments[1].text, 'La respuesta correcta es la opción B. Segunda');
assert.ok(spanishSegments[2].text.includes(spanishQuestion.explanation), 'La explicación debe formar parte de la escucha.');
assert.strictEqual(galicianSegments[0].lang, 'gl-ES');
assert.strictEqual(galicianSegments[1].lang, 'gl-ES');
assert.strictEqual(galicianSegments[2].lang, 'es-ES');
assert.strictEqual(JSON.stringify(spanishQuestion), originalSpanish, 'Construir la lectura no debe modificar la pregunta.');
assert.deepStrictEqual(AUDIO_RATE_PRESETS, [0.6, 1, 1.4, 1.8], 'Las velocidades deben ser suficientemente distintas para resultar audibles.');
assert.strictEqual(normalizeAudioRate('0.6'), 0.6, 'La velocidad lenta debe conservarse.');
assert.strictEqual(normalizeAudioRate('1.8'), 1.8, 'La velocidad rápida debe conservarse.');
assert.strictEqual(normalizeAudioRate('valor-invalido'), 1, 'Un valor inválido debe volver a velocidad normal.');

const voices = [
  { name: 'Español remoto', lang: 'es-ES', localService: false },
  { name: 'Español local', lang: 'es-ES', localService: true },
  { name: 'Galego local', lang: 'gl-ES', localService: true }
];
assert.strictEqual(selectAudioVoice(voices, 'es-ES').name, 'Español local', 'Debe priorizarse la voz local exacta.');
assert.strictEqual(selectAudioVoice(voices, 'gl-ES').name, 'Galego local', 'Debe seleccionarse la voz gallega cuando exista.');
assert.strictEqual(selectAudioVoice(voices, 'fr-FR'), null, 'No debe fingirse una voz que el dispositivo no ofrece.');

console.log('Idiomas, orden, velocidades, voz local y banco inmutable: OK');
