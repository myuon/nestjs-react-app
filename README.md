# nestjs-react-app

## Start dev server

```
$ yarn start:dev
```

## Start prod server

```
$ yarn build && cp -r web/dist dist/web && yarn start:prod
```

## Or use docker in prod

```
$ docker build -t app . && docker run -p 80:3000 -d app
```
