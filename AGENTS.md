# AGENTS.md

Agent coding rules for this repo live in `.cursor/rules/AGENTS.md` (Next.js/Redux patterns) and `.cursor/architecture/` ADRs. Read those before changing feature code.

## Cursor Cloud specific instructions

This repo is the **Next.js web app** half of the "My Health" product (self-hosted health dashboard, default port **3000**). It has no database access: it calls the companion **Express API** (`my-health-open-source-express-server`, port **3009**) via `NEXT_PUBLIC_API_URL`. Start the API (and its Postgres) first — the UI has nothing useful to show until then.

Standard commands are in `README.md` and `package.json` scripts — don't duplicate them. Notes below are the non-obvious, cloud-specific bits.

### Services / ports
- Web app: `npm run dev` (Next.js + Turbopack) on port **3000**. Landing at `/`, dashboard at `/dashboard`, plus per-entity routes (e.g. `/hospitals`, `/doctors`, `/appointments`).
- Backend dependency: the Express API on port 3009 must be running (and its Postgres started). See that repo's `AGENTS.md` for how to start Postgres (`sudo pg_ctlcluster 16 main start`) and the API (`npm run dev`).

### Env file (git-ignored, recreate if missing)
- `.env.local` is git-ignored and lives only in the working tree / snapshot. If missing, recreate from `.env.example`; the only required value is:
  - `NEXT_PUBLIC_API_URL=http://localhost:3009`

### Lint / build
- `npm run lint` (ESLint) and `npm run build` (Next production build) work. Note: `npm run lint` currently reports a pre-existing error (`Date.now` purity in `src/packages/dashboard/upcoming-visits/index.tsx`) and an unused-import warning — these exist in the committed code and are unrelated to environment setup.

### Node
- Node 22 is present and satisfies the repo's `>=20` engine requirement (`.nvmrc` pins 20; no need to switch).
