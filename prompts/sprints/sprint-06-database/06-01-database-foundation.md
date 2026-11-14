# Sprint 06 Task 01 - PostgreSQL and SQLAlchemy Foundation

## Objective
Add PostgreSQL 16 local configuration, SQLAlchemy 2 base/session setup, and Alembic initialization.

## Mandatory process
1. Invoke `using-superpowers` first and follow the installed skill routing.
2. Inspect only the files in the Context Manifest. If a required file is missing, stop and report the minimum missing context.
3. For new behavior or architecture, invoke `brainstorming`. For implementation or fixes, invoke `test-driven-development` before production code.
4. Write or update failing tests first, then implement the smallest maintainable change, then refactor.
5. Do not read the entire repository or modify unrelated files.
6. After implementation, invoke the applicable review and validation skills, including `requesting-code-review`, `code-validation-gate`, and `verification-before-completion` when installed.
7. Do not commit unless the human explicitly authorizes it.
8. Return actual command evidence. Never say tests passed unless commands were executed.

## CareBridge invariants
- Mandatory requirements are patient-specific eligibility gates supplied by healthcare providers.
- Any provider or package missing one mandatory requirement is ineligible.
- Preferred requirements are negotiable and missing preferences must remain visible.
- Bed availability is informational only and must never affect eligibility, score, order, or tie-breaking.
- Missing capability evidence is not confirmed support.
- Eligibility happens before scoring.
- Ranking is deterministic, configuration-driven, and implemented as ordinary Python, not by an LLM.
- The final score is `Preference Match`, never a clinical-safety, recovery, admission, or treatment-outcome score.
- Identical inputs and provider data must yield identical results.
- The hackathon uses synthetic data only and must not collect identifiable patient data.
- The solution supports configurable care journeys, initially `MEDICAL_EXTENSIVE_CARE` and `RETIREMENT_HOME`.

## Context Manifest
Read only:
- `docs/data-contract.md`
- `docs/business-rules.md`
- `pyproject.toml`
- existing repository structure

## Files allowed to change
- `apps/api/src/carebridge_api/db/base.py`
- `apps/api/src/carebridge_api/db/session.py`
- `alembic.ini` and migration environment under `database/migrations`
- local Docker Compose PostgreSQL file if approved
- integration test setup

## Files prohibited from changing
- domain matching logic
- frontend
- Azure infrastructure

## Tests to write first
- Integration test connects to real PostgreSQL, not SQLite.
- Session lifecycle is explicit.
- Secrets come from environment settings.
- Alembic can report current revision.

## Implementation requirements
- Add SQLAlchemy, Alembic, psycopg dependencies.
- Do not create domain tables in this task.
- Provide `.env.example` names only.

## Validation commands
```powershell
docker compose up -d postgres
alembic current
pytest tests\integration\database -q
ruff check apps\api tests\integration
pyright apps\api
```

## Acceptance criteria
- PostgreSQL connectivity is evidenced.
- No SQLite-only shortcut.



## Required response
Return:
- files inspected;
- files created or modified;
- tests written or changed;
- commands executed and actual results;
- failed or skipped checks;
- assumptions and unresolved decisions;
- security and performance impact;
- residual risks;
- recommended next task;
- completion status: `Complete with evidence`, `Partially complete`, `Blocked`, or `Not complete`.
