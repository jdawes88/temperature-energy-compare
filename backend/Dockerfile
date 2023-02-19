FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json .

COPY package.json .
COPY tsconfig.json .
COPY src src

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

COPY src/data dist/data

CMD [ "node", "dist/server.js" ]