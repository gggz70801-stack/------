#!/usr/bin/env node
/**
 * 项目详情页背景：原图 → 网页版
 *
 * 输入：media-src/bg/tactical/
 * 输出：src/assets/section-bg/tactical/
 *
 * 处理原则：
 *   1. 统一裁成 1920×1080，按每张图的重点调整取景；
 *   2. 降低饱和度与亮度，再做轻微虚化，让服装标识和机身编号失去可读性；
 *   3. 压成 WebP，单张控制在 300KB 以内。
 */

import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { loadSharp } from './lib/load-sharp.mjs'

const ROOT = process.cwd()
const SRC_DIR = join(ROOT, 'media-src', 'bg', 'tactical')
const OUT_DIR = join(ROOT, 'src', 'assets', 'section-bg', 'tactical')

const jobs = [
  {
    source: '01-night-patrol.jpg',
    output: 'night-patrol.webp',
    position: 'right',
    brightness: 1.12,
    saturation: 0.66,
    blur: 1.6,
  },
  {
    source: '02-night-insertion.jpg',
    output: 'night-insertion.webp',
    position: 'right',
    brightness: 0.9,
    saturation: 0.64,
    blur: 1.8,
  },
  {
    source: '03-nvg-close.jpg',
    output: 'nvg-close.webp',
    position: 'centre',
    brightness: 0.82,
    saturation: 0.38,
    blur: 2.4,
  },
  {
    source: '04-nvg-smoke.jpg',
    output: 'nvg-smoke.webp',
    position: 'centre',
    brightness: 0.84,
    saturation: 0.38,
    blur: 2.5,
  },
  {
    source: '05-night-flight.jpg',
    output: 'night-flight.webp',
    position: 'right',
    brightness: 0.9,
    saturation: 0.56,
    blur: 4.0,
  },
  {
    source: '06-hangar.jpg',
    output: 'hangar.webp',
    position: 'right',
    brightness: 0.82,
    saturation: 0.56,
    blur: 4.8,
  },
  {
    source: '07-red-cabin.jpg',
    output: 'red-cabin.webp',
    position: 'centre',
    brightness: 0.86,
    saturation: 0.5,
    blur: 3.6,
  },
  {
    source: '08-cod-gear.jpg',
    output: 'cod-gear.webp',
    position: 'centre',
    extract: { left: 240, top: 140, width: 1040, height: 450 },
    brightness: 1.16,
    saturation: 0.62,
    blur: 1.4,
  },
  {
    source: '09-cod-team.jpg',
    output: 'cod-team.webp',
    position: 'centre',
    extract: { left: 360, top: 0, width: 920, height: 540 },
    brightness: 1.14,
    saturation: 0.55,
    blur: 1.3,
  },
  {
    source: '10-cod-visor.jpg',
    output: 'cod-visor.webp',
    position: 'centre',
    extract: { left: 500, top: 0, width: 560, height: 300 },
    brightness: 1.12,
    saturation: 0.5,
    blur: 1.2,
  },
  {
    source: '11-cod-warm.jpg',
    output: 'cod-warm.webp',
    position: 'centre',
    brightness: 1.02,
    saturation: 0.68,
    blur: 0.9,
  },
  {
    source: '12-cockpit-night.jpg',
    output: 'cockpit-night.webp',
    position: 'right',
    extract: { left: 100, top: 0, width: 1130, height: 560 },
    brightness: 1.18,
    saturation: 0.44,
    blur: 5.2,
  },
  {
    source: '13-night-launch.jpg',
    output: 'night-launch.webp',
    position: 'centre',
    brightness: 1.3,
    saturation: 0.62,
    blur: 3.2,
  },
  {
    source: '14-heli-night.jpg',
    output: 'heli-night.webp',
    position: 'centre',
    brightness: 1.38,
    saturation: 0.7,
    blur: 2.8,
  },
  {
    source: '15-neon-rain.jpg',
    output: 'neon-rain.webp',
    position: 'right',
    brightness: 0.92,
    saturation: 0.54,
    blur: 7.4,
  },
  {
    source: '16-field-op.jpg',
    output: 'field-op.webp',
    position: 'centre',
    extract: { left: 80, top: 80, width: 560, height: 760 },
    brightness: 0.76,
    saturation: 0.44,
    blur: 2.3,
  },
  {
    source: '17-helmet-soldier.jpg',
    output: 'helmet-soldier.webp',
    position: 'centre',
    extract: { left: 160, top: 80, width: 760, height: 428 },
    brightness: 1.05,
    saturation: 0.38,
    blur: 6.8,
  },
]

const sharp = await loadSharp()
if (!sharp) {
  console.error('找不到图片处理库 sharp，请先检查 scripts/lib/load-sharp.mjs。')
  process.exit(1)
}

if (!existsSync(SRC_DIR)) {
  console.error(`背景母版目录不存在：${relative(ROOT, SRC_DIR)}`)
  process.exit(1)
}

mkdirSync(OUT_DIR, { recursive: true })
const available = new Set(readdirSync(SRC_DIR))
const rows = []

for (const job of jobs) {
  if (!available.has(job.source)) {
    console.warn(`跳过缺失文件：${job.source}`)
    continue
  }

  const sourcePath = join(SRC_DIR, job.source)
  const outputPath = join(OUT_DIR, job.output)
  const inputSize = statSync(sourcePath).size

  let pipeline = sharp(sourcePath).rotate()
  if (job.extract) pipeline = pipeline.extract(job.extract)

  const result = await pipeline
    .resize({
      width: 1920,
      height: 1080,
      fit: 'cover',
      position: job.position,
      withoutEnlargement: false,
    })
    .modulate({
      brightness: job.brightness,
      saturation: job.saturation,
    })
    .blur(job.blur)
    .linear(1.1, -16)
    .webp({
      quality: 78,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath)

  rows.push({
    name: job.output,
    input: inputSize,
    output: result.size,
    width: result.width,
    height: result.height,
  })
}

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`
const totalInput = rows.reduce((sum, row) => sum + row.input, 0)
const totalOutput = rows.reduce((sum, row) => sum + row.output, 0)

console.log('\n战术背景处理完成\n' + '─'.repeat(64))
for (const row of rows) {
  console.log(
    `${row.name.padEnd(24)} ${kb(row.input).padStart(8)} → ${kb(row.output).padStart(
      8
    )}  ${row.width}×${row.height}`
  )
}
console.log('─'.repeat(64))
console.log(
  `共 ${rows.length} 张：${(totalInput / 1024 / 1024).toFixed(1)}MB → ${(
    totalOutput /
    1024 /
    1024
  ).toFixed(2)}MB，节省 ${(100 - (totalOutput / totalInput) * 100).toFixed(1)}%`
)
console.log(`输出目录：${relative(ROOT, OUT_DIR)}\n`)
