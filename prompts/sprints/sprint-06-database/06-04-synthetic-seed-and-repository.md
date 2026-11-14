# Sprint 06 Task 04 - Synthetic Dataset and Provider Repository

## Objective
Create deterministic synthetic seed data and efficient repository retrieval for matching inputs.

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
- `docs/edge-cases.md`
- `docs/data-contract.md`
- database models
- matching domain models

## Files allowed to change
- `database/seeds/**`
- provider repository implementation/protocol under `apps/api`
- integration tests
- reset/reseed script

## Files prohibited from changing
- FastAPI routes
- frontend
- ranking algorithms

## Tests to write first
- Dataset covers full matches, mandatory failures, preferred gaps, suspended/expired audits, missing price/rating/beds, zero beds, multiple journeys, package differences, and ties.
- Seed is deterministic and resettable.
- Repository avoids N+1 queries.
- Persistence maps cleanly to domain records.

## Implementation requirements
- Use obviously synthetic names.
- Include around 50 demo providers and a script option for 1,000 performance providers.

## Validation commands
```powershell
python -m database.seeds.reset
python -m database.seeds.load --size demo
pytest tests\integration\database -q
```

## Acceptance criteria
- Record counts are asserted.
- Query count or eager-loading behavior is tested.



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
