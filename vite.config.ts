import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        root: resolve('index.html'),
        en: resolve('en/index.html'), de: resolve('de/index.html'),
        enInquiry: resolve('en/inquiry/index.html'), deInquiry: resolve('de/anfrage/index.html'),
        enImprint: resolve('en/imprint/index.html'), deImprint: resolve('de/impressum/index.html'),
        enPrivacy: resolve('en/privacy/index.html'), dePrivacy: resolve('de/datenschutz/index.html'),
        enTerms: resolve('en/terms/index.html'), deTerms: resolve('de/agb/index.html'),
        enBloomvae: resolve('en/work/bloomvae/index.html'), deBloomvae: resolve('de/work/bloomvae/index.html'),
        enMaharadscha: resolve('en/work/maharadscha/index.html'), deMaharadscha: resolve('de/work/maharadscha/index.html'),
        enJT: resolve('en/work/jtsmash/index.html'), deJT: resolve('de/work/jtsmash/index.html')
      },
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-animation';
          }
        }
      }
    }
  }
});
