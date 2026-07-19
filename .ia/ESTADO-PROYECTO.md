# Estado actual del proyecto

Última actualización: 19 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web Open-Source de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con sincronización multidispositivo en la nube.

## Decisión actual

Proyecto 100% en producción y abierto al público. Desplegado en **Cloudflare Pages** con backend de usuarios y progreso en **Supabase** (0 €/mes). Se ha completado la integración de 315 preguntas oficiales de exámenes reales (2024 y 2025) y una pantalla completa de inicio de sesión e historia del opositor.

## Cifras canónicas

- Preguntas totales: **1.522**.
  - Preguntas del temario general: **1.212** (100% auditadas y verificadas).
  - Preguntas oficiales de exámenes reales: **310** (2025 PE, 2024 PE, 2024 Funcionarización).
- Incompletas o errores de validación: **0** (`node scripts/validar-banco.js` -> RESULTADO: OK).
- Temas troncales inventariados: **23**.
- Archivos locales oficiales en Biblioteca: **25**.
- Despliegue en producción: Cloudflare Pages (`oposiciones-a2-xunta`).
- Autenticación y DB: Supabase (`mquigtfqvznwnovzjudf.supabase.co`).

## Siguiente tarea exacta

- Mantener la plataforma en producción, recibir aportaciones de la comunidad mediante el buzón de erratas integrado o sugerencias vía GitHub Open Source.

## Bloqueos activos

- Ninguno.

## Archivos clave

- Aplicación: `index.html`, `styles.css`, `app.js`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Planificación y auditoría: `implementation_plan.md`, `walkthrough.md`, `.ia/AUDITORIA-CONTENIDO.md`.
