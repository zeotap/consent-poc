FROM node:12.16-alpine as builder

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci

COPY . .
RUN npm run build-prod

FROM nginx:1.17.1-alpine

COPY --from=builder /app/dist/consent-poc /dist
COPY nginx.conf /etc/nginx/nginx.conf

VOLUME /var/log/nginx/
VOLUME /dist

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
