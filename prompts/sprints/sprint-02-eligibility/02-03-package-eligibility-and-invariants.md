# Sprint 02 Task 03 - Care Package Eligibility and Bed Invariants

## Objective
Implement provider-package eligibility for mandatory requirements and add property tests proving bed invariance.

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
- `docs/edge-cases.md`
- domain and eligibility modules
- current matching tests

## Files allowed to change
- `packages/matching/src/carebridge_matching/eligibility/packages.py`
- property tests under `tests/unit/matching` or `tests/property`

## Files prohibited from changing
- ranking/scoring
- API/database/frontend

## Tests to write first
- A package containing all mandatory capabilities qualifies.
- A named package missing a mandatory capability is ineligible even if named Premier.
- Provider-level add-ons count only when explicit data marks them available to the package.
- Changing only bed count never changes eligibility.

## Implementation requirements
- Do not assume Standard/Enhanced/Premier are equivalent across providers.
- Compare normalized capability sets, not package names.
- Use Hypothesis if available.

## Validation commands
```powershell
pytest tests\unit\matching tests\property -q
ruff check packages\matching tests
pyright packages\matching
```

## Acceptance criteria
- Bed invariance is executable evidence.
- Package names cannot override capability facts.



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
