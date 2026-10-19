#!/usr/bin/env node
/**
 * 视频压缩（母版 → 网页版）+ 静帧 poster
 * ---------------------------------------------------------------
 * 用法：
 *   pnpm media:video                              # 压 media-src/video 里第一个视频
 *   pnpm media:video --file media-src/video/bo3.mp4
 *   pnpm media:video --start 2 --duration 10 --bitrate 9   # 从第2秒起取10秒，9Mbps
 *
 * 输出：
 *   public/media/hero-loop.mp4     1920×1080 / H.264 / 无声 / ≤ 12MB
 *   public/media/hero-poster.jpg   同尺寸静帧，用于首屏"先出图、视频后台加载"
 *
 * 有 ffmpeg 就用 ffmpeg；没有就用本机 Chrome 的编码器转（不需要联网、不需要装东西）。
 */

import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync, createReadStream } from 'node:fs'
import { join, extname, basename, dirname } from 'node:path'
import { createRequire } from 'node:module'
import { createServer } from 'node:http'
import { spawnSync } from 'node:child_process'

const ROOT = process.cwd()
const SRC_DIR = join(ROOT, 'media-src', 'video')

const args = process.argv.slice(2)
const argValue = (flag, fallback) => {
  const i = args.indexOf(flag)
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback
}
const resolvePath = (value) =>
  /^[A-Za-z]:[\\/]/.test(value) || value.startsWith('/') || value.startsWith('\\\\')
    ? value
    : join(ROOT, value)
const OUT_DIR = join(ROOT, 'public', 'media')
const OUT_VIDEO = resolvePath(argValue('--out-video', 'public/media/hero-loop.mp4'))
const OUT_POSTER = resolvePath(argValue('--out-poster', 'public/media/hero-poster.jpg'))
const START = Number(argValue('--start', 2))
const DURATION = Number(argValue('--duration', 10))
const WIDTH = Number(argValue('--width', 1920))
const HEIGHT = Math.round((WIDTH * 9) / 16)
const BITRATE = Number(argValue('--bitrate', 4)) * 1_000_000
const TARGET_MB = Number(argValue('--target', 12))

const MB = 1024 * 1024

function findSource() {
  const explicit = argValue('--file', '')
  if (explicit) {
    // 支持绝对路径（原始母版可以放在项目外，避免把大文件塞进项目）
    const isAbsolute = /^[A-Za-z]:[\\/]/.test(explicit) || explicit.startsWith('/') || explicit.startsWith('\\\\')
    return isAbsolute ? explicit : join(ROOT, explicit)
  }
  if (!existsSync(SRC_DIR)) return ''
  const file = readdirSync(SRC_DIR).find((f) => ['.mp4', '.mov', '.m4v', '.webm'].includes(extname(f).toLowerCase()))
  return file ? join(SRC_DIR, file) : ''
}

function hasFfmpeg() {
  const probe = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore', shell: true })
  return probe.status === 0
}

function resolvePlaywright() {
  const candidates = [
    join(ROOT, 'node_modules', 'playwright-core'),
    'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core',
  ]
  const found = candidates.find((p) => existsSync(p))
  if (!found) return null
  const require = createRequire('file:///' + join(found, 'package.json').replace(/\\/g, '/'))
  return require(found)
}

function findChrome() {
  const paths = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ]
  return paths.find((p) => existsSync(p)) || ''
}

const source = findSource()
if (!source || !existsSync(source)) {
  console.log('\n没有找到源视频。')
  console.log('把原片放进 media-src/video/ ，或指定路径：')
  console.log('  pnpm media:video --file "E:/你的路径/bo3.mp4"\n')
  process.exit(0)
}

const sourceMB = (statSync(source).size / MB).toFixed(1)
mkdirSync(OUT_DIR, { recursive: true })
mkdirSync(dirname(OUT_VIDEO), { recursive: true })
mkdirSync(dirname(OUT_POSTER), { recursive: true })

/* ---------- 方案 A：ffmpeg ---------- */
if (hasFfmpeg()) {
  console.log(`\n使用 ffmpeg 压缩：${basename(source)}（${sourceMB}MB）`)
  spawnSync(
    'ffmpeg',
    [
      '-y',
      '-ss', String(START),
      '-t', String(DURATION),
      '-i', source,
      '-an',
      '-vf', `scale=${WIDTH}:${HEIGHT}:force_original_aspect_ratio=increase,crop=${WIDTH}:${HEIGHT}`,
      '-c:v', 'libx264',
      '-preset', 'slow',
      '-crf', '20',
      '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart',
      OUT_VIDEO,
    ],
    { stdio: 'inherit', shell: true }
  )
  spawnSync(
    'ffmpeg',
    ['-y', '-ss', '1', '-i', OUT_VIDEO, '-frames:v', '1', '-q:v', '3', OUT_POSTER],
    { stdio: 'inherit', shell: true }
  )
} else {
  /* ---------- 方案 B：本机 Chrome 转码 ---------- */
  const playwright = resolvePlaywright()
  const chrome = findChrome()
  if (!playwright || !chrome) {
    console.log('\n既没有 ffmpeg，也没找到可用的 Chrome。')
    console.log('替代做法：用剪映 / HandBrake 导出 1080p、8–15 秒、10MB 以内的 MP4，')
    console.log('再手动放到 public/media/hero-loop.mp4。\n')
    process.exit(1)
  }

  console.log(`\n未检测到 ffmpeg，改用本机 Chrome 编码：${basename(source)}（${sourceMB}MB）`)

  // 起一个临时本地服务，把源视频喂给浏览器
  const server = createServer((req, res) => {
    const size = statSync(source).size
    const range = req.headers.range
    if (range) {
      const [s, e] = range.replace(/bytes=/, '').split('-')
      const start = Number(s)
      const end = e ? Number(e) : size - 1
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'video/mp4',
      })
      createReadStream(source, { start, end }).pipe(res)
    } else {
      res.writeHead(200, { 'Content-Length': size, 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes' })
      createReadStream(source).pipe(res)
    }
  })
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const port = server.address().port

  const browser = await playwright.chromium.launch({
    executablePath: chrome,
    headless: true,
    args: ['--autoplay-policy=no-user-gesture-required', '--mute-audio'],
  })
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' }).catch(() => {})

  const result = await page.evaluate(
    async ({ url, startAt, duration, width, height, bitrate }) => {
      const mime =
        ['video/mp4;codecs=avc1.42E01E', 'video/mp4', 'video/webm;codecs=vp9', 'video/webm'].find(
          (t) => window.MediaRecorder && MediaRecorder.isTypeSupported(t)
        ) || 'video/webm'

      const video = document.createElement('video')
      video.src = url
      video.muted = true
      video.playsInline = true
      video.preload = 'auto'
      await new Promise((resolve, reject) => {
        video.onloadeddata = resolve
        video.onerror = () => reject(new Error('视频加载失败'))
        setTimeout(() => reject(new Error('视频加载超时')), 120000)
      })

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d', { alpha: false })
      const vw = video.videoWidth
      const vh = video.videoHeight
      const scale = Math.max(width / vw, height / vh)
      const dw = vw * scale
      const dh = vh * scale
      const dx = (width - dw) / 2
      const dy = (height - dh) / 2
      const draw = () => ctx.drawImage(video, dx, dy, dw, dh)

      await new Promise((resolve) => {
        video.onseeked = resolve
        video.currentTime = Math.min(startAt, Math.max(0, video.duration - duration - 0.5))
      })
      draw()
      const poster = canvas.toDataURL('image/jpeg', 0.82)

      const stream = canvas.captureStream(30)
      const recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: bitrate })
      const chunks = []
      recorder.ondataavailable = (e) => e.data && e.data.size && chunks.push(e.data)
      recorder.start(1000)
      await video.play()
      let raf = requestAnimationFrame(function loop() {
        draw()
        raf = requestAnimationFrame(loop)
      })
      await new Promise((resolve) => setTimeout(resolve, duration * 1000))
      video.pause()
      cancelAnimationFrame(raf)
      const blob = await new Promise((resolve) => {
        recorder.onstop = () => resolve(new Blob(chunks, { type: mime }))
        recorder.stop()
      })
      const bytes = new Uint8Array(await blob.arrayBuffer())
      let binary = ''
      for (let i = 0; i < bytes.length; i += 0x8000) {
        binary += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
      }
      return { size: blob.size, mime, base64: btoa(binary), poster, meta: { vw, vh, duration: video.duration } }
    },
    { url: `http://127.0.0.1:${port}/`, startAt: START, duration: DURATION, width: WIDTH, height: HEIGHT, bitrate: BITRATE }
  )

  await browser.close()
  server.close()

  const ext = result.mime.includes('mp4') ? 'mp4' : 'webm'
  const outVideo = ext === 'mp4' ? OUT_VIDEO : OUT_VIDEO.replace(/\.mp4$/, '.webm')
  writeFileSync(outVideo, Buffer.from(result.base64, 'base64'))
  writeFileSync(OUT_POSTER, Buffer.from(result.poster.split(',')[1], 'base64'))

  console.log(`  源视频：${result.meta.vw}×${result.meta.vh} / ${result.meta.duration.toFixed(1)}s`)
  console.log(`  输出：${WIDTH}×${HEIGHT} / ${DURATION}s / ${(result.size / MB).toFixed(2)}MB → ${outVideo.replace(ROOT, '')}`)
}

const outSize = existsSync(OUT_VIDEO) ? statSync(OUT_VIDEO).size : 0
const posterSize = existsSync(OUT_POSTER) ? statSync(OUT_POSTER).size : 0
console.log('\n完成：')
console.log(`  视频  ${(outSize / MB).toFixed(2)}MB  ${OUT_VIDEO.replace(ROOT, '')}`)
console.log(`  静帧  ${(posterSize / 1024).toFixed(0)}KB  ${OUT_POSTER.replace(ROOT, '')}`)
if (outSize / MB > TARGET_MB) {
  console.log(`\n⚠️  超过 ${TARGET_MB}MB 目标，建议把 --duration 调短或 --bitrate 调低后重跑。`)
}
console.log('\n下一步：把 data/profile.js 里的 hero.video 指向该文件，pnpm size 检查体积。\n')
