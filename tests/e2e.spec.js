const { test, expect } = require('@playwright/test');

test.describe('Recorridos E2E en Chromium y WebKit (escritorio y perfiles móviles)', () => {

  test.beforeEach(async ({ context, page }) => {
    // Establecer perfil guardado para mantener sesión autenticada en navegación
    await context.addInitScript(() => {
      window.localStorage.setItem('opoA2UserName', 'Merce');
      window.__audioTestState = { spoken: [], pauseCalls: 0, resumeCalls: 0, cancelCalls: 0 };
      class MockSpeechSynthesisUtterance {
        constructor(text) { this.text = text; }
      }
      const mockSpeechSynthesis = {
        paused: false,
        getVoices: () => [
          { name: 'Español local', lang: 'es-ES', localService: true, default: true },
          { name: 'Galego local', lang: 'gl-ES', localService: true, default: false }
        ],
        speak(utterance) {
          window.__audioTestState.spoken.push({ text: utterance.text, lang: utterance.lang, rate: utterance.rate });
          window.setTimeout(() => utterance.onend?.(), 0);
        },
        cancel() { window.__audioTestState.cancelCalls += 1; },
        pause() { this.paused = true; window.__audioTestState.pauseCalls += 1; },
        resume() { this.paused = false; window.__audioTestState.resumeCalls += 1; }
      };
      Object.defineProperty(window, 'SpeechSynthesisUtterance', { value: MockSpeechSynthesisUtterance, configurable: true });
      Object.defineProperty(window, 'speechSynthesis', { value: mockSpeechSynthesis, configurable: true });
    });
    await page.goto('/');
  });

  test('1. Acceso en modo invitado y persistencia de perfil local', async ({ page }) => {
    // Verificación de atributos del DOM
    await expect(page.locator('html')).toHaveAttribute('data-auth-state', 'authenticated');
    await expect(page.locator('html')).toHaveAttribute('data-auth-mode', 'guest');

    // Recargar la página y verificar persistencia en localStorage
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-auth-state', 'authenticated');
    await expect(page.locator('html')).toHaveAttribute('data-auth-mode', 'guest');
  });

  test('1b. El panel separa hoy, esta semana y el histórico', async ({ page }) => {
    const now = new Date();
    const old = new Date(now);
    old.setDate(old.getDate() - 15);
    await page.evaluate(({ today, previous }) => {
      localStorage.setItem('opoA2State', JSON.stringify({
        version: 2,
        goals: [],
        answered: [
          { id: 'procedimiento-1', correct: true, answeredAt: today },
          { id: 'procedimiento-2', correct: false, answeredAt: previous },
          { id: 'galicia-1', correct: true }
        ],
        errors: ['procedimiento-2'],
        sessions: 9,
        sessionHistory: [today, previous],
        current: []
      }));
    }, { today: now.toISOString(), previous: old.toISOString() });
    await page.reload();

    await expect(page.locator('#dailyProgress')).toHaveText('1/18');
    await expect(page.locator('#weeklySessions')).toHaveText('1');
    await expect(page.locator('#totalAttempts')).toHaveText('3');
    await expect(page.locator('#dashboardDate')).not.toContainText('10 de julio');
    await expect(page.getByText('Tiempo medio')).toHaveCount(0);
  });

  test('2. Navegación fluida por todas las pestañas principales', async ({ page }) => {
    const views = ['dashboard', 'practice', 'simulations', 'errors', 'library', 'syllabus'];
    for (const view of views) {
      await page.goto(`/#${view}`);
      await expect(page.locator(`#${view}`)).toBeVisible();
    }
  });

  test('2b. El barajado no duplica preguntas ni cambia las opciones oficiales', async ({ page }) => {
    await page.goto('/#practice');
    const integrity = await page.evaluate(() => {
      const source = [1, 2, 3, 4];
      const shuffled = window.shuffleArray(source, () => 0);
      const mixed = window.buildSet('mixto', 18);
      const official = window.buildSet('historico2025', 'full');
      return {
        source,
        shuffled,
        mixedCount: mixed.length,
        mixedUnique: new Set(mixed.map(question => question.id)).size,
        officialCount: official.length,
        firstOfficialId: official[0].id
      };
    });
    expect(integrity.source).toEqual([1, 2, 3, 4]);
    expect(integrity.shuffled).toEqual([2, 3, 4, 1]);
    expect(integrity.mixedUnique).toBe(integrity.mixedCount);
    expect(integrity.officialCount).toBe(105);
    expect(integrity.firstOfficialId).toBe('h2025-001');

    await page.selectOption('#topicSelect', 'historico2025');
    await page.selectOption('#lengthSelect', 'full');
    await page.click('#createTest');
    await expect(page.locator('.answer-letter')).toHaveText(['A', 'B', 'C', 'D']);
    const answerIndexes = await page.locator('.answer').evaluateAll(buttons => buttons.map(button => button.dataset.answer));
    expect(answerIndexes).toEqual(['0', '1', '2', '3']);
    await page.locator('.answer').first().click();
    await expect(page.locator('#quizCard .feedback .why-list strong')).toHaveText(['A.', 'B.', 'C.', 'D.']);
  });

  test('3. Realizar y completar una sesión de práctica de 5 preguntas', async ({ page }) => {
    await page.goto('/#practice');
    await expect(page.locator('#practice')).toBeVisible();

    // Seleccionar 5 preguntas e iniciar
    await page.selectOption('#lengthSelect', '5');
    await page.click('#createTest');

    await expect(page.locator('#quizCard')).toBeVisible();

    // Responder 5 preguntas secuenciales
    for (let i = 0; i < 5; i++) {
      const answers = page.locator('.answer');
      await expect(answers.first()).toBeVisible();
      await answers.first().click();

      if (i < 4) {
        const nextBtn = page.locator('.next-question');
        await expect(nextBtn).toBeVisible();
        await nextBtn.click();
      }
    }

    // Verificar pantalla de resultados/repaso
    await expect(page.locator('.results-card, #quizCard')).toBeVisible();
  });

  test('3b. Terminar una práctica antes de tiempo conserva lo respondido', async ({ page }) => {
    await page.goto('/#practice');
    await page.selectOption('#topicSelect', 'historico2025');
    await page.selectOption('#lengthSelect', '5');
    await page.click('#createTest');

    await page.locator('.answer').first().click();
    await page.locator('.finish-practice-early').click();

    await expect(page.locator('#quizCard')).toContainText('Práctica terminada por hoy');
    await expect(page.locator('#quizCard')).toContainText('1 de 5 respondidas');
    const savedState = await page.evaluate(() => JSON.parse(localStorage.getItem('opoA2State')));
    expect(savedState.answered).toHaveLength(1);
  });

  test('3c. Estudiar un histórico completo muestra explicación inmediata', async ({ page }) => {
    await page.goto('/#practice');
    await page.selectOption('#topicSelect', 'historico2025');
    await expect(page.locator('#fullHistoricalOption')).toBeEnabled();
    await page.selectOption('#lengthSelect', 'full');
    await page.click('#createTest');

    await expect(page.locator('#quizCard')).toContainText('Pregunta 1 de 105');
    await page.locator('.answer').first().click();
    await expect(page.locator('.feedback')).toBeVisible();
    await expect(page.locator('.feedback')).toContainText('Base legal');
    await expect(page.locator('.finish-practice-early')).toBeVisible();
  });

  test('3d. Los históricos ofrecen estudiar o simular', async ({ page }) => {
    await page.goto('/#simulations');
    await expect(page.locator('.study-historical')).toHaveCount(3);
    await expect(page.locator('.start-historical')).toHaveCount(3);
    await expect(page.locator('.historical-mode-help')).toContainText('explicación después de cada respuesta');
    await expect(page.locator('.historical-mode-help')).toContainText('correcciones ocultas hasta el final');
  });

  test('3e. La escucha Beta lee y conserva exactamente el progreso', async ({ page }) => {
    await page.goto('/#practice');
    const seededState = {
      version: 3,
      goals: [{ id: 'goal-test', text: 'Meta conservada', done: true }],
      answered: [{ id: 'procedimiento-1', correct: true, answeredAt: '2026-08-17T08:00:00.000Z' }],
      errors: [],
      sessions: 7,
      sessionHistory: ['2026-08-17T08:00:00.000Z'],
      current: []
    };
    await page.evaluate(state => localStorage.setItem('opoA2State', JSON.stringify(state)), seededState);
    await page.reload();
    const progressBefore = await page.evaluate(() => localStorage.getItem('opoA2State'));

    await page.selectOption('#topicSelect', 'historico2025');
    await page.selectOption('#lengthSelect', '5');
    await page.click('#audioStudyStart');

    await expect(page.locator('#quizCard')).toContainText('Modo escucha · Beta');
    await expect(page.locator('#quizCard')).toContainText('Pregunta 1 de 5');
    await expect(page.locator('#quizCard')).toContainText('NO MODIFICA TU PROGRESO');
    await expect.poll(() => page.evaluate(() => window.__audioTestState.spoken.length)).toBeGreaterThanOrEqual(1);
    const firstSpoken = await page.evaluate(() => window.__audioTestState.spoken[0]);
    expect(firstSpoken.lang).toBe('gl-ES');
    expect(firstSpoken.text).toContain('Opción A.');
    expect(firstSpoken.text).toContain('Opción D.');

    const spokenBeforeRateChange = await page.evaluate(() => window.__audioTestState.spoken.length);
    await page.selectOption('#audioStudyRate', '1.8');
    await expect.poll(() => page.evaluate(length => window.__audioTestState.spoken.length > length, spokenBeforeRateChange)).toBe(true);
    await expect.poll(() => page.evaluate(() => window.__audioTestState.spoken.at(-1).rate)).toBe(1.8);

    await page.click('.audio-pause');
    await expect.poll(() => page.evaluate(() => window.__audioTestState.pauseCalls)).toBe(1);
    await page.click('.audio-pause');
    await expect.poll(() => page.evaluate(() => window.__audioTestState.resumeCalls)).toBe(1);
    await page.click('.audio-next');
    await expect(page.locator('#quizCard')).toContainText('Pregunta 2 de 5');
    await page.click('.audio-finish');

    const progressAfter = await page.evaluate(() => localStorage.getItem('opoA2State'));
    expect(progressAfter).toBe(progressBefore);
    await expect(page.locator('#practiceSetup')).toBeVisible();
  });

  test('4. Iniciar simulacro con regla de penalización –0.25 y calcular nota neta', async ({ page }) => {
    await page.goto('/#simulations');
    await expect(page.locator('#simulations')).toBeVisible();

    const simBtn = page.locator('#simulationStart');
    await expect(simBtn).toBeVisible();
    await simBtn.click();

    await expect(page.locator('#quizCard')).toBeVisible();

    // Responder 1 opción
    const firstAnswer = page.locator('.answer').first();
    await firstAnswer.click();
    await expect(page.locator('.feedback')).toBeHidden();

    // Finalizar examen
    await page.evaluate(() => window.renderExamResults());
    await expect(page.locator('#quizCard')).toBeVisible();
    const values = await page.locator('.exam-summary strong').allTextContents();
    const expectedNet = Math.max(0, Number(values[0]) - (Number(values[2]) * 0.25)).toFixed(2);
    expect(values[3]).toBe(expectedNet);
  });

  test('4b. El historial conserva aciertos y errores anteriores', async ({ page }) => {
    await page.goto('/');
    const seededAttempts = await page.evaluate(() => {
      localStorage.setItem('opoA2State', JSON.stringify({
        goals: [],
        answered: [
          { id: 'procedimiento-1', correct: false },
          { id: 'procedimiento-1', correct: true },
          { id: 'procedimiento-2', correct: false },
          { id: 'identificador-inexistente', correct: true }
        ],
        errors: ['procedimiento-2', 'identificador-inexistente'],
        sessions: 2,
        current: []
      }));
      return JSON.parse(localStorage.getItem('opoA2State')).answered.length;
    });
    expect(seededAttempts).toBe(4);
    await page.reload();
    await page.goto('/#errores');
    expect(await page.evaluate(() => JSON.parse(localStorage.getItem('opoA2State')).answered.length)).toBe(4);

    await expect(page.locator('#historySummary')).toContainText('Preguntas realizadas2');
    await expect(page.locator('#historySummary')).toContainText('Con algún acierto1');
    await expect(page.locator('#historySummary')).toContainText('Pendientes de repaso1');
    await expect(page.locator('.history-card')).toHaveCount(1);
    await expect(page.locator('.history-card')).toContainText('1 fallo');

    await page.locator('[data-history-filter="correct"]').click();
    await expect(page.locator('.history-card')).toHaveCount(1);
    await expect(page.locator('.history-card')).toContainText('1 acierto');
    await expect(page.locator('.history-card')).toContainText('1 fallo');
    await expect(page.locator('.history-card')).toContainText('2 intentos');

    await page.locator('[data-history-filter="all"]').click();
    await expect(page.locator('.history-card')).toHaveCount(2);
    const firstCard = page.locator('.history-card').first();
    const secondCard = page.locator('.history-card').nth(1);
    await firstCard.locator('.history-explanation-toggle').click();
    await expect(firstCard.locator('.history-explanation-toggle')).toHaveAttribute('aria-expanded', 'true');
    await expect(firstCard.locator('.history-explanation')).toBeVisible();
    await expect(firstCard.locator('.history-correct-answer')).toBeVisible();
    await expect(firstCard.locator('.why-list li')).toHaveCount(4);
    await expect(firstCard.locator('.source-link')).toBeVisible();
    await expect(firstCard.locator('.review-one')).toBeVisible();

    await secondCard.locator('.history-explanation-toggle').click();
    await expect(firstCard.locator('.history-explanation')).toBeHidden();
    await expect(firstCard.locator('.history-explanation-toggle')).toHaveAttribute('aria-expanded', 'false');
    await expect(secondCard.locator('.history-explanation')).toBeVisible();
  });

  test('5. Apertura y cierre del Modal de Política de Privacidad', async ({ page }) => {
    await page.goto('/');

    // Abrir modal de privacidad directamente o mediante botón
    await page.evaluate(() => {
      const modal = document.getElementById('privacyModal');
      if (modal) modal.showModal();
    });

    const privacyModal = page.locator('#privacyModal');
    await expect(privacyModal).toBeVisible();

    await page.click('#privacyModal .dialog-action');
    await expect(privacyModal).not.toBeVisible();
  });

  test('6. Verificación de accesibilidad de enlaces a documentos locales', async ({ page }) => {
    await page.goto('/#library');
    await expect(page.locator('#library')).toBeVisible();

    const links = page.locator('a[href^="documentos/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    // Comprobar que el primer enlace responde correctamente HTTP 200
    const firstHref = await links.first().getAttribute('href');
    const response = await page.request.get(`/${firstHref}`);
    expect(response.status()).toBe(200);
  });

  test('7. Menú lateral móvil y acciones de privacidad simplificadas', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.locator('#mobileMenuToggle')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#openAuthModalBtn')).toHaveCount(0);
    await expect(page.locator('#deleteProgressBtn')).toHaveCount(1);

    await page.click('#mobileMenuToggle');
    await expect(page.locator('body')).toHaveClass(/sidebar-open/);
    await expect(page.locator('#mobileMenuToggle')).toHaveAttribute('aria-expanded', 'true');

    await page.click('.nav-link[data-view="library"]');
    await expect(page.locator('#library')).toBeVisible();
    await expect(page.locator('body')).not.toHaveClass(/sidebar-open/);

    await page.setViewportSize({ width: 1024, height: 768 });
    await page.reload();
    await page.click('#mobileMenuToggle');
    await expect(page.locator('body')).toHaveClass(/sidebar-open/);
    await expect(page.locator('#primarySidebar')).toBeVisible();
  });

});
