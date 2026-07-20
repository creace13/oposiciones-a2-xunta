# 37-ANEXO-TRANSPARENCIA-USO-RESPONSABLE-CODEX-2026-07-20

## Motivo

El titular plantea una duda editorial importante: evitar que los usuarios entiendan la plataforma como equivalente a una academia, un temario oficial o una garantía jurídica absoluta.

La observación se considera correcta. La versión estable local debe ser útil y ambiciosa, pero no debe prometer más de lo que puede acreditar.

## Cambios realizados

- Añadido en `index.html`, dentro de Guía y metodología, un bloque visible: “Qué es esta herramienta y qué no pretende ser”.
- Aclarado que la plataforma:
  - es una herramienta gratuita de práctica y refuerzo;
  - no es academia;
  - no es temario oficial;
  - no está vinculada a la Xunta de Galicia;
  - no sustituye BOE/DOG, convocatoria vigente, preparadores ni asesoramiento jurídico profesional.
- Añadido el mismo criterio al `README.md`.
- Añadido el aviso dentro de la Política de Privacidad y Protección de Datos.
- Suavizada la frase “dominio absoluto del temario” a “dominio progresivo del temario”.
- Actualizadas pruebas para exigir esta advertencia.
- Sincronizado `public/`.

## Pruebas ejecutadas

- `node --check app.js`: OK.
- `node scripts/validar-banco.js`: OK.
- `node scripts/test-release-acceptance.js`: OK.
- `npm test`: OK.

La suite completa incluye Playwright en Chromium, WebKit, mobile Chrome y mobile Safari: 24/24 OK.

## Dictamen

La aclaración mejora la calidad ética y editorial del proyecto.

La app sigue siendo válida como herramienta de estudio, pero queda explícitamente presentada como apoyo práctico con revisión continua, no como sustituto de fuentes oficiales ni de preparación profesional.
