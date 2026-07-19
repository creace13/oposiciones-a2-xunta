## 2026-07-11T15:05:54Z
Objective: Audit all 42 pending questions of Milestone 4 in `app.js` against their respective official source documents, and update project coordination and tracking files.

Topics and Documents to audit:
1. Contratos del sector público (14 questions):
   - Document: `documentos/troncal/boe/ley-9-2017-contratos-sector-publico.pdf`
2. TREBEP (14 questions):
   - Document: `documentos/troncal/boe/trebep-rdl-5-2015.pdf`
3. Empleo público de Galicia (14 questions):
   - Document: `documentos/troncal/galicia/ley-2-2015-empleo-publico-galicia.html`

For each question in Milestone 4:
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
- Update `.ia/AUDITORIA-CONTENIDO.md`: Add sections for each of the 3 topics, detailing the audit results, reformulations, and final verification status.
- Update `.ia/ESTADO-PROYECTO.md`: Update counts (verified should increase by 42, pending should decrease by 42, verified topics should increase by 3). Set the "Siguiente tarea exacta" to the next milestone/batch (Milestone 5: Incompatibilidades, Igualdad, Discapacidad, Transparencia).
- Update `.ia/BITACORA-IA.md`: Add a brief log entry following the template, summarizing the changes, verification checks, and any blockers.

When complete, write a detailed handoff report in `f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\teamwork_preview_worker_milestone4\handoff.md` and send a message to the orchestrator with the summary of your work and paths to modified files.
