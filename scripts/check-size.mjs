#!/usr/bin/env node
/**
 * 素材体积体检
 * ---------------------------------------------------------------
 * 扫描 public/ 与 dist/，列出最重的文件，并对超出预算的单文件报警。
 *
 * 用法：
 *   pnpm size                 # 严格模式：有文件超预算就退出码 1
 *   node scripts/check-size.mjs --warn   # 只提示，不阻塞（构建后自动跑）
 *
 * 预算可用环境变量覆盖：SIZE_LIMIT_MB=12 pnpm size
 */

import { readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const LIMIT_MB = Number(process.env.SIZE_LIMIT_MB || 0)
const MB = 1024 * 1024
const warnOnly = process.argv.includes('--warn')
const DIRS = ['public', 'dist']

/** 按类型给预算（MB）：视频 / 图片 / 脚本样式 / 其他 */
const BUDGET = {
  video: Number(process.env.BUDGET_VIDEO_MB || 12),
  image: Number(process.env.BUDGET_IMAGE_MB || 1),
  code: Number(process.env.BUDGET_CODE_MB || 1),
  other: Number(process.env.BUDGET_OTHER_MB || 8),
}

function kindOf(path) {
  const p = path.toLowerCase()
  if (/\.(mp4|webm|mov|m4v)$/.test(p)) return 'video'
  if (/\.(jpe?g|png|webp|avif|gif|svg)$/.test(p)) return 'image'
  if (/\.(js|css|html|json)$/.test(p)) return 'code'
  return 'other'
}

const budgetFor = (path) => (LIMIT_MB ? LIMIT_MB : BUDGET[kindOf(path)])

function walk(dir, out = []) {
  let entries = []
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.isFile()) out.push({ path: full, size: statSync(full).size })
  }
  return out
}

const mb = (bytes) => `${(bytes / MB).toFixed(2)} MB`
const rel = (p) => relative(ROOT, p).replace(/\\/g, '/')

const files = DIRS.flatMap((dir) => walk(join(ROOT, dir)))
const total = files.reduce((sum, f) => sum + f.size, 0)
const sorted = [...files].sort((a, b) => b.size - a.size)
const over = sorted.filter((f) => f.size > budgetFor(f.path) * MB)

console.log(
  '\n素材体积体检 · ' +
    (LIMIT_MB ? `单文件一律 ≤ ${LIMIT_MB} MB` : '按类型给预算（视频/图片/代码/其他）') +
    '\n' +
    '─'.repeat(58)
)

if (!files.length) {
  console.log('（public/ 与 dist/ 里暂时没有文件）')
} else {
  for (const f of sorted.slice(0, 8)) {
    const flag = f.size > budgetFor(f.path) * MB ? `  ← 超预算（${budgetFor(f.path)}MB）` : ''
    console.log(`${mb(f.size).padStart(10)}  ${rel(f.path)}${flag}`)
  }
  if (sorted.length > 8) console.log(`           … 其余 ${sorted.length - 8} 个文件`)
}

console.log('─'.repeat(58))
console.log(`${'合计'.padStart(10)}  public + dist = ${mb(total)}`)
console.log(
  `\n预算：视频 ≤ ${BUDGET.video}MB · 图片 ≤ ${BUDGET.image}MB · 代码 ≤ ${BUDGET.code}MB · 其他 ≤ ${BUDGET.other}MB` +
    `\n参考：首屏资源（HTML+CSS+JS+首屏媒体）≤ 2–3MB · 整站 dist ≤ 20–30MB`
)

if (over.length) {
  console.log(`\n⚠️  有 ${over.length} 个文件超过单文件预算：`)
  over.forEach((f) => console.log(`   · ${rel(f.path)}  ${mb(f.size)}`))
  console.log(
    `\n   处理方式：① 压到预算内（视频 8–15s / ≤${BUDGET.video}MB，图片转 WebP ≤500KB）；` +
      '\n             ② 或者把大文件放到 CDN / 对象存储，项目里只保留 URL；' +
      '\n             ③ 需要临时放宽：BUDGET_VIDEO_MB=20 pnpm size'
  )
  if (!warnOnly) process.exit(1)
} else {
  console.log('\n✅ 全部素材都在预算内。')
}
