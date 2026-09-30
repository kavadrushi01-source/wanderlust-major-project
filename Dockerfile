# ------------------------------------------------------------------
# Wanderlust - production image
#
# This image runs on any container host:
#   Back4App Containers, Koyeb, Northflank, Railway, Fly.io,
#   Google Cloud Run, Hugging Face Spaces, a plain VPS, ...
#
# Only PORT is required at runtime (app.js reads process.env.PORT).
# ------------------------------------------------------------------
FROM node:24-alpine

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

# Dependencies first, so this layer stays cached when only code changes
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Application code (.dockerignore keeps node_modules, .env and .git out)
COPY . .

# Run as the unprivileged "node" user that ships with the base image
RUN chown -R node:node /app
USER node

EXPOSE 8080

# Simple self check for hosts that support container health checks
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 8080) + '/healthz').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "app.js"]
