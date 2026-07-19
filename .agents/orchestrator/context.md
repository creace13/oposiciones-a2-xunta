# Context — 2026-07-11T16:21:33+02:00

## Active Files
- `app.js` — Source file containing the questions database.
- `scripts/validar-banco.js` — Database validation script.
- `.ia/ESTADO-PROYECTO.md` — Current project canonical state.
- `.ia/AUDITORIA-CONTENIDO.md` — Legal audit record.
- `.ia/BITACORA-IA.md` — Continuation log.
- `.ia/PLAN-MAESTRO.md` — Master plan.

## Active Subagents
- worker_m5: teamwork_preview_worker (Conv ID: 5b262611-32aa-4a91-8334-47ee3c943894)

## Important Constraints & Rules
- Do not write/modify code files or run command checks directly.
- Use workers/explorers.
- Use `progress.md` for heartbeat and status.
- Follow `.ia/PROTOCOLO.md` sequence of reading files and updating them.
- Any model transition must log in `.ia/BITACORA-IA.md`.
