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
