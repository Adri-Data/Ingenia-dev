# Etapa 1: Dependencias y Build
FROM node:22-slim AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
ARG NEXT_PUBLIC_MAX_MESSAGES_PER_PROJECT=10
ARG NEXT_PUBLIC_MAX_PROJECTS_PER_USER=2

ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL} \
	NEXT_PUBLIC_MAX_MESSAGES_PER_PROJECT=${NEXT_PUBLIC_MAX_MESSAGES_PER_PROJECT} \
	NEXT_PUBLIC_MAX_PROJECTS_PER_USER=${NEXT_PUBLIC_MAX_PROJECTS_PER_USER}

# Desactivamos telemetría
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Etapa 2: Runner
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copiamos lo esencial
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
