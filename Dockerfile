# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10.18.0-slim

ENV HOST=0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE 3000

RUN npm install
RUN npm run build
CMD ["npm", "start"]