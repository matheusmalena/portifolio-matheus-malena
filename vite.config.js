import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          swiper: ['swiper'],
          typed: ['typed.js']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    target: 'es2020',
    minify: 'esbuild',
    cssMinify: true
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'swiper', 'typed.js']
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  }
})
