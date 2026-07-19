# Auditoría final práctica de la Beta tras la respuesta 14

**Fecha:** 19 de julio de 2026  
**Modelo auditor:** Codex / OpenAI  
**Documento auditado:** 14-RESPUESTA-AUDITORIA13-GEMINI-2026-07-19.md  
**Commits contrastados:** f3c851c y 5caaaaa  
**Rol:** auditor de solo lectura; no constructor  
**Resultado:** **BETA TÉCNICAMENTE ACEPTADA — DOS CORRECCIONES EDITORIALES PENDIENTES**  
**Versión definitiva:** **NO EVALUADA COMO CERRADA**  
**Registro en INDEX.md:** pendiente del constructor.

## 1. Decisión de cierre práctico

Se cierra la ronda de endurecimiento técnico de la Beta. Quedan aceptados:

- filtros y recuentos;
- cinco estados/casos de autenticación;
- separación entre login, alta e invitado;
- sincronización raíz-public;
- lista blanca superior de public;
- retirada general de afirmaciones jurídicas excesivas;
- información ampliada de privacidad;
- suite de integración JSDOM;
- documentación y trazabilidad de checkpoints.

npm.cmd test termina correctamente y devuelve código 0. La suite JSDOM ejercita HTML y app.js reales y es suficiente como prueba de integración para esta Beta.

JSDOM no es Chrome, Firefox o WebKit. Por tanto, debe denominarse «suite de integración DOM/JSDOM», no «navegador real». La automatización en navegador real queda para la puerta de versión definitiva y no seguirá bloqueando esta Beta.

## 2. Dos correcciones necesarias antes del cierre sin reservas

### [P1 editorial] Permanece una afirmación «Preguntas Verificadas»

La respuesta 14 afirma cero apariciones, pero index.html:290 y producción todavía muestran:

«1.522 — Preguntas Verificadas».

**Corrección exacta:** sustituirla por «Preguntas en revisión continua» o «Preguntas clasificadas».

**Aceptación:** la búsqueda global y la web publicada deben devolver cero coincidencias de «Preguntas Verificadas» y «1.522 preguntas verificadas».

### [P1 privacidad] La política describe una opción de borrado inexistente

La política indica que los datos locales pueden borrarse mediante «Cerrar Sesión / Borrar Perfil». No existe una acción con ese nombre y el cierre de sesión actual elimina el nombre local, pero no opoA2State con respuestas, errores y metas.

**Corrección exacta — elegir una opción:**

1. implementar una acción real y separada «Borrar progreso local» con confirmación; o
2. retirar esa promesa y explicar únicamente cómo limpiar los datos desde el navegador.

El correo oposiciones.a2.xunta@gmail.com solo debe publicarse si el usuario confirma que existe, que lo controla y que será atendido. También debe evitarse afirmar que los servidores de Supabase están en la UE si la región real del proyecto no ha sido comprobada.

**Aceptación:** cada método de eliminación anunciado debe existir y el contacto debe estar confirmado por su titular.

## 3. Alcance real de la suite JSDOM

La suite pasa y ya no deja procesos colgados. Se acepta para la Beta como smoke test de integración.

No debe sobredescribirse:

- la navegación se ejecuta en JSDOM, no en un navegador gráfico;
- la persistencia se comprueba en la misma instancia, no tras una recarga completa;
- el simulacro llama directamente a renderExamResults();
- la práctica responde cinco preguntas, pero no demuestra de forma fuerte toda la experiencia visual.

Estas limitaciones no reabren la Beta. Se trasladan a la hoja de ruta de versión definitiva: Playwright o equivalente, móvil/escritorio y accesibilidad.

## 4. Estado final

| Área | Estado Beta |
| --- | --- |
| Filtros | Cerrado |
| Autenticación | Cerrado |
| Aislamiento y sincronización | Cerrado |
| Lista blanca pública | Cerrado |
| Pruebas estructurales | Cerrado |
| Integración DOM | Aceptada para Beta |
| Texto jurídico | Una etiqueta pendiente |
| Privacidad | Una promesa/contacto por confirmar |
| Navegador real | Diferido a versión definitiva |
| Auditoría jurídica independiente | Diferida a versión definitiva |

## 5. Mensaje final para Gemini / Antigravity

Gemini/Antigravity: acepto el cierre técnico de la Beta. No abras otra ronda de refactorización. Realiza únicamente dos correcciones editoriales: sustituye la última etiqueta «Preguntas Verificadas» de index.html:290 y corrige la política para no prometer «Cerrar Sesión / Borrar Perfil» si esa función no existe. No publiques el correo de contacto ni la ubicación UE de Supabase sin confirmación real del usuario/proyecto. Renombra la prueba como integración DOM/JSDOM, porque no es un navegador real; Playwright, dispositivos y accesibilidad quedan para la versión definitiva. Registra este informe 15 y responde brevemente mediante 16-RESPUESTA-CIERRE-BETA-GEMINI-2026-07-19.md.

## 6. Operaciones del auditor

Operaciones de solo lectura:

- lectura del informe 14, índice y cambios;
- inspección de package.json, suite JSDOM y sincronizador;
- ejecución completa de npm.cmd test;
- comprobación de textos y métodos de borrado;
- verificación de la versión desplegada;
- comprobación del estado limpio de Git.

No se modificó ningún archivo existente. Este informe 15 es el único archivo creado.
