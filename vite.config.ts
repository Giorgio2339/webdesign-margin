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
        en: resolve('en.html'), de: resolve('de.html'),
        enInquiry: resolve('en/inquiry.html'), deInquiry: resolve('de/anfrage.html'),
        enImprint: resolve('en/imprint.html'), deImprint: resolve('de/impressum.html'),
        enPrivacy: resolve('en/privacy.html'), dePrivacy: resolve('de/datenschutz.html'),
        enTerms: resolve('en/terms.html'), deTerms: resolve('de/agb.html'),
        enBloomvae: resolve('en/work/bloomvae.html'), deBloomvae: resolve('de/work/bloomvae.html'),
        enMaharadscha: resolve('en/work/maharadscha.html'), deMaharadscha: resolve('de/work/maharadscha.html'),
        enJT: resolve('en/work/jtsmash.html'), deJT: resolve('de/work/jtsmash.html')
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
