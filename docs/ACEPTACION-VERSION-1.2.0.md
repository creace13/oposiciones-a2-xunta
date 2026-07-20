# Aceptación final — versión 1.2.0 estable local

Fecha: 20 de julio de 2026.

## Decisión de versión

La versión `1.2.0` puede considerarse **estable local** para uso como herramienta gratuita de práctica tipo test del primer ejercicio A2 Xunta.

Esta aceptación no declara el banco como jurídicamente definitivo. La revisión jurídica externa independiente queda pendiente en `C02-09` y solo puede cerrarse si el titular designa una persona revisora competente.

## Alcance estable

- Acceso local sin cuenta remota.
- Progreso guardado en el navegador mediante `localStorage`.
- Práctica por bloques y temas.
- Simulacros con penalización oficial de `–0,25`.
- Repaso de errores.
- Biblioteca documental local.
- Métricas honestas de uso y de catálogo.
- Transparencia sobre creación, créditos, licencia y limitaciones.
- Aviso explícito de uso responsable en Guía/metodología y Privacidad: apoyo al estudio, no academia, no fuente oficial ni asesoramiento jurídico.
- Seguridad técnica básica y cabeceras de producción.
- Procedimiento de mantenimiento normativo.

## Fuera de alcance de esta versión

- Sincronización entre dispositivos.
- Cuentas remotas públicas.
- Borrado remoto autoservicio.
- Backups programados de Supabase.
- Garantía jurídica externa completa.
- Rentabilización mediante donaciones o patrocinios.

## Checklist de aceptación

| Puerta | Estado | Evidencia |
| --- | --- | --- |
| Banco completo y válido | OK | `node scripts/validar-banco.js` |
| Filtros temáticos | OK | `scripts/test-filters.js` |
| Acceso local y auth remota pausada | OK | `scripts/test-auth-states.js` |
| Accesibilidad básica y UIX | OK | `scripts/test-accessibility-basics.js` |
| Backup, recuperación y rollback | OK | `docs/OPERACION-RECUPERACION.md`, `scripts/test-recovery-runbook.js` |
| Seguridad básica | OK | `scripts/test-security-basics.js` |
| Mantenimiento normativo | OK | `docs/MANTENIMIENTO-NORMATIVO.md`, `scripts/test-normative-maintenance.js` |
| Navegadores reales | OK | Playwright Chromium, WebKit, mobile Chrome y mobile Safari |
| Firefox local | No bloqueante | Diagnóstico opcional por fallo del entorno local antes de cargar la app |
| Revisión jurídica externa | Bloqueada | `C02-09`: requiere revisor humano designado |

## Criterio de publicación

La publicación de `1.2.0` es aceptable si:

1. `npm test` pasa completo.
2. `public/` está sincronizado desde la raíz.
3. GitHub contiene el checkpoint.
4. Cloudflare sirve la versión nueva.
5. La URL pública responde HTTP 200.
6. El HTML público contiene `v21-stable-local-20260720`.

## Dictamen

Versión aceptada como **1.2.0 estable local**.

La app queda lista para uso ordinario como herramienta de estudio local, manteniendo avisos claros sobre revisión continua, cuentas remotas pausadas y ausencia de garantía jurídica externa completa.
