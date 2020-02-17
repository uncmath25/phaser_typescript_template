FROM node:10.13.0-alpine

WORKDIR /usr/src/app
USER root

COPY ./package.json ./package.json

RUN npm install

COPY ./tsconfig.json ./tsconfig.json
COPY ./tslint.json ./tslint.json
COPY ./webpack.config.js ./webpack.config.js

COPY ./assets/ ./assets/
COPY ./src/ ./src/

USER node
EXPOSE 8000
CMD [ "npm", "run", "build" ]
