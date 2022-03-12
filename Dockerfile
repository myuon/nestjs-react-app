FROM node:16

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn 

COPY web/package.json ./web/
COPY web/yarn.lock ./web/
RUN cd ./web && yarn

COPY . .

RUN yarn build && cd web && yarn build
RUN cp -r web/dist dist/web

EXPOSE 3000
CMD ["yarn", "start:prod"]
