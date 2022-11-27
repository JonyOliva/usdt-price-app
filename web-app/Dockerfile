FROM node:alpine
WORKDIR /app
RUN apk add lm-sensors
COPY package*.json /
RUN npm install --production
COPY . .
ENTRYPOINT [ "npm", "run", "dev" ]