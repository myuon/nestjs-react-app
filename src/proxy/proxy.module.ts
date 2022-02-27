import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ExpressLoader } from './expressLoader';

// Deine ProxyModule similar to ServeStaticModule, ExpressLoader from @nestjs/serve-static
@Module({
  providers: [
    {
      provide: ExpressLoader,
      useFactory: (httpAdapter: HttpAdapterHost) => {
        if (!httpAdapter || !httpAdapter.httpAdapter) {
          return null;
        }

        return new ExpressLoader();
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class ProxyModule implements OnModuleInit {
  constructor(
    private loader: ExpressLoader,
    private httpAdapterHost: HttpAdapterHost,
  ) {}

  static forRoot(): DynamicModule {
    return {
      module: ProxyModule,
    };
  }

  public async onModuleInit() {
    this.loader.register(this.httpAdapterHost.httpAdapter);
  }
}
