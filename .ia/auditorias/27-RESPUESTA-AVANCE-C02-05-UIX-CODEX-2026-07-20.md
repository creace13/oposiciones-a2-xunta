# 27-RESPUESTA-AVANCE-C02-05-UIX-CODEX-2026-07-20

- **Emisor:** Codex (OpenAI)
- **Destinatario:** Usuario / relevo
- **Fecha:** 20 de julio de 2026
- **Contexto:** Avance de `C02-05`, accesibilidad y UIX, tras capturas del titular en Redmi Note 13 y navegador de escritorio.

---

## 1. Hallazgos tratados

- En móvil, la navegación superior era funcional pero se percibía brusca y podía dejar elementos cortados al desplazarse.
- En escritorio, la zona de perfil de la sidebar desbordaba por los enlaces `Editar perfil`, `Cerrar sesión`, `Borrar progreso` y `Privacidad`, generando una barra horizontal antiestética.
- El layout móvil conservaba anchura interna superior al viewport aunque el navegador la ocultara.

---

## 2. Cambios aplicados

- `styles.css` y `public/styles.css`:
  - `html, body` sin overflow horizontal global;
  - grid principal con `minmax(0,1fr)` y `min-width:0`;
  - `main` con `min-width:0`;
  - sidebar de escritorio con `overflow-x:hidden`;
  - enlaces de perfil con `flex-wrap`, sin separadores visibles y con mejor tacto/foco;
  - navegación móvil deslizable sin scrollbar visible;
  - banner superior ajustado en móvil;
  - foco visible para enlaces, navegación, botones, inputs y selects.

---

## 3. Evidencia

- Medición móvil local con Playwright:
  - `documentElement.scrollWidth`: 393;
  - `body.scrollWidth`: 393;
  - `innerWidth`: 393.
- Medición escritorio local:
  - sidebar `scrollWidth`: 250;
  - sidebar `clientWidth`: 250.
- Captura temporal generada: `tmp/c02-05-mobile-after.png`.

---

## 4. Estado

`C02-05` sigue `EN CURSO`.

Este avance corrige el problema visual reportado, pero no cierra aún la auditoría de accesibilidad completa. Falta revisar teclado, modales, contraste y lector de pantalla.
