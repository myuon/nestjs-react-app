import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import { createRequire } from 'module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV === 'development') {
    const require = createRequire(__dirname);
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require(path.resolve(__dirname, '../web/webpack.config.js'));
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.entry.push('webpack-hot-middleware/client?reload=true');

    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler));
    app.use(webpackHotMiddleware(compiler));
  } else {
    app.use(express.static(path.resolve(__dirname, 'web')));
    app.use('/', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        next();
      }
      res.sendFile(path.resolve(__dirname, 'web/index.html'));
    });
  }

  await app.listen(3000);
}
bootstrap();
