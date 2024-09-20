FROM node:18 as builder

WORKDIR /usr/app

COPY . .

RUN npm config set proxy null \
    && npm config set https-proxy null \
    && npm config set registry https://registry.npmmirror.com \
    && npm install \
    && npm run build

FROM nginx:latest

COPY --from=0 /usr/app/dist/ /usr/share/nginx/html
COPY --from=0 /usr/app/nginx/ /etc/nginx/conf.d/