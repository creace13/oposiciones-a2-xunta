# Estado actual del proyecto

Última actualización: 20 de julio de 2026.

Este archivo es la fotografía canónica y breve del proyecto. Debe actualizarse al finalizar cada sesión relevante.

## Objetivo

Plataforma Web independiente de preparación inteligente para el Cuerpo de Gestión (A2) de la Xunta de Galicia. Incluye práctica tipo test, simulacros oficiales, corrección razonada, repaso de errores, metas personales y autenticación con perfil privado.

## Decisión actual

**VERSIÓN 1.1.1 (ESTABLE EN MODO LOCAL / CUENTAS REMOTAS EN BETA / AUDITORÍA DE CONTENIDO CONTINUA)**.
El ciclo **C01 — Construcción, auditoría y estabilización** está cerrado con los informes 01–21. La versión supera la suite automatizada, fue validada manualmente por el usuario en tableta, móvil y PC y está publicada en **Cloudflare Workers** (`https://oposiciones-xunta.opos-galicia.workers.dev`). El ciclo **C02 — Versión plenamente funcional** queda abierto mediante el informe 22 y su única cola ejecutable es `.ia/COLA-ACTIVA.md`. Licencia **CC BY-NC-SA 4.0 (No Comercial)**.

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
- 🟡 **Backup y rollback (C02-06)**: creado `docs/OPERACION-RECUPERACION.md` y ensayo no destructivo de recuperación Git mediante `scripts/test-recovery-runbook.js`. La puerta queda bloqueada para cierre total hasta confirmar backup/restauración real en paneles de Cloudflare y Supabase con el titular.
- ✅ **Validación manual multidispositivo**: el usuario declara funcionamiento visual satisfactorio en tableta, móvil y PC el 19 de julio de 2026.

## Cifras canónicas

- Preguntas totales: **1.522** (1.207 de elaboración propia + 315 de 3 exámenes oficiales históricos).
- Incompletas o errores de validación: **0** (`node scripts/validar-banco.js` -> RESULTADO: OK).
- Temas troncales inventariados: **23**.
- Despliegue en producción: Cloudflare Workers desde `./public` (`https://oposiciones-xunta.opos-galicia.workers.dev`).
- Autenticación y DB: Supabase (`mquigtfqvznwnovzjudf.supabase.co`).
- Licencia: CC BY-NC-SA 4.0 (Atribución - No Comercial - Compartir Igual).

## Siguiente tarea exacta

- Ejecutar `C02-07`: revisión de seguridad, privacidad técnica, dependencias, cabeceras, errores y rendimiento de producción.
- `C02-06` queda bloqueado para cierre completo hasta revisar con el titular los paneles de Cloudflare y Supabase.
- Mientras el titular está ausente puede avanzarse `C02-07` y `C02-08`, respetando un único elemento `EN CURSO` en toda la cola.
- Al regresar el titular, resolver las decisiones bloqueadas `C02-01` y `C02-02` antes de validar el ciclo remoto `C02-03`.

## Bloqueos activos

- **Versión 1.1.1 estable en modo local:** ninguno conocido tras la suite automatizada y la validación manual multidispositivo del usuario.
- **Publicación:** versión 1.1.1 publicada y verificada en Cloudflare Workers el 19 de julio de 2026.
- **Cuentas remotas:** permanecen en Beta porque no existe borrado remoto autoservicio ni un canal privado de privacidad confirmado por el titular. El correo no reconocido `oposiciones.a2.xunta@gmail.com` se ha retirado de la aplicación.
- **Login remoto:** `C02-11` cerrado. El titular confirma el 20 de julio de 2026 que el acceso entra correctamente en modo incógnito tras desplegar el mensaje guiado y normalizar correo. La causa práctica queda compatible con caché/autorrelleno/estado local de navegador, no con rotura del login remoto.
- **Revisión jurídica externa:** `C02-09` requiere un profesional independiente designado por el titular.
- **Cola ejecutable:** el resto de pendientes y sus dependencias constan exclusivamente en `.ia/COLA-ACTIVA.md`.
- **GitHub/publicación:** desde el 20 de julio de 2026 el titular autoriza a Codex/OpenAI a hacer `push` a `origin/main` tras checkpoints validados y documentados. La autorización no cubre acciones destructivas, secretos, reescritura de historial ni configuración sensible.
- **Accesibilidad/UIX:** `C02-05` cerrado con correcciones y pruebas de accesibilidad básica. Queda como mejora futura opcional una auditoría humana especializada con lector de pantalla real.
- **Backup/rollback:** `C02-06` tiene runbook y ensayo local seguro, pero no se cierra completamente hasta comprobar backup/restauración real en Cloudflare/Supabase con acceso del titular.

## Archivos clave

- Aplicación en producción: `./public/` (`index.html`, `styles.css`, `app.js`, `manifest.json`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg`).
- Script de sincronización: `scripts/sync-public.js`.
- Script de validación: `scripts/validar-banco.js`.
- Memoria del proyecto e IA: `.ia/ESTADO-PROYECTO.md`, `.ia/PROTOCOLO.md`, `AGENTS.md`.
- Cola activa: `.ia/COLA-ACTIVA.md`.
- Cola de alto razonamiento: `.ia/COLA-ALTO-RAZONAMIENTO.md`.
- Informes Inter-IA: `.ia/auditorias/INDEX.md` y agrupación en `.ia/auditorias/CICLOS.md`.
