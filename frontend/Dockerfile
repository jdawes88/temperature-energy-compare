FROM node:lts-alpine

WORKDIR /usr/src/application

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD ["npm", "start"]