# Estado actual del proyecto

Última actualización: 19 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web Open-Source de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con sincronización multidispositivo en la nube.

## Decisión actual

Proyecto 100% en producción y abierto al público bajo licencia **CC BY-NC-SA 4.0 (No Comercial)**. Desplegado en **Cloudflare Workers / Pages** (`https://oposiciones-xunta.opos-galicia.workers.dev`) vinculado a GitHub con backend de usuarios en **Supabase** (0 €/mes). Verificado en **Google Search Console** con `sitemap.xml`, `robots.txt`, tarjetas Open Graph sociales para WhatsApp y PWA installable.

## Cifras canónicas

- Preguntas totales: **1.522**.
  - Preguntas del temario general: **1.212** (100% auditadas y verificadas).
  - Preguntas oficiales de exámenes reales: **310** (2025 PE, 2024 PE, 2024 Funcionarización).
- Incompletas o errores de validación: **0** (`node scripts/validar-banco.js` -> RESULTADO: OK).
- Temas troncales inventariados: **23**.
- Archivos locales oficiales en Biblioteca: **25**.
- Despliegue en producción: Cloudflare Workers (`https://oposiciones-xunta.opos-galicia.workers.dev`).
- Autenticación y DB: Supabase (`mquigtfqvznwnovzjudf.supabase.co`).
- Licencia: CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual).

## Siguiente tarea exacta

- Mantener la plataforma en producción, recibir aportaciones de la comunidad mediante el buzón de erratas integrado o sugerencias vía GitHub Open Source.
- Si en el futuro se desea, extender la arquitectura a otros subgrupos (C1, C2, SERGAS) manteniendo el foco en la Xunta de Galicia.

## Bloqueos activos

- Ninguno.

## Archivos clave

- Aplicación: `index.html`, `styles.css`, `app.js`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Planificación y auditoría: `implementation_plan.md`, `walkthrough.md`, `.ia/AUDITORIA-CONTENIDO.md`.
