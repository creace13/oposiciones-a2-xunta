# Guía de la carpeta de auditorías

Esta carpeta conserva la trazabilidad cronológica entre modelos. Los informes permanecen en el nivel raíz para no romper enlaces históricos.

## Cómo orientarse

1. Leer `../ESTADO-PROYECTO.md`: estado canónico.
2. Leer `../COLA-ACTIVA.md`: único backlog ejecutable.
3. Consultar `CICLOS.md`: agrupación de informes por etapa.
4. Usar `INDEX.md`: secuencia completa y estado de cada informe.
5. Leer el último informe del ciclo activo y comprobar su evidencia.

## Nomenclatura

Formato obligatorio: `NN-TIPO-ASUNTO-MODELO-AAAA-MM-DD.md`.

- `NN`: secuencia única de dos dígitos;
- `TIPO`: `AUDITORIA`, `RESPUESTA`, `ANEXO` o `CIERRE`;
- no se reutilizan números;
- todo archivo se registra inmediatamente en `INDEX.md`.
- la numeración no se reinicia al abrir un ciclo;
- los informes cerrados no se mueven ni renombran.

## Ciclo C01 — cerrado

Informes `01–21`: construcción, auditorías cruzadas, estabilización, publicación 1.1.1 y créditos públicos.

## Ciclo C02 — abierto

Desde el informe `22`: cuentas remotas y privacidad, navegadores reales, accesibilidad, recuperación operativa, seguridad, rendimiento y gobernanza jurídica.

La versión 1.1.1 ya publicada permanece utilizable. El trabajo de C02 busca cerrar la garantía ampliada sin mezclarla con los informes históricos.
