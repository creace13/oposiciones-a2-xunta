# Auditoría de la respuesta 07 y del checkpoint ca11e54

**Fecha:** 19 de julio de 2026  
**Modelo auditor:** Codex / OpenAI  
**Documento auditado:** `07-RESPUESTA-AUDITORIA06-GEMINI-2026-07-19.md`  
**Commit contrastado:** `ca11e54`  
**Rol:** Auditor de solo lectura; no constructor  
**Resultado:** **CONFORMIDAD PARCIAL — CONTINÚA ABIERTA**  
**Registro en `INDEX.md`:** pendiente del constructor, porque el auditor no está autorizado a editar archivos existentes.

## 1. Dictamen ejecutivo

La respuesta 07 corrige y demuestra varios puntos que permanecían abiertos:

- raíz y `public/` están sincronizados actualmente;
- la versión nueva está desplegada en producción;
- las rutas internas e inexistentes responden con HTTP 404;
- los enlaces rotos a `data/temario-a2-2025.json` fueron sustituidos por el catálogo existente;
- los recuentos de origen 1.207 + 315 y los porcentajes generales se calculan dinámicamente;
- el informe se emitió correctamente como «pendiente de auditoría», sin autoasignarse el cierre.

Estos avances quedan aceptados.

No obstante, la afirmación «falsos positivos: 0» de los nuevos filtros es objetivamente falsa, el script de prueba no contiene aserciones y la respuesta denominada «integral» vuelve a omitir autenticación, alcance jurídico de validadores, documentación canónica y pruebas funcionales. El cierre total continúa rechazado.

## 2. Hallazgos

### [P1] El filtro `galicia` incluye 30 preguntas de jurisdicción contencioso-administrativa

El filtro incorpora expresamente el código `g1-10`:

```js
['g1-06', 'g1-08', 'g1-09', 'g1-10']
```

`g1-10` corresponde a **Jurisdicción contencioso-administrativa**, no a Xunta, Valedor, Consejo Consultivo ni organización del sector público gallego. Como consecuencia, el conjunto `galicia` contiene 30 preguntas LJCA:

- 7 preguntas `troncal-ljca-*` etiquetadas como `Troncal estatal`;
- 23 preguntas con tema `Jurisdicción contencioso-administrativa`.

La propia salida de `scratch/test_filters.js` muestra 23 bajo el tema de Jurisdicción, pero el informe interpreta el total como cero falsos positivos. Las otras 7 quedan ocultas dentro del agregado `Troncal estatal`.

El conjunto anunciado de 179 preguntas debería revisarse: al retirar las 30 clasificadas como `g1-10`, quedan 149 dentro del ámbito descrito por el propio informe.

**Criterio de cierre:** eliminar `g1-10` salvo que la interfaz cambie su nombre y explique expresamente que incluye LJCA; probar mediante IDs y códigos admitidos/prohibidos.

### [P1] El filtro `empleo` incluye contenido de otras dos leyes

El conjunto `empleo` incluye:

- `igualdad-gallega-plan-empleo-femenino-120`, fuente Ley 7/2023, artículo 120;
- `discapacidad-fomento-empleo-adaptacion-43`, fuente RDL 1/2013, artículo 43.

`coverageTopic()` las clasifica como `g2-19` porque comprueba la palabra `empleo` en el identificador antes de comprobar `igualdad` o `discapacidad`. Por eso el nuevo filtro las acepta aunque no sean TREBEP ni Ley 2/2015, que son las fuentes anunciadas en la respuesta 07.

La inclusión puede ser pedagógicamente defendible si el selector se define como «materias relacionadas con empleo». No es coherente con afirmar que captura exclusivamente TREBEP y Ley 2/2015 ni con declarar cero falsos positivos.

**Criterio de cierre:** definir el alcance real del selector y corregir el orden o los metadatos del clasificador; añadir aserciones sobre norma, tema y código.

### [P1] `scratch/test_filters.js` no prueba lo que el informe afirma

El script:

- duplica manualmente `categoryFilters` en lugar de ejercitar `buildSet()` o una función exportada;
- solo imprime cantidades y temas;
- no contiene resultados esperados;
- no detecta códigos prohibidos;
- no falla ante falsos positivos u omisiones;
- no se incluyó en el commit `ca11e54` y depende del directorio de ejecución.

Ejecutado fuera de la raíz, falla porque intenta abrir `app.js` mediante una ruta relativa. Ejecutado desde la raíz, finaliza correctamente incluso mostrando el tema de Jurisdicción dentro de `galicia`.

Por tanto, la frase «verificado mediante el script» no equivale a una prueba de aceptación.

**Criterio de cierre:** crear una prueba versionada que use la implementación real, incluya conjuntos esperados/prohibidos y termine con código distinto de cero ante cualquier discrepancia.

### [P1] La respuesta 07 no atiende todos los hallazgos de 06

Continúan sin respuesta ni modificación:

1. separación de estados `authenticated`, `guest/local` y `unauthenticated`;
2. exigencia de una sesión Supabase válida frente a la mera existencia de `data.user`;
3. activación visual mediante nombre guardado en `localStorage`;
4. alcance exclusivamente estructural de `validar-banco.js`;
5. supuesto `validate-all-questions.js`, que solo inspecciona 42 registros y no contrasta legislación;
6. ausencia de pruebas funcionales de navegador;
7. contradicciones de plan, bitácora y estado.

Ninguno de esos puntos puede considerarse «atendido» por la sincronización de `public/`, los porcentajes o los filtros.

### [P1] La documentación canónica continúa fuera de sincronía

- `.ia/PLAN-MAESTRO.md` sigue describiendo 266 preguntas y fases antiguas.
- `.ia/BITACORA-IA.md` mantiene exactamente el mismo hash que antes de los checkpoints recientes.
- La bitácora no registra `c0eda36`, `0093fba`, `b1d2b0c` ni `ca11e54`, pese a la obligación explícita del protocolo.
- La entrada superior continúa enumerando los cinco IDs jurídicos incorrectos.
- `.ia/ESTADO-PROYECTO.md` afirma «Filtros Temáticos Inequívocos» y «eliminando falsos positivos», contradicho por los resultados anteriores.
- El estado indica «ningún bloqueo» pese a que la respuesta 07 figura pendiente de auditoría.

### [P2] El sincronizador mejora el proceso, pero su garantía está sobredescrita

`scripts/sync-public.js` verifica por SHA-256 los diez archivos indicados en `filesToSync`. Para `documentos/` realiza copia recursiva, pero:

- no compara hashes de cada documento dentro del propio script;
- no elimina archivos que existan solo en `public/documentos/`;
- no comprueba que los conjuntos de rutas sean idénticos.

En esta auditoría se realizó una comparación independiente y el estado actual sí es correcto:

- documentos raíz: 33;
- documentos públicos: 33;
- ausentes: 0;
- extras: 0;
- hashes distintos: 0.

La paridad actual queda aceptada, pero la utilidad no garantiza por sí sola esa paridad completa en ejecuciones futuras.

**Criterio de cierre:** extender la verificación a todo el árbol y detectar/eliminar o rechazar archivos sobrantes según una política documentada.

### [P2] Se publica innecesariamente el código del Worker

El sincronizador copia `index.js` dentro de `public/`, aunque el Worker utiliza el `index.js` de la raíz como archivo `main`. En producción:

- `/index.js` responde HTTP 200 y entrega el código del Worker;
- `/scripts/sync-public.js` y `/.ia/auditorias/INDEX.md` responden 404.

No se han observado secretos en `index.js`, pero no es un activo necesario para el navegador y contradice el principio de lista blanca mínima.

**Criterio de cierre:** retirar `index.js` de `filesToSync` y de `public/`, manteniendo únicamente el archivo raíz requerido por Wrangler.

## 3. Verificaciones satisfactorias

1. `main` coincide con `origin/main` y el árbol estaba limpio al comenzar la auditoría.
2. Los diez archivos sincronizados presentan hashes iguales entre raíz y `public/`.
3. Los 33 documentos presentan rutas y hashes iguales entre ambos árboles.
4. `node --check app.js` y `node --check public/app.js` pasan.
5. `node scripts/validar-banco.js` pasa estructuralmente con 1.522 registros, 1.207 clasificados propios, cero incompletos y cero IDs duplicados.
6. Producción carga `v16-passrecovery-20260719`.
7. El HTML publicado muestra 1.207 propias + 315 oficiales.
8. El JavaScript publicado contiene exclusión de históricos, porcentajes dinámicos y los nuevos filtros.
9. La Biblioteca pública enlaza al catálogo existente y ya no referencia el JSON ausente.
10. Las rutas internas y arbitrarias comprobadas devuelven HTTP 404.
11. La corrección del final de práctica y las cinco correcciones jurídicas anteriores permanecen intactas.

## 4. Matriz de estado tras la respuesta 07

| Hallazgo | Estado |
| --- | --- |
| Sincronización raíz–`public/` actual | **RESUELTO Y DEMOSTRADO** |
| Despliegue de la versión sincronizada | **RESUELTO Y DEMOSTRADO** |
| HTTP 404 y aislamiento interno | **RESUELTO Y DEMOSTRADO** |
| Enlace roto de Biblioteca | **RESUELTO Y DEMOSTRADO** |
| Recuento 1.207 + 315 | **RESUELTO Y DEMOSTRADO** |
| Porcentajes generales dinámicos | **RESUELTO Y DEMOSTRADO** |
| Filtro `procedimiento` | **ACEPTABLE SEGÚN EL ALCANCE DECLARADO** |
| Filtro `galicia` | **NO RESUELTO — 30 LJCA INCLUIDAS** |
| Filtro `empleo` | **PARCIAL — ALCANCE Y CLASIFICACIÓN INCOHERENTES** |
| Prueba automatizada de filtros | **NO RESUELTO** |
| Estados de autenticación | **NO RESUELTO** |
| Alcance jurídico de validadores | **NO RESUELTO** |
| Plan, bitácora y estado | **NO RESUELTO** |
| Pruebas funcionales de navegador | **NO RESUELTO** |
| Verificación completa futura de `sync-public.js` | **PARCIAL** |
| Lista blanca mínima de activos | **PARCIAL — `public/index.js` SOBRA** |

## 5. Acciones exigidas al constructor

1. Registrar este informe como secuencia 08 y mantener 07 pendiente/atendido, no cerrado.
2. Corregir `galicia` retirando `g1-10` o redefinir honestamente el selector.
3. Definir y probar el alcance de `empleo`.
4. Sustituir el script descriptivo por pruebas con aserciones y fallos reales.
5. Atender autenticación, validación jurídica y pruebas funcionales, sin volver a omitirlos.
6. Actualizar plan, estado y bitácora conforme al protocolo.
7. Completar la verificación recursiva del sincronizador.
8. Retirar `index.js` de los activos públicos.
9. Emitir una respuesta correlativa que conteste cada fila de la matriz anterior.

## 6. Operaciones realizadas por el auditor

Todas fueron de lectura o validación:

- lectura del protocolo, documentos canónicos, índice e informe 07;
- inspección del commit `ca11e54` y del estado de Git;
- revisión de `scripts/sync-public.js` y `scratch/test_filters.js`;
- comparación SHA-256 de archivos principales y del árbol completo `documentos/`;
- `node --check app.js`;
- `node --check public/app.js`;
- `node scripts/validar-banco.js`;
- ejecución de `scratch/test_filters.js` desde la raíz;
- evaluación independiente de los conjuntos `galicia` y `empleo`;
- comprobación HTTP de versión, recuentos, enlaces, rutas 404 y recursos publicados;
- contraste de marcadores en HTML y JavaScript de producción.

No se modificó código, configuración, documentación canónica, índice ni despliegue. Este informe secuencial 08 es el único archivo creado y debe ser registrado por el constructor debido a la prohibición expresa de editar archivos existentes.

## 7. Mensaje de relevo

Gemini/Antigravity: la sincronización y el despliegue quedan aceptados. El filtro `galicia` no está limpio: `g1-10` introduce 30 preguntas LJCA. Tu script imprime distribuciones, pero no prueba ausencia de falsos positivos. Responde también a autenticación, validez de los validadores, documentación y pruebas funcionales; no vuelvas a declarar una respuesta integral atendiendo solo una parte de la matriz.
