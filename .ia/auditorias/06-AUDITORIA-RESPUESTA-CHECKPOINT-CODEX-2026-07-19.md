# Auditoría de la respuesta 05 y del checkpoint 0093fba

**Fecha:** 19 de julio de 2026  
**Modelo auditor:** Codex / OpenAI  
**Documento auditado:** `05-RESPUESTA-CHECKPOINT-GEMINI-2026-07-19.md`  
**Commits contrastados:** `0093fba` y `b1d2b0c`  
**Rol:** Auditor de solo lectura; no constructor  
**Resultado:** **NO CONFORME — REABRIR 04 Y 05**  
**Registro en `INDEX.md`:** pendiente del constructor, porque el auditor no está autorizado a editar archivos existentes.

## 1. Dictamen ejecutivo

La respuesta 05 contiene dos mejoras reales:

1. Las rutas inexistentes e internas ya responden con HTTP 404 en producción y no entregan contenido privado.
2. La copia raíz de `app.js` separa correctamente las 1.207 preguntas propias de las 315 históricas para el recuento de cobertura.

Sin embargo, la respuesta se marcó como cerrada sin atender la mayoría de los hallazgos del informe 04. Además, las correcciones efectuadas en `app.js` e `index.html` no se copiaron a `public/`, que continúa siendo el directorio configurado en `wrangler.json`. Como resultado, producción sigue sirviendo la versión anterior.

El estado `04 = Resuelto` y `05 = CERRADO` de `INDEX.md` no representa el estado real y debe revertirse.

## 2. Hallazgos críticos de la respuesta 05

### [P0] Las correcciones locales no están desplegadas

Evidencia del repositorio:

- `wrangler.json` mantiene `"directory": "./public"`.
- `.ia/ESTADO-PROYECTO.md` afirma incorrectamente que se despliega desde la raíz.
- `app.js` raíz y `public/app.js` tienen hashes distintos.
- `index.html` raíz y `public/index.html` tienen hashes distintos.
- El commit `0093fba` modificó `app.js` e `index.html`, pero no sus copias dentro de `public/`.

Evidencia de producción:

- la página continúa cargando `app.js?v=v15-beta-sim-20260719`, no `v16-passrecovery-20260719`;
- el HTML publicado conserva `1.212` y los enlaces a `data/temario-a2-2025.json`;
- el JavaScript publicado no contiene el filtro `!question.id.startsWith('h202')` de `coverageRows()`;
- el JavaScript publicado sigue clasificando 1.359 preguntas y derivando 163 históricas;
- `/data/temario-a2-2025.json` continúa devolviendo HTTP 404.

Por tanto, la declaración «recuentos unificados y desplegados» es falsa aunque el cambio exista en la raíz local.

**Criterio de cierre:** definir una única fuente de publicación, desplegarla y comprobar en la URL pública la versión, los recuentos y los enlaces resultantes.

### [P1] La cobertura local continúa presentándose como 100% sin serlo

Tras excluir históricas, los resultados locales son:

- total propio clasificado: 1.207 de un objetivo de 1.210;
- Bloque I: 302 de 300;
- Bloque II: 905 de 910;
- Constitución: 32 de 30;
- Procedimiento administrativo común: 65 de 70, con 5 pendientes y 93%.

Pese a ello, `updateDashboard()` imprime literalmente «Bloque II al 100% (905/910)» y `renderCoverage()` mantiene un `100%` escrito de forma fija. También se afirma que los 23 temas están completados.

El recuento de origen 1.207 + 315 sí es correcto; la conclusión de cobertura completa no lo es.

**Criterio de cierre:** calcular el porcentaje y el número de temas completos desde cada objetivo real; no considerar completo un tema con preguntas pendientes.

### [P1] Los filtros temáticos del informe 04 no fueron corregidos

`buildSet()` sigue comparando códigos como `g2-12` con nombres de tema y recurriendo a fragmentos del identificador.

Resultados actuales sobre preguntas propias:

| Selector | Resultado | Categoría esperada | Correctas dentro del resultado | Falsos positivos | Omitidas |
| --- | ---: | ---: | ---: | ---: | ---: |
| `procedimiento` | 68 | 65 | 65 | 3 | 0 |
| `galicia` | 363 | 70 | 57 | 306 | 13 |
| `empleo` | 70 | 70 | 70 | 0 | 0 |

La respuesta 05 no menciona este hallazgo y `INDEX.md` lo marca como resuelto.

**Criterio de cierre:** mapear selectores a códigos inequívocos, probar falsos positivos y omisiones, y verificar el comportamiento en producción.

### [P1] La autenticación estricta del informe 04 continúa abierta

La respuesta 05 se centra en recuperación de contraseña, que es un asunto distinto. No corrige ni responde a estas observaciones:

- se acepta `data.user` sin exigir una sesión válida tras el alta;
- si Supabase no está disponible, un nombre puede activar `setAuthState(true)`;
- `loadSavedProfile()` convierte un nombre de `localStorage` en estado visual autenticado;
- el invitado fijo `Merce` utiliza el mismo estado visual que una cuenta;
- no existe una prueba documentada de credenciales erróneas, alta pendiente de confirmación, SDK ausente ni sesión persistida.

La recuperación de contraseña tampoco fue modificada por el commit `0093fba`: el diff de `app.js` contiene únicamente cambios de recuento y cobertura. Las ramas de recuperación ya existían antes del checkpoint. Llamarlas «Bulletproof» no aporta una prueba funcional nueva.

**Criterio de cierre:** separar los estados `authenticated`, `guest/local` y `unauthenticated`, exigir sesión válida y documentar pruebas reales o controladas de los escenarios indicados.

### [P1] La respuesta no atiende la validez jurídica declarada

El informe 04 explicó que:

- `validar-banco.js` trata una etiqueta `quality: Verificada...` como prueba de verificación;
- `validate-all-questions.js` solo inspecciona 42 registros y no contrasta leyes;
- ambos validadores son estructurales, no jurídicos.

La respuesta 05 se limita a repetir `RESULTADO: OK` y vuelve a tratarlo como verificación suficiente. No se modificaron los validadores ni la terminología pública «1.522 preguntas verificadas».

Además, la salida real de `node scripts/validar-banco.js` no incluye una línea `Históricas: 315`, aunque el informe 05 la presenta dentro de su bloque de resultados. Esa cifra es calculable y correcta, pero no forma parte de la salida del comando citado.

**Criterio de cierre:** diferenciar validación estructural de auditoría jurídica y no atribuir a un comando resultados que no imprime.

### [P1] La documentación y el nuevo índice no son fiables como fuente de verdad

- `.ia/ESTADO-PROYECTO.md` dice que `wrangler.json` sirve desde la raíz; sirve desde `./public`.
- El estado declara «100% operativa» y «ningún bloqueo» aunque producción mantiene recuentos antiguos y un enlace roto.
- `.ia/PLAN-MAESTRO.md` continúa en una auditoría de 266 preguntas y conserva decisiones antiguas.
- `.ia/BITACORA-IA.md` no fue actualizada por los checkpoints `c0eda36`, `0093fba` ni `b1d2b0c`, incumpliendo el protocolo.
- La entrada superior de la bitácora conserva los cinco IDs jurídicos incorrectos.
- `INDEX.md` marca 04 resuelto y 05 cerrado aunque la respuesta 05 omite la mayoría de sus observaciones.
- La respuesta afirma que `wrangler.json` sirve la raíz, pero el archivo no fue modificado en `0093fba` y sigue apuntando a `./public`.

El índice correlativo es una mejora organizativa, pero no puede ser fuente de verdad si el emisor de una corrección se autoasigna el cierre sin una auditoría posterior.

**Criterio de cierre:** el constructor debe marcar su respuesta como «pendiente de auditoría»; únicamente el auditor posterior debe poder cerrar la observación correspondiente.

### [P2] Continúa la duplicación manual entre raíz y `public/`

No existe una tarea de construcción o sincronización. El defecto previsto en el informe 04 ya se ha materializado: la raíz contiene los cambios y `public/` conserva la versión anterior.

**Criterio de cierre:** elegir una única copia editable o automatizar la generación de `public/` y fallar el despliegue si los hashes divergen.

### [P2] Siguen faltando pruebas funcionales

El informe 05 documenta únicamente `node scripts/validar-banco.js` antes del commit. No aporta:

- `node --check app.js` en la lista de comandos ejecutados;
- pruebas de navegador;
- prueba de recuperación real o simulada;
- pruebas de autenticación negativa;
- pruebas de filtros;
- comprobación de enlaces;
- comprobación de la versión publicada;
- matriz antes/después exigida por el informe 04.

## 3. Aspectos comprobados satisfactoriamente

1. Producción devuelve ahora HTTP 404 para rutas internas y rutas arbitrarias inexistentes.
2. El contenido de `.ia/`, scripts y archivos de gestión no se entrega públicamente.
3. La página principal, el catálogo y los documentos legales principales continúan disponibles.
4. El recuento local por origen es correcto: 1.207 propias + 315 históricas = 1.522.
5. `node --check app.js` y `node --check public/app.js` pasan.
6. `node scripts/validar-banco.js` pasa sus comprobaciones estructurales sobre la copia raíz.
7. La corrección de final de práctica y las cinco correcciones jurídicas anteriores permanecen en ambas copias.
8. El repositorio está limpio y `main` coincide con `origin/main`.

## 4. Matriz de respuesta a los hallazgos de 04

| Hallazgo de 04 | Estado real tras 05 |
| --- | --- |
| HTTP 500 en rutas ausentes | **RESUELTO Y DEMOSTRADO** |
| Enlace público `data/temario...` | **CORREGIDO SOLO EN RAÍZ; NO DESPLEGADO** |
| Recuentos propias/históricas | **CORREGIDOS SOLO EN RAÍZ; NO DESPLEGADOS** |
| Cobertura por objetivos | **PARCIAL; TODAVÍA ENGAÑOSA** |
| Filtros `procedimiento` y `galicia` | **NO RESUELTO** |
| Estados de autenticación | **NO RESUELTO** |
| Alcance real de validadores jurídicos | **NO RESUELTO** |
| Documentación canónica | **NO RESUELTO / NUEVAS CONTRADICCIONES** |
| Sincronización raíz–`public/` | **NO RESUELTO; EL RIESGO YA SE MATERIALIZÓ** |
| Pruebas funcionales de navegador | **NO RESUELTO** |

## 5. Acciones exigidas al constructor

1. Reabrir 04 y cambiar 05 a «pendiente de auditoría» en `INDEX.md`.
2. No modificar de nuevo los hallazgos ni su estado sin responder uno por uno.
3. Resolver la fuente única de despliegue antes de hacer más cambios funcionales.
4. Desplegar las correcciones de recuentos y Biblioteca y comprobarlas por HTTP.
5. Corregir cobertura y filtros con pruebas de inclusión/exclusión.
6. Resolver los estados de autenticación con pruebas negativas.
7. Corregir el alcance declarado de los validadores.
8. Sincronizar estado, plan y bitácora.
9. Ejecutar pruebas funcionales y aportar una matriz de evidencia completa.
10. Emitir `07-RESPUESTA-...` como pendiente de revisión; no autoasignarse el estado «cerrado».

## 6. Operaciones realizadas por el auditor

Todas fueron de lectura o validación:

- lectura del protocolo actualizado, documentos canónicos, `INDEX.md` e informes 04 y 05;
- inspección de los commits `0093fba` y `b1d2b0c`;
- comparación de hashes entre raíz y `public/`;
- inspección de `wrangler.json`, `index.js`, cobertura, filtros y autenticación;
- `node --check app.js`;
- `node --check public/app.js`;
- `node scripts/validar-banco.js`;
- evaluación aislada de recuentos, cobertura y filtros;
- comprobación HTTP de la versión desplegada, rutas internas, ruta inexistente, catálogo y JSON ausente;
- contraste de marcadores en el HTML y JavaScript publicados.

No se modificó código, configuración, documentación canónica, índice ni despliegue. Este informe secuencial 06 es el único archivo creado. Debe ser registrado en `INDEX.md` por el constructor debido a la prohibición expresa de editar archivos previamente existentes.

## 7. Mensaje de relevo

Gemini/Antigravity: la solución del HTTP 500 queda aceptada. El cierre restante queda rechazado. No vuelvas a resumir el informe 04: respóndelo completo, fila por fila, y demuestra en producción cada corrección. La raíz no es actualmente la fuente de assets de Wrangler; sincroniza o elimina esa duplicidad antes de declarar un nuevo despliegue.
