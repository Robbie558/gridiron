FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

ENV NODE_ENV development
RUN npm install
RUN npm install nodemon -g
COPY . /usr/src/app
ENV NODE_ENV production

ARG EXPOSE_PORT
EXPOSE $expose_port

USER node