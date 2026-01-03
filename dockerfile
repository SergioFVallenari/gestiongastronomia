# Stage 1: build frontend
FROM node:20-slim AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --prefer-offline --no-audit
COPY frontend/ ./
RUN npm run build:prod

# Stage 2: backend + frontend
FROM node:20-slim
WORKDIR /app

# Copiar backend package.json y node_modules
COPY backend/package*.json ./
RUN npm ci --only=production --prefer-offline --no-audit

# Copiar backend completo y compilar TS
COPY backend/ ./
RUN npm run build:prod   
# genera dist/

# Copiar frontend construido a /app/public
COPY --from=frontend-builder /app/frontend/dist ./public

# Puerto Cloud Run
ENV PORT=4000
EXPOSE 4000

# CMD
CMD ["npm", "start"]
