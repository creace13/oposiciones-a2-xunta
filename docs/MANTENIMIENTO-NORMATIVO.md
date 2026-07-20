# Mantenimiento normativo del banco A2 Xunta

Actualizado: 20 de julio de 2026.

Este procedimiento evita que el banco de preguntas envejezca sin control cuando cambia una norma, una convocatoria o una plantilla oficial. No sustituye una revisión jurídica independiente: define cómo detectar, aislar, corregir y documentar los cambios de forma reproducible.

## Responsable y alcance

- Responsable operativo: titular del proyecto, con apoyo de Codex/OpenAI como gestor técnico y documental autorizado.
- Revisión jurídica independiente: queda fuera de este procedimiento y corresponde a `C02-09`.
- Alcance: preguntas de elaboración propia, preguntas oficiales históricas, explicaciones, distractores, citas, enlaces y documentos locales usados por la app.
- Fuente de verdad técnica del banco: `app.js`.
- Inventario documental de fuentes: `docs/FUENTES_OFICIALES.md` y `officialSources` en `app.js`.

## Fuentes que deben vigilarse

1. Convocatoria vigente del proceso selectivo y sus bases.
2. BOE consolidado para normativa estatal.
3. DOG/Xunta para normativa autonómica gallega.
4. Documentos locales incluidos en `documentos/troncal/` cuando la app usa una copia descargada.
5. Plantillas oficiales de exámenes históricos cuando afecten a preguntas oficiales importadas.

No se debe usar memoria general de una IA como fuente jurídica. Si una norma no puede contrastarse con fuente oficial, el bloque queda en `EN_REVISION` o `BLOQUEADO`.

## Cadencia de revisión

| Momento | Qué se revisa | Resultado mínimo |
| --- | --- | --- |
| Semanal durante la Beta/candidata | Convocatoria, DOG, BOE y normas con más preguntas asociadas | Confirmar “sin cambios conocidos” o abrir incidencia normativa |
| Antes de cada versión estable | Todas las fuentes del inventario y cambios desde la versión anterior | Informe de cierre con fecha y pruebas |
| Inmediata | Nueva convocatoria, reforma normativa, corrección oficial o aviso de usuario fiable | Preguntas afectadas marcadas antes de publicar |
| Trimestral si la app queda en mantenimiento | Muestreo amplio de fuentes y enlaces | Registro de vigencia y enlaces rotos |

## Estados de una fuente o pregunta

- `VIGENTE`: fuente contrastada y sin impacto conocido.
- `EN_REVISION`: hay indicio de cambio, pero falta determinar impacto.
- `AFECTADA`: el cambio puede alterar enunciado, respuesta, distractores, explicación o cita.
- `RETIRADA_TEMPORAL`: no debe mostrarse hasta corregirse.
- `CORREGIDA`: pregunta actualizada y validada contra fuente oficial.
- `BLOQUEADA`: falta criterio jurídico, fuente fiable o revisión externa.

## Protocolo ante una norma modificada

1. Identificar la fuente oficial modificada: URL, fecha, norma y artículos afectados.
2. Localizar preguntas dependientes por `sourceUrl`, texto de fuente y tema.
3. Clasificar el impacto:
   - sin impacto material;
   - solo cambia cita/enlace;
   - cambia redacción legal pero no la respuesta;
   - cambia la respuesta correcta o hace ambiguos los distractores;
   - afecta a todo un tema o bloque.
4. Si afecta a respuesta, distractores o explicación, no publicar la pregunta hasta corregirla.
5. Documentar la incidencia en `.ia/AUDITORIA-CONTENIDO.md` o en un informe correlativo si forma parte de un checkpoint.
6. Corregir o retirar temporalmente las preguntas afectadas.
7. Ejecutar como mínimo:
   - `node --check app.js`
   - `node scripts/validar-banco.js`
   - `node scripts/test-normative-maintenance.js`
   - `npm test` cuando el cambio sea publicable.
8. Actualizar `.ia/ESTADO-PROYECTO.md`, `.ia/COLA-ACTIVA.md`, `.ia/BITACORA-IA.md` y `.ia/auditorias/INDEX.md`.
9. Hacer commit y, si procede, push autorizado.

## Retirada segura de preguntas

La retirada no debe hacerse borrando a ciegas. La opción preferente es:

1. Anotar los IDs afectados y la fuente que provoca la retirada.
2. Corregir la pregunta en `app.js` si la solución es clara.
3. Si no es clara, retirarla del banco publicable y conservar la justificación en la documentación interna.
4. Recalcular recuentos y ejecutar validaciones.
5. No sustituirla por otra pregunta nueva si el tema sigue bloqueado.

## Simulación de control

La prueba `scripts/test-normative-maintenance.js` simula una modificación de la Ley 39/2015. No cambia el banco: localiza las preguntas afectadas, comprueba que tienen cita y explicación completa, y genera en consola un plan mínimo de revisión.

La simulación sirve para demostrar que el procedimiento es accionable. Si mañana cambia una norma real, el mismo patrón permite saber rápidamente qué parte del banco queda bajo sospecha antes de tocar nada.

## Criterio de cierre

`C02-08` se considera cerrado cuando existen:

- procedimiento documentado;
- inventario de fuentes localizable;
- cadencia de revisión;
- estados operativos de vigencia;
- método de retirada/corrección;
- simulación automatizada de norma modificada;
- evidencia de pruebas ejecutadas.

