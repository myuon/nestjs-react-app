import { All, Controller, Get, Options, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { map } from 'rxjs/operators';
import { ProxyService } from './proxy.service';

@Controller('*')
export class ProxyController {
  constructor(private proxyService: ProxyService) {}

  @All()
  findAll(@Req() request: Request, @Res() response: Response) {}
}
