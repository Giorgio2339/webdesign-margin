import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        impressum: resolve(import.meta.dirname, 'impressum.html'),
        datenschutz: resolve(import.meta.dirname, 'datenschutz.html'),
        notfound: resolve(import.meta.dirname, '404.html'),
      },
    },
    // Source maps would publish the unminified sources next to the bundle.
    sourcemap: false,
  },
})
