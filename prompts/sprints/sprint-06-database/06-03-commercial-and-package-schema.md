# Sprint 06 Task 03 - Packages, Pricing, Ratings, Quality, and Bed Schema

## Objective
Add provider-specific care packages, package capabilities, price periods, ratings, quality metrics, and informational bed reports.

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
- existing database models/migrations
- package domain models

## Files allowed to change
- new persistence models
- new Alembic revision
- integration tests

## Files prohibited from changing
- ranking calculations
- API/frontend

## Tests to write first
- Money uses NUMERIC/Decimal.
- Package names do not imply cross-provider equivalence.
- Price has currency, billing period, source, and effective dates.
- Rating scale constraints are enforced.
- Known bed count is nonnegative; missing remains distinguishable.
- No ranking/index/materialized score based on beds.

## Implementation requirements
- Preserve history where practical.
- Add indexes only for documented retrieval queries.

## Validation commands
```powershell
alembic upgrade head
pytest tests\integration\database -q
alembic downgrade -1
alembic upgrade head
```

## Acceptance criteria
- Schema supports all prototype result fields without mixing business logic into SQL.



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
