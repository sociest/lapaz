import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localSdkSrc = path.resolve(__dirname, '../datamesh-sdk/bindings/typescript/src/index.ts');
const shouldUseLocalSdk = fs.existsSync(localSdkSrc);

export default defineConfig({
  output: 'static',
  site: 'https://datosbolivia.github.io',
  base: '/lapaz',
  build: {
    format: 'file'
  },
  vite: {
    plugins: [
      {
        name: 'dev-sw-and-base-redirect',
        configureServer(server) {
          server.middlewares.stack.unshift({
            route: '',
            handle(req, res, next) {
              const url = req.url ? req.url.split('?')[0] : '';
              if (url === '/sw.js') {
                res.setHeader('Content-Type', 'application/javascript');
                res.statusCode = 200;
                res.end(
                  "self.addEventListener('install', () => self.skipWaiting());\n" +
                  "self.addEventListener('activate', () => self.registration.unregister());\n"
                );
                return;
              }
              if (url === '/' || url === '/index.html') {
                res.writeHead(302, { Location: '/lapaz/' });
                res.end();
                return;
              }
              if (url === '/about' || url === '/docs' || url.startsWith('/datasets')) {
                res.writeHead(302, { Location: `/lapaz${url}` });
                res.end();
                return;
              }
              next();
            }
          });
        }
      }
    ],
    resolve: {
      alias: shouldUseLocalSdk ? {
        '@datosbolivia/datamesh-client': localSdkSrc,
      } : {},
    },
    optimizeDeps: {
      exclude: ['@datosbolivia/datamesh-client'],
      include: ['hyparquet']
    },
  },
});
