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
| **C02-01** | P0 | Decidir el futuro de las cuentas remotas: implementar baja autoservicio segura o desactivar temporalmente alta/login remoto. | `BLOQUEADO` | Decisión del titular. Recomendación de seguridad: desactivar el alta remota si no se va a mantener su ciclo completo. | Decisión registrada, interfaz coherente y prueba del flujo elegido. |
| **C02-02** | P0 | Identificar al responsable de privacidad y habilitar un canal privado que controle. | `BLOQUEADO` | El titular debe facilitar o crear el canal; no se inventarán datos. | Canal confirmado, texto de privacidad actualizado y prueba de recepción. |
| **C02-03** | P0 | Validar en producción alta, confirmación, login, recuperación y baja remota de extremo a extremo, o confirmar su retirada completa. | `PENDIENTE` | C02-01 y C02-02. | Matriz de pruebas real sin credenciales en el repositorio y datos de prueba eliminados. |
| **C02-04** | P1 | Incorporar pruebas automatizadas en navegadores reales para navegación, práctica, simulacro, persistencia, recuperación y actualización. | `HECHO` (Antigravity) | Cerrada. | Playwright E2E (30/30 ok): Chromium, Firefox, WebKit en escritorio (1280x720) y móvil (Pixel 5, iPhone 12). |
| **C02-11** | P0 | Diagnosticar el fallo de inicio de sesión remoto visto en equipos externos y decidir si es cuenta inexistente/no confirmada, contraseña incorrecta, configuración Supabase o UX de error insuficiente. | `HECHO` (Codex) | Cerrada con prueba real del titular en modo incógnito tras despliegue del mensaje guiado. Relacionada con C02-01, C02-02 y C02-03. | Login remoto operativo; causa práctica compatible con caché/autorrelleno/estado de navegador; mensaje de error mejorado y prueba real satisfactoria del titular. |
| **C02-05** | P1 | Ejecutar auditoría de accesibilidad y corregir teclado, foco, diálogos, contraste, semántica y lector de pantalla. | `HECHO` (Codex) | Cerrada para accesibilidad básica aplicable; no sustituye una auditoría humana especializada con lector de pantalla real. | UIX móvil/escritorio sin overflow, foco visible, navegación con `aria-current`, diálogos con nombre/descripción, contraste AA básico, prueba de teclado y `scripts/test-accessibility-basics.js` OK. |
| **C02-06** | P1 | Documentar y ensayar backup, restauración y rollback de GitHub, Cloudflare y Supabase. | `BLOQUEADO` (Codex) | Supabase Free no incluye copias programadas según captura del titular. Falta decidir entre Pro, copias manuales con cuentas Beta, exportación externa o retirada temporal de remoto. | `docs/OPERACION-RECUPERACION.md` creado/ampliado, `scripts/test-recovery-runbook.js` OK, `git archive` no destructivo OK y web pública HTTP 200. Pendiente: decisión operativa y evidencia de backup real Supabase/Cloudflare. |
| **C02-07** | P1 | Revisar seguridad, privacidad técnica, dependencias, cabeceras, errores y rendimiento de producción. | `PENDIENTE` | Ninguna para la auditoría inicial. | Informe sin secretos, riesgos clasificados y cero P0/P1 abiertos. |
| **C02-08** | P1 | Establecer mantenimiento normativo: inventario de vigencia, cadencia de revisión, alerta de cambios y retirada de preguntas afectadas. | `PENDIENTE` | Ninguna. | Procedimiento reproducible con responsable, fechas y simulación de una norma modificada. |
| **C02-09** | P1 | Obtener una revisión jurídica independiente del banco y registrar muestra, alcance, incidencias y resolución. | `BLOQUEADO` | Revisor humano jurídicamente competente designado por el titular. | Dictamen externo identificado y todas las incidencias críticas resueltas. |
| **C02-10** | P2 | Ejecutar aceptación final, etiquetar la versión definitiva, publicar y realizar smoke test posterior al despliegue. | `PENDIENTE` | C02-01 a C02-09 cerrados. | Checklist final completo, tag/versionado, despliegue verificado y ciclo C02 cerrado. |

## Orden recomendado mientras el titular está ausente

1. C02-07 — seguridad y rendimiento.
2. C02-08 — mantenimiento normativo.
3. C02-06 — cerrar ensayo real en paneles Cloudflare/Supabase cuando el titular esté disponible.
4. Resolver C02-01 y C02-02 antes de validar C02-03.

## Bloqueos que requieren al titular

- Elegir entre mantener las cuentas remotas con baja completa o retirarlas temporalmente.
- Decidir cómo suplir la falta de backups programados en Supabase Free: Pro, copias manuales, export externo o retirada temporal de remoto.
- Facilitar un canal privado de privacidad que controle.
- Facilitar, si procede, una cuenta remota de prueba controlada para diagnosticar login sin usar credenciales personales.
- Designar, si desea la garantía ampliada, un revisor jurídico independiente.
