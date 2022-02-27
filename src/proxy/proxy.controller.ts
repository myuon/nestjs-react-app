import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';

@Controller('proxy')
export class ProxyController {
  constructor(private httpService: HttpService) {}

  @Get()
  findAll() {
    console.log('proxy');
    return this.httpService.get('http://localhost:3030');
  }
}
