# 009 – Documentation site (`/docs`)

## Status
Accepted

## Context
**my-health-open-source** calls Express for all domain data (ADR 004). Documentation includes prose guides (self-host setup) and a live API reference catalog from Express at `GET /api-docs.json` (express ADR 008). This ADR defines how the web app renders `/docs/**`.

## Decision

### 1) Docs shell and routes
- Shared layout: `src/app/docs/layout.tsx` wraps all docs routes in `DocsShell` from `src/packages/docs/`.
- `/docs` is an overview page with links to guides and API reference.
- Prose pages are thin Server Components under `src/app/docs/**/page.tsx`.
- API reference: `src/app/docs/api/page.tsx` → `ApiDocsView` (client) from `src/packages/api-docs/`.

### 2) Package layout
| Package | Role |
| --- | --- |
| `src/packages/docs/` | Shell, sidebar, nav tree, shared article styles |
| `src/packages/api-docs/` | API catalog UI (`ApiDocsView`, `ApiDocsContent`, `EndpointCard`) |

Cross-feature docs chrome lives in `src/packages/docs/`; API-specific rendering stays in `src/packages/api-docs/`.

### 3) Sidebar navigation
- Two sections in `DocsSidebar`: **Guides** (`DOCS_NAV_ENTRIES`) and **API** (catalog groups).
- API groups are injected from the Express catalog in `src/app/docs/layout.tsx` via `buildApiGroupSidebarChildren()`.
- Path constants in `src/config/routes.ts` (`DOCS_*`).
- `DocsSidebar` is a client component using `usePathname()` and `hashchange` for active states on `#group-*` anchors.

### 4) Data fetching (single layout fetch)
- `src/app/docs/layout.tsx` calls `getApiDocsCatalogCached()` once and passes the snapshot to `DocsCatalogProvider`.
- `ApiDocsView` reads that context — **no second fetch** on `/docs/api`.
- **No Redux slice or thunk** — catalog is ephemeral page data, not dashboard state.
- Do **not** add `src/app/api/**` route handlers for docs.

### 5) API client
- `getApiDocsCatalog()` returns `Promise<ApiResponse<ApiDocsCatalog>>`.
- Uses `getApiClient()` and `fromExpressBody` per ADR 004.
- Catalog types duplicated in `src/api/api-docs/types.ts` (no shared npm package).

### 6) UI rules
- Named exports only; default export only on `app/docs/**/page.tsx`.
- Styles object pattern (ADR 003); one primary component per file (ADR 005).
- `/docs` is outside `(dashboard)/` — no detail-page routing concerns (ADR 008).

### 7) Landing link
- `DOCS_URL` in `landing-content.ts` defaults to `/docs`.

## Consequences
- Express must be running for `/docs/api` to load catalog content; prose pages are static.
- Catalog shape changes require updates in both repos.
- New docs pages require an entry in `DOCS_NAV_ENTRIES` and a route constant in `src/config/routes.ts`.

## Related
- [004 – API integration](./004-api-integration.md)
- [002 – Component composition](./002-component-composition.md)
- express server [008 – API docs catalog](../../my-health-open-source-express-server/.cursor/architecture/008-api-docs-catalog.md)
