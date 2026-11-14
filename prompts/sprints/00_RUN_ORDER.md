# CareBridge Prompt Execution Order

Execute one prompt at a time. Start a fresh OpenCode task/session for each prompt unless the current session is well below the context budget.

## Operating rules
- Open the repository root before each task.
- Paste only the selected prompt.
- Do not preload all prompts or all documentation.
- Each prompt contains its own Context Manifest.
- Review the Git diff after every task.
- Obtain independent review before committing coherent sprint output.
- Commit only after verification evidence is fresh.
- If cloud models are unavailable, use Ollama only for the same bounded prompt. Do not enlarge scope.
- Keep normal task context below 25,000 tokens and never exceed 50,000 tokens without splitting the task.

## Sequence
1. Sprint 00 - Foundation
2. Sprint 01 - Domain model
3. Sprint 02 - Mandatory eligibility
4. Sprint 03 - Preferred requirements
5. Sprint 04 - Ranking
6. Sprint 05 - Explainability
7. Sprint 06 - Database
8. Sprint 07 - API
9. Sprint 08 - UI foundation
10. Sprint 09 - Search flow
11. Sprint 10 - Results UI
12. Sprint 11 - Integration
13. Sprint 12 - Security hardening
14. Sprint 13 - Azure deployment
15. Sprint 14 - Performance and demo hardening

## Review cadence
- Run GLM or another independent reviewer after each sprint.
- Run MiniMax or another independent requirements reviewer after Sprints 02, 04, 07, 10, 11, and 14.
- Use OpenCode vision plus Playwright after every runnable UI task.
- Do not let a reviewer silently edit files. Review first, then apply accepted findings through a new bounded task.
