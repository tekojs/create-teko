import { defineConfig } from 'vite'
import teko from '@tekojs/vite-plugin'

export default defineConfig({
  plugins: [teko()],
  build: {
    manifest: true,
    outDir: 'public/build',
    rollupOptions: {
      input: {
        app: 'src/client/main.ts',
      },
    },
  },
})