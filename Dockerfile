# Portfólio (Vue + Vite): build estático servido pelo Caddy.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
# Variáveis VITE_* são embutidas no bundle em tempo de build
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL \
    VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
RUN npm run build

FROM caddy:2-alpine
COPY infrastructure/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv/portfolio
