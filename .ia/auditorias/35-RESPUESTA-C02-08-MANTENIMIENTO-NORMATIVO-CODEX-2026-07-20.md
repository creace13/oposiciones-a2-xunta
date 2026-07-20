# 35-RESPUESTA-C02-08-MANTENIMIENTO-NORMATIVO-CODEX-2026-07-20

## Resumen

Codex/OpenAI, como titular operativo autorizado, cierra `C02-08` estableciendo un procedimiento reproducible de mantenimiento normativo para el banco A2 Xunta.

El objetivo no era realizar una auditoría jurídica completa de vigencia, sino crear el mecanismo para que una futura modificación normativa no deje preguntas desactualizadas sin control.

## Cambios realizados

- Creado `docs/MANTENIMIENTO-NORMATIVO.md`.
- Actualizado `docs/FUENTES_OFICIALES.md` para enlazar el nuevo procedimiento.
- Creado `scripts/test-normative-maintenance.js`.
- Integrado `test:normativa` en `package.json`.
- Añadido el test normativo a `npm test`.
- Actualizada la documentación interna:
  - `.ia/COLA-ACTIVA.md`
  - `.ia/ESTADO-PROYECTO.md`
  - `.ia/BITACORA-IA.md`
  - `.ia/auditorias/INDEX.md`

## Procedimiento definido

El nuevo documento establece:

- responsable operativo;
- fuentes oficiales a vigilar;
- cadencia semanal, previa a versión estable, inmediata ante cambios y trimestral en mantenimiento;
- estados `VIGENTE`, `EN_REVISION`, `AFECTADA`, `RETIRADA_TEMPORAL`, `CORREGIDA` y `BLOQUEADA`;
- protocolo ante una norma modificada;
- retirada segura de preguntas sin borrados a ciegas;
- criterio de cierre para `C02-08`.

## Simulación ejecutada

La prueba `scripts/test-normative-maintenance.js` simula una modificación de la Ley 39/2015.

Resultado:

- banco inspeccionado: 1.522 preguntas;
- fuentes usadas por el banco: 25;
- preguntas localizadas para revisión por la simulación: 153;
- primeros IDs afectados: `procedimiento-1`, `procedimiento-2`, `h2025-001`, `h2025-002`, `h2025-003`, `h2025-004`, `h2025-005`, `h2025-006`.

La simulación no modifica el banco. Solo demuestra que el proyecto puede localizar preguntas afectadas por una fuente concreta y forzar una revisión ordenada.

## Pruebas ejecutadas

- `node --check app.js`: OK.
- `node scripts/validar-banco.js`: OK.
- `node scripts/test-normative-maintenance.js`: OK.
- `npm test`: OK.

La suite completa incluye validación del banco, filtros, autenticación local, accesibilidad básica, recuperación/rollback, seguridad, mantenimiento normativo, integración DOM/JSDOM y 24/24 pruebas Playwright en Chromium/WebKit/móvil.

## Limitaciones

- No se ha realizado auditoría jurídica independiente de todo el banco.
- `C02-09` sigue bloqueado hasta que el titular designe un revisor humano jurídicamente competente.
- El procedimiento reduce el riesgo de obsolescencia, pero no garantiza que ninguna norma cambie en el futuro sin revisión posterior.

## Estado resultante

`C02-08` queda cerrado.

Siguiente paso recomendado: preparar `C02-10`, aceptación final de la versión estable local, dejando `C02-09` como bloqueo externo documentado si no se designa revisor jurídico independiente.

