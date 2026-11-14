# Sprint 07 Task 01 - FastAPI Foundation, Errors, and Health

## Objective
Create the FastAPI application, typed settings, structured error envelope, correlation middleware, and live/ready endpoints.

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
- `docs/api-contract.md`
- `docs/error-contract.md`
- `docs/business-rules.md`
- database settings/session modules

## Files allowed to change
- `apps/api/src/carebridge_api/main.py`
- config/lifespan/dependencies
- middleware and error modules
- health router
- API tests

## Files prohibited from changing
- search endpoint
- matching logic
- frontend

## Tests to write first
- `/health/live` is lightweight.
- `/health/ready` reports required dependency readiness and returns 503 safely.
- Correlation ID is generated/propagated.
- Errors do not expose secrets or stack traces.
- OpenAPI renders.

## Implementation requirements
- Use APIRouter and Annotated dependencies.
- Do not create database sessions inside routes.

## Validation commands
```powershell
pytest tests\unit\api tests\integration\api -q
ruff check apps\api tests
pyright apps\api
```

## Acceptance criteria
- Health and error contracts match documentation.



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
