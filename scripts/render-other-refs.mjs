import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'
import { loadSharp } from './lib/load-sharp.mjs'

const ROOT = process.cwd()
const SOURCE = 'E:/作品集/作品集素材/其他项目'
const OUT = join(ROOT, '.shots', 'other-refs')
const PDFTOPPM = 'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdftoppm.exe'
const PDFINFO = 'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/Library/bin/pdfinfo.exe'
const sharp = await loadSharp()

const files = [
  ['web-amazon', join(SOURCE, '网页设计', '亚马逊网页设计', '实际的视觉效果.pdf'), 96],
  ['illustration-legacy', join(SOURCE, '插画', '以前的排版-仅供参考.pdf'), 150],
  ['illustration-cover', join(SOURCE, '插画', '封面.pdf'), 220],
  ['illustration-mockups', join(SOURCE, '插画', '样机素材.pdf'), 300],
  ['catalog', join(SOURCE, '物料', '2026产品画册 (2).pdf'), 150],
  ['foldout-cn', join(SOURCE, '物料', '2026年中文展会折页.pdf'), 150],
  ['foldout-en', join(SOURCE, '物料', '2026年展会折页-英文版.pdf'), 150],
  ['render-3d', join(SOURCE, '3D建模渲染.pdf'), 300],
]

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

for (const [slug, file, dpi] of files) {
  if (!existsSync(file)) {
    console.log(`MISSING ${file}`)
    continue
  }

  const info = execFileSync(PDFINFO, [file], { encoding: 'utf8' })
  const pageCount = Number(info.match(/^Pages:\s+(\d+)/m)?.[1] || 0)
  const pagesToRender = Math.min(pageCount, 40)
  const prefix = join(OUT, slug)
  if (pagesToRender) {
    execFileSync(PDFTOPPM, ['-png', '-r', String(dpi), '-f', '1', '-l', String(pagesToRender), file, prefix], {
      stdio: 'pipe',
    })
  }

  const pageFiles = readdirSync(OUT)
    .filter((name) => name.startsWith(`${slug}-`) && name.endsWith('.png'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  if (pageFiles.length && sharp) {
    const thumbs = []
    for (const name of pageFiles) {
      const image = sharp(join(OUT, name))
      const meta = await image.metadata()
      const width = 280
      const height = Math.round((meta.height / meta.width) * width)
      const buffer = await image.resize({ width }).jpeg({ quality: 76 }).toBuffer()
      thumbs.push({ buffer, height, name })
    }

    const columns = Math.min(4, thumbs.length)
    const gap = 12
    const labelHeight = 24
    const rows = Math.ceil(thumbs.length / columns)
    const cellHeight = Math.max(...thumbs.map((item) => item.height)) + labelHeight
    const sheetWidth = columns * 280 + (columns + 1) * gap
    const sheetHeight = rows * cellHeight + (rows + 1) * gap
    const composites = thumbs.map((item, index) => ({
      input: item.buffer,
      left: gap + (index % columns) * (280 + gap),
      top: gap + Math.floor(index / columns) * (cellHeight + gap),
    }))
    const labels = thumbs
      .map((item, index) => {
        const left = gap + (index % columns) * (280 + gap)
        const top = gap + Math.floor(index / columns) * (cellHeight + gap) + item.height + 4
        return `<text x="${left}" y="${top + 12}" fill="#aaa" font-family="Arial" font-size="12">${basename(item.name)}</text>`
      })
      .join('')
    const overlay = Buffer.from(
      `<svg width="${sheetWidth}" height="${sheetHeight}" xmlns="http://www.w3.org/2000/svg">${labels}</svg>`
    )
    composites.push({ input: overlay, left: 0, top: 0 })

    await sharp({
      create: {
        width: sheetWidth,
        height: sheetHeight,
        channels: 3,
        background: '#0a0705',
      },
    })
      .composite(composites)
      .jpeg({ quality: 82 })
      .toFile(join(OUT, `contact-${slug}.jpg`))
  }

  console.log(`${slug}: ${pageCount} pages, rendered ${pagesToRender}`)
}

console.log(`\nOutput: ${resolve(OUT)}`)
