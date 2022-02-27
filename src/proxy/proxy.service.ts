import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class ProxyService {
  constructor(private httpService: HttpService) {}

  findAll(request: Request) {
    return this.httpService.request({
      url: `http://localhost:3030${
        request.path === '/' ? '/index.html' : request.path
      }`,
    });
  }
}
