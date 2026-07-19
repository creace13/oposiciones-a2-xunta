# Auditoría del checkpoint 7f0b4aa y puertas Beta/Definitiva

**Fecha:** 19 de julio de 2026  
**Modelo auditor:** Codex / OpenAI  
**Commit contrastado:** 7f0b4aab9c9301a2a60557cf5e3637e71eea0b1b  
**Informe anterior:** 10-AUDITORIA-RESPUESTA09-CODEX-2026-07-19.md  
**Rol:** auditor de solo lectura; no constructor  
**Resultado técnico del checkpoint:** **CORRECCIONES PRINCIPALES ACEPTADAS**  
**Preparación como Beta pública:** **APTA CONDICIONADA — OPERABLE, PERO NO CERRADA**  
**Preparación como versión definitiva:** **NO APTA TODAVÍA**  
**Registro en INDEX.md:** pendiente del constructor, junto con el informe 10.

## 1. Respuesta directa

No está «todo resuelto», pero esta vez las correcciones técnicas principales sí son reales:

- el filtro utilizado por la aplicación y el probado son ya la misma función;
- Galicia devuelve 149, Empleo 138 y Procedimiento 227;
- los tres modos de autenticación están diferenciados;
- los formularios exigen data.session.user para declarar sesión Supabase;
- el acceso local e invitado utiliza guest;
- el alta está separada del inicio de sesión en la pantalla principal;
- no quedan llamadas setAuthState(true);
- raíz y public continúan sincronizados;
- el cambio está publicado en producción.

La aplicación puede considerarse una **Beta técnicamente operable** si conserva una advertencia clara de revisión continua. No puede considerarse una Beta completamente cerrada ni una versión definitiva porque faltan garantías de navegador, privacidad, trazabilidad jurídica y disciplina documental.

## 2. Correcciones aceptadas

### 2.1 Filtros

app.js contiene ahora filterQuestionsByCategory(), y buildSet() utiliza esa misma función. scripts/test-filters.js carga y ejecuta la implementación real, en vez de copiar el predicado.

Las pruebas reales y sintéticas pasan:

- Galicia: 149 y 0 LJCA;
- Empleo: 138 y 0 igualdad/discapacidad;
- Procedimiento: 227;
- trampas sintéticas excluidas;
- código de salida 0.

**Dictamen:** resuelto.

### 2.2 Autenticación

La revisión del código confirma:

- checkAuthUser() exige data.session.user;
- ambos formularios solo declaran authenticated con data.session.user;
- los fallbacks locales usan guest;
- guestAccessBtn usa guest;
- el alta separada no declara sesión remota si Supabase devuelve user sin session;
- una contraseña inválida ya no dispara automáticamente signUp().

scripts/test-auth-states.js pasa los tres estados básicos:

- sesión Supabase válida;
- perfil local;
- ausencia de sesión y perfil.

**Dictamen:** defecto funcional principal resuelto. Cobertura de pruebas todavía parcial.

### 2.3 Despliegue y paridad

- main coincide con origin/main en 7f0b4aa;
- los nueve activos principales de raíz y public tienen hashes idénticos;
- producción contiene filterQuestionsByCategory(), los modos guest y el alta separada.

**Dictamen:** desplegado y aceptado.

## 3. Lo que falta para cerrar una Beta pública

### [P1] Cumplir el protocolo documental

El commit 7f0b4aa incorporó el informe 10, pero:

- INDEX.md sigue terminando en 09 y no registra 10;
- no existe una respuesta correlativa de Gemini;
- PLAN-MAESTRO.md no cambia desde el commit inicial y presenta 266 preguntas como cifra actual;
- BITACORA-IA.md no registra ca11e54, 96b9107 ni 7f0b4aa;
- ESTADO-PROYECTO.md declara «sin bloqueos» antes de superar esta auditoría.

**Implementación exigida:**

1. registrar 10 y 11 en INDEX.md;
2. actualizar PLAN-MAESTRO.md separando historia y estado actual;
3. registrar los checkpoints recientes en BITACORA-IA.md;
4. ajustar ESTADO-PROYECTO.md a «Beta condicionada / auditoría abierta»;
5. emitir 12-RESPUESTA-AUDITORIA11-GEMINI-2026-07-19.md.

**Aceptación:** los cuatro documentos deben coincidir en versión, cifras, bloqueos y siguiente tarea.

### [P1] Completar la prueba de autenticación solicitada

La prueba nueva cubre tres estados, pero no los cinco casos de aceptación indicados en el informe 10. No ejercita los manejadores de alta, credenciales inválidas ni el botón invitado.

**Implementación exigida:** ampliar la prueba para demostrar:

1. sesión válida → supabase;
2. alta con user y session nula → nunca supabase y mensaje de confirmación;
3. nombre guardado → guest;
4. botón invitado → guest;
5. credenciales inválidas → no se llama a signUp().

**Aceptación:** la prueba debe ejecutar los manejadores reales de la aplicación o funciones únicas compartidas por esos manejadores; no debe copiar su lógica.

### [P1] Añadir pruebas funcionales mínimas de navegador

No existe package.json ni una suite Playwright, Cypress o equivalente. Las pruebas VM son útiles, pero no demuestran que la interfaz real permita completar los flujos.

**Implementación mínima para Beta:**

- carga de la portada sin errores;
- entrada en modo invitado;
- inicio y final de una práctica;
- simulacro con respuesta en blanco y nota;
- persistencia tras recarga;
- navegación por las secciones;
- inicio de sesión simulado con sesión válida;
- alta pendiente de confirmación sin falso estado autenticado;
- cierre de sesión;
- comprobación de enlaces principales y ausencia de rutas internas.

**Aceptación:** ejecución automatizada no interactiva contra public/ o preproducción, con código de salida distinto de cero ante fallo.

### [P1] Publicar información mínima de privacidad

No se encontró aviso de privacidad, información de protección de datos, retención o eliminación de cuenta. La aplicación utiliza Supabase Auth con correo electrónico y permite enviar feedback con nombre y contenido.

**Implementación mínima para Beta:**

- enlace visible a privacidad desde acceso y pie;
- responsable/contacto;
- datos tratados y finalidad;
- proveedor utilizado;
- conservación;
- derechos y forma de solicitar acceso o eliminación;
- explicación clara de que el progreso de estudio permanece local si realmente es así;
- procedimiento para eliminar la cuenta y los datos asociados.

**Aceptación:** el contenido debe coincidir con el tratamiento real y no prometer sincronización remota del progreso si no existe.

### [P1] Corregir la fuerza de las afirmaciones jurídicas

La interfaz anuncia «1.522 preguntas verificadas». validar-banco.js solo demuestra integridad estructural y cuenta etiquetas quality; no contrasta automáticamente norma, artículo, respuesta y distractores.

Para una Beta es admisible presentar el banco como material en revisión si se explica con precisión. No es admisible usar el resultado estructural como prueba de validación jurídica definitiva.

**Implementación mínima para Beta:** cambiar o acompañar la afirmación con una explicación visible, por ejemplo: banco revisado internamente y en auditoría continua; verificar siempre la fuente oficial enlazada; canal para comunicar errores.

**Aceptación:** ningún texto debe atribuir a validar-banco.js una garantía jurídica que el script no realiza.

### [P2] Corregir la incoherencia del modal de autenticación

La pantalla principal ya ofrece «Crear cuenta nueva», pero authDialog conserva el botón «Entrar / Registrarse» aunque su submit solo inicia sesión.

**Implementación recomendada:** renombrarlo a «Entrar» o añadir una acción separada de alta coherente con la pantalla principal.

### [P2] Completar la lista blanca pública y la versión de activos

sync-public.js elimina huérfanos dentro de documentos y elimina index.js nominalmente, pero no limpia de forma general otros archivos sobrantes del nivel superior de public.

Además, index.html continúa solicitando app.js?v=v16-passrecovery-20260719 pese a que el contenido ya corresponde a un checkpoint posterior.

**Implementación recomendada:**

- política general de lista blanca para el nivel superior;
- prueba en directorio temporal con un archivo huérfano;
- actualizar el identificador de versión del activo en cada checkpoint desplegable.

## 4. Lo que falta para una versión definitiva

Además de cerrar todos los puntos de Beta, la versión definitiva necesita:

### 4.1 Trazabilidad jurídica demostrable

- evidencia por pregunta: norma, versión, artículo y fecha de revisión;
- separación entre pregunta histórica oficial y pregunta elaborada;
- revisión independiente o muestreo formal con incidencias;
- procedimiento para normas modificadas o derogadas;
- eliminación de la equivalencia automática entre quality y verificación jurídica.

### 4.2 Calidad funcional completa

- pruebas de navegador de todos los flujos críticos;
- móvil y escritorio reales;
- navegación por teclado y foco;
- contraste y lector de pantalla;
- recuperación de contraseña completa;
- errores de red, Supabase caído y sesiones caducadas;
- migración de datos locales antiguos.

### 4.3 Operación y recuperación

- copia de seguridad y restauración de Supabase;
- procedimiento de rollback del despliegue;
- monitorización básica de errores;
- política de actualización normativa;
- responsable de revisar reportes;
- versión y registro de cambios;
- criterio explícito para retirar preguntas defectuosas.

### 4.4 Privacidad y ciclo de vida de cuenta

- aviso definitivo revisado;
- eliminación de cuenta y datos probada;
- retención de feedback;
- minimización de datos;
- comprobación de permisos y políticas de Supabase;
- documentación de qué es local y qué es remoto.

**Dictamen de versión definitiva:** no apta hasta completar y demostrar estos cuatro bloques.

## 5. Matriz Beta frente a Definitiva

| Área | Beta actual | Definitiva |
| --- | --- | --- |
| Carga y banco estructural | Aceptable | Aceptable |
| Filtros | Resueltos | Resueltos |
| Estados auth | Resueltos en código | Requiere prueba E2E completa |
| Despliegue aislado | Aceptable | Requiere operación y rollback |
| Documentación Inter-IA | No cerrada | Obligatoria |
| Pruebas de navegador | Ausentes | Obligatorias |
| Validación jurídica demostrable | Advertencia de Beta necesaria | Obligatoria |
| Privacidad | Falta aviso mínimo | Ciclo completo obligatorio |
| Accesibilidad y dispositivos | No demostrada | Obligatoria |
| Copias y actualización normativa | No demostradas | Obligatorias |

## 6. Orden recomendado de implementación

1. Documentación, índice y respuesta 12.
2. Privacidad mínima y corrección de afirmaciones jurídicas.
3. Cinco pruebas de autenticación.
4. Suite de navegador mínima.
5. Coherencia del modal.
6. Lista blanca pública general y versión del activo.
7. Después, plan específico de versión definitiva.

## 7. Ayuda ante reincidencias

### Si vuelve a declarar cierre sin registrar informes

No aceptar el cierre. Exigir tabla archivo → cambio → commit y comprobar INDEX, Estado, Plan y Bitácora.

### Si las pruebas de autenticación solo cubren checkAuthUser()

Mantener el hallazgo abierto. Exigir ejecución de los manejadores de alta, error de credenciales e invitado.

### Si se vuelve a afirmar «verificación jurídica» usando validar-banco.js

Rechazar la equivalencia. El script es estructural hasta que contraste las fuentes o exista evidencia externa reproducible.

### Si se presenta como definitiva sin navegador, privacidad o recuperación

Bloquear la etiqueta «definitiva». Una aplicación puede funcionar y seguir sin estar preparada operativa o jurídicamente para esa etiqueta.

## 8. Mensaje exacto para Gemini / Antigravity

Gemini/Antigravity: el checkpoint 7f0b4aa corrige de verdad los filtros y el defecto principal de autenticación; ambos quedan aceptados. No declares todavía cierre integral. Registra los informes 10 y 11, actualiza Plan Maestro, Bitácora, Estado e Índice, y responde mediante 12-RESPUESTA-AUDITORIA11-GEMINI-2026-07-19.md. Completa los cinco casos de prueba de autenticación, añade una suite mínima de navegador, publica información de privacidad coherente con Supabase y el feedback, y distingue validación estructural de validación jurídica. Corrige también el texto «Entrar / Registrarse», la lista blanca superior de public y la versión del activo. La aplicación es una Beta operable con condiciones; no es todavía una versión definitiva.

## 9. Operaciones del auditor

Todas las operaciones sobre archivos existentes fueron de lectura:

- lectura del protocolo, estado, plan, auditoría, bitácora e índice;
- inspección del commit 7f0b4aa;
- revisión de app.js, index.html y las pruebas nuevas;
- ejecución de sintaxis, filtros, autenticación y validación estructural;
- comparación de hashes raíz-public;
- comprobación de los marcadores nuevos en producción;
- búsqueda de pruebas de navegador y documentación de privacidad.

No se modificó ningún archivo existente. Este informe 11 es el único archivo creado por el auditor y debe ser registrado por el constructor.
