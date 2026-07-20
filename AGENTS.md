# Entrada automática para modelos de IA

Antes de actuar, lee completamente `.ia/PROTOCOLO.md` y sigue su orden obligatorio de carga.

Si el contexto fue compactado o procede de otro modelo (Codex/OpenAI, Antigravity/Google, etc.), ignora la memoria incompleta del chat y reconstruye el estado desde `.ia/ESTADO-PROYECTO.md`, `.ia/COLA-ACTIVA.md`, `.ia/COLA-ALTO-RAZONAMIENTO.md` y los informes de `.ia/auditorias/`.

## Protocolo de Trabajo e Informes Inter-IA:
- Gemini/Antigravity y Codex/OpenAI pueden actuar como constructores o auditores según la autorización expresa del usuario; ambos están sujetos al mismo protocolo y a las mismas pruebas.
- Todo informe, auditoría o dictamen generado por una IA debe registrarse en **`.ia/auditorias/INDEX.md`** y nombrarse con una secuencia única de dos dígitos (`NN-TIPO-ASUNTO-MODELO-AAAA-MM-DD.md`).
- El modelo que tome el relevo debe consultar `.ia/auditorias/INDEX.md`, atender las observaciones abiertas y emitir el siguiente número correlativo (`XX-RESPUESTA-...`) documentando las correcciones y comandos ejecutados antes de dar por cerrada la tarea.
- Los informes se organizan lógicamente por ciclos en `.ia/auditorias/CICLOS.md`, pero su numeración global no se reinicia y los archivos cerrados no se mueven ni renombran.
- `.ia/COLA-ACTIVA.md` es la única cola ejecutable. Todo constructor debe escoger el elemento no bloqueado de mayor prioridad, actualizar su estado y aportar evidencia antes de marcarlo como `HECHO`.
- `.ia/COLA-ALTO-RAZONAMIENTO.md` registra tareas que podrían justificar pedir al titular un modelo o razonamiento superior. No sustituye a la cola activa y no autoriza por sí misma el cambio de modelo.
- Desde el 20 de julio de 2026, Codex/OpenAI es el titular operativo del proyecto por instrucción expresa del usuario, con funciones de auditor, constructor y gestor documental.
- **Puntos de Guardado (Checkpoints)**: Al completar cada hito o corrección relevante, se debe validar el código, actualizar `.ia/ESTADO-PROYECTO.md` y realizar un commit local. El `push` o despliegue exige autorización expresa del usuario porque puede activar publicación automática.
