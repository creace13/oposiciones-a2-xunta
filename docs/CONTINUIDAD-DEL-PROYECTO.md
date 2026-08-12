# Cómo se conserva la continuidad del proyecto

Actualizado: 12 de agosto de 2026.

El proyecto no depende de que un chat recuerde todo lo sucedido. La continuidad se guarda en documentos de la propia carpeta y en puntos de guardado de Git.

## Si se elimina o cambia el chat

No se pierde el estado del proyecto mientras la carpeta continúe en el equipo. Al abrirla de nuevo, Codex encuentra `AGENTS.md`, lee el protocolo interno y reconstruye el estado desde la fotografía actual, la cola de trabajo, la bitácora y los informes.

El nuevo chat no necesita recibir una copia de toda la conversación anterior. Basta con abrir la misma carpeta y pedir: «Lee las instrucciones del proyecto, reconstruye el estado y dime cuál es el siguiente paso antes de cambiar nada».

## Si se mueve o se vuelve a abrir la carpeta

La continuidad se mantiene siempre que se conserve la carpeta completa, incluidas las carpetas ocultas `.ia` y `.agents`. No debe copiarse únicamente `app.js` o `public`, porque ahí está la aplicación, pero no toda la memoria de decisiones.

## Si se borra toda la carpeta o falla el equipo

GitHub permite recuperar el código y la documentación pública hasta el último punto de guardado publicado. Sin embargo, por seguridad, `AGENTS.md`, `.ia` y `.agents` son documentación privada y no se publican en el repositorio público.

Por tanto, una copia de seguridad realmente completa debe incluir también esos tres elementos privados. Sin esa copia se recuperaría la aplicación, pero se perdería parte de la memoria detallada de trabajo. Este documento no afirma que exista ya una copia externa automática de esa información privada.

## Documentos internos que reconstruyen el estado

- `AGENTS.md`: puerta de entrada que Codex lee al abrir el proyecto.
- `.ia/PROTOCOLO.md`: orden de trabajo y reglas de seguridad.
- `.ia/REANUDACION-RAPIDA.md`: resumen de emergencia y comprobaciones de reentrada.
- `.ia/ESTADO-PROYECTO.md`: fotografía canónica del momento actual.
- `.ia/COLA-ACTIVA.md`: único listado de tareas autorizadas y pendientes.
- `.ia/AUDITORIA-CONTENIDO.md`: decisiones y revisiones jurídicas.
- `.ia/BITACORA-IA.md`: cronología de actuaciones.
- `.ia/auditorias/INDEX.md` y `CICLOS.md`: índice de informes y agrupación por etapas.

## Regla de cierre de cada bloque

Cada bloque importante debe terminar con pruebas, actualización del estado, actualización de la cola, entrada en la bitácora, informe correlativo, punto de guardado y comprobación de la versión pública cuando proceda.

Así, el conocimiento no queda encerrado en la conversación: queda escrito junto al proyecto y puede ser verificado por una sesión futura.
