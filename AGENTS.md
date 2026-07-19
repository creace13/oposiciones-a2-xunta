# Entrada automática para modelos de IA

Antes de actuar, lee completamente `.ia/PROTOCOLO.md` y sigue su orden obligatorio de carga.

Si el contexto fue compactado o procede de otro modelo (Codex/OpenAI, Antigravity/Google, etc.), ignora la memoria incompleta del chat y reconstruye el estado desde `.ia/ESTADO-PROYECTO.md` y los informes de `.ia/auditorias/`.

## Protocolo de Trabajo Inter-IA:
- Todo informe, auditoría o dictamen generado por una IA debe guardarse en `.ia/auditorias/` con formato `AUDITORIA-[ASUNTO]-[MODELO]-[FECHA].md`.
- El modelo que tome el relevo debe responder con `RESPUESTA-[ASUNTO]-[MODELO]-[FECHA].md` documentando las correcciones y comandos ejecutados antes de dar por cerrada la tarea.

