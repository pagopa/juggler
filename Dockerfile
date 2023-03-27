ARG NODE_VERSION=18.13.0
# Step 1 - Compile code
FROM node:${NODE_VERSION}-alpine as build

WORKDIR /app

COPY --chown=node:node . /app
RUN npm install && npm run generate:api && npm run build --cache /app/.npm/cache
# Remove the cache folder from .next/
RUN rm -rf .next/cache

# Remove node_modules
RUN rm -rf node_modules
# Install only production dep
RUN npm install --production --ignore-scripts && npm cache clean --force

# Step 2 - Prepare production image
FROM node:${NODE_VERSION}-alpine

RUN mkdir -p /app
RUN chown -Rh node:node /app

USER node
WORKDIR /app
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/.next /app/.next
COPY --chown=node:node --from=build /app/next.config.js /app/next.config.js

ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000
CMD ["node", "/app/dist/main.js"]
