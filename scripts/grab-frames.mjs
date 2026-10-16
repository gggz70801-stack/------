#!/usr/bin/env node
/**
 * 从视频里按时间点抽帧（挑背景图 / 挑静帧用）
 * ---------------------------------------------------------------
 * 用法：
 *   node scripts/grab-frames.mjs "D:/路径/video.mp4" --count 24 --out .frames
 *   node scripts/grab-frames.mjs "D:/路径/video.mp4" --at 1.2,3.4,7.8 --out .frames
 *
 * 有 ffmpeg 就用 ffmpeg；没有就用本机 Chrome + canvas 抽帧（不需要联网）。
 * 输出：<out>/f-000.6s.jpg ... 原尺寸 JPEG
 */

import { existsSync, mkdirSync, statSync, writeFileSync, createReadStream } from 'node:fs'
import { join, resolve, basename } from 'node:path'
import { createRequire } from 'node:module'
import { createServer } from 'node:http'
import { spawnSync } from 'node:child_process'

const ROOT = process.cwd()
const args = process.argv.slice(2)
const argValue = (flag, fallback) => {
  const i = args.indexOf(flag)
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback
}
const sourceArg =
  argValue('--file', '') || args.find((a) => !a.startsWith('--') && !/^\d/.test(a) && a !== argValue('--out', '') && a !== argValue('--count', '') && a !== argValue('--at', ''))
const SOURCE = sourceArg ? resolve(sourceArg) : ''
const OUT_DIR = resolve(ROOT, argValue('--out', '.frames'))
const COUNT = Number(argValue('--count', 24))
const AT = argValue('--at', '')
const QUALITY = Number(argValue('--quality', 0.92))

if (!SOURCE || !existsSync(SOURCE)) {
  console.log('\n找不到源视频。用法：node scripts/grab-frames.mjs "D:/路径/video.mp4" --count 24\n')
  process.exit(1)
}
mkdirSync(OUT_DIR, { recursive: true })
const srcMB = (statSync(SOURCE).size / 1024 / 1024).toFixed(1)
const isWin = process.platform === 'win32'
const q = (s) => (isWin ? `"${s.replace(/"/g, '')}"` : `'${s.replace(/'/g, "'\\''")}'`)

/* ---------- 方案 A：ffmpeg ---------- */
const hasFfmpeg = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore', shell: true }).status === 0
if (hasFfmpeg) {
  const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', SOURCE], {
    encoding: 'utf8',
    shell: true,
  })
  const duration = Number((probe.stdout || '').trim())
  const times = AT
    ? AT.split(',').map(Number)
    : Array.from({ length: COUNT }, (_, i) => (duration * (i + 0.5)) / COUNT)
  console.log(`\nffmpeg 抽帧：${basename(SOURCE)}（${srcMB}MB / ${duration.toFixed(1)}s）→ ${times.length} 帧`)
  times.forEach((t, i) => {
    const out = join(OUT_DIR, `f-${String(i + 1).padStart(3, '0')}-${t.toFixed(2)}s.jpg`)
    const r = spawnSync('ffmpeg', ['-y', '-v', 'error', '-ss', String(t), '-i', SOURCE, '-frames:v', '1', '-q:v', '2', out], { shell: true })
    if (r.status !== 0) console.log(`  第 ${i + 1} 帧失败 @${t.toFixed(2)}s`)
  })
  console.log(`\n完成 → ${OUT_DIR}\n`)
  process.exit(0)
}

/* ---------- 方案 B：本机 Chrome + canvas ---------- */
const PW = [
  join(ROOT, 'node_modules', 'playwright', 'index.js'),
  join(ROOT, 'node_modules', 'playwright-core', 'index.js'),
  'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js',
].find((p) => existsSync(p))
const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find((p) => existsSync(p))
if (!PW || !CHROME) {
  console.log('\n既没有 ffmpeg，也没找到 Chrome/playwright。\n')
  process.exit(1)
}
const require = createRequire(PW)
const { chromium } = require(PW)

const server = createServer((req, res) => {
  const size = statSync(SOURCE).size
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
    createReadStream(SOURCE, { start, end }).pipe(res)
  } else {
    res.writeHead(200, { 'Content-Length': size, 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes' })
    createReadStream(SOURCE).pipe(res)
  }
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const port = server.address().port

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--mute-audio'] })
const page = await browser.newPage({ viewport: { width: 800, height: 600 } })
await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'domcontentloaded' }).catch(() => {})

const result = await page.evaluate(
  async ({ url, count, at, quality }) => {
    const video = document.createElement('video')
    video.src = url
    video.muted = true
    video.playsInline = true
    video.preload = 'auto'
    await new Promise((res, rej) => {
      video.onloadeddata = res
      video.onerror = () => rej(new Error('视频加载失败'))
      setTimeout(() => rej(new Error('视频加载超时')), 180000)
    })
    const vw = video.videoWidth
    const vh = video.videoHeight
    const duration = video.duration
    const canvas = document.createElement('canvas')
    canvas.width = vw
    canvas.height = vh
    const ctx = canvas.getContext('2d', { alpha: false })
    const times = at
      ? at.split(',').map(Number)
      : Array.from({ length: count }, (_, i) => (duration * (i + 0.5)) / count)

    const frames = []
    for (const t of times) {
      await new Promise((res) => {
        video.onseeked = res
        video.currentTime = Math.min(Math.max(0, t), Math.max(0, duration - 0.06))
      })
      await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)))
      ctx.drawImage(video, 0, 0, vw, vh)
      frames.push({ t, data: canvas.toDataURL('image/jpeg', quality) })
    }
    return { vw, vh, duration, frames }
  },
  { url: `http://127.0.0.1:${port}/`, count: COUNT, at: AT, quality: QUALITY }
)

await browser.close()
server.close()

console.log(`\n本机 Chrome 抽帧：${basename(SOURCE)}（${srcMB}MB / ${result.vw}×${result.vh} / ${result.duration.toFixed(1)}s）`)
result.frames.forEach((f, i) => {
  const out = join(OUT_DIR, `f-${String(i + 1).padStart(3, '0')}-${f.t.toFixed(2)}s.jpg`)
  writeFileSync(out, Buffer.from(f.data.split(',')[1], 'base64'))
})
console.log(`\n完成：${result.frames.length} 帧 → ${OUT_DIR}\n`)
