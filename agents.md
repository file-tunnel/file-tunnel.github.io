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

## Repository-local Git worktrees

- Create or use a Git worktree only when the human operator explicitly authorizes it for the current task. Concurrency or a dirty checkout is not permission by itself.
- Put every authorized worktree at `<repository-root>/tmp/worktrees/<name>`; from the repository root, use `./tmp/worktrees/<name>`. Never place worktrees beside repositories or organization directories.
- Keep `tmp`, `temp`, `tmp/worktrees`, and `temp/worktrees` ignored in the repository-root `.gitignore`. Do not commit files from those directories.
- Relocate or remove a worktree only when the operator explicitly requests it. Before removal, preserve and publish intended changes, verify its commit is represented on the target branch, and confirm there are no tracked, untracked, ignored-sensitive, or in-use files that must survive. Remove it with `git worktree remove <path>` without `--force`; never delete a worktree directory with `rm`.
