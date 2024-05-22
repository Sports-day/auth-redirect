FROM node:18.20.0 AS Builder

WORKDIR /app

# fetch packages
COPY package*.json ./
RUN yarn

FROM node:18.20.0-alpine AS Runner

WORKDIR /app

COPY --from=Builder /app/package.json ./
COPY --from=Builder /app/node_modules/ ./node_modules/

# copy files for build
COPY app/ ./app/
COPY tsconfig.json .
COPY next.config.mjs .

EXPOSE 3000

CMD yarn build && yarn start