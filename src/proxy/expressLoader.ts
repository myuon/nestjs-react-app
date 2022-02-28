import { AbstractHttpAdapter } from '@nestjs/core';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';

const SSR = process.env.SSR || true;

async function defineServer(app) {
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr',
      watch: { usePolling: true, interval: 100 },
      port: 3000,
    },
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(
        path.resolve(__dirname, SSR ? 'index.ssr.html' : 'index.html'),
        'utf-8',
      );

      template = await vite.transformIndexHtml(url, template);

      if (SSR) {
        const { render } = await vite.ssrLoadModule(
          path.resolve(__dirname, './src/entry-server.tsx'),
        );
        const appHtml = await render(url);
        const html = template.replace(`<!--ssr-outlet-->`, appHtml);

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } else {
        res.status(200).end(template);
      }
    } catch (e) {
      // If an error is caught, let Vite fix the stracktrace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

export class ExpressLoader {
  public async register(httpAdapter: AbstractHttpAdapter) {
    console.log('ExpressLoader.register');
  }
}
