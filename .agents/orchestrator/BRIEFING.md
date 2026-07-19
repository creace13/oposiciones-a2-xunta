# BRIEFING — 2026-07-11T17:16:32+02:00

## Mission
Audit 218 remaining pending questions in the "Gestión A2 Xunta de Galicia" test bank against official local/state laws, ensuring legal accuracy, functional correctness, and update project coordination files.

## 🔒 My Identity
- Archetype: teamwork_preview_orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\orchestrator\
- Original parent: top-level
- Original parent conversation ID: faf96474-55d8-48c9-9aa2-8daaff584e15

## 🔒 My Workflow
- **Pattern**: Project
- **Scope document**: f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\orchestrator\PROJECT.md
1. **Decompose**: Split remaining 218 questions by legal topic or batches matching official sources, ensuring logical dependency order.
2. **Dispatch & Execute**:
   - **Delegate (sub-orchestrator)**: Spawn subagents/workers to perform audits for specific topic batches.
3. **On failure** (in this order):
   - Retry: nudge stuck agent or re-send task
   - Replace: spawn fresh agent with partial progress
   - Skip: proceed without (only if non-critical)
   - Redistribute: split stuck agent's remaining work
   - Redesign: re-partition decomposition
   - Escalate: report to parent (sub-orchestrators only, last resort)
4. **Succession**: Spawn successor if spawn threshold of 16 is reached and all subagents are complete.
- **Work items**:
  1. Initialization [in-progress]
  2. Audit batch 1 (Elecciones al Parlamento de Galicia - 6 questions) [pending]
  3. Audit remaining batches (total 218 questions) [pending]
  4. Final validation [pending]
- **Current phase**: 1
- **Current focus**: Initialization and planning

## 🔒 Key Constraints
- Never write, modify, or create source code files directly.
- Never run build/test commands yourself — require workers to do so.
- File-editing tools only allowed for metadata/state files (.md) in the .agents/ folder.
- Never reuse a subagent after it has delivered its handoff — always spawn fresh.

## Current Parent
- Conversation ID: faf96474-55d8-48c9-9aa2-8daaff584e15
- Updated: not yet

## Key Decisions Made
- Initializing project metadata.

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| explorer_init | teamwork_preview_explorer | Scan app.js and documentos/ to map topics and questions | completed | 29a2bed2-0db2-4b66-b367-ffbd62364730 |
| worker_m1 | teamwork_preview_worker | Audit all remaining 28 pending questions of Bloque I | failed | aebb4fe3-86af-4b2c-b9b7-c9871412b097 |
| worker_m1_gen2 | teamwork_preview_worker | Audit all remaining 28 pending questions of Bloque I (Replacement) | completed | 6af91ffb-c35f-4f41-999f-fd286c8c1f78 |
| worker_m2 | teamwork_preview_worker | Audit all 50 pending questions of Milestone 2 | completed | a76627fe-50f7-4264-88a1-cd8498bc5b4a |
| worker_m3 | teamwork_preview_worker | Audit all 42 pending questions of Milestone 3 | completed | f4d3e587-38c5-4cca-9910-6ffcfe245084 |
| worker_m4 | teamwork_preview_worker | Audit all 42 pending questions of Milestone 4 | completed | 9a10e142-c801-4e57-bd12-f6ed3f078191 |
| worker_m5 | teamwork_preview_worker | Audit all 56 pending questions of Milestone 5 | completed | 5b262611-32aa-4a91-8334-47ee3c943894 |
| worker_m6 | teamwork_preview_worker | Final validation of database and codebase | completed | 33f8057a-8d06-47ee-aba4-c4773f9c2301 |

## Succession Status
- Succession required: no
- Spawn count: 8 / 16
- Pending subagents: none
- Predecessor: none
- Successor: not yet spawned

## Active Timers
- Heartbeat cron: none
- Safety timer: none
- On succession: kill all timers before spawning successor
- On context truncation: run `manage_task(Action="list")` — re-create if missing

## Artifact Index
- f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\orchestrator\BRIEFING.md — Persistent memory / identity
- f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\orchestrator\plan.md — Strategy and decomposition
- f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\orchestrator\progress.md — Milestones and status tracking
- f:\05_Proyectos [Aplicaciones]\Oposicion [App] --Gemini\.agents\orchestrator\context.md — Context tracking
