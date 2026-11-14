# CareBridge

CareBridge is an API-first, platform-independent capability for discovering and ranking care centres using healthcare-provider-supplied mandatory requirements and user preferences. Mandatory requirements determine eligibility; eligible providers are ranked using an explainable, deterministic Preference Match. The hackathon prototype uses synthetic data only.

## Repository layout

- `docs/` - product, business, matching, API, data, frontend, error, architecture, and evidence documentation.
- `orchestration/` - master prompt, current sprint and task, evidence log, and decision log.
- `prompts/sprints/` - location for the separate CareBridge sprint prompt pack.
- `sprints/` - per-sprint working directories.
- `packages/matching/` - matching package source and tests.
- `apps/api/` and `apps/web/` - API and web application source and tests.
- `database/` - migrations, seeds, and database scripts.
- `tests/` - unit, integration, contract, end-to-end, security, and performance tests.
- `infrastructure/` - Bicep modules, parameters, and deployment scripts.
- `scripts/` - repository utility scripts.

Setup and implementation begin with Sprint 00.

The project uses synthetic data only.
