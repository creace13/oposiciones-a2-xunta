# Mantenimiento normativo del banco A2 Xunta

Actualizado: 12 de agosto de 2026.

Este procedimiento evita que el banco de preguntas envejezca sin control cuando cambia una norma, una convocatoria o una plantilla oficial. No sustituye una revisión jurídica independiente: define cómo detectar, aislar, corregir y documentar los cambios de forma reproducible.

## Responsable y alcance

- Responsable operativo: titular del proyecto, con apoyo técnico cuando sea necesario.
- Revisión jurídica independiente: queda fuera de este procedimiento y corresponde a `C02-09`.
- Alcance: preguntas de elaboración propia, preguntas oficiales históricas, explicaciones, distractores, citas, enlaces y documentos locales usados por la app.
- Fuente de verdad técnica del banco: `app.js`.
- Inventario documental de fuentes: `docs/FUENTES_OFICIALES.md` y `officialSources` en `app.js`.
- Índice selectivo generado: `docs/INDICE-NORMATIVO-PREGUNTAS.json`.

## Índice selectivo de preguntas

El comando `npm run index:normativa` reconstruye, siempre desde el banco real, la relación entre cada pregunta, su fuente y los artículos o disposiciones citados. El archivo generado no decide si una norma está vigente ni modifica preguntas: sirve exclusivamente para reducir la lista que debe revisar una persona.

El inventario actual cubre las 1.522 preguntas y las 32 fuentes diferenciadas:

- 1.514 preguntas tienen una referencia concreta interpretable;
- 2 citan una norma completa sin indicar artículo;
- 6 combinan varias normas en una misma cita y quedan apartadas para revisión manual;
- 296 incluyen una fecha de contraste jurídico documentada; la fecha de publicación de una norma no se confunde con una fecha de revisión.

Los tres estados del índice son `EXACT`, `WHOLE_SOURCE` y `MANUAL_REVIEW`. Un estado `EXACT` solo significa que la referencia se pudo interpretar con seguridad; no certifica la vigencia ni la corrección jurídica del contenido.

## Lista selectiva ante un cambio confirmado

Cuando una fuente oficial confirme una modificación, `npm run impacto:normativa` convierte la norma y los artículos afectados en una lista de revisión. La herramienta no descubre ni interpreta por sí sola reformas jurídicas: el aviso oficial debe identificarse primero.

1. Consultar las 32 fuentes seleccionables con `npm run impacto:normativa -- --list-sources`.
2. Para una norma completa, ejecutar por ejemplo `npm run impacto:normativa -- --source law39`.
3. Para artículos concretos, ejecutar por ejemplo `npm run impacto:normativa -- --source law39 --articles 14.2,16`.
4. Si se necesita conservar el resultado, añadir `--output ruta-del-informe.json`; `--json` permite mostrar el informe estructurado completo.

La selección entiende artículos, apartados, subapartados, rangos, anexos y disposiciones. Una cita al artículo 14 cubre un cambio del 14.2 y un rango 55-57 cubre un cambio del 56.2. También incorpora siempre:

- las preguntas que solo citan la fuente completa, cuando pertenecen a la norma afectada;
- las 6 citas combinadas actualmente existentes, como pequeña lista preventiva para que una segunda norma citada no quede oculta.

Cada candidata explica si aparece por coincidencia directa, por citar la fuente completa o por necesitar revisión manual. Una candidata no se considera incorrecta: solo queda pendiente de contraste humano con el aviso y el texto oficial consolidado.

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
2. Regenerar el índice con `npm run index:normativa` y localizar por `sourceUrl` y artículo las preguntas potencialmente dependientes. Los casos `WHOLE_SOURCE` y `MANUAL_REVIEW` de esa fuente se incluyen siempre en la revisión.
3. Clasificar el impacto:
   - sin impacto material;
   - solo cambia cita/enlace;
   - cambia redacción legal pero no la respuesta;
   - cambia la respuesta correcta o hace ambiguos los distractores;
   - afecta a todo un tema o bloque.
4. Si afecta a respuesta, distractores o explicación, no publicar la pregunta hasta corregirla.
5. Documentar la incidencia en el registro de mantenimiento del proyecto o en un informe de versión si forma parte de un checkpoint.
6. Corregir o retirar temporalmente las preguntas afectadas.
7. Ejecutar como mínimo:
   - `node --check app.js`
   - `node scripts/validar-banco.js`
   - `node scripts/test-normative-maintenance.js`
   - `node scripts/test-normative-index.js`
   - `node scripts/test-normative-impact.js`
   - `npm test` cuando el cambio sea publicable.
8. Actualizar el registro de cambios, la cola de mantenimiento y el informe de versión correspondiente.
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

La prueba `scripts/test-normative-index.js` verifica además que ninguna pregunta se pierde, que todos los registros conservan su fuente, que las referencias complejas no se interpretan a la fuerza y que un cambio de artículo genera un subconjunto menor que la norma completa. Por ejemplo, el artículo 14.2 de la Ley 39/2015 selecciona 2 preguntas frente a las 122 vinculadas al conjunto de esa ley.

La prueba `scripts/test-normative-impact.js` ensaya cambios de norma completa, artículo, apartado y rango en las 32 fuentes. En la simulación del artículo 14.2 de la Ley 39/2015 obtiene 2 coincidencias directas, añade las 6 citas combinadas por seguridad y evita revisar las otras 120 preguntas de esa ley.

## Criterio de cierre

`C02-08` se considera cerrado cuando existen:

- procedimiento documentado;
- inventario de fuentes localizable;
- cadencia de revisión;
- estados operativos de vigencia;
- método de retirada/corrección;
- simulación automatizada de norma modificada;
- evidencia de pruebas ejecutadas.
