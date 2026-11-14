# Sprint 12 Task 01 - Application Security Hardening

## Objective
Perform authorized defensive security review and implement bounded fixes for input validation, secret handling, headers, CORS, logging, dependencies, and database permissions.

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
- `docs/api-contract.md`
- config/middleware/error files
- frontend API config
- Docker/dependency files
- security tests

## Files allowed to change
- security configuration and tests
- dependency lock files only when necessary
- documentation of findings and remediations

## Files prohibited from changing
- penetration of unrelated systems
- destructive tests
- business logic changes

## Tests to write first
- Malformed/oversized inputs handled safely.
- Secrets absent from source and frontend bundles.
- CORS restricted.
- Safe headers configured.
- Logs exclude request bodies/secrets.
- SQL remains parameterized.
- Dependency scans reviewed.

## Implementation requirements
- Confirm authorized scope.
- Use pip-audit/npm audit/Bandit/Semgrep/secret scanning if available.
- Do not claim zero vulnerabilities solely from automated scans.

## Validation commands
```powershell
pip-audit
bandit -r apps packages
cd apps\web; npm audit --audit-level=high
.\scripts\validate.ps1
```

## Acceptance criteria
- Findings have evidence, severity, remediation, verification, and residual risk.



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
