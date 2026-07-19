# Estado actual del proyecto

Última actualización: 19 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web independiente de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con perfil privado.

## Decisión actual

**VERSIÓN 1.1.1 (ESTABLE EN MODO LOCAL / CUENTAS REMOTAS EN BETA / AUDITORÍA DE CONTENIDO CONTINUA)**.
La versión corrige los pendientes de los informes 15 y 16, incorpora el cierre editorial del informe 18 y elimina en el informe 19 las antiguas metas internas de producción que todavía podían interpretarse como progreso real. Supera la suite automatizada. El usuario confirma además una prueba manual satisfactoria de interfaz y experiencia de uso en tableta, móvil y PC. La versión pública de **Cloudflare Workers** (`https://oposiciones-xunta.opos-galicia.workers.dev`) fue actualizada desde GitHub y verificada por HTTP el 19 de julio de 2026, según el cierre 20. Licencia **CC BY-NC-SA 4.0 (No Comercial)**.

### Hitos completados (Auditoría Codex / Antigravity):
- ✅ **Aislamiento físico y Lista Blanca en `./public`**: Despliegue en Cloudflare Workers desde `./public`, aislado de archivos internos. Sincronización automatizada con lista blanca estricta en `scripts/sync-public.js` (paridad comprobada por SHA-256 y purga de huérfanos raíz probada).
- ✅ **Inventario del banco sin metas engañosas**: La interfaz muestra únicamente cantidades reales: 1.522 disponibles, 1.207 propias, 315 oficiales, 302 del Bloque I y 905 del Bloque II. Se retiraron `1.207/1.210`, `99,8 %`, porcentajes por objetivo y la expresión «progreso real».
- ✅ **Filtros Temáticos Inequívocos y Extraídos**: `filterQuestionsByCategory` extraída globalmente en `app.js`, ejercitada por `scripts/test-filters.js` con aserciones reales y sintéticas pasando 100% OK.
- ✅ **Gestión de Estados de Autenticación de 3 Niveles (5 Aserciones)**: Diferenciación estricta entre `authenticated` (Supabase `session.user`), `guest` (local sin sesión remota) y `unauthenticated`. Formularios separados de Inicio de Sesión y Crear Cuenta Nueva. Validadas 5 aserciones automatizadas en `scripts/test-auth-states.js`.
- ✅ **Suite de integración DOM/JSDOM**: `scripts/test-browser-e2e.js` ejercita HTML y `app.js` reales, navegación, práctica, simulacro, persistencia escrita, alta pendiente, privacidad, documentos, métricas y borrado local. No se presenta como navegador gráfico real.
- ✅ **Privacidad y transparencia de Beta**: Información básica coherente con `localStorage`, Supabase y `user_feedback`; función real «Borrar progreso»; retirada de la afirmación no comprobada sobre servidores en la UE y de promesas editoriales absolutas.
- ✅ **Recuperación de Contraseña Supabase**: Inspector de hash `#access_token` / `type=recovery` abriendo el modal de nueva contraseña.
- ✅ **SEO y Redes Sociales**: Open Graph, Twitter Cards, Schema.org y verificado en Google Search Console.
- ✅ **Licencia Open Source No Comercial**: `CC BY-NC-SA 4.0` configurada en `LICENSE`, `README.md` y `CONTRIBUTING.md`.
- ✅ **Cierre editorial y créditos**: la Guía y metodología explica la dirección humana, la colaboración de Gemini/Antigravity y Codex, muestra la tecnología empleada, enlaza discretamente el repositorio y termina con una frase motivadora original.
- ✅ **Créditos visibles en GitHub**: el `README.md` incluye una sección específica de autoría humana y colaboración con Gemini/Antigravity y Codex/OpenAI, con sus funciones diferenciadas.
- ✅ **Validación manual multidispositivo**: el usuario declara funcionamiento visual satisfactorio en tableta, móvil y PC el 19 de julio de 2026.

## Cifras canónicas

- Preguntas totales: **1.522** (1.207 de elaboración propia + 315 de 3 exámenes oficiales históricos).
- Incompletas o errores de validación: **0** (`node scripts/validar-banco.js` -> RESULTADO: OK).
- Temas troncales inventariados: **23**.
- Despliegue en producción: Cloudflare Workers desde `./public` (`https://oposiciones-xunta.opos-galicia.workers.dev`).
- Autenticación y DB: Supabase (`mquigtfqvznwnovzjudf.supabase.co`).
- Licencia: CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual).

## Siguiente tarea exacta

- Para declarar también estable el servicio de cuentas remotas: ofrecer borrado remoto autoservicio o confirmar un canal privado controlado por el titular; después validar ese ciclo de vida extremo a extremo.
- Para una versión definitiva con garantías ampliadas: completar accesibilidad asistida, documentar backup/rollback y obtener revisión jurídica independiente.

## Bloqueos activos

- **Versión 1.1.1 estable en modo local:** ninguno conocido tras la suite automatizada y la validación manual multidispositivo del usuario.
- **Publicación:** versión 1.1.1 publicada y verificada en Cloudflare Workers el 19 de julio de 2026.
- **Cuentas remotas:** permanecen en Beta porque no existe borrado remoto autoservicio ni un canal privado de privacidad confirmado por el titular. El correo no reconocido `oposiciones.a2.xunta@gmail.com` se ha retirado de la aplicación.
- **Versión definitiva ampliada:** pendientes accesibilidad asistida, backup/rollback, ciclo remoto completo y revisión jurídica independiente.

## Archivos clave

- Aplicación en producción: `./public/` (`index.html`, `styles.css`, `app.js`, `manifest.json`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`).
- Script de sincronización: `scripts/sync-public.js`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Informes Inter-IA: `.ia/auditorias/`.
