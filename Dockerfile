FROM node:alpine as builder

COPY ./package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /app && cp -R ./node_modules ./app

WORKDIR /app

COPY . .

## Build the ng app in production mode and store the artifacts in build folder

RUN npm run build

### STAGE 2: Setup ###

FROM nginx:alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in build folder to default nginx public folder
COPY --from=builder /app/build /usr/share/nginx/html

# Replace default config
COPY ./nginx.template.conf /etc/nginx/conf.d/default.conf

# Add htpasswd file
COPY .htpasswd /etc/nginx/

EXPOSE 80


