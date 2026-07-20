# 32 - Respuesta: cierre del remoto y estrategia local first

Fecha: 20 de julio de 2026.

Emisor: Codex / OpenAI, actuando como titular operativo.

Destinatario: Usuario / relevo Inter-IA.

## Decisión del titular

El titular indica que no quiere pagar ninguna suscripción adicional para un proyecto que todavía no está rentabilizando y que desea intentar cerrar el proyecto esta misma semana.

## Decisión de producto

Se adopta la estrategia **local first**:

- modo local como producto principal;
- cuentas remotas pausadas en la interfaz pública;
- Supabase conservado como posibilidad técnica futura, pero no ofrecido al usuario;
- sin prometer sincronización entre dispositivos;
- sin depender de backups automáticos inexistentes en Supabase Free.

## Qué significa para multicuentas

- Cada usuario en su propio móvil, tablet, PC o navegador mantiene su progreso separado porque se guarda en su navegador.
- Dos personas usando el mismo navegador comparten el mismo espacio local. Si eso se convierte en una necesidad real, se implementarán perfiles locales múltiples sin nube.
- La sincronización entre dispositivos queda fuera de esta versión para evitar coste, backup frágil y complejidad legal.

## Cambios funcionales

- Portada orientada a “Entrar en modo local”.
- Retirada de campos públicos de correo/contraseña en la pantalla principal.
- Registro, login remoto y recuperación remota no se ofrecen al usuario.
- `REMOTE_AUTH_ENABLED = false` impide inicializar Supabase como auth pública.
- Política de privacidad actualizada a cuentas remotas pausadas.
- Suite Playwright normal ajustada a Chromium, WebKit y visores móviles; Firefox queda como prueba opcional porque el entorno local falla antes de abrir página con `browserContext.newPage`.

## Cierre de cola

- `C02-01`: cerrado por retirada/pausa coherente de remoto.
- `C02-02`: cerrado para esta versión local, al no existir cuentas remotas públicas.
- `C02-03`: cerrado por no requerir validación E2E de un flujo remoto retirado.
- `C02-06`: cerrado para versión local sin suscripciones; Supabase no opera como dependencia de datos de usuario.

## Siguiente paso

Ejecutar `C02-07`: revisión de seguridad, privacidad técnica, cabeceras, errores, dependencias y rendimiento.
