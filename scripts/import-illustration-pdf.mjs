#!/usr/bin/env node
/**
 * Render the final illustration PDF into web-ready, full-page assets.
 *
 * The original PDF stays outside the project. Long pages are split at an
 * integer pixel boundary so the two parts align without a visible seam.
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadSharp } from './lib/load-sharp.mjs'

const ROOT = process.cwd()
const SOURCE = 'E:/作品集/作品集素材/其他项目/插画/高清版本.pdf'
const RENDER_DIR = join(ROOT, '.shots', 'illustration-pdf')
const OUT = join(ROOT, 'src', 'assets', 'other', 'illustration')
const MANIFEST = join(ROOT, 'src', 'data', 'other-gallery.json')
const PDFTOPPM = 'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdftoppm.exe'
const sharp = await loadSharp()

if (!sharp) {
  console.error('Sharp is unavailable.')
  process.exit(1)
}
if (!existsSync(SOURCE)) {
  console.error(`Missing illustration PDF: ${SOURCE}`)
  process.exit(1)
}

const pages = [
  { page: 1, title: '封面 / 故宫祥瑞', slug: '封面-故宫祥瑞' },
  { page: 2, title: '故宫语境 / 瑞兽出处', slug: '故宫语境-瑞兽出处' },
  { page: 3, title: '字体与线稿 / 创作系统', slug: '字体与线稿-创作系统' },
  { page: 4, title: '四大瑞兽 / 上卷', slug: '四大瑞兽-上卷', parts: 2, trim: true },
  { page: 5, title: '四大瑞兽 / 下卷', slug: '四大瑞兽-下卷', parts: 2, trim: true },
  { page: 6, title: '贴纸与文创 / 角色衍生', slug: '贴纸与文创-角色衍生' },
  { page: 7, title: '品牌应用 / 包装与物料', slug: '品牌应用-包装与物料' },
  { page: 8, title: '空间应用 / 海报与户外', slug: '空间应用-海报与户外' },
]

async function encode(buffer) {
  let quality = 84
  let result
  for (;;) {
    result = await sharp(buffer).webp({ quality, effort: 6, alphaQuality: 100 }).toBuffer({ resolveWithObject: true })
    if (result.data.length <= 760 * 1024 || quality <= 66) break
    quality -= 4
  }
  return { data: result.data, ...result.info, quality }
}

rmSync(RENDER_DIR, { recursive: true, force: true })
rmSync(OUT, { recursive: true, force: true })
mkdirSync(RENDER_DIR, { recursive: true })
mkdirSync(OUT, { recursive: true })

execFileSync(PDFTOPPM, ['-png', '-r', '450', SOURCE, join(RENDER_DIR, 'page')], {
  stdio: 'pipe',
})

const pageFiles = readdirSync(RENDER_DIR)
  .filter((name) => /^page-\d+\.png$/.test(name))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

if (pageFiles.length !== pages.length) {
  console.error(`Expected ${pages.length} PDF pages, rendered ${pageFiles.length}.`)
  process.exit(1)
}

const rows = []
let outputBytes = 0
let index = 0

for (const page of pages) {
  const input = join(RENDER_DIR, `page-${page.page}.png`)
  let prepared = sharp(input).rotate()
  if (page.trim) prepared = prepared.trim({ background: '#000000', threshold: 12 })
  const pageBuffer = await prepared.png().toBuffer()
  const meta = await sharp(pageBuffer).metadata()
  const parts = page.parts || 1

  for (let part = 1; part <= parts; part += 1) {
    const top = Math.floor(((part - 1) * meta.height) / parts)
    const bottom = Math.floor((part * meta.height) / parts)
    const height = bottom - top
    const segment =
      parts > 1
        ? await sharp(pageBuffer).extract({ left: 0, top, width: meta.width, height }).png().toBuffer()
        : pageBuffer
    const encoded = await encode(segment)
    index += 1
    const suffix = parts > 1 ? `-${part}` : ''
    const outputName = `${String(index).padStart(2, '0')}-${page.slug}${suffix}.webp`
    writeFileSync(join(OUT, outputName), encoded.data)
    outputBytes += encoded.data.length
    rows.push({
      file: outputName,
      name: `${page.title}${parts > 1 ? ` · ${part}/${parts}` : ''}`,
      page: page.page,
      part,
      parts,
      w: encoded.width,
      h: encoded.height,
    })
  }
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
manifest.illustration = rows
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

const sourceBytes = statSync(SOURCE).size
const maxBytes = Math.max(...readdirSync(OUT).map((name) => statSync(join(OUT, name)).size))
console.log(
  `illustration           ${rows.length} page segments  ` +
    `${(sourceBytes / 1024 / 1024).toFixed(1)}MB PDF -> ` +
    `${(outputBytes / 1024 / 1024).toFixed(2)}MB WebP`
)
console.log(`Largest segment: ${(maxBytes / 1024).toFixed(0)}KB`)
console.log(`Manifest: ${MANIFEST}`)
