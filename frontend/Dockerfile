FROM node:14.17.0-alpine3.13
WORKDIR /frontend

COPY package*.json .
RUN npm install
COPY . .

CMD ["npm", "start"]