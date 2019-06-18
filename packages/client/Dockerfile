FROM node:10 AS builder

WORKDIR /codamit-client

COPY package*.json ./

RUN npm install

COPY ./.env.production ./.env
COPY . .

RUN npm run build

FROM nginx:stable AS app

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /codamit-client/dist /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
