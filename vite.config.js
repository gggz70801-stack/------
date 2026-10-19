import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/+$/, '')

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-site-meta',
      transformIndexHtml(html) {
        return html.replaceAll('__SITE_URL__', siteUrl || '.')
      },
    },
  ],
  // 使用相对路径，部署到 GitHub Pages 的项目子目录或独立域名都可以正常加载资源。
  base: './',
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
