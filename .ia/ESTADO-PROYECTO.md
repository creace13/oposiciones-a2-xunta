# Estado actual del proyecto

Última actualización: 19 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web independiente de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con perfil privado.

## Decisión actual

**VERSIÓN 1.0 (BETA TÉCNICAMENTE CERRADA EN LOCAL / AUDITORÍA DE CONTENIDO CONTINUA)**.
La rama local corrige los pendientes de los informes 15 y 16 y supera la suite automatizada. La versión pública de **Cloudflare Workers** (`https://oposiciones-xunta.opos-galicia.workers.dev`) sigue vinculada a GitHub y no debe considerarse actualizada hasta un `push` autorizado expresamente por el usuario. Licencia **CC BY-NC-SA 4.0 (No Comercial)**.

### Hitos completados (Auditoría Codex / Antigravity):
- ✅ **Aislamiento físico y Lista Blanca en `./public`**: Despliegue en Cloudflare Workers desde `./public`, aislado de archivos internos. Sincronización automatizada con lista blanca estricta en `scripts/sync-public.js` (paridad comprobada por SHA-256 y purga de huérfanos raíz probada).
- ✅ **Objetivos internos de volumen transparentes**: La interfaz muestra 302/300 y 905/910, conserva el formato 1.207/1.210 y explica que estas cifras miden cantidad clasificada, no calidad jurídica ni preparación personal.
- ✅ **Filtros Temáticos Inequívocos y Extraídos**: `filterQuestionsByCategory` extraída globalmente en `app.js`, ejercitada por `scripts/test-filters.js` con aserciones reales y sintéticas pasando 100% OK.
- ✅ **Gestión de Estados de Autenticación de 3 Niveles (5 Aserciones)**: Diferenciación estricta entre `authenticated` (Supabase `session.user`), `guest` (local sin sesión remota) y `unauthenticated`. Formularios separados de Inicio de Sesión y Crear Cuenta Nueva. Validadas 5 aserciones automatizadas en `scripts/test-auth-states.js`.
- ✅ **Suite de integración DOM/JSDOM**: `scripts/test-browser-e2e.js` ejercita HTML y `app.js` reales, navegación, práctica, simulacro, persistencia escrita, alta pendiente, privacidad, documentos, métricas y borrado local. No se presenta como navegador gráfico real.
- ✅ **Privacidad y transparencia de Beta**: Información básica coherente con `localStorage`, Supabase y `user_feedback`; función real «Borrar progreso»; retirada de la afirmación no comprobada sobre servidores en la UE y de promesas editoriales absolutas.
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

- Revisar el diff y, solo con autorización expresa del usuario, hacer `push` para actualizar la Beta publicada.
- Para una versión definitiva: ejecutar pruebas en navegador gráfico real, móvil y escritorio; completar accesibilidad; documentar backup/rollback y obtener revisión jurídica independiente.

## Bloqueos activos

- **Beta local:** ninguno conocido tras la suite automatizada.
- **Publicación:** pendiente de autorización expresa para `push`/despliegue.
- **Privacidad:** el titular debe confirmar que controla y atiende `oposiciones.a2.xunta@gmail.com`.
- **Versión definitiva:** pendientes navegador real, dispositivos, accesibilidad, backup/rollback y revisión jurídica independiente.

## Archivos clave

- Aplicación en producción: `./public/` (`index.html`, `styles.css`, `app.js`, `manifest.json`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`).
- Script de sincronización: `scripts/sync-public.js`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Informes Inter-IA: `.ia/auditorias/`.
