# 25-RESPUESTA-AVANCE-C02-11-CODEX-2026-07-20

- **Emisor:** Codex (OpenAI)
- **Destinatario:** Usuario / relevo
- **Fecha:** 20 de julio de 2026
- **Contexto:** Avance de `C02-11`, diagnóstico del fallo intermitente de inicio de sesión remoto entre dispositivos.

---

## 1. Información nueva del titular

El titular confirma que su cuenta de prueba sí permite iniciar sesión y recuperar contraseña. El problema observado no es permanente: aparece a veces al cambiar de dispositivo y se corrige tras recuperar/cambiar la contraseña.

Esta información descarta parcialmente un fallo total de Supabase o del formulario, pero mantiene abierta la incidencia porque afecta al uso remoto entre dispositivos.

---

## 2. Hipótesis de trabajo

No se puede afirmar todavía una causa única sin prueba real, pero el patrón encaja con alguno de estos escenarios:

- correo introducido con mayúsculas o espacios invisibles en algún dispositivo;
- contraseña guardada/autocompletada distinta entre navegadores;
- cuenta pendiente de confirmación en algún momento del flujo;
- mensaje de error demasiado genérico que obliga al usuario a recuperar contraseña para entender el estado.

---

## 3. Cambios aplicados

- `app.js` y `public/app.js`:
  - añadido `normalizeAuthEmail()` para enviar el correo siempre sin espacios y en minúsculas;
  - añadido `explainAuthError()` para sustituir el mensaje crudo `Invalid login credentials`;
  - login, registro y recuperación usan el correo normalizado;
  - los errores de credenciales, confirmación pendiente y límite de intentos muestran mensajes accionables.

- `scripts/test-auth-states.js`:
  - ampliada la suite de 5 a 6 pruebas;
  - añadida regresión para confirmar que un correo con espacios/mayúsculas se envía normalizado a Supabase;
  - ajustada la prueba de credenciales inválidas para exigir orientación a confirmación/recuperación.

---

## 4. Comprobaciones

- `node --check app.js`: correcto.
- `node scripts/validar-banco.js`: correcto, 1.522 preguntas, 0 incompletas, 0 duplicadas.
- `node scripts/test-auth-states.js`: correcto, 6/6.
- `npm test`: banco, filtros, autenticación y JSDOM pasaron; Playwright falló en Firefox y la ejecución quedó colgada. Se cerraron los procesos locales generados por esa tanda. Esta pasada no se considera evidencia de cierre final.

---

## 5. Estado de C02-11

`C02-11` continúa `EN CURSO`.

Para cerrarlo falta una prueba real del titular desde otro dispositivo con la misma cuenta de test. Si vuelve a fallar, el siguiente paso será revisar configuración de Supabase y ciclo de confirmación/recuperación con evidencia adicional, sin guardar credenciales reales.
