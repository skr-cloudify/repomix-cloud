FROM node:23-alpine

RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 5173

CMD ["npm", "run", "docs:dev"]
