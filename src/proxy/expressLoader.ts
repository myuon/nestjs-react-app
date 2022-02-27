import { AbstractHttpAdapter } from '@nestjs/core';

export class ExpressLoader {
  public async register(httpAdapter: AbstractHttpAdapter) {
    console.log('ExpressLoader.register');

    const app = httpAdapter.getInstance();
    app.get('*', async (req, res) => {
      res.send('Proxy');
    });
  }
}
