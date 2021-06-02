FROM node:lts-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

RUN yarn build

RUN yarn install --production

FROM node:lts-alpine

WORKDIR /app

COPY --from=build /app/lib/ /app/node_modules /app/public /app/views /app/app.js /app/

EXPOSE 5000

CMD node app.js