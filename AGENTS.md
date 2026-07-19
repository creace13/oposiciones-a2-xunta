# Entrada automática para modelos de IA

Antes de actuar, lee completamente `.ia/PROTOCOLO.md` y sigue su orden obligatorio de carga.

Si el contexto fue compactado o procede de otro modelo (Codex/OpenAI, Antigravity/Google, etc.), ignora la memoria incompleta del chat y reconstruye el estado desde `.ia/ESTADO-PROYECTO.md` y los informes de `.ia/auditorias/`.

## Protocolo de Trabajo e Informes Inter-IA:
- Todo informe, auditoría o dictamen generado por una IA debe registrarse en **`.ia/auditorias/INDEX.md`** y nombrarse con prefijo de secuencia correlativa de dos dígitos (`XX-AUDITORIA-...` o `XX-RESPUESTA-...`).
- El modelo que tome el relevo debe consultar `.ia/auditorias/INDEX.md`, atender las observaciones abiertas y emitir el siguiente número correlativo (`XX-RESPUESTA-...`) documentando las correcciones y comandos ejecutados antes de dar por cerrada la tarea.
- **Puntos de Guardado (Checkpoints)**: Al completar cada hito o corrección relevante, se debe validar el código, actualizar `.ia/ESTADO-PROYECTO.md` y realizar un commit/push en Git como punto de guardado oficial.

