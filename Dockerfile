# Stage 1: Build Node.js application
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:22-alpine AS runtime

WORKDIR /app

RUN apk update && apk add --no-cache \
    bash \
    dos2unix \
    nginx \
    supervisor

COPY --from=build /app/dist /app/dist

COPY --from=build /app/package.json /app/package.json

COPY serviceAccount.json /app/serviceAccount.json

COPY .env /app/.env

RUN npm install --production

COPY docker/nginx/nginx.conf /etc/nginx/nginx.conf

COPY docker/nginx/conf.d /etc/nginx/conf.d/

# Configure supervisord
COPY docker/start-container /usr/local/bin/start-container

COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Chuyển đổi script start-container sang LF line endings
RUN dos2unix /usr/local/bin/start-container

RUN chmod +x /usr/local/bin/start-container

EXPOSE 8080

ENTRYPOINT ["start-container"]
