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
| Mensual | Metadatos y avisos de cambio de las 32 fuentes, convocatoria, BOE y DOG | Registro fechado de «sin cambio detectado» o apertura de incidencia |
| Trimestral | Regenerar índice, comprobar enlaces/documentos, citas combinadas y retiradas activas | Inventario y pruebas alineados con el banco real |
| Actuación inmediata | Nueva convocatoria, reforma, derogación, corrección oficial o aviso fiable | Lista de impacto y decisión preventiva antes de seguir publicando la pregunta |
| Antes de cada versión estable | Incidencias abiertas, retiradas y cambios desde la versión anterior | Informe de cierre con fuentes, decisiones y pruebas |

### Rutina mensual

La revisión mensual comprueba si cambiaron las fuentes, no vuelve a leer las 1.522 preguntas. Se consultan la convocatoria vigente, los avisos oficiales y la fecha o versión consolidada de las 32 fuentes. El resultado se registra como `SIN_CAMBIO_DETECTADO`, `INDICIO_EN_REVISION` o `CAMBIO_CONFIRMADO`, siempre con fecha y enlace oficial. Un simple cambio de fecha o documento abre comprobación; no demuestra por sí solo que una respuesta haya quedado desactualizada.

### Rutina trimestral

Una vez por trimestre se ejecutan `npm run index:normativa` y `npm run test:normativa`, se comprueba que las 32 fuentes continúan accesibles, se revisan las 6 citas combinadas y se comprueba el registro `maintenance-holds.js`. Si no hay incidencias, se documenta el resultado sin procesar de nuevo todas las preguntas.

### Actuación inmediata

Ante una reforma, derogación, nueva convocatoria, corrección oficial o aviso fiable:

1. conservar el enlace y la fecha del aviso oficial;
2. identificar la norma, entrada en vigor y referencias modificadas;
3. generar la lista con `npm run impacto:normativa`;
4. revisar solo las candidatas y las salvaguardas;
5. mantener, corregir o retirar temporalmente cada pregunta;
6. validar, registrar y publicar el checkpoint si cambia lo que ve la usuaria.

## Estados de una fuente o pregunta

- `VIGENTE`: fuente contrastada y sin impacto conocido.
- `EN_REVISION`: hay indicio de cambio, pero falta determinar impacto.
- `AFECTADA`: el cambio puede alterar enunciado, respuesta, distractores, explicación o cita.
- `RETIRADA_TEMPORAL`: no debe mostrarse hasta corregirse.
- `CORREGIDA`: pregunta actualizada y validada contra fuente oficial.
- `BLOQUEADA`: falta criterio jurídico, fuente fiable o revisión externa.

## Protocolo ante una norma modificada

1. Identificar la fuente oficial modificada: URL, fecha, norma y artículos afectados.
2. Regenerar el índice con `npm run index:normativa` y localizar por `sourceUrl` y artículo las preguntas potencialmente dependientes. Los casos `WHOLE_SOURCE` de esa fuente y las 6 citas `MANUAL_REVIEW` del banco se incluyen como salvaguarda.
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
   - `node scripts/test-normative-workflow.js`
   - `npm test` cuando el cambio sea publicable.
8. Actualizar el registro de cambios, la cola de mantenimiento y el informe de versión correspondiente.
9. Hacer commit y, si procede, push autorizado.

## Retirada temporal reversible

La retirada nunca borra la pregunta. `maintenance-holds.js` conserva una lista de incidencias y la aplicación excluye de prácticas y simulacros únicamente las entradas con estado `HELD`. La pregunta permanece en `app.js`, en el índice normativo y en el banco completo para poder revisarla y recuperarla.

Cada retirada necesita:

- `questionId` existente y no duplicado;
- estado `HELD`;
- fecha de apertura;
- motivo comprensible;
- enlace o documento oficial que originó la revisión.

El progreso anterior no se elimina: se conserva contra el banco completo, aunque la pregunta retenida deje de mostrarse mientras está apartada. Para liberarla se cambia el estado a `RELEASED` y se añaden fecha y resolución. Tras superar las pruebas vuelve a las sesiones y reaparece su historial conservado.

No se sustituye una pregunta retirada por otra nueva mientras el asunto jurídico siga bloqueado. Si la corrección es clara, se actualizan enunciado, respuesta, cuatro alternativas, explicación y fuente antes de liberarla.

## Registro mínimo de cada revisión

Todo control mensual, trimestral o urgente debe dejar: fecha, responsable, fuentes oficiales consultadas, resultado, norma y referencias afectadas, IDs candidatos, decisión por pregunta, retiradas o liberaciones y checkpoint publicado. Un resultado `SIN_CAMBIO_DETECTADO` significa solamente que las fuentes consultadas no mostraron cambios aplicables en esa revisión; no es una garantía jurídica permanente.

## Simulación de control

La prueba `scripts/test-normative-maintenance.js` simula una modificación de la Ley 39/2015. No cambia el banco: localiza las preguntas afectadas, comprueba que tienen cita y explicación completa, y genera en consola un plan mínimo de revisión.

La simulación sirve para demostrar que el procedimiento es accionable. Si mañana cambia una norma real, el mismo patrón permite saber rápidamente qué parte del banco queda bajo sospecha antes de tocar nada.

La prueba `scripts/test-normative-index.js` verifica además que ninguna pregunta se pierde, que todos los registros conservan su fuente, que las referencias complejas no se interpretan a la fuerza y que un cambio de artículo genera un subconjunto menor que la norma completa. Por ejemplo, el artículo 14.2 de la Ley 39/2015 selecciona 2 preguntas frente a las 122 vinculadas al conjunto de esa ley.

La prueba `scripts/test-normative-impact.js` ensaya cambios de norma completa, artículo, apartado y rango en las 32 fuentes. En la simulación del artículo 14.2 de la Ley 39/2015 obtiene 2 coincidencias directas, añade las 6 citas combinadas por seguridad y evita revisar las otras 120 preguntas de esa ley.

La prueba `scripts/test-normative-workflow.js` ensaya una retirada y su liberación. Comprueba que la pregunta deja de estar disponible sin desaparecer del banco de 1.522, que el progreso sigue siendo válido y que vuelve a estar disponible al resolver la incidencia. El registro real parte con 0 retiradas activas.

## Criterio de cierre

`C02-08` se considera cerrado cuando existen:

- procedimiento documentado;
- inventario de fuentes localizable;
- cadencia de revisión;
- estados operativos de vigencia;
- método de retirada/corrección;
- simulación automatizada de norma modificada;
- evidencia de pruebas ejecutadas.
