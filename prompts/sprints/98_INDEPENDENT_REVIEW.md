# Independent Sprint Review Prompt

Use this after implementation of any sprint and before committing.

1. Invoke `using-superpowers` and the applicable review skill.
2. Do not edit files.
3. Read only:
   - `AGENTS.md`;
   - the sprint task prompt;
   - applicable contract(s);
   - the Git diff;
   - test/evidence output.
4. Review correctness, architecture fit, CareBridge invariants, test quality, security, performance, backwards compatibility, and unnecessary complexity.
5. Specifically verify that mandatory requirements remain eligibility gates and bed information cannot influence eligibility, scores, order, or tie-breaking.
6. Identify unsupported assumptions and missing edge cases.
7. Reference exact file paths and lines.
8. Return blocking, important, and minor findings plus an approval recommendation: `Approve`, `Approve after minor corrections`, or `Changes required`.
9. Do not claim tests passed unless evidence is included.
