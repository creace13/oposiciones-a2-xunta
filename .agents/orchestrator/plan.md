# Plan — 2026-07-11T16:21:33+02:00

## Decomposition Strategy

The main objective is to audit 218 pending questions in `app.js` out of 266 total questions. 48 questions have already been audited.
We will execute this in a series of planned milestones:

1. **Milestone 0: Exploration and Mapping**:
   - Spawn an Explorer to parse `app.js` and classify all 218 pending questions by topic/norm.
   - Validate that each topic has a corresponding official document in `documentos/`.
   - Resolve any missing sources (e.g., if there are questions about topics with missing or un-consolidated documents).

2. **Milestone 1: Elecciones al Parlamento de Galicia**:
   - Audit the 6 questions of `troncal-elecciones` against `documentos/troncal/galicia/ley-8-1985-elecciones-parlamento-galicia.html`.

3. **Milestone 2+: Sequential Topic Audits**:
   - Group remaining questions into logical batches of size ~15-25 questions to avoid massive single edits and ensure quality control.
   - For each batch, spawn a worker to:
     - Verify questions against the relevant law PDF/HTML.
     - Update `app.js` with quality: `'Verificada'` or `'Verificada y reformulada'`.
     - Update `.ia/AUDITORIA-CONTENIDO.md`, `.ia/ESTADO-PROYECTO.md`, and `.ia/BITACORA-IA.md`.
     - Run validation scripts: `node --check app.js` and `node scripts/validar-banco.js`.

4. **Milestone Final: Validation and Verification**:
   - Run the final validation checks (`node scripts/validar-banco.js` must print `RESULTADO: OK`).
   - Claim victory to the Sentinel.
