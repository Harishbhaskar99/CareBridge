# Sprint 10 Task 01 - Explainable Provider Result Card

## Objective
Implement an accessible result card that presents the authoritative API result without recalculation or reranking.

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
- `docs/frontend-contract.md`
- `docs/api-contract.md`
- result TypeScript contracts
- existing theme

## Files allowed to change
- result-card components and tests

## Files prohibited from changing
- API/backend/matching
- comparison feature

## Tests to write first
- Displays provider, Preference Match, mandatory confirmation, matched/missing preferences, distance, price per day, package, rating/quality, and informational beds.
- Missing data uses explicit text.
- Zero beds is not visually treated as error or recommendation.
- Preference Match includes non-clinical explanation.

## Implementation requirements
- Never calculate score or change ordering in React.
- Do not use color alone.

## Validation commands
```powershell
cd apps\web
npm test -- --run
npm run lint
npm run typecheck
```

## Acceptance criteria
- Tests cover zero beds, missing cost/rating, missing preferences, and forbidden wording.



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
