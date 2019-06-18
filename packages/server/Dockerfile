FROM node:10

WORKDIR /usr/src/codamit-server

COPY package*.json ./

RUN npm install

COPY ./.env.production ./.env
COPY . .

RUN npm run build

EXPOSE 8081
CMD [ "node", "-r", "dotenv/config", "dist/index.js" ]
