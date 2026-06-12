# Contributing to My Health (Web)

Thank you for contributing to the My Health open-source pair.

## Repositories

| Repo | Role |
|------|------|
| [my-health-open-source](https://github.com/matthewruiz/my-health-open-source) | Next.js dashboard and landing |
| [my-health-open-source-express-server](https://github.com/matthewruiz/my-health-open-source-express-server) | Express API backed by on-device Postgres |

Changes that touch API contracts should be coordinated across both repos. See the [wire contract](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/docs/oss/wire-contract.md) in the Express repo.

## Before you code

1. Read [.cursor/architecture/README.md](./.cursor/architecture/README.md).
2. Read [.cursor/rules/AGENTS.md](./.cursor/rules/AGENTS.md).
3. Follow existing patterns in `src/packages/`, `src/store/`, and `src/api/`.

## Development setup

1. Run the Express API and apply Postgres migrations with `psql` (see companion repo README).
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL`.
3. `npm install` then `npm run dev`.

## Pull requests

- Keep PRs focused; one feature or fix per PR when possible.
- Run `npm run build` and `npm run lint` before opening a PR.
- Update README or docs when behavior, env vars, or setup steps change.
- Do not commit secrets, `.env` files, or real `DATABASE_URL` values.

## Questions

Open a GitHub issue for bugs or feature discussion.
