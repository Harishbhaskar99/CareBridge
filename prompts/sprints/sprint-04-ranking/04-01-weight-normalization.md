# Sprint 04 Task 01 - Priority Weight Normalization

## Objective
Implement Decimal-safe normalized priority weights.

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
- priority domain models

## Files allowed to change
- `packages/matching/src/carebridge_matching/scoring/weights.py`
- unit and property tests

## Files prohibited from changing
- parameter-specific scorers
- aggregate ranking
- API/frontend/database

## Tests to write first
- Positive priorities normalize to a total of 1 within explicit Decimal tolerance.
- Negative and nonnumeric priorities reject.
- Zero-total rejects.
- Zero-priority behavior remains explicit and documented.
- No assumption of exactly five parameters.

## Implementation requirements
- Use Decimal throughout.
- Do not round calculation weights for display.
- Return stable ordering by parameter identifier.

## Validation commands
```powershell
pytest tests\unit\matching\scoring tests\property -q
ruff check packages\matching tests
pyright packages\matching
```

## Acceptance criteria
- Property tests prove weight-sum and determinism.



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
