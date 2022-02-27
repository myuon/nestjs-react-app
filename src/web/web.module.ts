import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProxyModule } from '../proxy/proxy.module';

@Module({
  imports: [
    process.env.NODE_ENV === 'production' &&
      ServeStaticModule.forRoot({
        rootPath: join(process.env.SERVE_PATH, 'web', 'dist'),
        exclude: ['/api*'],
      }),
    process.env.NODE_ENV === 'development' && ProxyModule.forRoot(),
  ].filter(Boolean),
})
export class WebModule {}
