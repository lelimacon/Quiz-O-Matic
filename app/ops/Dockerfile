FROM node:alpine3.20 AS build

# Copy static files.
COPY app/www/ out/www/
COPY template/ out/www/template/

# Copy app source and compile.
COPY app/ app/
RUN npm install --global elm
WORKDIR /app/
RUN elm make ./src/Main.elm --output ../out/www/app.js


FROM nginx:stable-alpine3.17-slim AS base

# Copy build.
COPY --from=build /out/www/ /var/www/

# Copy nginx configuration.
COPY ./app/ops/nginx.conf /etc/nginx/conf.d/default.conf
