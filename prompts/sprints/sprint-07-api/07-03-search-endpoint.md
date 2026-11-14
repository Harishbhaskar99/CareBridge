# Sprint 07 Task 03 - Search Endpoint Integration

## Objective
Implement `POST /api/v1/searches` by mapping validated requests and repository data into the framework-independent matching engine.

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
- `docs/matching-contract.md`
- matching package public API
- provider repository
- shared error contract

## Files allowed to change
- search schemas, mapper, service, router
- API unit/integration/contract tests

## Files prohibited from changing
- frontend
- matching formulas
- database schema

## Tests to write first
- Invalid/contradictory input rejects safely.
- Ineligible providers do not appear in eligible results.
- Zero eligible providers returns 200 with empty results.
- API preserves engine score/order/explanation.
- Bed information is informational only.
- Repository/matching failures map safely.

## Implementation requirements
- Invoke the matching engine once per search where practical.
- Do not recalculate or sort in the API layer.

## Validation commands
```powershell
pytest tests\unit\api tests\integration\api tests\contract -q
ruff check apps\api tests
pyright apps\api
```

## Acceptance criteria
- Contract and invariance tests pass.



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
