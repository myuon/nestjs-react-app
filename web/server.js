// https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createServer: createViteServer } = require('vite');

const SSR = process.env.SSR || true;

async function defineServer(app) {
  // Create Vite server in middleware mode. This disables Vite's own HTML
  // serving logic and let the parent server take control.
  //
  // In middleware mode, if you want to use Vite's own HTML serving logic
  // use `'html'` as the `middlewareMode` (ref https://vitejs.dev/config/#server-middlewaremode)
  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr',
      watch: { usePolling: true, interval: 100 },
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
        const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');
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

async function createServer() {
  const app = express();

  defineServer(app);
  app.listen(3030);
}

createServer();
