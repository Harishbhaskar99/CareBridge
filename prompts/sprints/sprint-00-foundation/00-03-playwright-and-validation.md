# Sprint 00 Task 03 - Playwright and Repository Validation

## Objective
Configure Python pytest-playwright, a minimal browser smoke test, and the root PowerShell validation script.

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
- `AGENTS.md`
- `README.md`
- `pyproject.toml`
- `apps/web/package.json`
- `scripts/validate.ps1` if present

## Files allowed to change
- `tests/e2e/test_smoke.py`
- `scripts/validate.ps1`
- `README.md`
- `.gitignore`

## Files prohibited from changing
- application business modules
- UX feature components
- infrastructure files

## Tests to write first
- A Playwright test opens the locally running placeholder frontend and verifies the main heading.
- Validation script detects missing prerequisites and stops with useful errors.

## Implementation requirements
- Use Python `pytest-playwright` for committed tests.
- Keep Playwright MCP optional and separate.
- `validate.ps1` must run Python checks, frontend checks, and e2e only when the app URL is available.
- Do not embed credentials.

## Validation commands
```powershell
pip install -e ".[dev]"
playwright install chromium
.\scripts\validate.ps1
pytest tests\e2e -q
```

## Acceptance criteria
- A permanent Python browser smoke test exists.
- Root validation is PowerShell 7 compatible.
- README documents how to start the frontend before e2e tests.



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
