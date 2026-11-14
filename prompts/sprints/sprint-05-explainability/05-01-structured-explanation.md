# Sprint 05 Task 01 - Structured Explanation Model

## Objective
Generate a structured, mathematically reconcilable explanation for every eligible ranked result.

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
- ranking output models
- scoring modules

## Files allowed to change
- `packages/matching/src/carebridge_matching/explanations/builder.py`
- unit tests

## Files prohibited from changing
- API serialization
- UI formatting
- persistence

## Tests to write first
- Explanation includes eligibility confirmation, matched/missing preferences, raw values, normalized scores, priorities, weights, contributions, final Preference Match, missing-data notes, and tie reason.
- Contribution sum reconciles with final score.
- Bed information is absent from score components.

## Implementation requirements
- Structured data is authoritative.
- Keep human wording separate from the calculation object.

## Validation commands
```powershell
pytest tests\unit\matching\explanations -q
ruff check packages\matching tests\unit\matching
pyright packages\matching
```

## Acceptance criteria
- Every displayed numerical component can be verified from structure.



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
