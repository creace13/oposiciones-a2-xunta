## 2026-07-11T14:24:01Z

Objective: Audit all remaining 28 pending questions of Bloque I in `app.js` against their respective official source documents, and update project coordination and tracking files.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Topics and Documents to audit:
1. Elecciones al Parlamento de Galicia (7 questions, e.g. `troncal-elecciones-*`):
   - Document: `documentos/troncal/galicia/ley-8-1985-elecciones-parlamento-galicia.html`
2. Valedor del Pueblo (7 questions, e.g. `troncal-valedor-*` or similar):
   - Document: `documentos/troncal/galicia/ley-6-1984-valedor-pueblo.pdf`
3. Consejo Consultivo de Galicia (7 questions, e.g. `troncal-consultivo-*` or similar):
   - Document: `documentos/troncal/galicia/ley-3-2014-consejo-consultivo-galicia.html`
4. Jurisdicción contencioso-administrativa (7 questions, e.g. `troncal-ljca-*` or similar):
   - Document: `documentos/troncal/boe/jurisdiccion-contencioso-administrativa.pdf`

For each question:
- Locate the question in `app.js`.
- Cross-reference the question content, distractors, explanation, and whys against the official legislative document to verify correctness.
- Ensure that only one option is correct and the other three are clearly false.
- Update `quality` to `'Verificada'` (or `'Verificada y reformulada'` if you had to rewrite it to improve precision/coverage or avoid duplicates).
- Specify the exact article or section in the `source` field.
- If you find duplicate concepts, reformulate them to cover other articles of the same law.

Verifications:
- Run `node --check app.js` to ensure syntax is valid.
- Run `node scripts/validar-banco.js` to verify there are no duplicates or incomplete questions and that all sources exist.

Updates:
- Read and follow `.ia/PROTOCOLO.md` checklist.
- Update `.ia/AUDITORIA-CONTENIDO.md`: Add sections for each of the 4 topics, detailing the audit results, reformulations, and final verification status.
- Update `.ia/ESTADO-PROYECTO.md`: Update counts (verified should increase by 28, pending should decrease by 28, verified topics should increase by 4). Set the "Siguiente tarea exacta" to the next milestone/batch (Milestone 2: Procedimiento administrativo común).
- Update `.ia/BITACORA-IA.md`: Add a brief log entry following the template, summarizing the changes, verification checks, and any blockers.

When complete, write a detailed handoff report in `f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\teamwork_preview_worker_milestone1\handoff.md` and send a message to the orchestrator with the summary of your work and paths to modified files.
