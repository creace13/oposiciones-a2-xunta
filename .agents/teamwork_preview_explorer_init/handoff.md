# Handoff Report — teamwork_preview_explorer_init

This handoff report summarizes the findings of the initial exploration and mapping task for the opposition app questions and documents database.

## 1. Observation

*   **Parsed File:** \`app.js\` (from line 1 to 2000 containing the question bank).
*   **Document Files:** Checked presence of files in \`documentos/\`, \`documentos/troncal/boe/\`, \`documentos/troncal/galicia/\`, and \`documentos/historicos/\`.
*   **Total Questions:** 266 questions parsed.
*   **Verified Questions:** 48 questions (quality starts with 'Verificada').
    *   *Examples:* \`id: 'galicia-1'\` (quality: 'Verificada · convocatoria...'), \`id: 'troncal-constitucion-01'\` (quality: 'Verificada · BOE...').
*   **Pending Questions:** 218 questions (quality does not start with 'Verificada' or is empty).
    *   *Examples:* \`id: 'procedimiento-1'\` (no quality), \`id: 'historico-2025-01'\` (quality: 'Histórica oficial...').
*   **Topic Coverage Mapping:** The application maps questions using helper function \`coverageTopic(question)\` to 23 syllabus topics (Targets: 30 questions each for Bloque I, 70 questions each for Bloque II).
*   **Legislative Documents:** All 23 syllabus topics correspond to physical PDF/HTML files in \`documentos/\`.
    *   *Verification:* Absolute path existence verified via Node.js \`fs.existsSync()\` (all returned \`true\`).

## 2. Logic Chain

1.  **Verification Criteria:** A question is classified as verified if its \`quality\` property starts with "Verificada". Out of 266 total questions, 48 satisfy this condition.
2.  **Syllabus Topic Resolution:** Applying the \`coverageTopic(question)\` mapping function from \`app.js\` dynamically categorizes all 266 questions into 23 syllabus target IDs.
3.  **Divide by Block:**
    *   **Bloque I (Institutional & Organization):** Contains 80 questions. The first 6 topics (\`g1-01\` to \`g1-06\`) are fully verified (48 questions). The remaining 4 topics (\`g1-07\` to \`g1-10\`) have exactly 7 pending questions each (28 total pending).
    *   **Bloque II (Procedural & Public Employment):** Contains 186 questions. All 13 topics (\`g2-11\` to \`g2-23\`) are 100% pending (186 total pending).
    *   *Note:* The 5 historical questions (topic "Histórico oficial 2025") map to \`g2-12\` (Procedimiento administrativo común) because their source contains \`ley 39/2015\`.
4.  **Document Integrity:** Every target ID's associated document path from \`officialSources\` (mapped in the script) is present on the disk, meaning the legislative reference files are complete.

## 3. Caveats

*   **Historial Exams:** The directory \`documentos/historicos/\` contains multiple PDF files of actual past exams (2024 Funcionarización, 2024 Promoción Específica, 2025 Promoción Específica). Currently, only 5 questions from the 2025 exam have been imported into the application's question bank.
*   **Expansion Target Gap:** The syllabus target coverage is 30 questions/topic for Bloque I and 70 questions/topic for Bloque II. The current question count is far below these targets (e.g. Bloque I has 7-12 questions per topic; Bloque II has 14-22 questions per topic).

## 4. Conclusion

The application has a structurally sound database mapping, but only **18.05%** of the questions are currently verified. The remaining **81.95%** (218 questions) are pending verification.

We have proposed a **5-Milestone Batching Strategy** to verify the pending questions against the corresponding official documents:
1.  **Milestone 1:** Complete Bloque I Verification (28 questions across 4 topics).
2.  **Milestone 2:** Core Procedural & Administrative Law (50 questions across 3 topics).
3.  **Milestone 3:** Patrimony, Finance and Grants (42 questions across 3 topics).
4.  **Milestone 4:** Contracts and Public Employment (42 questions across 3 topics).
5.  **Milestone 5:** Transversal Policies & Ethical Frameworks (56 questions across 4 topics).

## 5. Verification Method

*   To verify the counts and analysis:
    1.  Inspect \`analysis.md\` in this directory to view the detailed breakdown tables.
    2.  Check the mappings in \`app.js\` (\`coverageTargets\` and \`coverageTopic\`).
