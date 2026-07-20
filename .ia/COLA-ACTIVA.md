# Cola activa — Ciclo C02: versión plenamente funcional

Fecha de apertura: 19 de julio de 2026.

Este archivo es el único backlog ejecutable del proyecto. Los informes 01–21 pertenecen al ciclo C01 ya cerrado y se conservan únicamente como evidencia histórica.

## Objetivo operativo

Cerrar una versión que pueda considerarse plenamente funcional y lista con criterios verificables:

- modo local y cuentas remotas con un ciclo de vida coherente;
- privacidad con responsable y canal controlados;
- recorridos críticos probados en navegadores reales;
- accesibilidad básica contrastada;
- backup, restauración y rollback ensayados;
- seguridad, rendimiento y publicación comprobados;
- mantenimiento normativo definido y revisión jurídica independiente registrada;
- cero defectos críticos conocidos al cierre.

«Plenamente funcional» no significa que nunca pueda aparecer un fallo ni que el contenido jurídico quede vigente para siempre. Significa que todas las puertas anteriores disponen de evidencia y que no quedan bloqueos críticos conocidos.

## Regla de ejecución

1. Atender primero el elemento ejecutable de mayor prioridad.
2. No detener toda la cola por un elemento `BLOQUEADO`; continuar con el siguiente que no dependa de él.
3. Antes de empezar, cambiar un único elemento a `EN CURSO` e identificar el modelo responsable.
4. Para cerrarlo, adjuntar pruebas reproducibles y una `RESPUESTA` correlativa en `.ia/auditorias/`.
5. Actualizar esta tabla, Estado, Bitácora e Índice en el mismo checkpoint.

## Trabajo pendiente

| ID | Prioridad | Entregable | Estado | Dependencias / desbloqueo | Evidencia de cierre |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **C02-01** | P0 | Decidir el futuro de las cuentas remotas: implementar baja autoservicio segura o desactivar temporalmente alta/login remoto. | `HECHO` (Codex) | Decisión del titular: no asumir nuevas suscripciones; cuentas remotas pausadas temporalmente y modo local como producto principal. | Interfaz orientada a acceso local, Supabase no se inicializa para auth pública (`REMOTE_AUTH_ENABLED = false`) y `scripts/test-auth-states.js` valida que no hay llamadas remotas. |
| **C02-02** | P0 | Identificar al responsable de privacidad y habilitar un canal privado que controle. | `HECHO` (Codex) | Al pausar cuentas remotas, no se exige canal privado para cuentas remotas en esta versión local. Sigue prohibido publicar datos personales en GitHub. | Política de privacidad actualizada: cuentas remotas pausadas, progreso local y reportes públicos sin datos personales. |
| **C02-03** | P0 | Validar en producción alta, confirmación, login, recuperación y baja remota de extremo a extremo, o confirmar su retirada completa. | `HECHO` (Codex) | Cerrado por retirada/pausa coherente del flujo remoto público. | Alta/login/recuperación remota dejan de ofrecerse al usuario; acceso principal local validado por pruebas. |
| **C02-04** | P1 | Incorporar pruebas automatizadas en navegadores reales para navegación, práctica, simulacro, persistencia, recuperación y actualización. | `HECHO` (Antigravity) | Cerrada. | Playwright E2E (30/30 ok): Chromium, Firefox, WebKit en escritorio (1280x720) y móvil (Pixel 5, iPhone 12). |
| **C02-11** | P0 | Diagnosticar el fallo de inicio de sesión remoto visto en equipos externos y decidir si es cuenta inexistente/no confirmada, contraseña incorrecta, configuración Supabase o UX de error insuficiente. | `HECHO` (Codex) | Cerrada con prueba real del titular en modo incógnito tras despliegue del mensaje guiado. Relacionada con C02-01, C02-02 y C02-03. | Login remoto operativo; causa práctica compatible con caché/autorrelleno/estado de navegador; mensaje de error mejorado y prueba real satisfactoria del titular. |
| **C02-05** | P1 | Ejecutar auditoría de accesibilidad y corregir teclado, foco, diálogos, contraste, semántica y lector de pantalla. | `HECHO` (Codex) | Cerrada para accesibilidad básica aplicable; no sustituye una auditoría humana especializada con lector de pantalla real. | UIX móvil/escritorio sin overflow, foco visible, navegación con `aria-current`, diálogos con nombre/descripción, contraste AA básico, prueba de teclado y `scripts/test-accessibility-basics.js` OK. |
| **C02-06** | P1 | Documentar y ensayar backup, restauración y rollback de GitHub, Cloudflare y Supabase. | `HECHO` (Codex) | Cerrado para la versión local sin suscripciones: Supabase deja de ser dependencia operativa de usuarios. | `docs/OPERACION-RECUPERACION.md` creado/ampliado, `scripts/test-recovery-runbook.js` OK, `git archive` no destructivo OK, rollback Git/Cloudflare documentado y Supabase tratado como función pausada. |
| **C02-07** | P1 | Revisar seguridad, privacidad técnica, dependencias, cabeceras, errores y rendimiento de producción. | `HECHO` (Codex) | Cerrada para versión local first sin cuentas remotas públicas. | `scripts/test-security-basics.js` OK, `npm audit --omit=dev --audit-level=high` con 0 vulnerabilidades, `npm test` OK, Supabase CDN retirado, cabeceras de seguridad en Worker y sin P0/P1 abiertos. |
| **C02-08** | P1 | Establecer mantenimiento normativo: inventario de vigencia, cadencia de revisión, alerta de cambios y retirada de preguntas afectadas. | `PENDIENTE` | Ninguna. | Procedimiento reproducible con responsable, fechas y simulación de una norma modificada. |
| **C02-09** | P1 | Obtener una revisión jurídica independiente del banco y registrar muestra, alcance, incidencias y resolución. | `BLOQUEADO` | Revisor humano jurídicamente competente designado por el titular. | Dictamen externo identificado y todas las incidencias críticas resueltas. |
| **C02-10** | P2 | Ejecutar aceptación final, etiquetar la versión definitiva, publicar y realizar smoke test posterior al despliegue. | `PENDIENTE` | C02-01 a C02-09 cerrados. | Checklist final completo, tag/versionado, despliegue verificado y ciclo C02 cerrado. |

## Orden recomendado mientras el titular está ausente

1. C02-08 — mantenimiento normativo.
2. C02-10 — aceptación final cuando C02-08 esté cerrada y C02-09 siga tratado como bloqueo externo documentado.

## Bloqueos que requieren al titular

- Si en el futuro se reactivan cuentas remotas, decidir entre Plan Pro, backup externo o ciclo completo de privacidad antes de ofrecerlas al público.
- Facilitar, si procede, una cuenta remota de prueba controlada para diagnosticar login sin usar credenciales personales.
- Designar, si desea la garantía ampliada, un revisor jurídico independiente.
