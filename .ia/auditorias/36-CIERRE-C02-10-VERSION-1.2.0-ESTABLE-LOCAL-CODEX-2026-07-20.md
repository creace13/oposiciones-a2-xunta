# 36-CIERRE-C02-10-VERSION-1.2.0-ESTABLE-LOCAL-CODEX-2026-07-20

## Dictamen

Codex/OpenAI, como titular operativo autorizado, cierra `C02-10` y el ciclo `C02` en alcance operativo.

La aplicación queda aceptada como **versión 1.2.0 estable local**.

No se declara como versión jurídicamente definitiva. `C02-09` queda trasladado como garantía jurídica externa futura porque requiere un revisor humano competente designado por el titular.

## Cambios de cierre

- `package.json` y `package-lock.json`: versión `1.2.0`.
- `index.html`: etiqueta pública `Versión 1.2.0 estable local`.
- `manifest.json`: descripción ajustada a “clasificadas en revisión continua”.
- `public/`: sincronizado desde raíz.
- `docs/ACEPTACION-VERSION-1.2.0.md`: checklist final.
- `scripts/test-release-acceptance.js`: prueba automatizada de aceptación de versión.
- `scripts/test-browser-e2e.js`: expectativa actualizada a `1.2.0 estable local`.

## Pruebas locales

- `node --check app.js`: OK.
- `node scripts/validar-banco.js`: OK.
- `node scripts/test-release-acceptance.js`: OK.
- `npm test`: OK.

La suite completa incluye:

- banco;
- filtros;
- autenticación local;
- accesibilidad básica;
- operación/recuperación;
- seguridad;
- mantenimiento normativo;
- aceptación de versión;
- integración DOM/JSDOM;
- Playwright en Chromium, WebKit, mobile Chrome y mobile Safari: 24/24 OK.

## Publicación y smoke test

Checkpoint publicado:

- commit: `4c85a61 release: prepare 1.2.0 stable local`;
- rama: `main`;
- remoto: `origin/main`.

Producción:

- URL: `https://oposiciones-xunta.opos-galicia.workers.dev/`;
- HTTP: 200;
- HTML público contiene `Versión 1.2.0 estable local`;
- HTML público contiene `v21-stable-local-20260720`;
- HTML público ya no contiene `v20`;
- cabeceras verificadas: `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security` y `Cross-Origin-Opener-Policy`.

## Estado final

No quedan tareas ejecutables abiertas para la versión `1.2.0` estable local.

Pendientes opcionales para ciclos futuros:

- revisión jurídica externa independiente;
- limpieza estratégica de documentación pública/privada en GitHub;
- sistema de donaciones sin coste mensual;
- mejoras de producto posteriores a feedback real de opositores.

