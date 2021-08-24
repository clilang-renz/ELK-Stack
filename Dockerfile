FROM node:alpine

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

EXPOSE 8200

CMD ["npm", "run", "start"]
