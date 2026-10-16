import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    open: false,
    watch: {
      // 大体积静态素材（视频）不参与文件监听，避免 Windows 下 EBUSY 崩溃
      ignored: ['**/public/media/**', '**/media-src/**', '**/dist/**'],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
})
