import { defineConfig } from '@tekojs/core'

export default defineConfig({
  root: process.cwd(),
  views: ['src/views'],
  components: ['src/views/components'],
  cache: true,
})