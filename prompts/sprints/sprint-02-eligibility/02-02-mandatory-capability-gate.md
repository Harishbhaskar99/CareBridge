# Sprint 02 Task 02 - Mandatory Capability Eligibility

## Objective
Implement set-based mandatory capability evaluation after provider approval.

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
- provider/search domain models
- approval eligibility module

## Files allowed to change
- `packages/matching/src/carebridge_matching/eligibility/capabilities.py`
- unit tests

## Files prohibited from changing
- ranking/scoring
- package selection logic beyond explicit capability sets
- API/database/frontend files

## Tests to write first
- All mandatory capabilities present and verified passes.
- One or many missing capabilities fail.
- Unknown or missing evidence fails.
- Empty mandatory list follows the documented policy.
- Duplicates do not inflate matching.

## Implementation requirements
- Evaluate only verified supported capabilities applicable to the selected journey.
- Return satisfied and missing identifiers plus reasons.
- Do not consider price, rating, location, package preference, or beds.

## Validation commands
```powershell
pytest tests\unit\matching\eligibility -q
ruff check packages\matching tests\unit\matching
pyright packages\matching
```

## Acceptance criteria
- Mandatory evaluation is isolated and deterministic.
- Tests prove no preference compensates for missing capability.



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
