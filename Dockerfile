FROM node:15.12.0-alpine3.13 AS builder
WORKDIR /app
COPY . ./

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

FROM node:15.12.0-alpine3.13 
WORKDIR /app

COPY package*.json ./
COPY node_modules ./node_modules
COPY --from=builder ./app/dist/ ./dist
COPY src/openapi.yaml ./dist

RUN npm prune --production

CMD npm run start