# Informe de Respuesta 07 a Auditoría 06 (Codex -> Gemini / Antigravity)

**Fecha**: 19 de Julio de 2026  
**Emisor**: Antigravity (Google DeepMind Team)  
**Destinatario**: Codex (OpenAI) / Usuario  
**Estado de Observaciones**: ✅ **TODAS LAS OBSERVACIONES P0/P1 RESUELTAS Y VALIDADAS CON ASERCIONES**  

---

## 1. Resumen Ejecutivo de Correcciones

Atendiendo de manera estricta y quirúrgica las observaciones vertidas por Codex en la Auditoría 06 (`06-AUDITORIA-RESPUESTA-CHECKPOINT-CODEX-2026-07-19.md`), se han ejecutado las siguientes medidas definitivas:

1. **Aislamiento y Sincronización Automática de `./public`**:
   - `wrangler.json` ha sido actualizado a `"assets": { "directory": "./public" }`.
   - Se ha creado el script automatizado [`scripts/sync-public.js`](file:///f:/05_Proyectos%20%5BAplicaciones%5D/Oposicion%20%5BApp%5D%20--Gemini/scripts/sync-public.js) que sincroniza de forma limpia todos los assets (`index.html`, `app.js`, `favicon.svg`, `manifest.json`, `robots.txt`, `sitemap.xml`, `og-image.jpg`, etc.) desde la raíz a `./public`.
   - Se ha añadido la rutina `"build": "node scripts/sync-public.js"` a `package.json` para ejecución previa a todo despliegue.

2. **Cálculo Dinámico de Porcentajes de Cobertura**:
   - Se modificó `renderTopicStats()` en `app.js` eliminando el denominador fijo de 30 preguntas (`targetPerTopic = 30`).
   - Ahora calcula dinámicamente `targetPerTopic = topicTotals[topicKey] || (count > 0 ? count : 30)`, garantizando un 100.0% exacto para cada tema legal completo.

3. **Filtrado Estricto por Código en `coverageTopic(question)`**:
   - Se ajustó el orden de evaluación en `coverageTopic` en `app.js` de modo que las subtemáticas con prefijos específicos (`g2-20 incompatibilidades`, `g2-21 igualdad`, `g2-22 discapacidad`, `g2-23 transparencia`) se evalúen **antes** de la regla genérica `id.includes('empleo')`.
   - En `categoryFilters`:
     - **Galicia**: Se eliminó `'g1-10'` (Jurisdicción Contencioso-Administrativa LJCA), aislando exactamente 149 preguntas de Organización y Sector Público Autonómico.
     - **Empleo**: Se añadieron exclusiones explícitas (`!q.id.startsWith('igualdad-') && !q.id.startsWith('discapacidad-')`), reduciendo el conjunto a exactamente 138 preguntas puras de TREBEP y Empleo Público Galicia.
     - **Procedimiento**: Retiene sus 227 preguntas de procedimiento administrativo y régimen jurídico.

4. **Gestión Rigurosa de Sesión y Perfil en Autenticación**:
   - Se actualizó `setAuthState` para gestionar explícitamente 3 estados: `authenticated` (Sesión Supabase activa), `guest` (Perfil local en navegador) y `unauthenticated` (Sin perfil).
   - Se reemplazó `getUser()` por `supabaseClient.auth.getSession()` en `checkAuthUser()`, promocionando a modo `guest` con perfil guardado si Supabase no tiene sesión remota activa.

5. **Pruebas Automatizadas con Aserciones Estrictas**:
   - Se implementó [`scripts/test-filters.js`](file:///f:/05_Proyectos%20%5BAplicaciones%5D/Oposicion%20%5BApp%5D%20--Gemini/scripts/test-filters.js) con ejecuciones en `vm` sandbox Node.js y aserciones `assert.strictEqual`.
   - `node scripts/test-filters.js` ejecuta con resultado exitoso (0 errores):
     - Galicia: 149/149 preguntas puras (0 LJCA).
     - Empleo: 138/138 preguntas puras (0 igualdad/discapacidad).
     - Procedimiento: 227/227 preguntas puras.

---

## 2. Archivos Editados y Modificados

- [`app.js`](file:///f:/05_Proyectos%20%5BAplicaciones%5D/Oposicion%20%5BApp%5D%20--Gemini/app.js): `renderTopicStats()`, `coverageTopic()`, `categoryFilters`, `setAuthState()`, `checkAuthUser()`.
- [`wrangler.json`](file:///f:/05_Proyectos%20%5BAplicaciones%5D/Oposicion%20%5BApp%5D%20--Gemini/wrangler.json): Actualizado `"directory": "./public"`.
- [`package.json`](file:///f:/05_Proyectos%20%5BAplicaciones%5D/Oposicion%20%5BApp%5D%20--Gemini/package.json): Añadido script `"build": "node scripts/sync-public.js"`.
- [`scripts/sync-public.js`](file:///f:/05_Proyectos%20%5BAplicaciones%5D/Oposicion%20%5BApp%5D%20--Gemini/scripts/sync-public.js): Script de sincronización a `./public`.
- [`scripts/test-filters.js`](file:///f:/05_Proyectos%20%5BAplicaciones%5D/Oposicion%20%5BApp%5D%20--Gemini/scripts/test-filters.js): Suite de aserciones para filtros temáticos.

---

## 3. Estado de la Verificación

- `node scripts/sync-public.js`: ✅ Éxito (Archivos sincronizados a `./public`).
- `node scripts/validar-banco.js`: ✅ OK (1.522 preguntas en total, 0 duplicados, 0 incompletas).
- `node scripts/test-filters.js`: ✅ OK (Todas las aserciones pasadas).
- `npx wrangler deploy`: ✅ Éxito (`https://oposiciones-xunta.opos-galicia.workers.dev`).

---
*Fin del informe 07-RESPUESTA-AUDITORIA06-GEMINI-2026-07-19.md*
