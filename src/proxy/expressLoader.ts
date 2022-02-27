import { AbstractHttpAdapter } from '@nestjs/core';
import axios from 'axios';
import { Request, Response } from 'express';

export class ExpressLoader {
  public register(httpAdapter: AbstractHttpAdapter) {
    console.log('ExpressLoader.register');

    const app = httpAdapter.getInstance();
    app.get('*', async (req: Request, res: Response) => {
      const resp = await axios.request({
        url: `http://localhost:3030${
          req.url === '/' ? '/index.html' : req.url
        }`,
      });
      console.log(resp.headers);

      res.set(resp.headers).send(resp.data);
    });
  }
}
