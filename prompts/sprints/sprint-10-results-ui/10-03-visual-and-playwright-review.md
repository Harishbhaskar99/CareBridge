# Sprint 10 Task 03 - Visual and Browser Verification

## Objective
Create permanent Python Playwright user-flow tests and perform visual inspection of the complete search/results experience.

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
- all completed frontend feature files
- API synthetic data behavior
- existing e2e fixtures

## Files allowed to change
- `tests/e2e/test_search_flow.py`
- `tests/e2e/test_results_states.py`
- evidence screenshots/notes only

## Files prohibited from changing
- production feature code unless a separately approved defect fix is required
- backend contracts

## Tests to write first
- Valid MEC search.
- Journey switch warning.
- Mandatory/preferred selection.
- No-match flow.
- Missing optional data.
- Zero beds without rank impact.
- Mobile 320px.
- Keyboard flow.

## Implementation requirements
- Use Python pytest-playwright semantic locators.
- Use Playwright MCP and vision for exploratory review, but convert reproducible issues into permanent tests.
- Do not weaken assertions.

## Validation commands
```powershell
pytest tests\e2e -q
```

## Acceptance criteria
- Screenshots show no clipping/overflow on desktop and mobile.
- Permanent tests represent critical journeys.

## Vision review checklist
Inspect hierarchy, spacing, contrast, labels, focus, mandatory/preferred distinction, missing-service display, Preference Match wording, bed presentation, error states, and mobile overflow.

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
