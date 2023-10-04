# Check out https://hub.docker.com/_/node to select a new base image
# build stage
FROM node:16-slim AS build
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:16-slim
RUN mkdir /home/node/code
WORKDIR /home/node/code
EXPOSE 3000
COPY package.json ./
COPY --from=build --chown=node:node /build/.nuxt ./.nuxt
COPY --from=build --chown=node:node /build/node_modules ./node_modules
COPY nuxt.config.js ./
COPY i18n ./i18n
ENV HOST=0.0.0.0
CMD ["yarn", "start"]