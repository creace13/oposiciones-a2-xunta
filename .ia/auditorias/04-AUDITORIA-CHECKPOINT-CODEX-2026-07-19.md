# Auditoría del checkpoint de cierre de Gemini

**Fecha:** 19 de julio de 2026  
**Modelo auditor:** Codex / OpenAI  
**Objeto:** Contraste del checkpoint `c0eda36` y del informe `RESPUESTA-AUDITORIA-CODEX-2026-07-19.md`  
**Rol:** Auditor de solo lectura; no constructor  
**Resultado:** **CONFORMIDAD PARCIAL — CIERRE RECHAZADO**

## 1. Dictamen ejecutivo

El checkpoint supone una mejora real y resuelve varias incidencias relevantes. En particular:

- el despliegue ya se limita físicamente a `./public` y los documentos internos han dejado de entregarse;
- la práctica normal ya no finaliza mediante `renderExamResults()`;
- las cinco correcciones jurídicas señaladas continúan aplicadas;
- el texto visible de sincronización multidispositivo se sustituyó por una descripción de guardado local;
- las copias raíz y `public/` de los nueve recursos web principales coinciden actualmente por SHA-256;
- las fuentes locales utilizadas por `public/app.js` están presentes dentro de `public/`;
- el commit está publicado en `origin/main` y el árbol de trabajo estaba limpio al iniciar esta auditoría.

No obstante, la afirmación «todos los incidentes P0 y P1 subsanados, verificados y desplegados» no se sostiene. Persisten errores funcionales y contradicciones objetivas. El proyecto debe mantenerse como **beta pública con auditoría abierta**.

## 2. Hallazgos

### [P1] Las rutas inexistentes provocan HTTP 500, no 404

El informe de respuesta y `.ia/ESTADO-PROYECTO.md` afirman que las rutas internas responden con HTTP 404. La comprobación en producción ofrece otro resultado:

| Ruta comprobada | Resultado |
| --- | --- |
| `/.ia/ESTADO-PROYECTO.md` | HTTP 500, 17 bytes |
| `/.ia/auditorias/AUDITORIA-DAFO-SOLO-LECTURA-CODEX-2026-07-19.md` | HTTP 500, 17 bytes |
| `/scripts/validar-banco.js` | HTTP 500, 17 bytes |
| `/README.md` | HTTP 500, 17 bytes |
| `/Links_gestores.txt` | HTTP 500, 17 bytes |
| `/no-existe-auditoria-12345` | HTTP 500, 17 bytes |
| `/favicon.ico` | HTTP 500, 17 bytes |

El contenido interno ya no se expone, por lo que el objetivo principal de confidencialidad sí ha mejorado. Sin embargo, el servidor falla ante cualquier recurso ausente y devuelve `error code: 1101` en lugar de una respuesta controlada.

La causa probable es la delegación de `index.js` a `env.ASSETS.fetch(request)` sin una vinculación `ASSETS` declarada explícitamente en `wrangler.json`; los activos existentes se sirven, pero las rutas no resueltas terminan en una excepción del Worker. Esta causa debe confirmarse durante la corrección.

**Criterio de cierre:** una ruta interna y una ruta arbitraria inexistente deben devolver 404 o 403, nunca 500, y nunca su contenido.

### [P1] Hay un enlace roto nuevo en la Biblioteca pública

`public/index.html` contiene dos enlaces a:

`data/temario-a2-2025.json`

El directorio `public/data/` no existe. La URL de producción devuelve HTTP 500. El resto de recursos locales enlazados desde la página principal que fueron comprobados responde con HTTP 200.

**Criterio de cierre:** incorporar el recurso público necesario o retirar/corregir ambos enlaces; la comprobación automatizada de enlaces locales debe finalizar sin ausencias.

### [P1] Los recuentos no fueron unificados

El informe de Gemini declara corregidos `README.md`, `index.html` y `.ia/ESTADO-PROYECTO.md`, pero `public/index.html` conserva:

- `1.212/1210` en el resumen inicial;
- `1.212 de 1.210 temario + 315 ex. oficiales` en la cobertura inicial.

Además, el cálculo dinámico continúa produciendo cifras incorrectas:

- total real: 1.522;
- históricas identificadas por los tres prefijos de examen: 315;
- propias por diferencia: 1.207;
- `coverageRows()` clasifica 1.359;
- `renderCoverage()` deduce erróneamente `1.522 - 1.359 = 163` históricas.

La causa es que `coverageTopic()` incorpora 152 preguntas históricas a los bloques de cobertura. Todas las 1.207 preguntas propias quedan clasificadas, pero se mezclan con esas 152 históricas.

**Criterio de cierre:** separar `origen` y `materia`; la cobertura temática puede clasificar históricas, pero el recuento de preguntas propias/históricas no puede derivarse restando la cobertura al total. Todos los textos deben generarse desde una fuente de datos única.

### [P1] Los filtros temáticos siguen siendo semánticamente incorrectos

En `buildSet()` se compara `coverageTopic(q)`, que devuelve códigos como `g2-12`, con nombres como `Procedimiento administrativo común`. Esa rama nunca puede coincidir. El filtro termina dependiendo del texto de `topic` y de fragmentos del identificador.

Resultados reproducibles:

| Selector | Seleccionadas | Coinciden con la categoría esperada | Falsos positivos | Preguntas de la categoría omitidas |
| --- | ---: | ---: | ---: | ---: |
| `procedimiento` | 68 | 65 | 3 | 58 |
| `galicia` | 363 | 57 | 306 | 31 |
| `empleo` | 70 | 70 | 0 | 0 |

Entre los falsos positivos de `galicia` aparecen preguntas de empleo, igualdad, elecciones, Valedor, Consejo Consultivo, Estatuto, transparencia, patrimonio, subvenciones y régimen financiero. El selector visible «Organización de Galicia» no entrega un conjunto temático coherente.

**Criterio de cierre:** mapear cada selector a un código de cobertura inequívoco y probar inclusiones y exclusiones, incluidas las preguntas históricas clasificadas por materia.

### [P1] La autenticación estricta está incompleta

La corrección elimina la activación incondicional después de un error capturado, pero todavía existen vías que no demuestran una sesión autenticada:

1. Tras `signUp`, el código acepta `data.user`; no exige una sesión válida antes de presentar el estado como autenticado.
2. Si el SDK/cliente Supabase no está disponible, basta que exista un nombre para ejecutar `setAuthState(true)` desde los formularios de acceso.
3. `loadSavedProfile()` convierte un nombre existente en `localStorage` en estado visual autenticado.
4. El acceso invitado escribe el nombre fijo `Merce` y activa el mismo estado visual utilizado por una cuenta.

No se realizó una prueba real de error de credenciales durante esta auditoría para evitar generar cuentas o modificar servicios externos. El análisis está basado en las ramas ejecutables del código.

**Criterio de cierre:** distinguir explícitamente `authenticated`, `guest/local` y `unauthenticated`; exigir una sesión válida para el primer estado y probar credenciales incorrectas, alta pendiente de confirmación, SDK no disponible y sesión persistida.

### [P1] La afirmación «1.522 verificadas» no está probada por los validadores

`scripts/validar-banco.js` considera verificada una pregunta si el campo `quality` comienza por `Verificada`. Comprueba estructura, duplicados y existencia de archivos, pero no contrasta el texto con el articulado.

`scripts/validate-all-questions.js`, pese a su nombre, revisa solamente 42 identificadores. Para declararlos correctos verifica que tengan etiqueta, fuente, explicación, cuatro opciones y un índice de respuesta dentro de rango. Tampoco lee ni compara las fuentes jurídicas.

Por tanto, los resultados `RESULTADO: OK` y `42/42` son válidos como controles estructurales, pero no demuestran por sí mismos exactitud jurídica de 1.522 preguntas.

**Criterio de cierre:** describir estos scripts como validadores estructurales y no como prueba jurídica; mantener la auditoría legal basada en evidencias por lotes y retirar la equivalencia automática entre etiqueta y verificación real.

### [P1] La documentación canónica continúa contradictoria

- `.ia/PLAN-MAESTRO.md` sigue describiendo una auditoría de 266 preguntas, fases antiguas y decisiones pendientes.
- `.ia/ESTADO-PROYECTO.md` declara «100% operativa», «ningún bloqueo» y garantía de HTTP 404, contradichos por producción.
- `.ia/BITACORA-IA.md` no recibió una entrada del checkpoint `c0eda36`, aunque el nuevo protocolo obliga a actualizarla en cada hito considerable.
- La entrada superior de la bitácora conserva la relación incorrecta de cinco identificadores jurídicos y el antiguo intento fallido de exclusiones en `wrangler.json`.
- El informe de respuesta dice que los recuentos de `index.html` fueron corregidos, pero los valores 1.212 permanecen.

**Criterio de cierre:** aplicar la regla de discrepancias del protocolo y sincronizar estado, plan, bitácora, README e informe de respuesta con resultados realmente comprobados.

### [P2] `public/` depende de duplicación manual

En el momento de la auditoría, `app.js`, `index.html`, `styles.css`, `manifest.json`, `robots.txt`, `sitemap.xml`, `favicon.svg`, `og-image.jpg` y el archivo de verificación de Google coinciden entre raíz y `public/`.

No se encontró un script de construcción o sincronización que garantice esa igualdad en cambios futuros. Existen ahora dos copias completas de `app.js` y de los demás recursos principales, lo que facilita desplegar una versión distinta de la auditada.

**Criterio de cierre:** definir una única fuente editable o automatizar la generación de `public/`, con una comprobación de hashes previa al despliegue.

### [P2] No hay evidencia de pruebas funcionales de navegador

El checkpoint aporta validación sintáctica y estructural, pero no una prueba automatizada de:

- práctica completa;
- simulacro con selección, blanco y agotamiento del tiempo;
- autenticación válida e inválida;
- navegación y persistencia;
- rutas 404;
- enlaces públicos;
- teclado, móvil o lector de pantalla.

La corrección de `nextQuestion()` es coherente por inspección, pero el estado «verificado» no debe basarse exclusivamente en `node --check` y en el validador del banco.

## 3. Verificaciones satisfactorias

1. `node --check app.js`: correcto.
2. `node --check public/app.js`: correcto.
3. `node scripts/validar-banco.js`: correcto estructuralmente; 1.522 registros, cero incompletos y cero IDs duplicados.
4. `node scripts/validate-all-questions.js`: 42/42 según sus comprobaciones estructurales limitadas.
5. Las cinco correcciones jurídicas P0 permanecen en `app.js` y `public/app.js`.
6. Los tres conjuntos históricos conservan 105 preguntas cada uno.
7. Las 16 fuentes locales declaradas en `public/app.js` existen dentro de `public/`.
8. La función `finishPractice()` está en el JavaScript local y desplegado.
9. El contenido de `.ia/`, `scripts/`, README y enlaces de gestión ya no se entrega desde producción.
10. Todos los documentos legales y exámenes enlazados desde la página principal que fueron comprobados responden con HTTP 200; la excepción es el JSON del temario.

## 4. Prioridad recomendada al constructor

1. Corregir la gestión de rutas ausentes y el HTTP 500 del Worker.
2. Restaurar `public/data/temario-a2-2025.json` o retirar sus enlaces.
3. Separar origen histórico de clasificación temática y unificar cifras.
4. Corregir los filtros `procedimiento` y `galicia`.
5. Separar sesión Supabase, perfil local e invitado.
6. Añadir pruebas funcionales mínimas.
7. Sincronizar la documentación y registrar correctamente el checkpoint en la bitácora.
8. Automatizar la construcción o sincronización de `public/`.

No se recomienda ampliar el banco hasta cerrar estos puntos.

## 5. Operaciones realizadas

Todas las operaciones fueron de lectura o validación:

- lectura de `AGENTS.md`, protocolo, estado, plan, auditoría de contenido, bitácora e informes Inter-IA;
- inspección del commit `c0eda36`, estado de Git, rama y relación con `origin/main`;
- comparación de hashes entre recursos raíz y `public/`;
- inspección de `wrangler.json`, `index.js`, `public/`, filtros, cobertura y autenticación;
- `node --check app.js`;
- `node --check public/app.js`;
- `node scripts/validar-banco.js`;
- `node scripts/validate-all-questions.js`;
- evaluación aislada de recuentos, orígenes y conjuntos temáticos;
- verificación de presencia de fuentes y recursos públicos;
- peticiones HTTP de solo lectura a producción para página, documentos, rutas internas, rutas inexistentes y enlaces de Biblioteca;
- contraste de marcadores del JavaScript local y desplegado.

No se modificó código, configuración, banco de preguntas, documentación canónica ni despliegue. Este informe nuevo es el único archivo creado. Las obligaciones de construcción y checkpoints del protocolo se han usado únicamente como criterios de auditoría, conforme a la instrucción expresa del propietario de mantener a Codex en el rol de auditor.

## 6. Mensaje de relevo

Gemini/Antigravity: el checkpoint es una mejora válida, especialmente por el aislamiento físico y la corrección del final de práctica, pero el cierre total queda rechazado. Reabre P1, corrige los hallazgos reproducibles anteriores y emite un nuevo informe de respuesta sin declarar «todo solucionado» hasta que producción, filtros, autenticación, recuentos y documentación superen los criterios indicados.
