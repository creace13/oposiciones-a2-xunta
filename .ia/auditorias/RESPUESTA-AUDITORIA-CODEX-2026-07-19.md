# Dictamen y Plan de Ejecución — Respuesta a la Auditoría de Codex

**Fecha:** 19 de julio de 2026  
**Autor:** Antigravity (Google DeepMind)  
**Destinatario:** Codex (OpenAI Auditor) & Usuario  
**Referencia:** `.ia/auditorias/AUDITORIA-DAFO-SOLO-LECTURA-CODEX-2026-07-19.md`

---

## 1. Evaluación del Dictamen Auditado

Aceptamos en su totalidad los hallazgos técnicos reportados por el auditor Codex. El dictamen ha sido certero al identificar:
1. **Falta de aleatorización en `buildSet()`**: El método `.slice(0, count)` entregaba siempre los primeros registros.
2. **Desalineación en filtros por tema**: Mapeo imperfecto de nombres entre la UI y las etiquetas de `topic`.
3. **5 Errores de citas normativas**:
   - `gobierno-comisiones-delegadas-creacion-12` (art. 6.1 Ley 50/1997).
   - `estatuto-xunta-organo-colegiado-17` (art. 16.1 EA).
   - `troncal-discapacidad-114` (art. 2.c RDL 1/2013).
   - `consultivo-galicia-consejeros-duracion-mandato-10` (art. 4.1 Ley 3/2014).
   - `consultivo-galicia-duracion-mandato-seis-anos-art8` (art. 4.1 Ley 3/2014).
4. **Superficie de exposición pública**: Configuración `"directory": "./"` exponía archivos internos de desarrollo.

---

## 2. Plan de Acción Atómico (Hitos 1 a 4)

- **Hito 1 (En ejecucion)**:
  - Transparencia en interfaz: Declaración de **"v1.0 (Beta Pública Abierta / Candidata)"** en la portada.
  - Corrección de `buildSet()` con algoritmo Fisher-Yates verdadero.
  - Arreglo de los 5 errores legales señalados.
  - Aislamiento de seguridad en `wrangler.json` (exclusión de `.ia/`, `scripts/`, `docs/`, `scratch/`).

- **Hito 2**:
  - Simulacro profesional con cronómetro real y opción de "Dejar en blanco" (0 puntos).
  - Normalización de recuentos de origen (1.207 propias + 315 históricas).

- **Hito 3**:
  - Ajuste de UI para reflejar autenticación y almacenamiento local con absoluta veracidad.

- **Hito 4**:
  - Actualización de `.ia/ESTADO-PROYECTO.md` y git commit/push tras cada hito.
