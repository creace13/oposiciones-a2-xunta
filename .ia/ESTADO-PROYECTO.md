# Estado actual del proyecto

Última actualización: 20 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web independiente de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con perfil privado.

## Decisión actual

**VERSIÓN 1.2.0 ESTABLE LOCAL (CUENTAS REMOTAS PAUSADAS / AUDITORÍA DE CONTENIDO CONTINUA)**.
El ciclo **C01 — Construcción, auditoría y estabilización** está cerrado con los informes 01–21. La versión 1.2.0 supera la suite automatizada, fue validada manualmente por el usuario en tableta, móvil y PC y está publicada en **Cloudflare Workers** (`https://oposiciones-xunta.opos-galicia.workers.dev`). El ciclo **C02 — Versión plenamente funcional local** queda cerrado operativamente mediante el informe 36, manteniendo `C02-09` como garantía jurídica externa futura. Licencia **CC BY-NC-SA 4.0 (No Comercial)**.

Desde el 20 de julio de 2026, por instrucción expresa del titular, **Codex/OpenAI queda como titular operativo del proyecto**: auditor, constructor y gestor documental. El modo normal de trabajo será razonamiento medio para optimizar cuota; las tareas que puedan justificar un modelo o razonamiento superior se registran en `.ia/COLA-ALTO-RAZONAMIENTO.md` y se consultan previamente con el titular.

### Hitos completados (Auditoría Codex / Antigravity):
- ✅ **Aislamiento físico y Lista Blanca en `./public`**: Despliegue en Cloudflare Workers desde `./public`, aislado de archivos internos. Sincronización automatizada con lista blanca estricta en `scripts/sync-public.js` (paridad comprobada por SHA-256 y purga de huérfanos raíz probada).
- ✅ **Inventario del banco sin metas engañosas**: La interfaz muestra únicamente cantidades reales: 1.522 disponibles, 1.207 propias, 315 oficiales, 302 del Bloque I y 905 del Bloque II. Se retiraron `1.207/1.210`, `99,8 %`, porcentajes por objetivo y la expresión «progreso real».
- ✅ **Filtros Temáticos Inequívocos y Extraídos**: `filterQuestionsByCategory` extraída globalmente en `app.js`, ejercitada por `scripts/test-filters.js` con aserciones reales y sintéticas pasando 100% OK.
- ✅ **Gestión de Estados de Autenticación de 3 Niveles (6 Aserciones)**: Diferenciación estricta entre `authenticated` (Supabase `session.user`), `guest` (local sin sesión remota) y `unauthenticated`. Formularios separados de Inicio de Sesión y Crear Cuenta Nueva. Validadas 6 aserciones automatizadas en `scripts/test-auth-states.js`, incluyendo normalización de correo y mensaje guiado ante credenciales inválidas.
- ✅ **Suite de integración DOM/JSDOM**: `scripts/test-browser-e2e.js` ejercita HTML y `app.js` reales, navegación, práctica, simulacro, persistencia escrita, alta pendiente, privacidad, documentos, métricas y borrado local. No se presenta como navegador gráfico real.
- ✅ **Privacidad y transparencia de Beta**: Información básica coherente con `localStorage`, Supabase y `user_feedback`; función real «Borrar progreso»; retirada de la afirmación no comprobada sobre servidores en la UE y de promesas editoriales absolutas.
- ✅ **Recuperación de Contraseña Supabase**: Inspector de hash `#access_token` / `type=recovery` abriendo el modal de nueva contraseña.
- ✅ **SEO y Redes Sociales**: Open Graph, Twitter Cards, Schema.org y verificado en Google Search Console.
- ✅ **Licencia Open Source No Comercial**: `CC BY-NC-SA 4.0` configurada en `LICENSE`, `README.md` y `CONTRIBUTING.md`.
- ✅ **Cierre editorial y créditos**: la Guía y metodología explica la dirección humana, la colaboración de Gemini/Antigravity y Codex, muestra la tecnología empleada, enlaza discretamente el repositorio y termina con una frase motivadora original.
- ✅ **Créditos visibles en GitHub**: el `README.md` incluye una sección específica de autoría humana y colaboración con Gemini/Antigravity y Codex/OpenAI, con sus funciones diferenciadas.
- ✅ **Suite Playwright E2E en Navegadores Reales (C02-04)**: Pruebas automatizadas en Chromium, Firefox y WebKit (escritorio y visores móviles Pixel 5 e iPhone 12) pasando 30/30 (100% ok). Corregida la restauración de hash directos, modales de privacidad y scrolling en JSDOM.
- ✅ **Accesibilidad básica y UIX (C02-05)**: Corregidos overflow móvil/escritorio, sidebar sin scroll horizontal, navegación semántica con `aria-current`, diálogos con nombre/descripción accesible, foco visible, contraste básico AA y prueba de teclado. No sustituye una auditoría humana especializada con lector de pantalla real.
- ✅ **Decisión sin nuevas suscripciones (C02-01/C02-02/C02-03/C02-06)**: el titular decide no pagar Supabase Pro ni otra suscripción. Las cuentas remotas quedan pausadas y el producto principal pasa a ser estable local. Se reducen riesgos de backup, privacidad y soporte, y se conserva el código remoto como opción futura no pública.
- ✅ **Seguridad técnica básica y rendimiento (C02-07)**: retirado el CDN público, la URL y la clave pública de Supabase; añadidas cabeceras de seguridad mediante `public/_headers`; protegidas metas locales frente a HTML inyectado; auditadas dependencias de producción con 0 vulnerabilidades; añadida `scripts/test-security-basics.js`; producción verificada con HTML nuevo y cabeceras CSP/nosniff/referrer/x-frame/permissions/HSTS.
- ✅ **Mantenimiento normativo (C02-08)**: creado `docs/MANTENIMIENTO-NORMATIVO.md` con responsable, fuentes, cadencia, estados de vigencia, protocolo de cambio y retirada segura; añadida `scripts/test-normative-maintenance.js` a la suite. Simulación Ley 39/2015: 153 preguntas localizadas para revisión sin modificar el banco.
- ✅ **Aceptación final 1.2.0 estable local (C02-10)**: versión elevada de `1.2.0-candidate` a `1.2.0`, etiqueta pública actualizada a «Versión 1.2.0 estable local», `public/` sincronizado, `scripts/test-release-acceptance.js` añadido y producción verificada con `v21-stable-local-20260720`.
- ✅ **Validación manual multidispositivo**: el usuario declara funcionamiento visual satisfactorio en tableta, móvil y PC el 19 de julio de 2026.

## Cifras canónicas

- Preguntas totales: **1.522** (1.207 de elaboración propia + 315 de 3 exámenes oficiales históricos).
- Incompletas o errores de validación: **0** (`node scripts/validar-banco.js` -> RESULTADO: OK).
- Fuentes normativas usadas por el banco: **25** (`node scripts/test-normative-maintenance.js` -> RESULTADO: OK).
- Temas troncales inventariados: **23**.
- Despliegue en producción: Cloudflare Workers desde `./public` (`https://oposiciones-xunta.opos-galicia.workers.dev`), versión pública `v21-stable-local-20260720`.
- Autenticación y DB: Supabase (`mquigtfqvznwnovzjudf.supabase.co`).
- Licencia: CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual).

## Siguiente tarea exacta

- No quedan tareas ejecutables abiertas para la versión 1.2.0 estable local.
- Próxima decisión opcional: abrir un nuevo ciclo para revisión pública/GitHub, donaciones sin suscripción mensual o revisión jurídica externa (`C02-09`) si el titular designa revisor.

## Bloqueos activos

- **Versión 1.2.0 estable local:** ninguno conocido tras la suite automatizada, la validación manual multidispositivo del usuario y el smoke test público.
- **Publicación:** GitHub y Cloudflare Workers alineados tras `4c85a61`. Producción responde HTTP 200, sirve el HTML nuevo (`v21-stable-local-20260720`) y aplica cabeceras de seguridad desde `public/_headers`.
- **Cuentas remotas:** pausadas en la interfaz pública por decisión del titular para evitar nuevas suscripciones, backups frágiles y complejidad de privacidad. El modo local es el camino principal.
- **Login remoto:** `C02-11` cerrado. El titular confirma el 20 de julio de 2026 que el acceso entra correctamente en modo incógnito tras desplegar el mensaje guiado y normalizar correo. La causa práctica queda compatible con caché/autorrelleno/estado local de navegador, no con rotura del login remoto.
- **Revisión jurídica externa:** `C02-09` requiere un profesional independiente designado por el titular.
- **Cola ejecutable:** el resto de pendientes y sus dependencias constan exclusivamente en `.ia/COLA-ACTIVA.md`.
- **GitHub/publicación:** desde el 20 de julio de 2026 el titular autoriza a Codex/OpenAI a hacer `push` a `origin/main` tras checkpoints validados y documentados. La autorización no cubre acciones destructivas, secretos, reescritura de historial ni configuración sensible.
- **Accesibilidad/UIX:** `C02-05` cerrado con correcciones y pruebas de accesibilidad básica. Queda como mejora futura opcional una auditoría humana especializada con lector de pantalla real.
- **Backup/rollback:** `C02-06` cerrado para versión local sin suscripciones. Supabase Free no incluye backups programados y por eso no se usa como dependencia operativa de usuarios.
- **Playwright Firefox local:** en la sesión del 20 de julio de 2026, Firefox falla antes de cargar la app con `browserContext.newPage: Cannot read properties of undefined (reading '_page')`. La suite de cierre usa Chromium, WebKit y visores móviles; Firefox queda como diagnóstico opcional `npm run test:firefox`.

## Archivos clave

- Aplicación en producción: `./public/` (`index.html`, `styles.css`, `app.js`, `manifest.json`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`).
- Script de sincronización: `scripts/sync-public.js`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Cola activa: `.ia/COLA-ACTIVA.md`.
- Cola de alto razonamiento: `.ia/COLA-ALTO-RAZONAMIENTO.md`.
- Informes Inter-IA: `.ia/auditorias/INDEX.md` y agrupación en `.ia/auditorias/CICLOS.md`.
