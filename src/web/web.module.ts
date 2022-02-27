import { DynamicModule, Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ProxyModule } from '../proxy/proxy.module';

@Module({})
export class WebModule {
  static forRoot(): DynamicModule {
    return {
      module: WebModule,
      imports: [
        process.env.NODE_ENV === 'production' &&
          ServeStaticModule.forRoot({
            rootPath: join(process.env.SERVE_PATH, 'web', 'dist'),
            exclude: ['/api*'],
          }),
        //process.env.NODE_ENV === 'development' && ProxyModule,
      ],
    };
  }
}
