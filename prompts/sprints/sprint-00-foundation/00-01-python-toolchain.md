# Sprint 00 Task 01 - Python Toolchain

## Objective
Create the root Python development configuration for Python 3.12 without implementing application behavior.

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
- `orchestration/CAREBRIDGE_MASTER_PROMPT.md`
- `.gitignore`
- `.editorconfig`

## Files allowed to change
- `pyproject.toml`
- `.python-version` if the repository convention supports it
- `README.md` only for setup commands

## Files prohibited from changing
- `apps/web/**`
- `packages/matching/**` production modules
- `database/**`
- `infrastructure/**`

## Tests to write first
- Add a smoke test that imports the future workspace packages only if a package exists.
- Add configuration validation tests only where executable.

## Implementation requirements
- Configure Python 3.12, pytest, pytest-cov, Ruff, and Pyright or mypy.
- Use a `src` layout when packages are created later.
- Pin direct development dependencies to compatible bounded versions.
- Do not add FastAPI, SQLAlchemy, or application dependencies yet.
- Add PowerShell setup commands to README.

## Validation commands
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -e ".[dev]"
ruff check .
ruff format --check .
pytest -q
```

## Acceptance criteria
- A fresh Windows PowerShell environment can install the development toolchain.
- Ruff and type-check configuration are explicit.
- No CareBridge feature code is added.



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
