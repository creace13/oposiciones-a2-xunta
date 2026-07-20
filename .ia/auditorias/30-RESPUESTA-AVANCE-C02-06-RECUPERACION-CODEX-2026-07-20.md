# 30 - Respuesta avance C02-06: recuperación, backup y rollback

Fecha: 20 de julio de 2026.

Emisor: Codex / OpenAI, actuando como titular operativo.

Destinatario: Usuario / relevo Inter-IA.

## Resumen

Se avanza `C02-06` con un runbook operativo de backup, recuperación y rollback, escrito para ser comprensible por el titular aunque no tenga conocimientos técnicos.

No se marca `C02-06` como cerrado completo porque el ensayo real de Supabase y Cloudflare requiere acceso/control de los paneles del titular. Se evita simular una garantía que todavía no existe.

## Archivos creados o modificados

- `docs/OPERACION-RECUPERACION.md`: manual de rescate para GitHub, Cloudflare Workers y Supabase.
- `scripts/test-recovery-runbook.js`: prueba automática no destructiva del runbook y del estado recuperable de Git.
- `package.json`: añadido `test:ops` e integración del test de recuperación en la suite general.
- `.ia/COLA-ACTIVA.md`: `C02-06` pasa a `BLOQUEADO` con evidencia parcial y bloqueo explícito.
- `.ia/ESTADO-PROYECTO.md`: siguiente tarea ejecutable pasa a `C02-07`.
- `.ia/BITACORA-IA.md`: registrada la sesión.
- `.ia/auditorias/INDEX.md`: registrado este informe como secuencia 30.

## Ensayo seguro realizado

El test `scripts/test-recovery-runbook.js` verifica:

- que el runbook incluye GitHub, Cloudflare, Supabase, `git revert`, smoke test público y advertencia de secretos;
- que `wrangler.json` publica el directorio `./public`;
- que el remoto de GitHub apunta a `creace13/oposiciones-a2-xunta`;
- que los archivos críticos existen en `HEAD`;
- que puede generarse un archivo de backup no destructivo con `git archive`.

## Comprobaciones ejecutadas

- `node --check app.js`: OK.
- `node scripts/validar-banco.js`: OK, 1.522 preguntas, 0 incompletas, 0 duplicados.
- `node scripts/test-recovery-runbook.js`: OK.
- `node scripts/test-auth-states.js`: OK, 6/6.
- `node scripts/test-accessibility-basics.js`: OK.
- `node scripts/test-browser-e2e.js`: OK.
- Comprobación HTTP pública posterior al push: pendiente del cierre Git de este checkpoint.

## Limitaciones honestas

- No se ha entrado en el panel de Supabase.
- No se ha exportado una copia real de la base de datos.
- No se ha restaurado una copia real de Supabase.
- No se ha usado el panel de Cloudflare para revisar el histórico visual de despliegues.
- No se han tocado secretos, claves, usuarios ni datos reales.

## Estado

`C02-06` queda **bloqueado parcialmente** hasta que el titular permita o acompañe una revisión de paneles Cloudflare/Supabase.

Mi recomendación como Codex: no cerrar esta puerta con una mentira cómoda. El proyecto puede seguir avanzando en seguridad y rendimiento (`C02-07`) mientras esta comprobación real queda pendiente.

## Siguiente paso

Ejecutar `C02-07`: revisión de seguridad, privacidad técnica, dependencias, cabeceras, errores y rendimiento de producción.
