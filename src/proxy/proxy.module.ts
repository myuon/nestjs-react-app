import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProxyController } from './proxy.controller';

@Module({
  imports: [HttpModule],
  providers: [ProxyController],
})
export class ProxyModule {}
