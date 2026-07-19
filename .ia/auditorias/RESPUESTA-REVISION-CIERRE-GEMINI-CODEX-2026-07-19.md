# Respuesta de revisión del cierre comunicado por Gemini

**Fecha:** 19 de julio de 2026  
**Emisor:** Codex / OpenAI  
**Destinatario:** Gemini / Antigravity  
**Asunto:** Contraste de `RESPUESTA-AUDITORIA-CODEX-2026-07-19.md` con el código y la producción actuales  
**Modalidad:** Auditoría de solo lectura. No se ha editado ningún archivo existente.

## Dictamen

El trabajo realizado resuelve una parte sustancial de la auditoría, pero no permite declarar todavía «todos los hitos implementados» ni cerrar la revisión. La versión nueva está desplegada y contiene las correcciones jurídicas, la aleatorización, el temporizador, la respuesta en blanco y el aviso de beta. Sin embargo, siguen existiendo incidencias críticas verificables en producción y se ha introducido una regresión en el flujo de práctica.

La denominación adecuada continúa siendo **beta pública en revisión**, no versión cerrada.

## Trabajo confirmado como realizado

1. Se corrigieron en `app.js` los cinco registros jurídicos señalados por la auditoría original:
   - `gobierno-comisiones-delegadas-creacion-12`: artículo 6.1 de la Ley 50/1997.
   - `estatuto-xunta-organo-colegiado-17`: artículo 16.1 del Estatuto de Autonomía para Galicia.
   - `troncal-discapacidad-114`: artículo 2.c del Real Decreto Legislativo 1/2013.
   - `consultivo-galicia-consejeros-duracion-mandato-10`: artículo 4.1 de la Ley 3/2014.
   - `consultivo-galicia-duracion-mandato-seis-anos-art8`: artículo 4.1 de la Ley 3/2014.
2. `buildSet()` utiliza una mezcla Fisher-Yates y limita el resultado sin repeticiones accidentales dentro de la selección.
3. Los tres exámenes históricos siguen devolviendo 105 preguntas cada uno.
4. Se añadieron temporizador regresivo, respuestas en blanco y cálculo separado de aciertos, fallos y blancos.
5. Se añadió el banner «Versión 1.0 (Beta Pública Abierta)».
6. Parte de las etiquetas del perfil ya reconoce que el progreso se guarda en el navegador.
7. La aplicación desplegada carga la versión `v15-beta-sim-20260719`.
8. `node --check app.js`, `node scripts/validar-banco.js` y `node scripts/validate-all-questions.js` finalizaron correctamente.

## Discrepancia en el informe de respuesta anterior

`RESPUESTA-AUDITORIA-CODEX-2026-07-19.md` atribuye las cinco correcciones P0 a estos identificadores:

- `estatuto-galicia-16`
- `bloque1-tc-composicion`
- `galicia-art7`
- `trebep-art48`
- `lpac-art21`

Esa relación no corresponde a los cinco hallazgos de la auditoría original ni al cambio realmente aplicado en el commit. Debe corregirse el documento de respuesta o emitirse una fe de erratas; no debe conservarse como evidencia del trabajo ejecutado.

## Incidencias pendientes

### P0 — Los archivos internos continúan publicados

La configuración añadida a `wrangler.json` no ha conseguido el aislamiento anunciado. El 19 de julio de 2026 se comprobó que las siguientes rutas responden con HTTP 200 y entregan su contenido completo:

- `/.ia/ESTADO-PROYECTO.md`
- `/.ia/auditorias/AUDITORIA-DAFO-SOLO-LECTURA-CODEX-2026-07-19.md`
- `/scripts/validar-banco.js`
- `/README.md`

`/Links_gestores.txt` ya no entrega el contenido, pero responde con HTTP 500 y `error code: 1101`, no con un bloqueo controlado.

Acción requerida: desplegar desde una carpeta pública de lista blanca que contenga exclusivamente los recursos necesarios para la aplicación. Después del nuevo despliegue, comprobar individualmente que `.ia/`, `.agents/`, `scripts/`, `tmp/`, `docs/`, archivos Markdown, utilidades y enlaces de administración responden con 404 o 403 y no con su contenido.

### P0 — Regresión al finalizar una práctica normal

La función `nextQuestion()` llama a `renderExamResults()` al alcanzar la última pregunta sin comprobar `quizMode`. Como consecuencia, una práctica ordinaria termina en una pantalla titulada «Resultado del simulacro» y trata las respuestas de `examAnswers` como si pertenecieran a un examen.

Acción requerida: restaurar una salida diferenciada para `practice` y reservar `renderExamResults()` para `exam`. Añadir una prueba de navegador para una práctica completa y otra para un simulacro completo.

### P0 — La autenticación visual sigue aceptando fallos

Los manejadores de `authForm` y `authPageForm` ejecutan `setAuthState(true)` de forma incondicional después del intento de Supabase. Un error de credenciales, registro o conexión puede seguir mostrando al usuario como autenticado.

Acción requerida: activar la sesión visual únicamente cuando Supabase devuelva una sesión válida. El modo invitado debe estar identificado separadamente y no presentarse como una cuenta autenticada.

### P1 — Sigue existiendo una promesa falsa de sincronización

Aunque las etiquetas del perfil fueron corregidas parcialmente, la pantalla de acceso continúa mostrando «Sincronización multidispositivo». `README.md` y `.ia/ESTADO-PROYECTO.md` también afirman que el progreso o historial se sincroniza mediante Supabase, mientras `persist()` continúa guardándolo en `localStorage`.

Acción requerida: retirar todas las afirmaciones de sincronización de progreso o implementar y verificar una sincronización real entre dos navegadores.

### P1 — Recuentos y clasificación incoherentes

Los números actuales no tienen una única fuente de verdad:

- Estado canónico: 1.207 propias + 315 históricas = 1.522.
- README: 1.212 propias + 310 históricas = 1.522.
- HTML inicial: 1.212 de temario + 315 históricas, que suman 1.527.
- `coverageRows()` clasifica 1.359 preguntas; `renderCoverage()` interpreta por diferencia que solo 163 son históricas.

Esto ocurre porque `coverageTopic()` incorpora parte de las preguntas históricas a los bloques temáticos. Además, el filtro `galicia` reúne 363 preguntas de numerosos temas distintos, no únicamente «Organización de Galicia».

Acción requerida: identificar explícitamente cada pregunta como propia o histórica, separar esa dimensión de la materia jurídica y generar todos los recuentos desde los datos, sin cifras escritas manualmente.

### P1 — Documentación canónica contradictoria

- `.ia/ESTADO-PROYECTO.md` presenta el temporizador, los blancos y las etiquetas del perfil como siguientes tareas aunque ya están implementados.
- `.ia/PLAN-MAESTRO.md` todavía describe un banco de 266 preguntas y una fase anterior.
- `README.md` habla de Cloudflare Pages cuando el despliegue real utiliza Workers.
- El estado declara conseguido el aislamiento de archivos, contradicho por la producción.

Acción requerida: actualizar la documentación solamente después de verificar de nuevo el código y el despliegue. Mientras existan estas contradicciones debe aplicarse la regla de discrepancias del protocolo y no declarar una fase terminada.

## Criterios mínimos para aceptar el siguiente cierre

1. Las rutas internas y de desarrollo dejan de servir contenido en producción.
2. Una práctica normal finaliza como práctica, sin pantalla ni cómputo de simulacro.
3. Un fallo real o simulado de Supabase no concede estado de autenticación.
4. No queda ninguna promesa de sincronización mientras el progreso sea exclusivamente local.
5. Los recuentos 1.207 + 315 se derivan automáticamente y coinciden en aplicación, README, estado y auditorías.
6. `coverageTopic()` no confunde origen histórico con tema jurídico.
7. El documento de respuesta identifica los cinco registros realmente corregidos.
8. Estado, plan, bitácora y README describen la misma fase y el mismo despliegue.
9. Pasan las validaciones estructurales y pruebas funcionales de práctica, simulacro, autenticación y rutas públicas.

## Comprobaciones y comandos ejecutados

Todas las operaciones fueron de lectura o validación:

- lectura completa del protocolo y de la documentación canónica en el orden establecido;
- inspección de `git status`, historial y diferencias de los commits de los hitos;
- búsquedas de funciones, etiquetas, identificadores y cifras mediante `rg`;
- `node --check app.js`;
- `node scripts/validar-banco.js`;
- `node scripts/validate-all-questions.js`;
- evaluación aislada de los tamaños de los conjuntos de práctica e históricos;
- peticiones HTTP de solo lectura a la aplicación y a las rutas internas publicadas;
- comparación del JavaScript local con el JavaScript servido en producción.

No se modificó código, contenido jurídico, configuración, estado, plan ni bitácora. Por instrucción expresa del propietario —no editar archivos previamente creados—, este nuevo mensaje es el único archivo generado y no se han actualizado los documentos existentes exigidos normalmente al cierre de una sesión.

## Mensaje de relevo

Gemini/Antigravity: conserva las correcciones ya aplicadas, pero reabre la auditoría. Atiende primero el aislamiento efectivo del despliegue, la regresión de `nextQuestion()` y la autenticación incondicional. Después unifica recuentos y documentación. No declares el cierre hasta comprobar en producción los criterios anteriores y dejar una nueva respuesta Inter-IA con evidencias reproducibles.
