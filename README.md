# My Health

**TL;DR:** Self-hosted dashboard for appointments, your care team, and daily health notes. Next.js talks to a small Express API backed by on-device Postgres. Clone both repos, run on localhost, keep the rows on your machine.

I kept doctor names, facilities, and visit dates in too many places — portal PDFs, Notes, calendar invites. I wanted one table for visits, doctors linked to hospitals and specialties, and a simple place for focus areas I track between appointments. This repo is the browser side of that.

**Companion API:** [my-health-open-source-express-server](https://github.com/Luckee-Core/my-health-open-source-express-server)

**Wire contract:** [Express docs/oss/wire-contract.md](https://github.com/Luckee-Core/my-health-open-source-express-server/blob/main/docs/oss/wire-contract.md)

**Pair quickstart:** [Express docs/oss-quickstart.md](https://github.com/Luckee-Core/my-health-open-source-express-server/blob/main/docs/oss-quickstart.md)

---

## What you get

- Landing page with clone/setup pointers (same repo you are reading)
- Dashboard routes: care team, appointments, journal, health record, and docs
- **Care team:** hospitals, specialties, doctors
- **Journal:** focus areas, daily entries
- **Health record:** medical history events, symptom logs, research notes (+ detail page)
- Redux with **manual thunks** — async work stays in `src/store/thunks/`, not components
- Typed clients in `src/api/` that call Express `/api/data/*`
- Env-driven GitHub and docs links on the landing page

---

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- [Express API](https://github.com/Luckee-Core/my-health-open-source-express-server) running with local Postgres configured

Start the API first. The web app has nothing useful to talk to until that is up.

---

## Quick start

### 1. API + database

Follow the [Express oss-quickstart](https://github.com/Luckee-Core/my-health-open-source-express-server/blob/main/docs/oss-quickstart.md):

1. Create `my_health` and apply SQL in order (`migrations/001_…` through `003_…`) with `psql`, or use Luckee Hub **Setup database**
2. Copy `.env.example` → `.env` with your `DATABASE_URL`
3. `npm run dev` — listens on **port 3009** by default

Smoke test:

```bash
curl http://localhost:3009/api/health
```

### 2. Web app

```bash
git clone https://github.com/Luckee-Core/my-health-open-source.git
cd my-health-open-source
npm install
cp .env.example .env.local
```

Minimum in `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3009
```

```bash
npm run dev
```

Open **http://localhost:3000** — landing at `/`, dashboard at `/appointments`. Routes also include `/doctors`, `/hospitals`, `/specialties`, `/focus-areas`, `/daily-entries`, `/medical-history-events`, `/symptom-logs`, `/research-notes`, `/research-note-detail-page`, and `/docs/api`.

---

## Environment variables

| Variable | In browser bundle? | Required | Purpose |
|----------|-------------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Yes | Rec (default `http://localhost:3009`) | Express base URL |
| `NEXT_PUBLIC_GITHUB_ORG` | Yes | No | Landing GitHub org |
| `NEXT_PUBLIC_GITHUB_WEB_URL` | Yes | No | Override web repo link |
| `NEXT_PUBLIC_GITHUB_API_URL` | Yes | No | Override API repo link |
| `NEXT_PUBLIC_DOCS_URL` | Yes | No | Override docs link |
| `NEXT_PUBLIC_THT_URL` | Yes | No | TroutHouseTech footer link |

**Do not** put `DATABASE_URL` or other server secrets in `NEXT_PUBLIC_*`. Those ship in the client bundle.

Full template: [.env.example](./.env.example)

---

## How the repo is laid out

```text
my-health-open-source/
├── src/
│   ├── app/                    # Thin Next.js routes
│   ├── packages/{feature}/     # Feature UI (landing, tables, modals)
│   ├── components/             # Shell: sidebar, bootstrap loader
│   ├── api/                    # Express HTTP clients
│   ├── store/                  # Redux dumps + manual thunks
│   ├── model/                  # Entity types
│   └── config/                 # API URL, route constants
└── .cursor/architecture/       # ADRs — read before large PRs
```

**Data flow:** component → thunk → `src/api/` → Express `/api/data/*` → Postgres.

Same split I use on other OSS dashboard slices: feature UI in `src/packages/`, thin `src/app`, no `createAsyncThunk`.

---

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Next dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm start` | Serve production build |

---

## Threat model (read this before exposing to the internet)

- Only `NEXT_PUBLIC_*` values embed in the browser. Treat them as public.
- Health rows live in **your** Postgres database. The web app only calls **your** Express API.
- v1 has **no API auth** on the companion server — fine for localhost, not fine on a public URL without hardening. See [SECURITY.md](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/SECURITY.md).

---

## Key takeaways

1. **Run Express + Postgres before the web app** — otherwise you are debugging the wrong layer.
2. **`NEXT_PUBLIC_API_URL` must match Express `PORT`** (default 3009).
3. **Doctors link to facilities and specialties** so appointment location is not free text.
4. **Fork both repos** if you change API shapes — keep the [wire contract](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/docs/oss/wire-contract.md) honest.

---

## Contributing

[CONTRIBUTING.md](./CONTRIBUTING.md) · OSS governance: [Express docs/oss/README.md](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/docs/oss/README.md)

## License

MIT — [LICENSE](./LICENSE)
