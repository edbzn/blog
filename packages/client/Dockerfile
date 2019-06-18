FROM node:10 AS builder

WORKDIR /codamit-client

COPY package*.json ./

RUN npm install

COPY ./.env.production ./.env
COPY . .

RUN npm run build

FROM nginx:1.17.0

COPY nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /codamit-client/dist /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'

