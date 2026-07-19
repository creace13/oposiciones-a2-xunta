# Comprehensive Question and Syllabus Analysis Report

*Prepared by: teamwork_preview_explorer*  
*Timestamp: 2026-07-11T14:22:08Z*

---

## 1. Executive Summary

This report presents a thorough analysis of the questions database defined in `app.js` and maps them against the official syllabus structure of the opposition (A2 Gestión de Galicia). 

A total of **266 questions** were parsed from `app.js`. Of these:
- **48 questions** (18.05%) are **Verified** (their `quality` starts with 'Verificada').
- **218 questions** (81.95%) are **Pending** verification.

All questions map to their corresponding syllabus topics, and all associated official legislative documents in the `documentos/` directory exist physically, confirming the integrity of the project's documentation links.

---

## 2. Question Distribution by Literal Topic (`q.topic`)

Below is the distribution based on the literal `topic` property assigned to each question object in `app.js`:

| Literal Topic (`q.topic`) | Total Questions | Verified Questions | Pending Questions | % Verified |
| :--- | :---: | :---: | :---: | :---: |
| Procedimiento administrativo | 2 | 0 | 2 | 0.0% |
| Organización de Galicia | 1 | 1 | 0 | 100.0% |
| Empleo público | 1 | 0 | 1 | 0.0% |
| Histórico oficial 2025 | 5 | 0 | 5 | 0.0% |
| Troncal estatal | 257 | 47 | 210 | 18.3% |

**Key Observation:** The literal topic `Troncal estatal` serves as a general container for 96.6% of the current questions database, which are further divided into specific syllabus topics via the `coverageTopic` helper function.

---

## 3. Question Distribution by Syllabus Topic (Syllabus Targets)

The application maps questions to **23 syllabus topics** (split into Bloque I: Institutional/Organization, and Bloque II: Administrative/Public Employment). Here is the status of each topic:

### Bloque I: Instituciones y organización básica (Target: 30 questions/topic)

| Code | Topic Title | Total | Verified | Pending | Target | Coverage % | Associated Document Path | Document Exists |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :---: |
| g1-01 | Constitución española | 12 | 12 | 0 | 30 | 40.0% | `documentos/troncal/boe/constitucion-espanola-consolidada.pdf` | ✅ Yes |
| g1-02 | Tribunal Constitucional | 7 | 7 | 0 | 30 | 23.3% | `documentos/troncal/boe/ley-organica-tribunal-constitucional.pdf` | ✅ Yes |
| g1-03 | Defensor del Pueblo | 7 | 7 | 0 | 30 | 23.3% | `documentos/troncal/boe/ley-organica-defensor-del-pueblo.pdf` | ✅ Yes |
| g1-04 | Gobierno | 7 | 7 | 0 | 30 | 23.3% | `documentos/troncal/boe/ley-del-gobierno.pdf` | ✅ Yes |
| g1-05 | Estatuto de autonomía para Galicia | 8 | 8 | 0 | 30 | 26.7% | `documentos/troncal/boe/estatuto-autonomia-galicia.pdf` | ✅ Yes |
| g1-06 | Xunta y Presidencia | 7 | 7 | 0 | 30 | 23.3% | `documentos/troncal/galicia/ley-1-1983-xunta-presidencia.pdf` | ✅ Yes |
| g1-07 | Elecciones al Parlamento de Galicia | 7 | 0 | 7 | 30 | 23.3% | `documentos/troncal/galicia/ley-8-1985-elecciones-parlamento-galicia.html` | ✅ Yes |
| g1-08 | Valedor del Pueblo | 7 | 0 | 7 | 30 | 23.3% | `documentos/troncal/galicia/ley-6-1984-valedor-pueblo.pdf` | ✅ Yes |
| g1-09 | Consejo Consultivo de Galicia | 7 | 0 | 7 | 30 | 23.3% | `documentos/troncal/galicia/ley-3-2014-consejo-consultivo-galicia.html` | ✅ Yes |
| g1-10 | Jurisdicción contencioso-administrativa | 7 | 0 | 7 | 30 | 23.3% | `documentos/troncal/boe/jurisdiccion-contencioso-administrativa.pdf` | ✅ Yes |

### Bloque II: Procedimiento, contratación y empleo público (Target: 70 questions/topic)

| Code | Topic Title | Total | Verified | Pending | Target | Coverage % | Associated Document Path | Document Exists |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: | :--- | :---: |
| g2-11 | Patrimonio de Galicia | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/galicia/ley-6-2023-patrimonio-galicia.html` | ✅ Yes |
| g2-12 | Procedimiento administrativo común | 22 | 0 | 22 | 70 | 31.4% | `documentos/troncal/boe/ley-39-2015-procedimiento-administrativo.pdf` | ✅ Yes |
| g2-13 | Régimen jurídico del sector público | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/boe/ley-40-2015-regimen-juridico.pdf` | ✅ Yes |
| g2-14 | Régimen financiero y presupuestario | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/galicia/decreto-legislativo-1-1999-regimen-financiero.html` | ✅ Yes |
| g2-15 | Subvenciones de Galicia | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/galicia/ley-9-2007-subvenciones-galicia.html` | ✅ Yes |
| g2-16 | Organización y sector público autonómico | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/galicia/ley-16-2010-organizacion-xunta.html` | ✅ Yes |
| g2-17 | Contratos del sector público | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/boe/ley-9-2017-contratos-sector-publico.pdf` | ✅ Yes |
| g2-18 | TREBEP | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/boe/trebep-rdl-5-2015.pdf` | ✅ Yes |
| g2-19 | Empleo público de Galicia | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/galicia/ley-2-2015-empleo-publico-galicia.html` | ✅ Yes |
| g2-20 | Incompatibilidades | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/boe/ley-53-1984-incompatibilidades.pdf` | ✅ Yes |
| g2-21 | Igualdad efectiva en Galicia | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/galicia/ley-7-2023-igualdad-galicia.html` | ✅ Yes |
| g2-22 | Derechos de las personas con discapacidad | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/boe/tr-lg-discapacidad-rdl-1-2013.pdf` | ✅ Yes |
| g2-23 | Transparencia y buen gobierno | 14 | 0 | 14 | 70 | 20.0% | `documentos/troncal/galicia/ley-1-2016-transparencia-galicia.html` | ✅ Yes |

---

## 4. Pending Questions Analysis

The distribution of the **218 pending questions** highlights a clear divide between the two Blocks:

1. **Bloque I (Institutional & Organization):**
   - High degree of verification. The first 6 topics (`g1-01` to `g1-06`) are **100% verified** (48/48 questions).
   - Only 4 topics remain pending: `g1-07` (Elecciones), `g1-08` (Valedor), `g1-09` (Consejo Consultivo), and `g1-10` (LJCA). Each has exactly **7 pending questions** (28 total).
   
2. **Bloque II (Procedural & Public Employment):**
   - **0% verified**. All 13 topics are completely unverified (190 questions total).
   - Most topics have exactly **14 pending questions**.
   - **Procedimiento administrativo común (`g2-12`)** has the highest density of pending questions with **22 questions** (including the 5 historical exam questions).

---

## 5. Proposed Verification and Milestone Strategy

To systematically verify the 218 pending questions using the official documentation, we recommend a phased approach structured in 5 logical milestones:

```
[Milestone 1: Bloque I] ──> [Milestone 2: Procedimiento] ──> [Milestone 3: Hacienda] ──> [Milestone 4: Empleo & Contratos] ──> [Milestone 5: Transversal]
    28 Questions               50 Questions                42 Questions                 42 Questions               56 Questions
```

### Milestone 1: Complete Bloque I Verification (28 Questions)
* **Goal:** Reach 100% verified status for all Bloque I topics.
* **Scope:**
  * `g1-07` Elecciones al Parlamento de Galicia (7 pending) -> Verify against `ley-8-1985-elecciones-parlamento-galicia.html`
  * `g1-08` Valedor del Pueblo (7 pending) -> Verify against `ley-6-1984-valedor-pueblo.pdf`
  * `g1-09` Consejo Consultivo de Galicia (7 pending) -> Verify against `ley-3-2014-consejo-consultivo-galicia.html`
  * `g1-10` Jurisdicción contencioso-administrativa (7 pending) -> Verify against `jurisdiccion-contencioso-administrativa.pdf`

### Milestone 2: Core Procedural & Administrative Law (50 Questions)
* **Goal:** Verify the most high-impact, densest legal blocks in Bloque II.
* **Scope:**
  * `g2-12` Procedimiento administrativo común (22 pending, includes 5 historical questions) -> Verify against `ley-39-2015-procedimiento-administrativo.pdf`
  * `g2-13` Régimen jurídico del sector público (14 pending) -> Verify against `ley-40-2015-regimen-juridico.pdf`
  * `g2-16` Organización y sector público autonómico (14 pending) -> Verify against `ley-16-2010-organizacion-xunta.html`

### Milestone 3: Patrimony, Finance and Grants (42 Questions)
* **Goal:** Verify economic and financial topics sharing similar regulatory structures and terminology.
* **Scope:**
  * `g2-11` Patrimonio de Galicia (14 pending) -> Verify against `ley-6-2023-patrimonio-galicia.html`
  * `g2-14` Régimen financiero y presupuestario (14 pending) -> Verify against `decreto-legislativo-1-1999-regimen-financiero.html`
  * `g2-15` Subvenciones de Galicia (14 pending) -> Verify against `ley-9-2007-subvenciones-galicia.html`

### Milestone 4: Contracts and Public Employment (42 Questions)
* **Goal:** Verify core public service management and procurement legislation.
* **Scope:**
  * `g2-17` Contratos del sector público (14 pending) -> Verify against `ley-9-2017-contratos-sector-publico.pdf`
  * `g2-18` TREBEP (14 pending) -> Verify against `trebep-rdl-5-2015.pdf`
  * `g2-19` Empleo público de Galicia (14 pending) -> Verify against `ley-2-2015-empleo-publico-galicia.html`

### Milestone 5: Transversal Policies & Ethical Frameworks (56 Questions)
* **Goal:** Verify transversal rules, equality guidelines, and transparency systems.
* **Scope:**
  * `g2-20` Incompatibilidades (14 pending) -> Verify against `ley-53-1984-incompatibilidades.pdf`
  * `g2-21` Igualdad efectiva en Galicia (14 pending) -> Verify against `ley-7-2023-igualdad-galicia.html`
  * `g2-22` Derechos de las personas con discapacidad (14 pending) -> Verify against `tr-lg-discapacidad-rdl-1-2013.pdf`
  * `g2-23` Transparencia y buen gobierno (14 pending) -> Verify against `ley-1-2016-transparencia-galicia.html`

---

## 6. Caveats & Gaps

* **Historical Exam Assets:** There are several official PDF exam documents under `documentos/historicos/` (e.g. Funcionarización 2024, Promoción Específica 2024/2025) that are currently unused or only partially mined. The 5 questions currently in "Histórico oficial 2025" only represent a tiny fraction of these actual exams. 
* **Database Expansion Gaps:** For Bloque I, the database has between 7 and 12 questions per topic (target: 30). For Bloque II, the database has between 14 and 22 questions per topic (target: 70). This indicates a significant gap between current question counts and coverage targets that can be filled by extracting more questions from the historical exam PDFs.
