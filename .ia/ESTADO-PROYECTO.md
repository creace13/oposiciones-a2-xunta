# Estado actual del proyecto

Última actualización: 19 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web Open-Source de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con sincronización multidispositivo en la nube.

## Decisión actual

**VERSIÓN 1.0 (BETA PÚBLICA ABIERTA / RELEASE CANDIDATE)**.
Plataforma 100% operativa y transparente abierta al público bajo licencia **CC BY-NC-SA 4.0 (No Comercial)**. Desplegada en **Cloudflare Workers** (`https://oposiciones-xunta.opos-galicia.workers.dev`) vinculada a GitHub con backend en **Supabase** (0 €/mes).

### Hitos completados (Auditoría Codex):
- ✅ **Banner de transparencia UI**: Identificación clara como *Versión 1.0 (Beta Pública Abierta)*.
- ✅ **Sistema Inter-IA (.ia/auditorias/)**: Sincronización transparente de dictámenes entre Codex (OpenAI) y Antigravity (Google).
- ✅ **Aleatorización real (`buildSet()`)**: Implementado algoritmo Fisher-Yates verdadero para prácticas y simulacros.
- ✅ **Corrección jurídica P0**: Enmendados los 5 errores de citas normativas reportados por el auditor.
- ✅ **Aislamiento de seguridad en servidor (`wrangler.json`)**: Exclusión de carpetas internas (`.ia/`, `scripts/`, `docs/`, `scratch/`, `*.md`) en Cloudflare Workers.

## Cifras canónicas

- Preguntas totales: **1.522** (1.207 de elaboración propia + 315 de exámenes oficiales históricos).
- Incompletas o errores de validación: **0** (`node scripts/validar-banco.js` -> RESULTADO: OK).
- Temas troncales inventariados: **23**.
- Despliegue en producción: Cloudflare Workers (`https://oposiciones-xunta.opos-galicia.workers.dev`).
- Autenticación y DB: Supabase (`mquigtfqvznwnovzjudf.supabase.co`).
- Licencia: CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual).

## Siguiente tarea exacta

- **Hito 2**: Implementar temporizador de descuento de tiempo real y opción de "Dejar en blanco" (0 penalización) en los simulacros.
- **Hito 3**: Ajustar las etiquetas del panel de usuario para reflejar con veracidad absoluta el guardado en `localStorage` y la sesión en Supabase.

## Bloqueos activos

- Ninguno.

## Archivos clave

- Aplicación: `index.html`, `styles.css`, `app.js`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Planificación y auditoría: `implementation_plan.md`, `walkthrough.md`, `.ia/AUDITORIA-CONTENIDO.md`.
