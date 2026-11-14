# Sprint 04 Task 02 - Parameter Scorer Protocol and Initial Scorers

## Objective
Create a configurable scorer protocol and implement approved prototype scorers for preferred-service coverage, proximity, price per day, care-package preference, and ratings.

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
- `docs/open-decisions.md`
- scoring/domain modules

## Files allowed to change
- `packages/matching/src/carebridge_matching/scoring/protocol.py`
- `packages/matching/src/carebridge_matching/scoring/scorers.py`
- focused tests

## Files prohibited from changing
- weighted aggregation
- API/frontend/database

## Tests to write first
- Every scorer declares raw input, score range, direction, and missing-data behavior.
- Scores stay within 0–100.
- Missing values never become perfect silently.
- Distances and prices use configurable thresholds, not unexplained constants.
- Package scorer uses explicit normalized package data, not name ordering alone.

## Implementation requirements
- If formulas are still open, implement configuration objects plus clearly labeled prototype defaults and record them in `docs/open-decisions.md`.
- Do not execute untrusted formulas.

## Validation commands
```powershell
pytest tests\unit\matching\scoring -q
ruff check packages\matching tests\unit\matching
pyright packages\matching
```

## Acceptance criteria
- Scorers are replaceable without changing the aggregator.
- Missing-data tests exist for every scorer.



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
