# `src/packages` — Feature modules

**Domain-owned UI** for My Health: one folder per screen. Route files under `src/app` import the package barrel only.

## Screen map

| Route | Package |
|-------|---------|
| `/` | `landing/` |
| `/docs/*` | `docs/` |
| `/docs/api` | `api-docs/` |
| `/appointments` | `appointments/` |
| `/doctors` | `doctors/` |
| `/hospitals` | `hospitals/` |
| `/specialties` | `specialties/` |
| `/focus-areas` | `focus-areas/` |
| `/daily-entries` | `daily-entries/` |
| `/medical-history-events` | `medical-history-events/` |
| `/symptom-logs` | `symptom-logs/` |
| `/research-notes` | `research-notes/` |
| `/research-note-detail-page` | `research-note-detail-page/` |

Path constants: `src/config/routes.ts`.

## Layout (typical)

```text
src/packages/<feature>/
  index.tsx           # Main component — export const FeaturePage = …
  index.ts            # Barrel re-exports public API (ADR 005)
  <sub-component>/    # One component per folder when split
    index.tsx
```

## Redux and API

| Concern | Location |
|---------|----------|
| Slices, builders, dumps | `src/store/` |
| Thunks | `src/store/thunks/` |
| HTTP clients | `src/api/{domain}/` |
| Domain types | `src/model/` |

Packages dispatch thunks via `useAppDispatch` / `useAppSelector` from `@/store`. **Do not** add `store/` or `api/` inside packages.

Browser calls Express directly via `NEXT_PUBLIC_API_URL` (ADR 004 / 008 — no Next.js BFF).
