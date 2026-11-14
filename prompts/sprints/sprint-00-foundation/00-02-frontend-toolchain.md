# Sprint 00 Task 02 - Frontend Toolchain

## Objective
Create a minimal React, TypeScript, Vite, and Material UI workspace under `apps/web` without implementing CareBridge screens.

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
- `.gitignore`
- existing root package files if present

## Files allowed to change
- `apps/web/package.json`
- `apps/web/vite.config.ts`
- `apps/web/tsconfig*.json`
- `apps/web/src/main.tsx`
- `apps/web/src/App.tsx`
- `apps/web/src/test/setup.ts`
- minimal frontend tests

## Files prohibited from changing
- `packages/matching/**`
- `apps/api/**`
- `database/**`
- `infrastructure/**`

## Tests to write first
- Add one render smoke test for the placeholder app.
- Add one accessibility smoke assertion using semantic heading text.

## Implementation requirements
- Use React, TypeScript, Vite, Material UI, Vitest, React Testing Library, ESLint, and Prettier.
- Render only a neutral CareBridge placeholder and “Foundation setup in progress”.
- Do not create care-journey or search behavior yet.

## Validation commands
```powershell
npm install
npm run lint
npm run typecheck
npm test -- --run
npm run build
```

## Acceptance criteria
- The frontend builds on Windows.
- The smoke test passes.
- No business logic exists in the browser.



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
