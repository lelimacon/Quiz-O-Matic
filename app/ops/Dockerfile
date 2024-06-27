FROM node:alpine3.20 AS build

# Copy static files.
COPY app/src/ out/www/
COPY template/ out/www/template/


FROM nginx:stable-alpine3.17-slim AS base

# Copy build.
COPY --from=build /out/www/ /var/www/

# Copy nginx configuration.
COPY ./app/ops/nginx.conf /etc/nginx/conf.d/default.conf
