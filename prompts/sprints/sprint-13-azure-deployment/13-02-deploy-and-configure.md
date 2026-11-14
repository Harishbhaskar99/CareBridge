# Sprint 13 Task 02 - Deploy and Configure Azure Sandbox

## Objective
Deploy approved Bicep, configure secrets/settings, migrate/seed PostgreSQL, and deploy backend/frontend with evidence.

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
- approved Bicep and parameters
- deployment README
- release commit hash
- migration/seed scripts
- application build instructions

## Files allowed to change
- deployment scripts and evidence logs
- configuration docs
- smoke tests

## Files prohibited from changing
- application feature code except deployment defects
- secrets in repository

## Tests to write first
- Infrastructure deployment succeeds.
- Backend health/ready pass.
- Migrations and synthetic seeds succeed.
- Frontend reaches API over HTTPS.
- CORS works.
- Telemetry appears.
- Rollback/cleanup documented.

## Implementation requirements
- Use Key Vault/placeholders, never commit secrets.
- Capture resource names/IDs and deployment outputs safely.

## Validation commands
```powershell
# Use exact approved scripts generated in repository
.\infrastructure\scripts\deploy.ps1
.\infrastructure\scripts\smoke-test.ps1
```

## Acceptance criteria
- Evidence includes URLs, health results, migration revision, seed counts, and telemetry observation.



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
