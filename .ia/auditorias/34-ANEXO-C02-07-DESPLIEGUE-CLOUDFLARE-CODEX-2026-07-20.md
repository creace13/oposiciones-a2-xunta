# 34 - Anexo C02-07: despliegue Cloudflare pendiente

Fecha: 20 de julio de 2026.

Emisor: Codex / OpenAI, actuando como titular operativo.

Destinatario: Usuario / relevo Inter-IA.

## Situación

El checkpoint de seguridad `caa052f` se subió correctamente a `origin/main`.

Actualización tras captura del panel del titular:

- Cloudflare muestra activa una implementación reciente.
- La URL pública ya sirve el HTML nuevo con `app.js?v=v20-security-20260720`.
- Ya no aparece el CDN de Supabase en el HTML público.
- Las cabeceras de seguridad aún no aparecen porque los assets estáticos se sirven directamente y no pasan por `index.js` por defecto.

El mecanismo correcto para cabeceras en Static Assets es publicar un archivo `_headers` dentro de `public/`.

## Situación anterior

La URL pública `https://oposiciones-xunta.opos-galicia.workers.dev/` seguía sirviendo el HTML anterior:

- mantiene la carga de `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`;
- mantiene `app.js?v=v19-stable-local-20260719`;
- no muestra las cabeceras nuevas añadidas al Worker.

## Evidencia

- `git push origin main`: correcto (`9724a9f..caa052f main -> main`).
- `curl -I https://oposiciones-xunta.opos-galicia.workers.dev/?v=caa052f-3`: HTTP 200, `CF-Cache-Status: HIT`, sin cabeceras nuevas.
- Lectura del HTML público: sigue apareciendo el script CDN de Supabase.
- `npx wrangler deploy --dry-run`: correcto.
- `npx wrangler deploy`: bloqueado porque la sesión no tiene `CLOUDFLARE_API_TOKEN`.

## Diagnóstico

El repositorio está actualizado, pero el despliegue de Cloudflare no se ha activado o no ha tomado el commit nuevo. No parece un error del código, sino de publicación/credenciales.

## Cómo desbloquear

Opción recomendada para el titular:

1. Entrar en Cloudflare.
2. Abrir el Worker `oposiciones-xunta`.
3. Revisar la pestaña de implementaciones/despliegues.
4. Lanzar o reintentar el despliegue asociado al último commit de GitHub `caa052f`.
5. Avisar a Codex para comprobar:
   - HTTP 200;
   - ausencia del CDN Supabase en HTML;
   - cabeceras `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` y `Permissions-Policy`.

Alternativa técnica:

- Facilitar un `CLOUDFLARE_API_TOKEN` temporal y limitado a este Worker para ejecutar `npx wrangler deploy`.
- No se recomienda compartir tokens amplios ni credenciales personales en el chat.

## Estado de C02-07

`C02-07` queda implementado y validado en GitHub, pero bloqueado para cierre de producción hasta que Cloudflare publique `caa052f`.
