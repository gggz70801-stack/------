#!/usr/bin/env node
/**
 * 图片批量压缩（母版 → 网页版）
 * ---------------------------------------------------------------
 * 用法：
 *   pnpm media:image                 # 处理 media-src/ 下全部图片
 *   pnpm media:image --only amazon   # 只处理某个作品
 *   pnpm media:image --width 1600 --quality 80
 *
 * 规则（默认值见下，可用参数覆盖）：
 *   宽度上限 1600px（不放大）· WebP 质量 80 · 单张目标 ≤ 500KB
 *   超标时自动降质量（72 → 64 → 56）直到达标
 *
 * 输入 → 输出：
 *   media-src/works/<slug>/xx.jpg   → src/assets/works/<slug>/xx.webp   （作品图，自动被网站读取）
 *   media-src/portrait/xx.jpg       → public/portrait/portrait.webp     （人物照片）
 *   同时生成 src/data/gallery.json  （尺寸清单：避免页面加载时图片跳动）
 */

import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative, extname, basename, dirname } from 'node:path'
import { loadSharp } from './lib/load-sharp.mjs'

const ROOT = process.cwd()
const SRC_DIR = join(ROOT, 'media-src')
const WORKS_OUT = join(ROOT, 'src', 'assets', 'works')
const PORTRAIT_OUT = join(ROOT, 'public', 'portrait')
const MANIFEST = join(ROOT, 'src', 'data', 'gallery.json')

const args = process.argv.slice(2)
const argValue = (flag, fallback) => {
  const i = args.indexOf(flag)
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback
}
const MAX_WIDTH = Number(argValue('--width', 1600))
const QUALITY = Number(argValue('--quality', 80))
const ONLY = argValue('--only', '')
const TARGET_KB = Number(argValue('--target', 500))
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.gif'])

const MB = 1024 * 1024
const kb = (b) => `${Math.round(b / 1024)}KB`

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.isFile() && IMAGE_EXT.has(extname(entry.name).toLowerCase())) out.push(full)
  }
  return out
}

const sharp = await loadSharp()
if (!sharp) {
  console.error(
    '找不到图片处理库 sharp。\n' +
      '本机可用的替代方案：\n' +
      '  1) 直接在 Photoshop 里导出：宽度 1600px、WebP、质量 80；\n' +
      '  2) 或在项目里执行 pnpm add -D sharp 后重试。'
  )
  process.exit(1)
}

if (!existsSync(SRC_DIR)) {
  console.log(`\n没有找到素材目录：${relative(ROOT, SRC_DIR)}\n`)
  console.log('把原图按下面的结构放进去，再运行 pnpm media:image：\n')
  console.log('  media-src/works/<作品名>/01-封面.jpg')
  console.log('  media-src/works/<作品名>/02-详情.jpg')
  console.log('  media-src/portrait/me.jpg\n')
  process.exit(0)
}

const files = walk(SRC_DIR)
/** 尺寸清单：先读旧的，只覆盖这次处理过的作品，避免"处理一个作品把别的作品的记录清空" */
let manifest = {}
try {
  manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
} catch {
  manifest = {}
}
const touchedSlugs = new Set()
const seenSlugs = new Set()
let savedTotal = 0
let count = 0

const rows = []

for (const file of files) {
  const rel = relative(SRC_DIR, file).replace(/\\/g, '/')
  const [group, ...rest] = rel.split('/')
  // --only 可以填作品名（works 下的文件夹），也可以填 awards / portrait 这类分组名
  if (ONLY) {
    if (group === 'works' ? rest[0] !== ONLY : group !== ONLY) continue
  }

  const original = statSync(file).size
  let outPath
  if (group === 'works') {
    // 注意：gif / webp 也要一起换成 .webp，否则会写出"名字是 .gif、内容是 WebP"的坏文件
    outPath = join(WORKS_OUT, rest.join('/').replace(/\.(jpe?g|png|tiff?|avif|gif|webp)$/i, '.webp'))
  } else if (group === 'portrait') {
    outPath = join(PORTRAIT_OUT, 'portrait.webp')
  } else {
    // 其它分组（例如 awards）保留子目录名，方便页面按 awards/ 找图
    outPath = join(
      ROOT,
      'src',
      'assets',
      'misc',
      rel.replace(/\.(jpe?g|png|tiff?|avif|gif|webp)$/i, '.webp')
    )
  }

  mkdirSync(dirname(outPath), { recursive: true })

  // 动图（GIF / 动画 WebP）：保留动画，输出动画 WebP
  const probe = await sharp(file, { animated: true }).metadata()
  const pages = probe.pages || 1
  const animated = pages > 1

  let quality = QUALITY
  let buffer
  let meta
  for (;;) {
    const pipeline = sharp(file, { animated })
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    buffer = await pipeline.webp({ quality, effort: 4 }).toBuffer({ resolveWithObject: true })
    meta = buffer.info
    // 动图由多帧组成，单帧预算放宽到 3 倍
    const target = (animated ? TARGET_KB * 3 : TARGET_KB) * 1024
    if (buffer.data.length <= target || quality <= 56) break
    quality -= 8
  }

  writeFileSync(outPath, buffer.data)
  savedTotal += Math.max(0, original - buffer.data.length)
  count += 1

  const outW = meta.width
  const outH = meta.pageHeight || meta.height
  rows.push({
    文件: relative(ROOT, outPath).replace(/\\/g, '/'),
    原图: `${(original / 1024 / 1024).toFixed(1)}MB`,
    网页版: kb(buffer.data.length),
    尺寸: `${outW}×${outH}${animated ? ` ×${meta.pages || pages}帧` : ''}`,
    质量: quality,
  })

  if (group === 'works') {
    const slug = rest[0]
    const name = basename(outPath).replace(/\.webp$/, '')
    // 一次运行会覆盖这个作品的全部图片，所以清单从这个作品的第一张开始重建，
    // 避免改过文件名之后旧记录还留在 src/data/gallery.json 里
    if (!seenSlugs.has(slug)) {
      manifest[slug] = []
      seenSlugs.add(slug)
    }
    manifest[slug].push({
      file: basename(outPath),
      name,
      w: outW,
      h: outH,
      ...(animated ? { pages: meta.pages || pages } : {}),
    })
    manifest[slug].sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
    touchedSlugs.add(slug)
  }
}

if (Object.keys(manifest).length) {
  mkdirSync(dirname(MANIFEST), { recursive: true })
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
}

console.log('\n图片压缩完成 · 宽度上限 ' + MAX_WIDTH + 'px / WebP 质量 ' + QUALITY + '\n' + '─'.repeat(72))
if (!rows.length) {
  console.log('（没有需要处理的图片）')
} else {
  for (const r of rows) {
    console.log(
      `${r.网页版.padStart(7)}  ← ${r.原图.padStart(7)}  ${r.尺寸.padStart(10)}  ${r.文件}`
    )
  }
}
console.log('─'.repeat(72))
console.log(`共处理 ${count} 张，合计省下约 ${(savedTotal / MB).toFixed(1)}MB`)
if (Object.keys(manifest).length) {
  console.log(
    `已更新尺寸清单：src/data/gallery.json（这次处理了 ${[...touchedSlugs].join(' / ') || '—'}，共 ${Object.keys(manifest).length} 个作品）`
  )
}
console.log('\n下一步：pnpm size 检查体积，然后刷新预览页面查看效果。\n')
