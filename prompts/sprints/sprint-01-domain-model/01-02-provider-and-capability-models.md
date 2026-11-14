# Sprint 01 Task 02 - Provider and Capability Domain Models

## Objective
Create immutable provider, capability, audit, location, cost, rating, bed-information, and care-package domain models.

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
- `docs/business-rules.md`
- `docs/data-contract.md`
- `packages/matching/src/carebridge_matching/domain/enums.py`
- `packages/matching/src/carebridge_matching/domain/identifiers.py`

## Files allowed to change
- `packages/matching/src/carebridge_matching/domain/providers.py`
- unit tests for provider model validation

## Files prohibited from changing
- API schemas
- database models
- ranking code
- frontend files

## Tests to write first
- Invalid latitude and longitude are rejected.
- Negative known bed count is rejected; unknown remains representable.
- Money uses Decimal and currency/billing period metadata.
- Package capabilities remain provider-and-journey-specific.

## Implementation requirements
- Prefer frozen dataclasses.
- Distinguish missing, unknown, unsupported, and supported capability states.
- Bed fields must have no ranking methods or comparison behavior.

## Validation commands
```powershell
pytest tests\unit\matching -q
ruff check packages\matching tests\unit\matching
pyright packages\matching
```

## Acceptance criteria
- Models represent all required provider data without persistence dependencies.
- Bed count cannot implicitly participate in ordering.



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
