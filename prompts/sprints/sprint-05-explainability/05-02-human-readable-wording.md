# Sprint 05 Task 02 - Human-Readable Preference Match Wording

## Objective
Create concise non-clinical explanation formatting from structured explanation data.

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
- `docs/frontend-contract.md`
- explanation builder and result models

## Files allowed to change
- `packages/matching/src/carebridge_matching/explanations/formatter.py`
- wording tests

## Files prohibited from changing
- React components
- HTTP schemas
- database

## Tests to write first
- Uses “Preference Match”.
- Never says medically suitable, safe, recovery chance, admission chance, or guarantee.
- Clearly identifies unavailable preferred services.
- Missing optional data is explicit.
- Bed wording states informational-only if included by caller.

## Implementation requirements
- Keep templates deterministic and localization-ready.
- Do not use an LLM.

## Validation commands
```powershell
pytest tests\unit\matching\explanations -q
ruff check packages\matching tests\unit\matching
pyright packages\matching
```

## Acceptance criteria
- Forbidden clinical outcome phrases are covered by tests.



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
