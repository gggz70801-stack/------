#!/usr/bin/env node
/**
 * Prepare the supplied 1x illustration boards for the web.
 *
 * The source folder stays outside the project. Long boards are resized to a
 * web-safe width, while the two character sheets are split into individual
 * artworks so the project page can arrange them as a horizontal four-up rail.
 */

import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadSharp } from './lib/load-sharp.mjs'

const ROOT = process.cwd()
const SOURCE = 'E:/作品集/作品集素材/其他项目/插画/1x'
const HERO_SOURCE = join(SOURCE, '1x', '资源 9.png')
const OUT = join(ROOT, 'src', 'assets', 'other', 'illustration')
const MANIFEST = join(ROOT, 'src', 'data', 'other-gallery.json')
const sharp = await loadSharp()

if (!sharp) {
  console.error('Sharp is unavailable.')
  process.exit(1)
}

if (!existsSync(SOURCE)) {
  console.error(`Missing illustration source folder: ${SOURCE}`)
  process.exit(1)
}

const beastCrops = [
  {
    output: '04-甪端.webp',
    sheet: '4.png',
    left: 432,
    top: 147,
    width: 785,
    height: 1078,
    name: '甪端',
  },
  {
    output: '05-狻猊.webp',
    sheet: '4.png',
    left: 59,
    top: 1447,
    width: 815,
    height: 1063,
    name: '狻猊',
  },
  {
    output: '06-獬豸.webp',
    sheet: '4.png',
    left: 436,
    top: 2676,
    width: 770,
    height: 1055,
    name: '獬豸',
  },
  {
    output: '07-行什.webp',
    sheet: '4.png',
    left: 59,
    top: 3898,
    width: 815,
    height: 1019,
    name: '行什',
  },
  {
    output: '08-金龙.webp',
    sheet: '5.png',
    left: 428,
    top: 508,
    width: 789,
    height: 1142,
    name: '金龙',
  },
  {
    output: '09-凤凰.webp',
    sheet: '5.png',
    left: 59,
    top: 1888,
    width: 815,
    height: 983,
    name: '凤凰',
  },
  {
    output: '10-金狮.webp',
    sheet: '5.png',
    left: 428,
    top: 3034,
    width: 789,
    height: 1063,
    name: '金狮',
  },
  {
    output: '11-麒麟.webp',
    sheet: '5.png',
    left: 59,
    top: 4255,
    width: 815,
    height: 885,
    name: '麒麟',
  },
]

async function encodeImage(input, output, width, maxBytes, quality = 82) {
  let currentQuality = quality
  let result

  for (;;) {
    result = await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: currentQuality, effort: 6, smartSubsample: true })
      .toBuffer({ resolveWithObject: true })

    if (result.data.length <= maxBytes || currentQuality <= 66) break
    currentQuality -= 4
  }

  writeFileSync(join(OUT, output), result.data)
  return {
    file: output,
    name: output.replace(/^\d+-/, '').replace(/\.webp$/, ''),
    w: result.info.width,
    h: result.info.height,
    bytes: result.data.length,
    quality: currentQuality,
  }
}

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const rows = []

// 优先使用设计交付的单独 1x 头图母版，避免再从整张封面里二次裁切。
const hero = existsSync(HERO_SOURCE)
  ? HERO_SOURCE
  : await sharp(join(SOURCE, '1.png'))
      .extract({ left: 0, top: 0, width: 8086, height: 3150 })
      .png()
      .toBuffer()

rows.push(await encodeImage(hero, '01-hero.webp', 1920, 620 * 1024, 84))
rows[0].name = '故宫祥瑞 / 主视觉'

const fullPages = [
  { source: '2.png', output: '02-research.webp', name: '故宫语境 / 调研' },
  { source: '3.png', output: '03-system.webp', name: '字体与线稿 / 创作系统' },
  { source: '6.png', output: '12-derivatives.webp', name: '贴纸与文创 / 角色衍生' },
  { source: '7.png', output: '13-packaging.webp', name: '包装与物料 / 品牌应用' },
  { source: '8.png', output: '14-campaign.webp', name: '海报与户外 / 空间应用' },
]

for (const page of fullPages) {
  const row = await encodeImage(join(SOURCE, page.source), page.output, 1200, 760 * 1024, 82)
  row.name = page.name
  rows.push(row)
}

for (const crop of beastCrops) {
  const input = await sharp(join(SOURCE, crop.sheet))
    .extract({
      left: crop.left,
      top: crop.top,
      width: crop.width,
      height: crop.height,
    })
    .png()
    .toBuffer()

  const row = await encodeImage(input, crop.output, 760, 420 * 1024, 84)
  row.name = crop.name
  rows.push(row)
}

rows.sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
manifest.illustration = rows.map(({ file, name, w, h }) => ({ file, name, w, h }))
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

const outputBytes = rows.reduce((sum, row) => sum + row.bytes, 0)
const sourceBytes = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png']
  .map((file) => statSync(join(SOURCE, file)).size)
  .reduce((sum, bytes) => sum + bytes, 0)
const largest = rows.reduce((max, row) => Math.max(max, row.bytes), 0)

console.log(
  `illustration  ${rows.length} assets  ` +
    `${(sourceBytes / 1024 / 1024).toFixed(2)}MB source -> ` +
    `${(outputBytes / 1024 / 1024).toFixed(2)}MB WebP`,
)
console.log(`Largest asset: ${Math.round(largest / 1024)}KB`)
console.log(`Manifest: ${MANIFEST}`)
