FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]