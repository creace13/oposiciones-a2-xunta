// Modo de escucha Beta. No registra intentos ni modifica el progreso.

function audioLanguageForQuestion(question) {
  return /^h\d{4}-/.test(String(question?.id || '')) ? 'gl-ES' : 'es-ES';
}

function buildAudioStudySegments(question) {
  const questionLanguage = audioLanguageForQuestion(question);
  const correctOption = question.options[question.correct];
  return [
    { kind: 'question', lang: questionLanguage, text: question.text },
    ...question.options.map(([letter, text]) => ({ kind: 'option', lang: questionLanguage, text: `Opción ${letter}. ${text}` })),
    { kind: 'solution-label', lang: 'es-ES', text: `La respuesta correcta es la opción ${correctOption[0]}.` },
    { kind: 'solution', lang: questionLanguage, text: correctOption[1] },
    { kind: 'explanation', lang: 'es-ES', text: `Explicación. ${question.explanation}` }
  ];
}

function selectAudioVoice(voices, language) {
  const requested = String(language || '').toLowerCase();
  const base = requested.split('-')[0];
  const candidates = Array.from(voices || []).filter(voice => {
    const voiceLanguage = String(voice.lang || '').toLowerCase();
    return voiceLanguage === requested || voiceLanguage.split('-')[0] === base;
  });
  return candidates.find(voice => voice.localService && String(voice.lang).toLowerCase() === requested)
    || candidates.find(voice => String(voice.lang).toLowerCase() === requested)
    || candidates.find(voice => voice.localService)
    || candidates[0]
    || null;
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  let audioQuestions = [];
  let audioQuestionIndex = 0;
  let audioRunId = 0;
  let audioSegmentResolver = null;
  let audioDelayResolver = null;
  let audioDelayTimer = null;
  let audioIsPaused = false;
  let audioIsPlaying = false;
  let audioSpeechRate = 1;

  function getSpeechEngine() {
    return window.speechSynthesis || null;
  }

  function availableAudioVoices() {
    const engine = getSpeechEngine();
    return engine && typeof engine.getVoices === 'function' ? engine.getVoices() : [];
  }

  function settleAudioSegment(value) {
    if (!audioSegmentResolver) return;
    const resolve = audioSegmentResolver;
    audioSegmentResolver = null;
    resolve(value);
  }

  function settleAudioDelay(value) {
    if (audioDelayTimer) window.clearTimeout(audioDelayTimer);
    audioDelayTimer = null;
    if (!audioDelayResolver) return;
    const resolve = audioDelayResolver;
    audioDelayResolver = null;
    resolve(value);
  }

  function cancelAudioSpeech() {
    audioRunId += 1;
    settleAudioSegment(false);
    settleAudioDelay(false);
    const engine = getSpeechEngine();
    if (engine) engine.cancel();
    audioIsPaused = false;
    audioIsPlaying = false;
  }

  function audioRate() {
    return audioSpeechRate;
  }

  function voiceAvailabilityLabel(question) {
    const voices = availableAudioVoices();
    const needsGalician = audioLanguageForQuestion(question) === 'gl-ES';
    const galician = selectAudioVoice(voices, 'gl-ES');
    const spanish = selectAudioVoice(voices, 'es-ES');
    if (!voices.length) return 'El dispositivo elegirá la voz disponible.';
    if (needsGalician && (!galician || !String(galician.lang).toLowerCase().startsWith('gl'))) {
      return 'No se detectó voz gallega; el dispositivo usará la alternativa disponible.';
    }
    if (needsGalician) return `Voz gallega: ${galician.name}. Explicación en ${spanish?.name || 'voz española del dispositivo'}.`;
    return `Voz de lectura: ${spanish?.name || 'voz española del dispositivo'}.`;
  }

  function renderAudioStudy() {
    const card = document.getElementById('quizCard');
    const question = audioQuestions[audioQuestionIndex];
    if (!card || !question) return;
    const pausedLabel = audioIsPaused ? 'Continuar' : 'Pausar';
    card.innerHTML = `<div class="quiz-meta"><span>Modo escucha · Beta</span><span>Pregunta ${audioQuestionIndex + 1} de ${audioQuestions.length}</span></div><div class="quiz-body audio-study-body"><div class="question-topic">ESCUCHA PASIVA · NO MODIFICA TU PROGRESO</div><h2 class="question-text">${escapeHTML(question.text)}</h2><ol class="audio-option-list">${question.options.map(([letter, text]) => `<li><strong>${escapeHTML(letter)}.</strong> ${escapeHTML(text)}</li>`).join('')}</ol><div class="audio-study-status" id="audioStudyStatus" role="status" aria-live="polite">${audioIsPaused ? 'Lectura en pausa.' : (audioIsPlaying ? 'Leyendo en voz alta…' : 'Preparada para escuchar.')}</div><p class="audio-voice-note" id="audioVoiceNote">${escapeHTML(voiceAvailabilityLabel(question))}</p><label class="audio-rate-control">Velocidad<select id="audioStudyRate"><option value="0.85"${audioSpeechRate === 0.85 ? ' selected' : ''}>Lenta</option><option value="1"${audioSpeechRate === 1 ? ' selected' : ''}>Normal</option><option value="1.15"${audioSpeechRate === 1.15 ? ' selected' : ''}>Ágil</option><option value="1.3"${audioSpeechRate === 1.3 ? ' selected' : ''}>Rápida</option></select></label><p class="audio-beta-warning">Beta comprobable en Windows 11 y Android. Mantén la aplicación abierta. iPhone todavía no está validado.</p></div><div class="quiz-footer audio-study-footer"><span>Esta escucha no cuenta como respuesta ni como sesión evaluada.</span><div class="audio-study-controls"><button type="button" class="secondary-button audio-previous">Anterior</button><button type="button" class="secondary-button audio-repeat">Repetir</button><button type="button" class="secondary-button audio-pause">${pausedLabel}</button><button type="button" class="secondary-button audio-next">Siguiente</button><button type="button" class="primary-button audio-finish">Terminar escucha</button></div></div>`;

    card.querySelector('.audio-previous').addEventListener('click', () => changeAudioQuestion(-1));
    card.querySelector('.audio-repeat').addEventListener('click', () => playCurrentAudioQuestion());
    card.querySelector('.audio-pause').addEventListener('click', toggleAudioPause);
    card.querySelector('.audio-next').addEventListener('click', () => changeAudioQuestion(1));
    card.querySelector('.audio-finish').addEventListener('click', finishAudioStudy);
    card.querySelector('#audioStudyRate').addEventListener('change', event => {
      audioSpeechRate = Number(event.currentTarget.value);
      playCurrentAudioQuestion();
    });
  }

  function updateAudioStatus(message) {
    const status = document.getElementById('audioStudyStatus');
    if (status) status.textContent = message;
  }

  function speakAudioSegment(segment, runId) {
    return new Promise(resolve => {
      const engine = getSpeechEngine();
      if (!engine || runId !== audioRunId) return resolve(false);
      const utterance = new window.SpeechSynthesisUtterance(segment.text);
      utterance.lang = segment.lang;
      utterance.rate = audioRate();
      const voice = selectAudioVoice(availableAudioVoices(), segment.lang);
      if (voice) utterance.voice = voice;
      audioSegmentResolver = resolve;
      utterance.onend = () => settleAudioSegment(runId === audioRunId);
      utterance.onerror = () => settleAudioSegment(false);
      engine.speak(utterance);
    });
  }

  function waitDuringAudio(milliseconds, runId) {
    return new Promise(resolve => {
      if (runId !== audioRunId) return resolve(false);
      audioDelayResolver = resolve;
      audioDelayTimer = window.setTimeout(() => {
        audioDelayTimer = null;
        audioDelayResolver = null;
        resolve(runId === audioRunId);
      }, milliseconds);
    });
  }

  async function playCurrentAudioQuestion() {
    cancelAudioSpeech();
    const engine = getSpeechEngine();
    const question = audioQuestions[audioQuestionIndex];
    if (!question) return;
    if (!engine || typeof window.SpeechSynthesisUtterance !== 'function') {
      updateAudioStatus('Este navegador no ofrece lectura en voz alta. Prueba con Chrome o Edge actualizado.');
      return;
    }

    const runId = audioRunId;
    audioIsPlaying = true;
    renderAudioStudy();
    const segments = buildAudioStudySegments(question);
    for (let index = 0; index < segments.length; index += 1) {
      if (runId !== audioRunId) return;
      if (segments[index].kind === 'solution-label') {
        updateAudioStatus('Pausa para pensar…');
        if (!await waitDuringAudio(3500, runId)) return;
      }
      updateAudioStatus(segments[index].kind === 'explanation' ? 'Leyendo la explicación…' : 'Leyendo en voz alta…');
      if (!await speakAudioSegment(segments[index], runId)) return;
    }

    if (runId !== audioRunId) return;
    if (audioQuestionIndex < audioQuestions.length - 1) {
      updateAudioStatus('Pasando a la siguiente pregunta…');
      if (!await waitDuringAudio(1500, runId)) return;
      audioQuestionIndex += 1;
      await playCurrentAudioQuestion();
      return;
    }
    audioIsPlaying = false;
    updateAudioStatus('Escucha completada. Tu progreso evaluado no ha cambiado.');
  }

  function toggleAudioPause() {
    const engine = getSpeechEngine();
    if (!engine || !audioIsPlaying) return;
    if (audioIsPaused) {
      engine.resume();
      audioIsPaused = false;
      updateAudioStatus('Lectura reanudada.');
    } else {
      engine.pause();
      audioIsPaused = true;
      updateAudioStatus('Lectura en pausa.');
    }
    const button = document.querySelector('.audio-pause');
    if (button) button.textContent = audioIsPaused ? 'Continuar' : 'Pausar';
  }

  function changeAudioQuestion(offset) {
    const target = Math.max(0, Math.min(audioQuestions.length - 1, audioQuestionIndex + offset));
    audioQuestionIndex = target;
    playCurrentAudioQuestion();
  }

  function startAudioStudy(set) {
    cancelAudioSpeech();
    audioQuestions = Array.from(set || []).filter(Boolean);
    audioQuestionIndex = 0;
    if (!audioQuestions.length) return;
    showView('practice');
    document.getElementById('practiceSetup').parentElement.classList.add('hidden');
    document.getElementById('quizCard').classList.remove('hidden');
    renderAudioStudy();
    playCurrentAudioQuestion();
  }

  function resetAudioStudy() {
    cancelAudioSpeech();
    audioQuestions = [];
    const card = document.getElementById('quizCard');
    if (card) card.classList.add('hidden');
    const setup = document.getElementById('practiceSetup');
    if (setup) setup.parentElement.classList.remove('hidden');
  }

  function finishAudioStudy() {
    resetAudioStudy();
    showView('practice');
  }

  window.startAudioStudy = startAudioStudy;
  window.stopAudioStudy = resetAudioStudy;

  const startButton = document.getElementById('audioStudyStart');
  if (startButton) {
    startButton.addEventListener('click', () => startAudioStudy(buildSet(
      document.getElementById('topicSelect').value,
      document.getElementById('lengthSelect').value
    )));
  }
  window.addEventListener('hashchange', () => {
    if (viewFromHash() !== 'practice' && audioQuestions.length) resetAudioStudy();
  });
  document.addEventListener('click', event => {
    const navigation = event.target.closest('.nav-link,[data-view-target]');
    const destination = navigation?.dataset.view || navigation?.dataset.viewTarget;
    if (destination && destination !== 'practice' && audioQuestions.length) resetAudioStudy();
  });
  window.addEventListener('pagehide', resetAudioStudy);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { audioLanguageForQuestion, buildAudioStudySegments, selectAudioVoice };
}
