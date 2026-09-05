# file-tunnel.github.io

Public marketing and documentation site for
[File Tunnel](https://github.com/file-tunnel), built with Astro and deployed to
GitHub Pages.

## Develop

```bash
nix develop
npm ci
npm run dev
```

## Validate

```bash
nix develop --command agent-check
```

The Pages workflow deploys the static `dist/` artifact from `main`. The site has
no cookies, analytics, forms, or third-party runtime scripts. Its build and
deployment actions are pinned to immutable commits.

## Onboarding boundary

`/get-started/` keeps one-time, individual, and organization access visibly separate. One-time transfers need no account. Account modes explain that Shared Auth establishes identity while File Tunnel separately owns organization membership, roles, billing, devices, and resource authorization.

Account actions fail closed unless `PUBLIC_FTNL_CONTROL_ORIGIN` is set at build time to an HTTPS origin or an explicit HTTP loopback origin. Values containing credentials, paths, queries, or fragments are rejected. The static site never constructs an OAuth authorization request; the configured control service must own state, PKCE, exact redirect registration, callback exchange, session protection, and product authorization.

MIT licensed.
