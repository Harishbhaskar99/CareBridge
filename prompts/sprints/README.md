# CareBridge Sprint Prompt Pack

Status: Placeholder

This directory holds the separate CareBridge sprint prompt pack and its usage guidance.

> **Warning:** This is placeholder content. Do not treat it as an approved requirement.

The separate CareBridge prompt pack should be extracted into this directory. Load only the current sprint prompt into the model context; do not load the whole pack at once.

---

This package contains 42 Markdown prompts covering foundation through final demo hardening.

## Usage
1. Copy this directory into the CareBridge repository, preferably under `prompts/sprints/`, or keep it beside the repository.
2. Execute prompts in `00_RUN_ORDER.md` order.
3. Use one prompt per OpenCode task/session.
4. Do not preload the full pack into model context.
5. After each coherent sprint, run `98_INDEPENDENT_REVIEW.md`.
6. For runnable UI work, run `99_UI_VISION_REVIEW.md`.
7. Commit only after fresh validation evidence and human review.

## Assumptions
- The official repository structure already exists in Git.
- OpenCode chooses the appropriate available agent/model.
- DeepSeek, GLM, MiniMax, OpenCode free vision, and Ollama may be available, but prompts do not hard-code model ownership.
- Windows PowerShell 7 is the default shell.
- Backend and permanent browser tests use Python.
- The React frontend uses npm where required by the JavaScript ecosystem.
