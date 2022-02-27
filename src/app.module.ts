import { Module } from '@nestjs/common';
import { WebModule } from './web/web.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    // /api
    ApiModule,
    // / (proxy for web or localhost:3000)
    WebModule,
  ],
})
export class AppModule {}
