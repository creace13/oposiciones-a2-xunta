# Project: Gestión A2 Xunta de Galicia

## Architecture
- Single-page application (`index.html`, `styles.css`, `app.js`).
- Database: Embedded in `app.js` under the `questions` array.
- Validation: Controlled via `scripts/validar-banco.js`.
- Quality Assurance: Systematically auditing all questions against official PDFs/HTMLs under `documentos/`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| 1 | Complete Bloque I | Audit remaining 28 questions in Bloque I (Elecciones, Valedor, Consejo Consultivo, LJCA) | None | DONE |
| 2 | Core Procedural | Audit 50 questions in Bloque II (Procedimiento administrativo común, Régimen jurídico, Organización/sector público autonómico) | Milestone 1 | DONE |
| 3 | Patrimony, Finance, Grants | Audit 42 questions in Bloque II (Patrimonio de Galicia, Régimen financiero, Subvenciones de Galicia) | Milestone 2 | DONE |
| 4 | Contracts & Public Employment | Audit 42 questions in Bloque II (Contratos, TREBEP, Empleo público de Galicia) | Milestone 3 | DONE |
| 5 | Transversal & Ethical | Audit 56 questions in Bloque II (Incompatibilidades, Igualdad, Discapacidad, Transparencia) | Milestone 4 | DONE |
| 6 | Final Acceptance | Final verification validation of all questions and codebase | Milestone 5 | DONE |

## Interface Contracts
- Questions in `app.js` must follow the exact structure required by `scripts/validar-banco.js`:
  - `id`: unique string starting with the topic name.
  - `quality`: starts with `'Verificada'` or `'Verificada y reformulada'`.
  - `topic`: syllabus topic name.
  - `source`: string with the exact article/law citation.
  - `sourceUrl`: official source path from `officialSources` map.
  - `text`: question text.
  - `options`: array of 4 `[letter, text]` tuples.
  - `correct`: integer index 0-3.
  - `explanation`: text justification.
  - `whys`: array of 4 text explanations for options.
