#!/usr/bin/env node
/**
 * Crop the high-resolution 3D modelling poster into individual web assets.
 *
 * The master PNG stays outside this repository. The crop rectangles below
 * follow the poster's grid. This is a personal-study page, so only finished
 * visual outcomes are kept. Blender viewports, structural passes and tight
 * detail crops are intentionally omitted.
 */

import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadSharp } from './lib/load-sharp.mjs'

const ROOT = process.cwd()
const SOURCE = 'E:/作品集/作品集素材/其他项目/3D建模渲染.png'
const OUT = join(ROOT, 'src', 'assets', 'other', '3d-rendering')
const MANIFEST = join(ROOT, 'src', 'data', 'other-gallery.json')
const sharp = await loadSharp()

if (!sharp) {
  console.error('Sharp is unavailable.')
  process.exit(1)
}
if (!existsSync(SOURCE)) {
  console.error(`Missing high-resolution poster: ${SOURCE}`)
  process.exit(1)
}

const orderedItems = [
  { caption: '机械场景 / 主视觉', crop: [100, 1000, 1300, 1300] },
  { caption: '舞动型唱片机', crop: [100, 2400, 1400, 1400] },
  { caption: '键帽与手柄场景', crop: [100, 3800, 1000, 1280] },
  { caption: '黏土风消防车', crop: [1120, 3850, 1210, 1250] },
  { caption: '礼帽角色渲染', crop: [100, 5100, 600, 950] },
  { caption: '复古小车场景', crop: [920, 5160, 1000, 880] },
  { caption: '金币行驶场景', crop: [1960, 5160, 1000, 880] },
  { caption: '森林狐火场景', crop: [100, 6200, 1900, 1150] },
]

rmSync(OUT, { recursive: true, force: true })
mkdirSync(OUT, { recursive: true })

const rows = []
let outputBytes = 0

for (let index = 0; index < orderedItems.length; index += 1) {
  const { crop, caption } = orderedItems[index]
  const [left, top, width, height] = crop
  const encoded = await sharp(SOURCE)
    .rotate()
    .extract({ left, top, width, height })
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86, effort: 6, alphaQuality: 100 })
    .toBuffer({ resolveWithObject: true })
  const outputName = `${String(index + 1).padStart(2, '0')}-${caption
    .replace(/\s*\/\s*/g, '-')
    .replace(/\s+/g, '-')}.webp`
  writeFileSync(join(OUT, outputName), encoded.data)
  outputBytes += encoded.data.length
  rows.push({
    file: outputName,
    name: caption,
    w: encoded.info.width,
    h: encoded.info.height,
  })
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
manifest['3d-rendering'] = rows
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
const sourceBytes = statSync(SOURCE).size

console.log(
  `3d-rendering           ${rows.length} images  ` +
    `${(sourceBytes / 1024 / 1024).toFixed(2)}MB -> ${(outputBytes / 1024 / 1024).toFixed(2)}MB`
)
console.log(`Manifest: ${MANIFEST}`)
