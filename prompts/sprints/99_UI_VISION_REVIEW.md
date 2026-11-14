# UI Vision Review Prompt

Use on a runnable UI after component tests and permanent Python Playwright tests.

1. Invoke `using-superpowers`.
2. Use Playwright MCP to inspect the exact requested flow at desktop 1440x900 and mobile 390x844, plus 320px width where practical.
3. Do not edit files during review.
4. Inspect hierarchy, spacing, clipping, overflow, responsiveness, focus visibility, keyboard path, labels, error presentation, loading states, mandatory/preferred distinction, missing-service presentation, Preference Match wording, and informational bed presentation.
5. Record screenshots for every material state.
6. Check browser console and failed network requests.
7. Report exact reproduction steps, expected behavior, observed behavior, screenshot path, severity, accessibility impact, and recommended test.
8. Do not infer backend correctness from visuals.
9. Do not approve completion solely from screenshots.
