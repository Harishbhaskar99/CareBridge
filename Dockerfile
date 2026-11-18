# Stage 1: Build and prune dependencies
FROM node:lts-slim AS build
WORKDIR /app
COPY package*.json ./
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
RUN npm install
COPY . .
RUN npm run build --prefix frontend
RUN npm prune --production

# Stage 2: Production server
FROM node:lts-slim
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/backend ./backend
COPY --from=build /app/frontend/dist ./frontend/dist
# Also need root package.json for module resolution
COPY --from=build /app/package.json ./package.json

ENV PORT 8080
ENV GOOGLE_CLOUD_LOCATION "us-central1"
ENV GOOGLE_CLOUD_PROJECT "accel-2026-100"
ENV SECRET_KEY "guUpYeumBsHn1fHfd2itsecKpzD7uBZa"
ENV PROXY_HEADER "fvkSN_y9bjIqQMhnApf-fcm9v4rC2yBa"
EXPOSE 8080

CMD ["node", "backend/server.js"]
