# Sprint 04 Task 03 - Preference Match Aggregation and Deterministic Ranking

## Objective
Implement weighted aggregation, stable ordering, and explicit tie handling for eligible provider-package combinations.

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
- `docs/matching-contract.md`
- weight/scorer modules
- result domain models

## Files allowed to change
- `packages/matching/src/carebridge_matching/scoring/aggregate.py`
- `packages/matching/src/carebridge_matching/ranking/sorter.py`
- unit/property tests

## Files prohibited from changing
- API/frontend/database

## Tests to write first
- Final score equals weighted contributions within tolerance.
- Scores remain 0–100.
- Input order does not change logical ranking.
- Equal scores use the approved configurable tie policy.
- Bed count never participates.
- No random ordering.

## Implementation requirements
- Preserve full precision until display formatting.
- Use a stable technical provider/package identifier only as the final fallback and document it.

## Validation commands
```powershell
pytest tests\unit\matching tests\property -q
ruff check packages\matching tests
pyright packages\matching
```

## Acceptance criteria
- Determinism and bed invariance are demonstrated by property tests.



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
