# My Health — web wire contract

Cross-repo contract for **my-health-open-source** (Next.js) and **my-health-open-source-express-server** (Express).

Express canonical contract: [my-health-open-source-express-server/docs/oss/wire-contract.md](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/docs/oss/wire-contract.md)

## Ports and env

| Layer | Default port | Primary env |
| --- | --- | --- |
| Web | 3000 | — |
| Express | 3009 | `DATABASE_URL` |
| Web → Express | — | `NEXT_PUBLIC_API_URL` (default `http://localhost:3009`) |

## Web fetch paths

| Consumer | Method | Path | Notes |
| --- | --- | --- | --- |
| Dashboard thunks | REST | `/api/data/*` | Via `getApiClient()` per ADR 004 |
| Docs layout + `/docs/api` | GET | `/api-docs.json` | Via `getApiDocsCatalogCached()` — no Redux, no BFF |

## Documentation site

- Routes: `/docs`, `/docs/getting-started`, `/docs/api`
- Layout loads catalog once; sidebar API section mirrors Express `groups[]`
- Unavailable state when Express is down (prose pages still render)

## Verification

```bash
# Express
curl http://localhost:3009/api/health
curl -s http://localhost:3009/api-docs.json | jq '.data.groups | length'  # expect 8

# Web (Express must be running for API page)
open http://localhost:3000/docs/api
```

See ADR [009 – Documentation site](../.cursor/architecture/009-api-docs-page.md).
