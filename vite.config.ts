import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          ozellikler: path.resolve(__dirname, 'ozellikler.html'),
          hakkimizda: path.resolve(__dirname, 'hakkimizda.html'),
          blog: path.resolve(__dirname, 'blog.html'),
          iletisim: path.resolve(__dirname, 'iletisim.html'),
          gizlilik: path.resolve(__dirname, 'gizlilik.html'),
          kullanimKosullari: path.resolve(__dirname, 'kullanim-kosullari.html'),
          kvkk: path.resolve(__dirname, 'kvkk.html'),
          cerez: path.resolve(__dirname, 'cerez.html'),
          notFound: path.resolve(__dirname, '404.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
