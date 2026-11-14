# Sprint 06 Task 02 - Provider, Service, Capability, and Audit Schema

## Objective
Create SQLAlchemy models and an Alembic migration for care centres, service categories, services, journey-specific capabilities, and provider audits.

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
- database foundation
- domain identifiers

## Files allowed to change
- database persistence models under `apps/api/src/carebridge_api/db/models/`
- new Alembic revision
- integration tests

## Files prohibited from changing
- API routes
- frontend
- ranking logic

## Tests to write first
- Unique service codes and provider references.
- Unique provider/service/journey capability facts.
- Missing row does not mean support.
- Services have no global mandatory/preferred field.
- Audit effective dates and statuses are constrained.

## Implementation requirements
- Use UTC timestamps.
- Avoid destructive cascade of audit history.
- Add only query-supporting indexes.

## Validation commands
```powershell
alembic upgrade head
pytest tests\integration\database -q
alembic downgrade -1
alembic upgrade head
ruff check apps\api database tests\integration
```

## Acceptance criteria
- Migration works from empty database and has a safe downgrade.
- Constraints reject invalid records.



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
