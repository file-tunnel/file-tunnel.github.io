# shellcheck shell=bash
set -euo pipefail

npm ci
npm test
npm run build
