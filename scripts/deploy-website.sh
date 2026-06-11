#!/usr/bin/env bash
# deploy-website.sh
# Deploys the frontend to Cloudflare Pages

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "🚀 Starting Deployment from WSL (Cloudflare Pages)..."
cd "$PROJECT_ROOT"

NODE_CMD="${NODE_FALLBACK_CMD:-$HOME/.node-fallback/bin/node}"
if [ ! -x "$NODE_CMD" ]; then
    NODE_CMD="$(command -v node || true)"
fi

WRANGLER_BIN="$PROJECT_ROOT/node_modules/.bin/wrangler"
if [ ! -f "$WRANGLER_BIN" ]; then
    echo "❌ Error: Wrangler binary not found at $WRANGLER_BIN."
    exit 1
fi
WRANGLER_CMD=("$NODE_CMD" "$WRANGLER_BIN")

# Optional: Disable TLS verification for WARP
export NODE_TLS_REJECT_UNAUTHORIZED=0

echo "📦 Deploying dist/ to Cloudflare Pages..."
# Use YES to automatically create the project if it doesn't exist? Actually wrangler pages deploy doesn't have --yes.

"${WRANGLER_CMD[@]}" pages deploy dist --project-name inner-potential-assessment

echo "✅ Website deployment completed successfully!"
