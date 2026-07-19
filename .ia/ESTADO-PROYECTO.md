# Estado actual del proyecto

Última actualización: 19 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web independiente de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con perfil privado.

## Decisión actual

**VERSIÓN 1.0 (BETA PÚBLICA APTA CONDICIONADA / AUDITORÍA CONTINUA EN CURSO)**.
Plataforma 100% operativa y transparente abierta al público bajo licencia **CC BY-NC-SA 4.0 (No Comercial)**. Desplegada en **Cloudflare Workers** (`https://oposiciones-xunta.opos-galicia.workers.dev`) vinculada a GitHub con backend en **Supabase** (0 €/mes). Advertencia visible de revisión continua en interfaz.

### Hitos completados (Auditoría Codex / Antigravity):
- ✅ **Aislamiento físico y Lista Blanca en `./public`**: Despliegue en Cloudflare Workers desde `./public`, aislado de archivos internos. Sincronización automatizada con lista blanca estricta en `scripts/sync-public.js` (paridad comprobada por SHA-256 y purga de huérfanos raíz probada).
- ✅ **Porcentajes de Cobertura Dinámicos**: Cálculo exacto en vivo sin textos estáticos de 100% (Bloque I al 100,7% [302/300], Bloque II al 99,5% [905/910], Total propio al 99,8% [1.207/1.210]).
- ✅ **Filtros Temáticos Inequívocos y Extraídos**: `filterQuestionsByCategory` extraída globalmente en `app.js`, ejercitada por `scripts/test-filters.js` con aserciones reales y sintéticas pasando 100% OK.
- ✅ **Gestión de Estados de Autenticación de 3 Niveles (5 Aserciones)**: Diferenciación estricta entre `authenticated` (Supabase `session.user`), `guest` (local sin sesión remota) y `unauthenticated`. Formularios separados de Inicio de Sesión y Crear Cuenta Nueva. Validadas 5 aserciones automatizadas en `scripts/test-auth-states.js`.
- ✅ **Suite Funcional E2E de Navegador**: Suite `scripts/test-browser-e2e.js` basada en JSDOM real ejercitando 8 flujos de usuario (acceso invitado, navegación por pestañas, práctica, simulacro con penalización -0,25, persistencia local, alta pendiente, modal de privacidad y verificación de 37 documentos en disco).
- ✅ **Política de Privacidad y Transparencia Normativa**: Modal `#privacyModal` en `index.html` con responsable, contacto (`oposiciones.a2.xunta@gmail.com`), tratamiento de `user_feedback` y derechos. Afirmación de banco ajustada a "1.522 preguntas clasificadas en revisión continua".
- ✅ **Recuperación de Contraseña Supabase**: Inspector de hash `#access_token` / `type=recovery` abriendo el modal de nueva contraseña.
- ✅ **SEO y Redes Sociales**: Open Graph, Twitter Cards, Schema.org y verificado en Google Search Console.
- ✅ **Licencia Open Source No Comercial**: `CC BY-NC-SA 4.0` configurada en `LICENSE`, `README.md` y `CONTRIBUTING.md`.

## Cifras canónicas

- Preguntas totales: **1.522** (1.207 de elaboración propia + 315 de 3 exámenes oficiales históricos).
- Incompletas o errores de validación: **0** (`node scripts/validar-banco.js` -> RESULTADO: OK).
- Temas troncales inventariados: **23**.
- Despliegue en producción: Cloudflare Workers desde `./public` (`https://oposiciones-xunta.opos-galicia.workers.dev`).
- Autenticación y DB: Supabase (`mquigtfqvznwnovzjudf.supabase.co`).
- Licencia: CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual).

## Siguiente tarea exacta

- Someter a revisión la respuesta 14 tras atender la Auditoría 13 dictaminada por Codex.

## Bloqueos activos

- Ninguno en código. Auditoría 13 atendida en desarrollo a la espera del dictamen final del auditor.

## Archivos clave

- Aplicación en producción: `./public/` (`index.html`, `styles.css`, `app.js`, `manifest.json`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`).
- Script de sincronización: `scripts/sync-public.js`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Informes Inter-IA: `.ia/auditorias/`.
