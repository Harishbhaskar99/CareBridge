# Sprint 13 Task 01 - Azure Sandbox Infrastructure

## Objective
Create modular Bicep for the minimum CareBridge sandbox resources without deploying them.

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
- `docs/architecture/deployment-overview.md` if present
- application runtime requirements
- database decision
- existing infrastructure directory

## Files allowed to change
- `infrastructure/bicep/main.bicep`
- Bicep modules/parameter examples
- infrastructure README
- validation tests/scripts

## Files prohibited from changing
- application source
- secrets
- actual deployment

## Tests to write first
- Resources cover frontend/backend hosting, PostgreSQL Flexible Server, Key Vault, Application Insights/Log Analytics, and Azure Maps if approved.
- No hard-coded secrets/subscription/tenant/IP.
- Low-cost hackathon defaults.
- Tags include project/environment/expiry placeholders.

## Implementation requirements
- Prefer simplest hosting option approved by team.
- Use managed identity where practical.
- HA disabled for hackathon DB.

## Validation commands
```powershell
az bicep build --file infrastructure\bicep\main.bicep
az deployment group what-if --resource-group <rg> --template-file infrastructure\bicep\main.bicep --parameters <params>
```

## Acceptance criteria
- Bicep builds and what-if is reviewable.
- No deployment occurs without human approval.



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
