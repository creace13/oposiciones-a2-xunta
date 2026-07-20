# Operación, backup y recuperación del proyecto

Última actualización: 20 de julio de 2026.

Este documento es el manual de rescate de la aplicación. Está escrito para que el titular pueda entender qué hacer si algo sale mal, aunque no tenga conocimientos técnicos.

## Resumen rápido

La aplicación tiene tres piezas:

| Pieza | Qué contiene | Riesgo principal | Cómo se recupera |
| :--- | :--- | :--- | :--- |
| GitHub | Código, documentos, preguntas, informes y carpeta `public/`. | Subir una versión con error. | Volver a un commit anterior y publicar de nuevo. |
| Cloudflare Workers | La web publicada en internet. | Que la web no cargue o cargue una versión incorrecta. | Revertir al commit bueno o redeplegar desde `public/`. |
| Supabase | Cuentas remotas, login y datos remotos que existan. | Perder o exponer datos de usuarios. | Exportar/restaurar desde el panel de Supabase. Requiere acceso del titular. |

La parte local/invitado guarda el progreso en el navegador del usuario. Eso no vive en GitHub ni en Supabase y no se puede recuperar desde el servidor si el usuario borra los datos del navegador.

## Regla de oro

Antes de tocar producción:

1. Comprobar que Git está limpio.
2. Ejecutar pruebas.
3. Hacer commit.
4. Hacer push.
5. Comprobar que la web pública responde.
6. Documentar el cambio en `.ia/`.

Si una IA no puede demostrar esos pasos, no debe decir que la versión está cerrada.

## Checklist antes de publicar

Para una publicación ordinaria:

```text
git status --short --branch
node --check app.js
node scripts/validar-banco.js
node scripts/test-auth-states.js
node scripts/test-accessibility-basics.js
node scripts/test-browser-e2e.js
git log --oneline -n 3
```

Después del push:

```text
curl -I https://oposiciones-xunta.opos-galicia.workers.dev
```

Resultado esperado: `HTTP/1.1 200 OK`.

## Copia de seguridad de GitHub

GitHub ya funciona como copia principal del código. Además, antes de cambios grandes conviene crear un punto de restauración claro:

```text
git status --short --branch
git log --oneline -n 5
git tag backup-AAAA-MM-DD-descripcion
git push origin backup-AAAA-MM-DD-descripcion
```

Ejemplo de nombre:

```text
backup-2026-07-20-antes-cuentas-remotas
```

No se debe crear un tag con una versión que no haya pasado pruebas.

## Rollback de código sin reescribir historial

Si se sube una versión mala, la opción segura es crear un nuevo commit que vuelva al estado anterior. No se recomienda reescribir historial.

Flujo seguro:

```text
git log --oneline -n 10
git revert <commit-malo>
node --check app.js
node scripts/validar-banco.js
git push origin main
curl -I https://oposiciones-xunta.opos-galicia.workers.dev
```

Si hay varios commits malos consecutivos:

```text
git revert <commit-mas-antiguo-malo>^..<commit-mas-reciente-malo>
```

Esta operación crea un commit nuevo de reversión. Es más segura que `reset --hard` porque conserva la historia y permite auditar qué pasó.

## Recuperación local desde un commit bueno

Para comprobar un commit anterior sin tocar la rama principal:

```text
git worktree add ../oposiciones-rescate <commit-bueno>
```

Después se puede revisar esa copia, comparar archivos y extraer lo necesario. Cuando ya no haga falta, se elimina con cuidado:

```text
git worktree remove ../oposiciones-rescate
```

No usar esta técnica con carpetas que contengan trabajo no guardado.

## Cloudflare Workers

Estado actual:

- Proyecto publicado: `oposiciones-xunta`.
- URL pública: `https://oposiciones-xunta.opos-galicia.workers.dev`.
- Directorio publicado: `./public`.
- Configuración local: `wrangler.json`.

Comprobación mínima:

```text
curl -I https://oposiciones-xunta.opos-galicia.workers.dev
```

Resultado esperado:

```text
HTTP/1.1 200 OK
```

Si Cloudflare muestra una versión mala, el camino más seguro es:

1. Revertir el commit malo en GitHub.
2. Hacer push a `origin/main`.
3. Esperar el despliegue automático.
4. Comprobar la URL pública.

Si el despliegue automático no se activa, el titular debe entrar en Cloudflare y revisar:

- último despliegue;
- commit asociado;
- logs de build/despliegue;
- dominio `oposiciones-xunta.opos-galicia.workers.dev`;
- configuración de assets apuntando a `./public`.

No se deben cambiar DNS, dominios, tokens ni configuración sensible sin documentarlo antes.

## Supabase

Supabase se usa para autenticación y cuentas remotas. Mientras las cuentas remotas estén en Beta, la prioridad es no prometer más de lo que está comprobado.

Proyecto detectado por configuración pública:

```text
mquigtfqvznwnovzjudf.supabase.co
```

Este identificador no es secreto. Las contraseñas, tokens privados, service role keys y backups reales sí son secretos y nunca deben guardarse en el repositorio.

### Backup de Supabase pendiente de ensayo real

El titular ha confirmado el 20 de julio de 2026, mediante captura del panel de Supabase, que el plan gratuito muestra este aviso operativo:

```text
El plan gratuito no incluye copias de seguridad de los proyectos.
Actualiza al Plan Pro para obtener hasta 7 días de copias de seguridad programadas.
```

Esto cambia el criterio de cierre: en plan gratuito no se puede tratar Supabase como un sistema con recuperación automática garantizada. Para Beta es aceptable si las cuentas remotas siguen etiquetadas como Beta y se limita el riesgo; para una versión definitiva con usuarios reales, la recomendación fuerte es usar Plan Pro o implementar un mecanismo externo de exportación verificado.

Para cerrar del todo esta puerta, el titular debe entrar al panel de Supabase y confirmar:

1. Nombre del proyecto correcto.
2. Exportación manual disponible de base de datos o backup automático del plan usado.
3. Tablas relevantes existentes, especialmente perfiles/progreso si se activan datos remotos.
4. Políticas de seguridad activas.
5. Procedimiento para restaurar o descargar copia.

### Cómo suplir la falta de backups en Supabase Free

Medidas mínimas mientras se mantenga el plan gratuito:

1. **Mantener las cuentas remotas en Beta**: no venderlas como almacenamiento definitivo ni garantizado.
2. **Priorizar el modo local/invitado**: el usuario conserva su progreso en su navegador, sin depender de restauración remota.
3. **Exportación manual antes de cambios importantes**: antes de modificar autenticación, tablas o políticas, descargar una copia desde Supabase y guardarla fuera del repositorio.
4. **No guardar exports con datos personales en GitHub**: si hay emails o identificadores de usuarios, la copia debe quedar en almacenamiento privado del titular.
5. **Crear una cuenta de prueba controlada**: usarla para comprobar login, recuperación y borrado sin tocar cuentas personales.
6. **Registrar fecha y responsable de cada copia**: una copia que nadie sabe cuándo se hizo casi no sirve.

Opciones para la versión definitiva:

| Opción | Coste | Ventaja | Inconveniente | Recomendación |
| :--- | :---: | :--- | :--- | :--- |
| Seguir en Supabase Free con copias manuales | 0 € | Mantiene el proyecto barato. | Riesgo si se olvida exportar o aparece un fallo con datos reales. | Aceptable solo para Beta o pocos usuarios de confianza. |
| Subir Supabase a Pro | Pago mensual | Backups programados y menos improvisación. | Coste fijo. | Recomendado si habrá usuarios reales y progreso remoto. |
| Desactivar cuentas remotas temporalmente | 0 € | Reduce privacidad, soporte y riesgo de pérdida remota. | Se pierde sincronización entre dispositivos. | Muy prudente si no quieres pagar todavía. |
| Crear exportación externa automatizada | Variable | Independiente del plan, si se configura bien. | Más complejidad técnica y manejo de secretos. | Solo si compensa mantener Free con más ingeniería. |

Mi criterio operativo: si la app va a compartirse con opositores reales, o se paga Pro o se desactiva/limita lo remoto hasta tener un backup fiable. Lo contrario sería barato, sí, pero frágil.

Si hay usuarios reales, antes de tocar tablas:

- avisar de ventana de mantenimiento si procede;
- exportar datos;
- no borrar usuarios ni tablas desde una IA sin autorización expresa;
- guardar evidencia sin incluir datos personales.

### Datos que no deben versionarse

Nunca subir a GitHub:

- contraseñas;
- tokens de Cloudflare;
- claves privadas de Supabase;
- exports completos con emails de usuarios reales;
- capturas donde aparezcan claves secretas;
- ficheros `.env` con credenciales.

## Ensayo seguro realizado

La parte que puede ensayarse sin riesgo consiste en:

1. verificar que Git conoce el remoto de GitHub;
2. verificar que el commit actual existe;
3. verificar que se puede crear un archivo comprimido del estado actual con `git archive`;
4. verificar que los archivos críticos existen en el commit;
5. verificar que la web pública responde con HTTP 200.

Este ensayo no toca usuarios, bases de datos ni configuración sensible.

## Estado de cierre de C02-06

Estado actual: **cerrado para versión local sin suscripciones**.

La decisión del titular es no contratar Supabase Pro ni añadir nuevas suscripciones. Por tanto, la versión de cierre semanal no tratará Supabase como dependencia operativa de usuarios.

Queda pendiente solo si en el futuro se reactivan cuentas remotas:

- ensayo real o confirmación documentada de backup/restauración en Supabase;
- revisión del panel de Cloudflare si se quiere documentar rollback desde la interfaz;
- opcionalmente, crear un tag de backup estable cuando el titular quiera fijar una versión concreta.

Mi recomendación: antes de declarar la versión “definitiva”, hacer juntos una sesión corta de paneles. Tú no necesitas entenderlo todo; basta con que me muestres Cloudflare y Supabase, y yo te digo exactamente qué mirar y qué no tocar.
