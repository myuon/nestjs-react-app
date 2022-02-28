import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  const { defineServer } = require(path.resolve(__dirname, '../web/server.js'));
  await defineServer(app, path.resolve(__dirname, '../web'));

  await app.listen(3000);
}
bootstrap();
