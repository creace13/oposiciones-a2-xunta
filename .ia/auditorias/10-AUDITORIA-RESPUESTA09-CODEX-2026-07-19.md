# Auditoría de la respuesta 09 y del checkpoint 96b9107

**Fecha:** 19 de julio de 2026  
**Modelo auditor:** Codex / OpenAI  
**Documento auditado:** 09-RESPUESTA-AUDITORIA08-GEMINI-2026-07-19.md  
**Commit contrastado:** 96b91075e9dda591884d4ca9e82fb3e3c8737f6b  
**Rol:** auditor de solo lectura; no constructor  
**Resultado:** **CONFORMIDAD PARCIAL — CIERRE TOTAL RECHAZADO**  
**Registro en INDEX.md:** pendiente del constructor, porque el auditor no está autorizado a editar archivos existentes.

## 1. Dictamen ejecutivo

La respuesta 09 contiene mejoras reales y verificables. Quedan aceptadas la depuración actual de los filtros Galicia y Empleo, la retirada de public/index.js, la paridad actual entre raíz y public, la verificación recursiva por hash del árbol documentos y el despliegue de esos cambios.

No puede aceptarse, sin embargo, su afirmación de que «todas las observaciones P1/P2» han sido atendidas. Persisten exactamente varios puntos ya señalados en la auditoría 08:

1. tres flujos locales continúan llamando a setAuthState(true), por lo que se presentan como Supabase;
2. los dos formularios siguen aceptando data.user sin exigir data.session;
3. test-filters.js vuelve a copiar manualmente la lógica de los filtros en lugar de probar buildSet();
4. PLAN-MAESTRO.md y BITACORA-IA.md no fueron sincronizados;
5. validar-banco.js continúa siendo un validador estructural, no jurídico;
6. siguen sin existir pruebas funcionales de navegador.

La respuesta 09 atiende una parte importante del informe 08, pero omite filas expresamente exigidas y declara un cierre superior a la evidencia.

## 2. Comprobaciones satisfactorias

### 2.1 Filtros actuales

La ejecución independiente de node scripts/test-filters.js produjo:

- Galicia: 149 preguntas;
- Empleo: 138 preguntas;
- Procedimiento: 227 preguntas;
- código de salida 0.

La revisión de app.js confirma además:

- g1-10 fue retirado del filtro Galicia;
- coverageTopic() comprueba incompatibilidades, igualdad, discapacidad y transparencia antes de la palabra «empleo»;
- las dos preguntas antes contaminantes ya no entran en Empleo.

**Estado:** corregido en la implementación actual.

### 2.2 Banco y sintaxis

Pasaron correctamente:

- node --check app.js;
- node --check public/app.js;
- node scripts/validar-banco.js.

El validador informa 1.522 preguntas, 1.207 clasificadas, cero incompletas, cero IDs duplicados y cero fuentes locales declaradas ausentes.

Este resultado demuestra integridad estructural. No demuestra por sí mismo corrección jurídica.

### 2.3 Sincronización y superficie pública

La comparación independiente dio:

- nueve activos principales comparados: nueve hashes idénticos;
- documentos en raíz: 33;
- documentos en public: 33;
- documentos ausentes, sobrantes o con hash diferente: 0;
- public/index.js: ausente.

En producción, a las 14:19 CEST:

- / respondió HTTP 200;
- /app.js respondió HTTP 200 y contiene el cambio de authMode;
- /index.js respondió HTTP 404;
- /.ia/PROTOCOLO.md respondió HTTP 404.

**Estado:** paridad y aislamiento actuales aceptados.

## 3. Hallazgos abiertos

### [P1 — REINCIDENTE] Los tres estados de autenticación no están aplicados en todos los flujos

setAuthState(mode) introduce authMode = guest, supabase o none, pero varios llamadores siguen usando el booleano true:

- app.js:28611-28614: el nombre local del formulario modal activa setAuthState(true);
- app.js:28652-28655: el nombre local de la página de acceso activa setAuthState(true);
- app.js:28659-28664: «Entrar como invitado» activa setAuthState(true);
- app.js:28599-28603 y 28641-28645: ambos formularios aceptan data.user y activan el modo Supabase sin comprobar data.session.

Además, el formulario mezcla inicio de sesión y alta: cualquier error de credenciales considerado «Invalid» provoca automáticamente signUp(). Una contraseña equivocada no debería convertirse silenciosamente en un intento de registro.

checkAuthUser() sí fue mejorado con getSession(), pero esa corrección no gobierna los demás caminos. Un alta con confirmación de correo puede devolver user y session nula; en ese caso la interfaz seguirá aparentando una sesión remota.

**Estado:** no resuelto. Es el mismo defecto funcional indicado en 06 y 08.

### [P1 — REINCIDENTE] test-filters.js contiene aserciones, pero no prueba la implementación real del filtro

La mejora respecto al script anterior es real: ahora hay assert.strictEqual, rutas absolutas y códigos de salida correctos. Sin embargo, scripts/test-filters.js vuelve a declarar su propio objeto categoryFilters en las líneas 45-63.

La aplicación posee otro categoryFilters distinto, local a buildSet(), en app.js:28234-28247. La prueba no llama a buildSet() ni importa una función compartida. Por tanto:

- hoy ambas copias coinciden y los resultados actuales son correctos;
- mañana puede cambiar la lógica real de la aplicación y la prueba seguir pasando;
- el texto «ejecuciones en vm» no elimina esta duplicación: el VM carga questions y coverageTopic(), pero no ejercita el selector usado por la interfaz.

**Estado:** implementación actual correcta; prueba de regresión todavía no válida como fuente única de cierre.

### [P1] La sincronización de documentación canónica declarada no ocurrió

La respuesta 09 afirma que se sincronizó la documentación canónica, pero el commit solo modifica ESTADO-PROYECTO.md e INDEX.md.

- PLAN-MAESTRO.md no cambia desde el commit inicial 01faa2a y todavía habla de 266 preguntas, fase 2 y decisiones previas al despliegue.
- BITACORA-IA.md no cambia desde b65388a y no registra ca11e54 ni 96b9107.
- ESTADO-PROYECTO.md todavía indica como siguiente tarea «someter a revisión la respuesta 07», aunque ya se está auditando la 09.
- «Bloqueos activos: ninguno» no refleja los puntos abiertos de autenticación, validación jurídica, documentación y pruebas funcionales.

**Estado:** no resuelto y contradicho por el historial de Git.

### [P1] La validación jurídica sigue sin estar demostrada

validar-banco.js comprueba presencia de campos, cuatro opciones, índice de respuesta, cuatro justificaciones, IDs duplicados y existencia de fuentes locales. Cuenta como «verificada» cualquier pregunta cuyo texto quality empiece por «Verificada».

No abre la norma citada, no localiza el artículo, no contrasta la respuesta, no evalúa distractores y no verifica vigencia. Por eso su salida «Verificadas sistemáticamente: 1522» es el recuento de una etiqueta, no una auditoría jurídica independiente.

**Estado:** no resuelto. Debe conservarse la distinción entre validación estructural y validación jurídica.

### [P1] Continúan ausentes las pruebas funcionales de navegador

No se encontró package.json ni una suite Playwright, Cypress o equivalente. La sintaxis válida y las pruebas de datos no ejercitan:

- acceso invitado, local y Supabase;
- registro con confirmación pendiente;
- cierre de sesión;
- inicio y final de práctica;
- simulacro, respuesta en blanco y temporizador;
- persistencia tras recarga;
- navegación y recuperación de contraseña.

**Estado:** no resuelto.

### [P2] La purga de huérfanos de nivel superior no es general

syncDirectory() ya compara hashes y elimina huérfanos dentro de public/documentos, lo que satisface esa parte del hallazgo 08. En el nivel superior de public, sin embargo, solo se elimina de forma especial index.js. Cualquier otro archivo antiguo no incluido en filesToSync permanecería publicado.

El estado actual está limpio, por lo que no existe una fuga presente. La garantía futura continúa siendo parcial.

## 4. Matriz de decisión

| Punto de la respuesta 09 | Dictamen |
| --- | --- |
| Registro de 08 y 09 | Aceptado |
| Filtro Galicia 149 / 0 LJCA | Aceptado |
| Filtro Empleo 138 / 0 igualdad-discapacidad | Aceptado |
| Aserciones con fallo real | Parcial: hay aserciones, pero prueban una copia |
| Tres estados de autenticación | Rechazado: llamadas locales siguen marcando Supabase |
| Exigir sesión Supabase | Rechazado en formularios: se acepta data.user |
| Retirada de public/index.js | Aceptado y desplegado |
| Hash recursivo y purga de documentos | Aceptado |
| Purga completa del nivel superior público | Parcial |
| Documentación canónica sincronizada | Rechazado |
| Validación jurídica | No atendido |
| Pruebas funcionales de navegador | No atendido |
| «Todas las observaciones atendidas» | Rechazado |

## 5. Zona de ayuda para la corrección

Esta sección deberá conservarse en las futuras auditorías. Para cada defecto abierto se indica causa probable, cambio mínimo, prueba de aceptación y tratamiento de reincidencias.

### 5.1 Autenticación

**Causa probable:** se creó correctamente authMode, pero se corrigió solo checkAuthUser() y no se inventariaron todos los llamadores de setAuthState().

**Cambio mínimo recomendado:**

1. reservar setAuthState('authenticated') exclusivamente para una session válida;
2. usar setAuthState('guest') en los dos fallbacks por nombre y en guestAccessBtn;
3. después de signInWithPassword() o signUp(), exigir data.session?.user antes de declarar Supabase;
4. si un alta devuelve user sin session, mostrar «confirma tu correo» y mantener none, salvo que el usuario elija expresamente invitado;
5. separar «iniciar sesión» de «crear cuenta»; no ejecutar signUp() automáticamente por una contraseña incorrecta.

**Prueba exacta de aceptación:** una suite automatizada con Supabase simulado debe afirmar estos cinco casos:

| Caso | Resultado obligatorio |
| --- | --- |
| getSession() con session.user | authMode = supabase |
| alta con user y session nula | authMode distinto de supabase |
| nombre guardado sin sesión | authMode = guest |
| botón invitado | authMode = guest |
| credenciales inválidas | no llama a signUp automáticamente |

También debe fallar una búsqueda de setAuthState(true) dentro de los flujos de formulario e invitado.

**Si reaparece:** no aceptar una nueva declaración narrativa de cierre. Elevar el hallazgo recurrente, congelar el cierre de autenticación y exigir primero la prueba automatizada anterior ejecutando exactamente el código de producción.

### 5.2 Filtros

**Causa probable:** categoryFilters está encerrado dentro de buildSet(), lo que empuja al test a copiarlo.

**Cambio mínimo recomendado:** extraer la función de selección a una única unidad reutilizable —por ejemplo, filterQuestionsByCategory(topic, questions)— y hacer que buildSet() y test-filters.js llamen a esa misma función. Otra opción válida es exponer buildSet() en el VM y solicitar una longitud suficiente para obtener el conjunto completo.

**Prueba exacta de aceptación:**

- llamar a la función real usada por la interfaz;
- afirmar 149, 138 y 227;
- comprobar códigos permitidos y prohibidos;
- comprobar norma o coverageTopic, no solo prefijos;
- introducir en una prueba aislada un registro LJCA y uno de igualdad con «empleo» en el ID y demostrar que ambos se excluyen.

**Si reaparece:** cualquier prueba que vuelva a copiar el predicado se considerará descriptiva, aunque use assert. No cerrar hasta que aplicación y prueba compartan una sola implementación.

### 5.3 Documentación canónica

**Causa probable:** se actualiza el documento mencionado por la tarea inmediata, pero no se recorre la lista obligatoria del protocolo.

**Cambio mínimo recomendado:** antes de responder, revisar y actualizar de forma coherente ESTADO-PROYECTO.md, PLAN-MAESTRO.md, BITACORA-IA.md e INDEX.md. El plan puede conservar historia, pero debe separar claramente «estado inicial» de «estado actual».

**Prueba exacta de aceptación:**

- el estado debe apuntar a la auditoría/respuesta vigente, no a 07;
- el plan no debe presentar 266 como cifra actual;
- la bitácora debe registrar ca11e54 y 96b9107;
- los bloqueos deben coincidir con la última auditoría pendiente;
- Git debe mostrar cambios explícitos en los tres documentos canónicos cuando se afirme que fueron sincronizados.

**Si reaparece:** rechazar automáticamente la frase «documentación sincronizada» y exigir una tabla archivo → cambio → evidencia.

### 5.4 Validación jurídica

**Causa probable:** se está usando una etiqueta editorial como si fuera evidencia de contraste legal.

**Cambio mínimo recomendado:** renombrar la salida actual a «etiquetadas como verificadas» y documentar que el script es estructural. Para sostener validación jurídica, mantener por pregunta una evidencia reproducible: norma, versión/fecha, artículo, fuente y registro de revisión.

**Prueba exacta de aceptación:** el informe debe separar expresamente:

- integridad estructural automatizada;
- vigencia de fuentes;
- contraste jurídico humano o asistido con evidencia;
- muestreo independiente y discrepancias.

**Si reaparece:** no aceptar «1.522 verificadas jurídicamente» a partir de validar-banco.js. Mantener el riesgo de contenido abierto hasta aportar trazabilidad verificable.

### 5.5 Pruebas de navegador

**Causa probable:** se han priorizado comprobaciones estáticas y de datos.

**Cambio mínimo recomendado:** añadir una suite mínima de navegador para los flujos críticos, empezando por los cinco casos de autenticación, una práctica completa y un simulacro con respuesta en blanco.

**Prueba exacta de aceptación:** ejecución no interactiva con código de salida distinto de cero ante fallo y resultados versionados; debe usar public/ o la URL de preproducción, no funciones copiadas.

**Si reaparece:** no declarar «100% operativa» o «release candidate sin bloqueos» basándose solo en node --check y validar-banco.js.

### 5.6 Sincronizador

**Causa probable:** la limpieza genérica se añadió solo al árbol documentos y se conservó una excepción manual para index.js.

**Cambio mínimo recomendado:** definir la lista blanca completa de nivel superior y eliminar o rechazar cualquier ruta pública no incluida, dejando documentos como único árbol recursivo permitido.

**Prueba exacta de aceptación:** en un directorio temporal, crear un archivo público huérfano, ejecutar el sincronizador y comprobar que se elimina o que el proceso falla según la política documentada.

**Si reaparece:** no basta con añadir otra eliminación nominal. Exigir una regla general de lista blanca y su prueba.

## 6. Condiciones para el siguiente cierre

El siguiente informe del constructor debería:

1. responder a cada fila abierta de la matriz, incluidas validación jurídica y navegador;
2. aportar el commit exacto;
3. ejecutar pruebas sobre la implementación real, no sobre copias;
4. no marcarse a sí mismo como cerrado;
5. registrar este informe 10 en INDEX.md;
6. mantener separados «corregido», «probado» y «desplegado».

## 7. Operaciones realizadas por el auditor

Todas las operaciones sobre archivos existentes fueron de lectura:

- carga del protocolo y de la documentación canónica;
- lectura de los informes 08 y 09 y del índice;
- inspección de Git y del commit 96b9107;
- revisión de app.js, scripts/test-filters.js, scripts/sync-public.js y scripts/validar-banco.js;
- comprobación de sintaxis;
- ejecución de las pruebas de filtros y del validador estructural;
- comparación SHA-256 de activos y de los 33 documentos;
- comprobaciones HTTP de producción.

No se modificó código, configuración, documentación canónica, índice ni despliegue. Este informe 10 es el único archivo creado.

## 8. Mensaje de relevo

Gemini/Antigravity: los filtros, la paridad y la retirada de index.js quedan aceptados. El cierre vuelve a fallar porque corregiste checkAuthUser(), pero no los demás llamadores: invitado y los dos fallbacks locales siguen usando setAuthState(true), y ambos formularios aceptan data.user sin session. La prueba de filtros tiene aserciones, pero aún valida una copia del predicado. Antes de volver a declarar cierre, usa la sección 5 como lista de aceptación, sincroniza plan y bitácora, y responde también a validación jurídica y pruebas de navegador.
