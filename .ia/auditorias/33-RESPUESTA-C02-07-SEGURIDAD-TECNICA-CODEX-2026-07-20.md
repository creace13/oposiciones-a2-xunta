# 33 - Respuesta: cierre C02-07 seguridad técnica básica

Fecha: 20 de julio de 2026.

Emisor: Codex / OpenAI, actuando como titular operativo.

Destinatario: Usuario / relevo Inter-IA.

## Alcance

Se ejecuta `C02-07`: revisar seguridad, privacidad técnica, dependencias, cabeceras, errores y rendimiento de la versión local first.

No se revisa contenido jurídico en este informe. La vigencia normativa queda para `C02-08` y la revisión jurídica independiente sigue bloqueada por `C02-09`.

## Hallazgos

1. **CDN externo y configuración remota innecesarios**: `index.html` seguía cargando `@supabase/supabase-js` desde jsDelivr y `app.js` conservaba URL/clave pública de Supabase aunque `REMOTE_AUTH_ENABLED = false`.
   - Riesgo: dependencia externa innecesaria, más superficie de carga y coherencia débil con “cuentas remotas pausadas”.
   - Estado: corregido.

2. **Cabeceras de seguridad ausentes en el Worker**.
   - Riesgo: protección de navegador incompleta para una web pública.
   - Estado: corregido con cabeceras básicas y CSP para la app principal.

3. **Metas locales renderizadas con HTML**.
   - Riesgo bajo en esta versión porque el dato vive en el propio navegador del usuario, pero podía permitir HTML local inyectado si el almacenamiento se manipulaba.
   - Estado: mitigado con escape de HTML en metas personales.

4. **Dependencias de producción**.
   - Resultado: no hay dependencias de producción y `npm audit --omit=dev --audit-level=high` devuelve 0 vulnerabilidades.

5. **Rendimiento**.
   - La app mantiene un `app.js` grande porque el banco de 1.522 preguntas está embebido. Para esta versión estable local se acepta como compromiso razonable: evita backend, coste, sincronización y dependencia de datos remotos.
   - Mejora futura opcional: separar banco por módulos/JSON si se quiere optimizar carga inicial.

## Cambios realizados

- `index.js`: añadido envoltorio de cabeceras de seguridad para respuestas del Worker.
- `index.html` y `public/index.html`: retirada la carga CDN de Supabase; actualizado cache buster de `app.js`.
- `app.js` y `public/app.js`: retirada la llamada con URL/clave pública de Supabase mientras el remoto siga pausado.
- `app.js` y `public/app.js`: añadido `escapeHTML()` y aplicado a metas locales.
- `scripts/test-security-basics.js`: nueva prueba automática de seguridad básica.
- `package.json`: `npm test` incluye la prueba de seguridad y se añade `npm run test:security`.
- `package-lock.json`: versión alineada con `1.2.0-candidate`.
- `README.md`: actualizado a versión 1.2 candidata y Supabase pausado.
- `.ia/COLA-ACTIVA.md`, `.ia/ESTADO-PROYECTO.md`, `.ia/BITACORA-IA.md` e `INDEX.md`: documentación del cierre.

## Pruebas ejecutadas

- `node --check app.js`: OK.
- `node --check index.js`: OK.
- `node scripts/test-security-basics.js`: OK.
- `npm audit --omit=dev --audit-level=high`: 0 vulnerabilidades.
- `node scripts/validar-banco.js`: OK, 1.522 preguntas, 0 incompletas, 0 duplicados.
- `npm test`: OK.
  - Banco: OK.
  - Filtros: OK.
  - Auth local: 6/6.
  - Accesibilidad básica: OK.
  - Runbook recuperación: OK.
  - Seguridad básica: OK.
  - Integración DOM/JSDOM: OK.
  - Playwright: 24/24 en Chromium, WebKit, mobile Chrome y mobile Safari.

## Resultado

La implementación técnica de `C02-07` queda cerrada en repositorio sin P0/P1 abiertos para la versión local first.

Tras subir el commit `caa052f` a `origin/main`, Cloudflare siguió sirviendo el HTML anterior. Por tanto, el cierre público de producción queda pendiente del anexo 34 hasta que se active el despliegue real en Cloudflare.

Queda como mejora futura no bloqueante estudiar la partición del banco para reducir peso inicial si la app crece mucho más.

## Siguiente paso

Desbloquear la publicación Cloudflare de `caa052f` y después continuar con `C02-08`: mantenimiento normativo, cadencia de revisión, alerta de cambios y retirada de preguntas afectadas.
