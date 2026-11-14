# Sprint 09 Task 03 - Search Review, Submission, and Recoverable Errors

## Objective
Implement the review step, API request mapping, loading behavior, structured error display, and input preservation.

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
- `docs/error-contract.md`
- `docs/frontend-contract.md`
- completed search form components

## Files allowed to change
- search summary/review component
- API client search method
- loading/error/focus handling
- tests

## Files prohibited from changing
- result cards
- backend contracts

## Tests to write first
- Review clearly separates mandatory, preferred, postcode, and priorities.
- Duplicate submission is blocked while active.
- Errors preserve form data and show correlation ID when provided.
- Accessible live-region updates are used.
- Successful response navigation preserves result order.

## Implementation requirements
- Avoid storing sensitive searches in localStorage unless approved.
- Support request cancellation.

## Validation commands
```powershell
cd apps\web
npm test -- --run
npm run lint
npm run typecheck
npm run build
```

## Acceptance criteria
- Component tests cover success, validation, network error, retry, and preserved input.



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
