# 29-CIERRE-C02-05-ACCESIBILIDAD-CODEX-2026-07-20

- **Emisor:** Codex (OpenAI)
- **Destinatario:** Usuario / relevo
- **Fecha:** 20 de julio de 2026
- **Contexto:** Cierre de `C02-05`, accesibilidad básica y UIX.

---

## 1. Resultado

`C02-05` queda cerrado para accesibilidad básica aplicable.

El cierre incluye correcciones de UIX móvil/escritorio, navegación por teclado, semántica de navegación, diálogos accesibles y contraste básico. No sustituye una auditoría humana especializada con lector de pantalla real.

---

## 2. Cambios aplicados

- `index.html` y `public/index.html`:
  - iconos decorativos de navegación con `aria-hidden="true"`;
  - enlace activo inicial con `aria-current="page"`;
  - diálogos principales con `aria-labelledby`;
  - diálogos informativos con `aria-describedby`.

- `app.js` y `public/app.js`:
  - `showView()` actualiza dinámicamente `aria-current` al cambiar de sección.

- `styles.css` y `public/styles.css`:
  - foco visible en enlaces, navegación, botones, inputs y selects;
  - sidebar sin overflow horizontal;
  - layout móvil sin desborde;
  - navegación móvil deslizable sin barra visible;
  - color `--muted` ajustado para contraste AA básico.

- `scripts/test-accessibility-basics.js`:
  - nueva prueba automática de navegación, diálogos, foco y contraste.

- `package.json`:
  - `npm test` incorpora `scripts/test-accessibility-basics.js`.

---

## 3. Evidencia ejecutada

- `node --check app.js`: correcto.
- `node scripts/validar-banco.js`: correcto.
- `node scripts/test-auth-states.js`: correcto.
- `node scripts/test-accessibility-basics.js`: correcto.
- `node scripts/test-browser-e2e.js`: correcto.
- Playwright local Chromium:
  - móvil: `documentElement.scrollWidth` 393 / `innerWidth` 393;
  - escritorio: sidebar `scrollWidth` 250 / `clientWidth` 250;
  - `aria-current` cambia a la sección activa;
  - Escape cierra modal.

---

## 4. Limitaciones

- No se ejecutó una auditoría humana especializada con lector de pantalla real.
- No se usa `C02-05` para declarar definitiva toda la app: siguen pendientes `C02-06`, `C02-07`, `C02-08` y bloqueos de cuentas remotas/privacidad/revisión jurídica.

---

## 5. Siguiente paso

Iniciar `C02-06`: backup, restauración y rollback.
