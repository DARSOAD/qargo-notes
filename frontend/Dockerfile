# syntax=docker/dockerfile:1.7

########## BUILD STAGE ##########
FROM node:20-alpine AS builder
WORKDIR /app


COPY package*.json ./
RUN npm ci

ARG VITE_API_BASE_URL=http://localhost:8000
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}


COPY . .
RUN npm run build

########## RUNTIME STAGE ##########
FROM nginx:alpine AS runtime

RUN printf 'server {\n\
  listen 80;\n\
  server_name _;\n\
  root /usr/share/nginx/html;\n\
  index index.html;\n\
  location / {\n\
    try_files $uri $uri/ /index.html;\n\
  }\n\
  # Opcional: gzip básico\n\
  gzip on;\n\
  gzip_types text/plain text/css application/json application/javascript application/octet-stream image/svg+xml;\n\
}\n' > /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
