FROM node:8-alpine

RUN apk add --no-cache 'su-exec>=0.2'

RUN apk add --no-cache \
  bash

ENV NODE_ENV production

ENV GHOST_CLI_VERSION 1.8.1
RUN npm install -g "ghost-cli@$GHOST_CLI_VERSION"

ENV GHOST_INSTALL /var/lib/ghost
ENV GHOST_CONTENT /var/lib/ghost/content

ENV GHOST_VERSION 1.25.4

RUN set -ex; \
  mkdir -p "$GHOST_INSTALL"; \
  chown node:node "$GHOST_INSTALL"; \
  \
  su-exec node ghost install "$GHOST_VERSION" --db sqlite3 --no-prompt --no-stack --no-setup --dir "$GHOST_INSTALL"; \
  \
  cd "$GHOST_INSTALL"; \
  su-exec node ghost config --ip 0.0.0.0 --port 2368 --no-prompt --db sqlite3 --url https://codamit.com --dbpath "$GHOST_CONTENT/data/ghost.db"; \
  su-exec node ghost config paths.contentPath "$GHOST_CONTENT"; \
  \
  su-exec node ln -s config.production.json "$GHOST_INSTALL/config.development.json"; \
  readlink -f "$GHOST_INSTALL/config.development.json"; \
  \
  mv "$GHOST_CONTENT" "$GHOST_INSTALL/content.orig"; \
  mkdir -p "$GHOST_CONTENT"; \
  chown node:node "$GHOST_CONTENT"; \
  \
  "$GHOST_INSTALL/current/node_modules/knex-migrator/bin/knex-migrator" --version

ENV PATH $PATH:$GHOST_INSTALL/current/node_modules/knex-migrator/bin

WORKDIR $GHOST_INSTALL
VOLUME $GHOST_CONTENT

COPY docker-entrypoint.sh /usr/local/bin
ENTRYPOINT ["docker-entrypoint.sh"]

EXPOSE 2368
CMD ["node", "current/index.js"]
