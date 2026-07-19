# Estado actual del proyecto

Última actualización: 19 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web independiente de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con perfil privado.

## Decisión actual

**VERSIÓN 1.0 (BETA PÚBLICA ABIERTA / RELEASE CANDIDATE)**.
Plataforma 100% operativa y transparente abierta al público bajo licencia **CC BY-NC-SA 4.0 (No Comercial)**. Desplegada en **Cloudflare Workers** (`https://oposiciones-xunta.opos-galicia.workers.dev`) vinculada a GitHub con backend en **Supabase** (0 €/mes).

### Hitos completados (Auditoría Codex / Antigravity):
- ✅ **Supabase URL & Redirect Configuration**: `Site URL` configurada a `https://oposiciones-xunta.opos-galicia.workers.dev` con `Redirect URLs` `https://oposiciones-xunta.opos-galicia.workers.dev/*`. Manejo de tasa de límite anti-spam traducido al español.
- ✅ **Unificación del recuento de preguntas**: Cobertura corregida dinámicamente a 1.207 de temario propio + 315 oficiales (total 1.522). `validar-banco.js` verificado OK sin errores ni duplicados.
- ✅ **Recuperación de Contraseña Bulletproof**: Captura inmediata de `#access_token` y `type=recovery` abriendo el modal de nueva contraseña.
- ✅ **Despliegue directo en Workers**: `wrangler.json` sirviendo desde raíz con `index.js` delegation para `og-image.jpg` y assets estáticos.
- ✅ **SEO y Redes Sociales**: Open Graph, Twitter Cards, Schema.org y verificado en Google Search Console.
- ✅ **Licencia Open Source No Comercial**: `CC BY-NC-SA 4.0` configurada en `LICENSE`, `README.md` y `CONTRIBUTING.md`.

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

- Aplicación en producción: `index.html`, `styles.css`, `app.js`, `index.js`, `wrangler.json`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Informes Inter-IA: `.ia/auditorias/`.
