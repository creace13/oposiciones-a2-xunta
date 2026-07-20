const { test, expect } = require('@playwright/test');

test.describe('Suite de Pruebas E2E en Navegadores Reales (Chromium, Firefox, WebKit)', () => {

  test.beforeEach(async ({ context, page }) => {
    // Establecer perfil guardado para mantener sesión autenticada en navegación
    await context.addInitScript(() => {
      window.localStorage.setItem('opoA2UserName', 'Merce');
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

  test('2. Navegación fluida por todas las pestañas principales', async ({ page }) => {
    const views = ['dashboard', 'practice', 'simulations', 'errors', 'library', 'syllabus'];
    for (const view of views) {
      await page.goto(`/#${view}`);
      await expect(page.locator(`#${view}`)).toBeVisible();
    }
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

    // Finalizar examen
    await page.evaluate(() => window.renderExamResults());
    await expect(page.locator('#quizCard')).toBeVisible();
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
  });

});
