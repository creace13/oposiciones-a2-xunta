## 2026-07-11T14:55:55Z
Objective: Audit all 50 pending questions of Milestone 2 in `app.js` against their respective official source documents, and update project coordination and tracking files.

Topics and Documents to audit:
1. Procedimiento administrativo común (22 questions, including the 5 historical exam questions):
   - Document: `documentos/troncal/boe/ley-39-2015-procedimiento-administrativo.pdf`
2. Régimen jurídico del sector público (14 questions):
   - Document: `documentos/troncal/boe/ley-40-2015-regimen-juridico.pdf`
3. Organización y sector público autonómico (14 questions):
   - Document: `documentos/troncal/galicia/ley-16-2010-organizacion-xunta.html`

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
- Update `.ia/AUDITORIA-CONTENIDO.md`: Add sections for each of the 3 topics, detailing the audit results, reformulations, and final verification status.
- Update `.ia/ESTADO-PROYECTO.md`: Update counts (verified should increase by 50, pending should decrease by 50, verified topics should increase by 3). Set the "Siguiente tarea exacta" to the next milestone/batch (Milestone 3: Patrimonio de Galicia, Régimen financiero, Subvenciones).
- Update `.ia/BITACORA-IA.md`: Add a brief log entry following the template, summarizing the changes, verification checks, and any blockers.

When complete, write a detailed handoff report in `f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\teamwork_preview_worker_milestone2\handoff.md` and send a message to the orchestrator with the summary of your work and paths to modified files.
