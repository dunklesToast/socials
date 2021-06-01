FROM node:lts-alpine AS install

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

FROM node:lts-alpine

WORKDIR /app

COPY ./people ./public ./views ./app.js ./getInfo.js ./
COPY --from=install /app/node_modules ./

EXPOSE 5000

CMD node app.js