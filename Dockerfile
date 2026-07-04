# ---------- Dockerfile de produção (Next.js standalone) ----------
# Build multi-stage: deps -> builder -> runner. Imagem final enxuta rodando
# o servidor standalone do Next na porta 3000.
#
# IMPORTANTE: variáveis NEXT_PUBLIC_* são embutidas no bundle durante o
# `next build`. Por isso elas entram como BUILD ARGS (não só como env de
# runtime). No EasyPanel, defina-as em "Build > Build Args".

# 1) Dependências ------------------------------------------------------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# 2) Build -------------------------------------------------------------------
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Recebe as variáveis públicas no momento do build e as expõe para o next build.
ARG NEXT_PUBLIC_WHATSAPP=5551995622999
ARG NEXT_PUBLIC_WEBHOOK_URL=
ENV NEXT_PUBLIC_WHATSAPP=$NEXT_PUBLIC_WHATSAPP
ENV NEXT_PUBLIC_WEBHOOK_URL=$NEXT_PUBLIC_WEBHOOK_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 3) Runner ------------------------------------------------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Usuário não-root
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Artefatos do output standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
