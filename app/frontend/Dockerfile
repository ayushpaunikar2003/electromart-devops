# Stage 1: Build React
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# CRITICAL: Build with relative path so Nginx handles routing
ENV REACT_APP_API_URL=
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy React Build
COPY --from=build /app/build /usr/share/nginx/html

# Copy Custom Nginx Config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Script to inject Backend IP at runtime
COPY <<EOF /docker-entrypoint.d/40-inject-backend-ip.sh
#!/bin/sh
# Replaces 'backend_upstream' with the actual IP env var
if [ -n "\$BACKEND_HOST" ]; then
    sed -i "s/backend_upstream/\$BACKEND_HOST/g" /etc/nginx/conf.d/default.conf
fi
EOF

RUN chmod +x /docker-entrypoint.d/40-inject-backend-ip.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
