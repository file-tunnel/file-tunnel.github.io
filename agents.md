# File Tunnel site agent instructions

These instructions apply to this repository and every directory beneath it.

## Repository role

- This repository is the public File Tunnel marketing and documentation site.
- Keep the site static, accessible, privacy-preserving, and deployable through
  the pinned GitHub Pages workflow.
- Do not add cookies, analytics, forms, trackers, or third-party runtime
  scripts without an explicit product and privacy decision.
- Never place capabilities, pairing secrets, user file metadata, credentials,
  or private deployment details in examples, page content, or build output.

## Validation

- Run `nix develop --command agent-check` before completing a change.
- Preserve the privacy, security, and product-name assertions in `tests/`.
- Keep generated `dist/` output and dependency directories out of commits.

## Git workflow

- Keep changes focused and reviewable.
- Pull and merge remote work before pushing; avoid git rebase in favor of git merge.
- Never discard unrelated or uncommitted user work.
