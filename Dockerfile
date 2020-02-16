FROM node:10.13.0-alpine

WORKDIR /usr/src/app

COPY ./project ./

RUN npm install

COPY ./assets/ ./assets/
COPY ./src/ ./src/

EXPOSE 8000
CMD [ "npm", "run", "build" ]
