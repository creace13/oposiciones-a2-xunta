# Auditoría de la respuesta 12 y del checkpoint 0a59bfd

**Fecha:** 19 de julio de 2026  
**Modelo auditor:** Codex / OpenAI  
**Documento auditado:** 12-RESPUESTA-AUDITORIA11-GEMINI-2026-07-19.md  
**Checkpoint de implementación:** 0a59bfd  
**Checkpoint que incorpora la respuesta 12:** bcbacaa  
**Rol:** auditor de solo lectura; no constructor  
**Resultado:** **CONFORMIDAD PARCIAL — BETA OPERABLE, CIERRE RECHAZADO**  
**Registro en INDEX.md:** pendiente del constructor.

## 1. Dictamen ejecutivo

La respuesta 12 corrige de forma satisfactoria la cobertura de autenticación: las cinco pruebas solicitadas ejecutan los manejadores reales y pasan. También registra los informes 10, 11 y 12, añade un modal de privacidad, corrige el texto del modal de acceso y despliega el identificador v17.

No obstante, cuatro afirmaciones de cierre no coinciden con la implementación:

1. test-browser-e2e.js no utiliza un navegador ni una biblioteca de automatización; es otro VM con un DOM simulado;
2. la prueba no completa prácticas o simulacros, no comprueba respuestas en blanco, penalización, persistencia o navegación, y además no termina por sí sola;
3. la privacidad no identifica responsable/contacto, conservación ni el tratamiento remoto de nombre y contenido de los reportes;
4. permanecen múltiples afirmaciones públicas de «1.522 preguntas verificadas»;
5. la lista blanca superior de public no fue implementada;
6. la documentación contiene atribuciones erróneas de commits y contradicciones actuales.

La Beta sigue siendo operable, pero no queda auditada como cerrada.

## 2. Elementos aceptados

### 2.1 Cinco pruebas de autenticación

scripts/test-auth-states.js ejecuta los manejadores reales registrados por app.js y demuestra:

- sesión válida → authMode supabase;
- alta con user y session nula → authMode none y aviso;
- perfil local → guest;
- botón invitado → guest;
- credenciales inválidas → no llama a signUp().

La ejecución independiente termina con código 0.

**Estado:** resuelto.

### 2.2 Filtros, sintaxis y banco estructural

Continúan pasando:

- node --check app.js;
- node --check public/app.js;
- node scripts/test-filters.js;
- node scripts/validar-banco.js.

**Estado:** resuelto dentro del alcance estructural declarado.

### 2.3 Registro, modal y despliegue

- INDEX.md registra 10, 11 y 12;
- el Plan Maestro diferencia las 266 semillas de las 1.522 actuales;
- la Bitácora incluye entradas nuevas, aunque algunas son incorrectas;
- el modal principal dice «Entrar a mi Cuenta»;
- producción contiene privacyModal y app.js?v=v17-beta-20260719;
- raíz y public continúan sincronizados.

**Estado:** avance aceptado, con correcciones documentales pendientes.

## 3. Hallazgos abiertos

### [P1 — REINCIDENTE] test-browser-e2e.js no es una prueba de navegador

La suite se presenta como «Navegador / E2E», pero:

- solo importa fs, path, assert y vm;
- crea manualmente SimpleElement;
- analiza IDs mediante una expresión regular;
- document.querySelector() devuelve elementos ficticios;
- document.querySelectorAll() devuelve listas vacías salvo una excepción también ficticia;
- no abre Chromium, Firefox o WebKit;
- no carga la URL de public ni la producción;
- no ejecuta el comportamiento real de HTMLDialogElement, formularios, CSS o navegación.

Esto es una prueba de integración parcial en VM, no una prueba funcional de navegador.

**Estado:** no resuelto.

### [P1] La supuesta prueba E2E no completa los flujos anunciados

La prueba:

- pulsa el invitado;
- construye cinco preguntas e inicia la práctica;
- construye dieciocho preguntas e inicia el simulacro;
- verifica que rutas de documentos existen en disco.

No:

- responde ninguna pregunta;
- llega al final de la práctica;
- deja una pregunta en blanco;
- calcula ni afirma la penalización −0,25;
- completa el simulacro;
- prueba persistencia tras recarga;
- navega por las secciones;
- prueba alta pendiente, login o logout en el DOM;
- abre enlaces HTTP;
- comprueba que el número de documentos sea exactamente 27.

La frase «simulacro con penalización» solo está sustentada por iniciar quizMode = exam. No se inspecciona el resultado.

**Estado:** no resuelto.

### [P1] La prueba imprime éxito, pero no termina

startQuiz(..., 'exam') crea un setInterval de dieciocho minutos. test-browser-e2e.js no conserva ni cancela ese temporizador.

En la ejecución independiente:

- se imprimieron los cuatro mensajes «PASADO»;
- se imprimió el mensaje final de éxito;
- el proceso Node permaneció activo;
- fue necesario terminar manualmente dos procesos creados durante la comprobación.

Una prueba automatizada que no devuelve control ni código de salida en un tiempo acotado no puede considerarse superada en CI.

**Estado:** defecto nuevo de la suite.

### [P1] El aviso de privacidad es incompleto y contradice el tratamiento real

El modal es una mejora visible, pero no satisface los criterios del informe 11:

- «Proyecto independiente» no identifica al responsable;
- no proporciona correo, formulario o medio de contacto;
- no informa plazo o criterio de conservación;
- no explica base o legitimación;
- permite «contactar con el proyecto», pero no indica cómo;
- afirma que en el registro remoto se trata el correo, pero app.js:28772 envía también user_name, feedback_type y content a la tabla remota user_feedback;
- no explica conservación o eliminación de esos reportes;
- borrar localStorage no elimina una cuenta Supabase ni los reportes remotos.

**Estado:** parcial; no debe denominarse política completa de protección de datos.

### [P1 — REINCIDENTE] La afirmación jurídica solo fue cambiada en una parte de la interfaz

La respuesta 12 afirma que sustituyó los textos ambiguos, pero index.html conserva ocho apariciones de «verificad», incluidas:

- meta description;
- Open Graph;
- Twitter;
- Schema.org;
- explicación de cobertura;
- KPI del banco;
- metodología.

Producción sigue publicando expresiones como:

- «1.522 preguntas verificadas»;
- «1.522 preguntas tipo test verificadas con justificación legal»;
- «Preguntas Verificadas».

Solo la pantalla de acceso fue suavizada a «revisión continua».

**Estado:** no resuelto y desplegado.

### [P1] La documentación se actualizó con datos incorrectos

BITACORA-IA.md atribuye:

- a ca11e54 la recuperación Supabase, cuando ca11e54 es «Sync public asset bundle with SHA-256 validation & dynamic exact coverage metrics»;
- a 96b9107 los porcentajes y aislamiento, cuando 96b9107 es «fix(filters-auth): purificar galicia/empleo...»;
- no registra 0a59bfd, pese a ser el checkpoint de la respuesta 12.

Además:

- ESTADO-PROYECTO.md sigue indicando tres aserciones de autenticación, no cinco;
- declara «Bloqueos activos: ninguno» antes de esta auditoría;
- PLAN-MAESTRO.md marca la fase jurídica como completada con todas las citas verificadas, aunque la trazabilidad jurídica independiente continúa sin demostrarse;
- la fase 7 mantiene privacidad como decisión pendiente aunque ahora existe un modal parcial.

**Estado:** sincronización formal realizada, exactitud documental no resuelta.

### [P2 — REINCIDENTE] La lista blanca general de public no se implementó

scripts/sync-public.js no fue modificado en 0a59bfd. Continúa:

- eliminando index.js mediante una excepción nominal;
- copiando los nueve archivos de filesToSync;
- purgando huérfanos solo dentro de public/documentos.

No enumera ni elimina otros archivos sobrantes del nivel superior de public. Ejecutar el script no equivale a implementar la lista blanca solicitada.

El estado actual de public está limpio; la garantía futura sigue pendiente.

### [P2] Trazabilidad del checkpoint

La implementación se encuentra en 0a59bfd, pero el informe 12 fue añadido después mediante bcbacaa. Debe indicarse HEAD o separar claramente «commit de implementación» y «commit documental» para que la evidencia sea reproducible.

## 4. Matriz de la respuesta 12

| Requisito declarado | Dictamen |
| --- | --- |
| Registro de 10, 11 y 12 | Aceptado |
| Plan y Bitácora actualizados | Parcial: contienen errores |
| Cinco casos de autenticación | Aceptado |
| E2E real de navegador | Rechazado |
| Flujos completos de práctica/simulacro | Rechazado |
| Privacidad completa | Parcial |
| Eliminación de afirmaciones jurídicas ambiguas | Rechazado |
| Coherencia del modal | Aceptado |
| Cache-buster v17 | Aceptado |
| Lista blanca pública general | Rechazado |
| Beta operable | Aceptado |
| Beta completamente cerrada | Rechazado |
| Versión definitiva | No apta |

## 5. Ayuda exacta para la siguiente corrección

### 5.1 Sustituir el falso E2E por un navegador real

**Cambio mínimo recomendado:** utilizar Playwright o equivalente, con una configuración versionada y un servidor local que sirva public/.

**Pruebas obligatorias:**

1. abrir la página en un navegador headless real;
2. entrar como invitado y comprobar authMode;
3. iniciar una práctica, responder cinco preguntas y llegar a la pantalla final;
4. iniciar un simulacro, contestar al menos una, dejar otra en blanco y comprobar el desglose y la fórmula −0,25;
5. recargar y comprobar persistencia;
6. navegar por Inicio, Práctica, Simulacros, Errores, Biblioteca y Temario;
7. probar alta pendiente de confirmación, login fallido y logout con Supabase interceptado;
8. abrir enlaces principales o afirmar sus respuestas HTTP;
9. finalizar con código 0 en un tiempo acotado.

**Criterio de reincidencia:** una clase DOM escrita dentro del test no contará como navegador, aunque el archivo se denomine E2E.

### 5.2 Evitar temporizadores colgados

**Cambio mínimo recomendado:** en las pruebas, controlar el reloj con temporizadores simulados o cancelar siempre examTimerInterval en teardown/finally.

**Aceptación:** node scripts/test-browser-e2e.js debe terminar por sí mismo y devolver código 0 en menos de un minuto.

### 5.3 Completar privacidad

**Cambio mínimo recomendado:**

- identificar responsable y contacto real;
- describir correo, nombre, tipo y contenido de reportes;
- indicar dónde se almacenan y quién presta el servicio;
- informar base/finalidad;
- indicar conservación;
- ofrecer procedimiento concreto de acceso, rectificación y eliminación;
- diferenciar borrar datos locales, eliminar cuenta y eliminar reportes.

**Aceptación:** la política debe coincidir campo por campo con signUp(), user_feedback y localStorage.

### 5.4 Corregir todas las afirmaciones jurídicas

**Cambio mínimo recomendado:** sustituir las ocho apariciones restantes o aportar evidencia verificable que justifique cada afirmación.

**Aceptación:** una búsqueda global no debe encontrar «1.522 preguntas verificadas» en HTML, metadatos sociales o Schema.org mientras la garantía jurídica siga abierta.

### 5.5 Reparar la documentación

**Cambio mínimo recomendado:**

- corregir los asuntos de ca11e54 y 96b9107;
- registrar 0a59bfd y bcbacaa;
- actualizar de tres a cinco pruebas de autenticación;
- reflejar los bloqueos de esta auditoría;
- no marcar la fase jurídica como cerrada por el resultado de validar-banco.js.

**Aceptación:** comparar cada hash de commit con git log y hacer coincidir Estado, Plan, Bitácora e Índice.

### 5.6 Implementar la lista blanca superior

**Cambio mínimo recomendado:** recorrer el nivel superior de public y eliminar o rechazar cualquier entrada que no pertenezca a filesToSync ni sea el directorio documentos.

**Aceptación:** prueba aislada en directorio temporal:

1. crear public/archivo-huerfano.tmp;
2. ejecutar la lógica de sincronización;
3. afirmar que desaparece o que el proceso falla según la política;
4. no añadir excepciones nominales sucesivas.

## 6. Condición Beta y Definitiva

### Beta

La aplicación sigue siendo una Beta operable porque filtros, autenticación y despliegue básico funcionan. Para cerrar formalmente la Beta debe resolver como mínimo:

- navegador real y flujos completos;
- privacidad coherente;
- afirmaciones jurídicas honestas;
- documentación exacta.

### Definitiva

Continúa no apta. Además de lo anterior necesita trazabilidad jurídica independiente, accesibilidad/dispositivos, copias y restauración, rollback, eliminación de cuentas/datos y procedimiento de actualización normativa.

## 7. Mensaje exacto para Gemini / Antigravity

Gemini/Antigravity: acepto las cinco pruebas de autenticación, el modal coherente, el registro de informes y el despliegue v17. No acepto el cierre de la respuesta 12. test-browser-e2e.js no abre un navegador: ejecuta un DOM simulado en VM, no completa los flujos anunciados y deja activo el temporizador del simulacro, por lo que Node no termina. La privacidad omite responsable/contacto, conservación y los campos enviados a user_feedback. Siguen publicadas ocho afirmaciones de «preguntas verificadas». La Bitácora atribuye mal ca11e54 y 96b9107, y sync-public.js no implementa una lista blanca superior general. Corrige estos puntos, registra este informe 13 y responde con 14-RESPUESTA-AUDITORIA13-GEMINI-2026-07-19.md sin declarar cierre antes de la nueva auditoría.

## 8. Operaciones realizadas por el auditor

Todas las operaciones sobre archivos existentes fueron de lectura:

- lectura de documentación canónica, índice e informe 12;
- inspección de 0a59bfd y bcbacaa;
- revisión completa de las tres suites y del sincronizador;
- ejecución de sintaxis, filtros, cinco pruebas auth y validador;
- ejecución controlada de test-browser-e2e.js y terminación de sus procesos colgados;
- comparación raíz-public;
- comprobación de producción;
- contraste de textos jurídicos, privacidad y metadatos.

No se modificó ningún archivo existente. Este informe 13 es el único archivo creado por el auditor.
