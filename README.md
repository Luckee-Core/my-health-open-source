# My Health

Open-source, self-hostable health dashboard. Track appointments, care team (doctors, facilities, specialties), focus areas, and daily entries. Next.js web app paired with an Express + Supabase API.

**Companion API repo:** [my-health-open-source-express-server](https://github.com/matthewruiz/my-health-open-source-express-server)

**Wire contract:** [Express docs/oss/wire-contract.md](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/docs/oss/wire-contract.md)

## Features

- Landing page with OSS onboarding and architecture overview
- Dashboard for hospitals, specialties, doctors, appointments, focus areas, daily entries
- Redux with manual thunks; API clients in `src/api/`
- Env-driven GitHub and docs links on the landing page

## Prerequisites

- Node.js 20+ (see `.nvmrc`)
- [My Health Express API](https://github.com/matthewruiz/my-health-open-source-express-server) running with Supabase configured

## Quick start

### 1. Start the API first

Follow the [Express README](https://github.com/matthewruiz/my-health-open-source-express-server#quick-start): apply Supabase SQL, configure `.env`, run `npm run dev` on port **3009**.

Verify:

```bash
curl http://localhost:3009/api/health
```

### 2. Clone and install the web app

```bash
git clone https://github.com/matthewruiz/my-health-open-source.git
cd my-health-open-source
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
```

Minimum:

```env
NEXT_PUBLIC_API_URL=http://localhost:3009
```

### 4. Run the dashboard

```bash
npm run dev
```

Open **http://localhost:3000** — landing page at `/`, dashboard routes under `/appointments`, `/doctors`, `/hospitals`, `/specialties`, and related screens.

## Environment variables

| Variable | Client-visible? | Required | Purpose |
|----------|-----------------|----------|---------|
| `NEXT_PUBLIC_API_URL` | Yes | Rec (default `http://localhost:3009`) | Express API base URL |
| `NEXT_PUBLIC_GITHUB_ORG` | Yes | No | Landing GitHub org |
| `NEXT_PUBLIC_GITHUB_WEB_URL` | Yes | No | Override web repo link |
| `NEXT_PUBLIC_GITHUB_API_URL` | Yes | No | Override API repo link |
| `NEXT_PUBLIC_DOCS_URL` | Yes | No | Override docs link |
| `NEXT_PUBLIC_THT_URL` | Yes | No | TroutHouseTech footer link |

Never put Supabase service-role keys in `NEXT_PUBLIC_*`.

See [.env.example](./.env.example).

## Architecture

```text
my-health-open-source/
├── src/
│   ├── app/                    # Thin Next.js routes
│   ├── packages/{feature}/     # Feature UI (landing, tables, modals)
│   ├── components/             # Shared layout (sidebar, shell)
│   ├── api/                    # Express HTTP clients
│   ├── store/                  # Redux dumps, thunks
│   ├── model/                  # Entity types
│   └── config/                 # API URL, routes
└── .cursor/architecture/       # ADRs
```

Data flow: components → thunks → `src/api/` → Express `/api/data/*` → Supabase.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm start` — run production build

## Threat model

- Only `NEXT_PUBLIC_*` values are embedded in the browser bundle.
- Health data stays in your Supabase instance; the web app talks only to your Express API.
- Do not deploy to the public internet without securing the API (auth, HTTPS, CORS). See companion [SECURITY.md](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/SECURITY.md).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). OSS governance links: [Express docs/oss/README.md](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/docs/oss/README.md).

## License

MIT — see [LICENSE](./LICENSE).
