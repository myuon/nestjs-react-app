import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';
import { createRequire } from 'module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV === 'development') {
    const require = createRequire(__dirname);
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    const config = require(path.resolve(
      __dirname,
      '../../web/webpack.config.js',
    ));
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler));
  }

  await app.listen(3000);
}
bootstrap();
