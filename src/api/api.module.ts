import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { MeController } from '../me/me.controller';

@Module({
  imports: [
    RouterModule.register([
      {
        path: '/api',
        module: ApiModule,
      },
    ]),
  ],
  controllers: [AppController, MeController],
  providers: [AppService],
})
export class ApiModule {}
