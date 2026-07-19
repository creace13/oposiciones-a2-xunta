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
- `18`: respuesta de cierre editorial y declaración de versión 1.1 estable local.
- `19`: respuesta correctiva que retira definitivamente las metas internas y porcentajes engañosos de la interfaz.

La versión 1.1.1 está cerrada como estable en modo local: suite automatizada aprobada, métricas visibles corregidas y validación manual del usuario en tableta, móvil y PC. No se ha hecho `push`; la publicación queda pendiente de autorización expresa. Las cuentas remotas permanecen en Beta hasta disponer de borrado remoto autoservicio o un canal privado controlado. La garantía definitiva ampliada conserva accesibilidad, backup/rollback y revisión jurídica independiente.
