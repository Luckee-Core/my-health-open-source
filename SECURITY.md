# Security Policy

## Supported versions

| Version | Supported |
|---------|-----------|
| Latest release tag | Yes |
| `main` branch | Best-effort |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Report privately via GitHub Security Advisories on this repository, or email security concerns to the maintainers through your TroutHouseTech contact channel.

Include:

- Description of the issue
- Steps to reproduce
- Impact assessment
- Suggested fix (if any)

We aim to acknowledge reports within 7 days.

## Scope

This project is a **self-hosted health data dashboard** intended for local or trusted-network use.

### In scope

- Secrets exposed in the web bundle (`NEXT_PUBLIC_*`)
- XSS or injection in the Next.js UI
- Incorrect documentation that leads to unsafe deployment

### Out of scope (by design for OSS v1)

- Missing API authentication on the companion Express server when run on localhost for personal use. See the companion repo `SECURITY.md` and [wire contract](https://github.com/matthewruiz/my-health-open-source-express-server/blob/main/docs/oss/wire-contract.md).

## Threat model (web)

- Only `NEXT_PUBLIC_*` variables are embedded in the browser bundle. Never put `DATABASE_URL` or other server secrets in `NEXT_PUBLIC_*`.
- The web app calls your self-hosted Express API; health data does not leave your stack unless you deploy the API to an untrusted network without additional hardening.
- Deploying this app to the public internet without authentication on the API is **not recommended**.

## Best practices for operators

1. Run Express on localhost or a private network until you add auth.
2. Use HTTPS and restrict CORS when exposing the API beyond localhost.
3. Rotate Postgres credentials if `DATABASE_URL` may have been exposed.
