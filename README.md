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

MIT licensed.
