# Guía de la carpeta de auditorías

Esta carpeta conserva la trazabilidad cronológica entre modelos. Los informes permanecen en el nivel raíz para no romper enlaces históricos.

## Cómo orientarse

1. Leer `INDEX.md`: contiene el estado actual y la secuencia completa.
2. Revisar el último `AUDITORIA` o `ANEXO` abierto.
3. Leer su `RESPUESTA` correlativa y comprobar las pruebas indicadas.
4. Confirmar el estado canónico en `../ESTADO-PROYECTO.md`.

## Nomenclatura

Formato obligatorio: `NN-TIPO-ASUNTO-MODELO-AAAA-MM-DD.md`.

- `NN`: secuencia única de dos dígitos;
- `TIPO`: `AUDITORIA`, `RESPUESTA`, `ANEXO` o `CIERRE`;
- no se reutilizan números;
- todo archivo se registra inmediatamente en `INDEX.md`.

## Estado actual

- `15`: auditoría de cierre técnico de la Beta;
- `16`: anexo sobre métricas y presentación del panel;
- `17`: respuesta de implementación de Codex como constructor.

La Beta está cerrada técnicamente en la rama local. No se ha hecho `push`; la publicación queda pendiente de autorización expresa. La versión definitiva conserva tareas propias: navegador gráfico real, dispositivos, accesibilidad, backup/rollback y revisión jurídica independiente.
