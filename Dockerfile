FROM node:alpine as builder

COPY ./package.json ./

RUN apk update \
    && apk add --virtual build-dependencies \
        build-base \
        gcc \
        wget \
        git \
    && apk add \
        bash

RUN npm rebuild \
        && npm install \
        && npm cache clean --force \
        && mkdir /app \
        && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

## Build the ng app in production mode and store the artifacts in build folder

RUN npm run build

RUN apk del build-dependencies

### STAGE 2: Setup ###

FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in build folder to default nginx public folder
COPY --from=builder /app/build /usr/share/nginx/html
