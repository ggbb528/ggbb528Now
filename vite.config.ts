import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import makeManifest from './utils/plugins/make-manifest';
import copyContentStyle from './utils/plugins/copy-content-style';

const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');
const assetsDir = resolve(root, 'assets');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

export default defineConfig({
  resolve: {
    alias: {
      '@src': root,
      '@assets': assetsDir,
      '@pages': pagesDir,
    },
  },
  plugins: [react(), makeManifest(), copyContentStyle()],
  publicDir,
  build: {
    outDir,
    sourcemap: process.env.__DEV__ === 'true',
    rollupOptions: {
      input: {
        content: resolve(pagesDir, 'content', 'index.ts'),
        background: resolve(pagesDir, 'background', 'index.ts'),
        popup: resolve(pagesDir, 'popup', 'index.html'),
        options: resolve(pagesDir, 'options', 'index.html'),
      },
      output: {
        entryFileNames: (chunk) => `src/pages/${chunk.name}/index.js`,
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __APP_NAME__: JSON.stringify('ggbb528now'),
    __APP_CONFIG_TWITCH_CHANNEL__: JSON.stringify(
      'https://www.twitch.tv/ggbb528'
    ),
    __APP_CONFIG_TWITCH_API__: JSON.stringify('https://api.twitch.tv/helix'),
    __APP_CONFIG_TWITCH_ID_API__: JSON.stringify('https://id.twitch.tv/oauth2'),
  },
});
