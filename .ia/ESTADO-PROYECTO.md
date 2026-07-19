# Estado actual del proyecto

Última actualización: 19 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web independiente de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con perfil privado.

## Decisión actual

**VERSIÓN 1.0 (BETA PÚBLICA ABIERTA / RELEASE CANDIDATE)**.
Plataforma 100% operativa y transparente abierta al público bajo licencia **CC BY-NC-SA 4.0 (No Comercial)**. Desplegada en **Cloudflare Workers** (`https://oposiciones-xunta.opos-galicia.workers.dev`) vinculada a GitHub con backend en **Supabase** (0 €/mes).

### Hitos completados (Auditoría Codex):
- ✅ **Aisle de Producción (`/public`)**: Despliegue en Cloudflare Workers desde un directorio estático aislado (`./public`), garantizando respuesta 404 en archivos internos (`.ia/`, `scripts/`, `docs/`, `scratch/`, `*.md`).
- ✅ **Fix de Regresión en Práctica**: `nextQuestion()` finaliza la práctica con pantalla de progreso y reserva la pantalla de simulacro exclusivamente para `quizMode === 'exam'`.
- ✅ **Autenticación Estricta**: Los formularios de login y registro comprueban la respuesta de Supabase y no activan la sesión visual si hay errores de credenciales.
- ✅ **Simulacro Oficial Profesional**: Temporizador regresivo en vivo (`⏱ M:SS`), opción de *"Dejar en blanco"* (0 penalización) y desglose neta.
- ✅ **Banner de transparencia UI y Veracidad**: Identificación clara como *Versión 1.0 (Beta Pública Abierta)* y distintivo *"Progreso guardado localmente"*.
- ✅ **Aleatorización real (`buildSet()`)**: Implementado algoritmo Fisher-Yates verdadero.
- ✅ **Corrección jurídica P0**: Enmendados los 5 errores de citas normativas reportados (`gobierno-comisiones-delegadas-creacion-12`, `estatuto-xunta-organo-colegiado-17`, `troncal-discapacidad-114`, `consultivo-galicia-consejeros-duracion-mandato-10`, `consultivo-galicia-duracion-mandato-seis-anos-art8`).
- ✅ **Protocolo Inter-IA y Puntos de Guardado**: Documentación en `.ia/auditorias/` y commits/checkpoints en Git.

## Cifras canónicas

- Preguntas totales: **1.522** (1.207 de elaboración propia + 315 de 3 exámenes oficiales históricos).
- Incompletas o errores de validación: **0** (`node scripts/validar-banco.js` -> RESULTADO: OK).
- Temas troncales inventariados: **23**.
- Despliegue en producción: Cloudflare Workers (`https://oposiciones-xunta.opos-galicia.workers.dev`).
- Autenticación y DB: Supabase (`mquigtfqvznwnovzjudf.supabase.co`).
- Licencia: CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual).

## Siguiente tarea exacta

- Mantener la plataforma en producción en Cloudflare Workers, supervisar reportes de usuarios y realizar mantenimiento normativo periódico.

## Bloqueos activos

- Ninguno.

## Archivos clave

- Aplicación en producción: `./public/` (`index.html`, `styles.css`, `app.js`).
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Informes Inter-IA: `.ia/auditorias/`.
