#!/usr/bin/env node
/**
 * Import the five "Other Projects" categories into web-ready WebP assets.
 *
 * Raw source folders stay outside the website. This script only writes:
 *   src/assets/other/<group>/...webp
 *   src/data/other-gallery.json
 *
 * PDF pages are rendered first with scripts/render-other-refs.mjs.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, extname, join, relative } from 'node:path'
import { loadSharp } from './lib/load-sharp.mjs'

const ROOT = process.cwd()
const SOURCE = 'E:/作品集/作品集素材/其他项目'
const REFS = join(ROOT, '.shots', 'other-refs')
const OUT = join(ROOT, 'src', 'assets', 'other')
const MANIFEST = join(ROOT, 'src', 'data', 'other-gallery.json')
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif'])
const sharp = await loadSharp()

if (!sharp) {
  console.error('Sharp is unavailable. Run the normal media pipeline setup first.')
  process.exit(1)
}

function filesIn(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && IMAGE_EXT.has(extname(entry.name).toLowerCase()))
    .map((entry) => join(dir, entry.name))
    .sort((a, b) => basename(a).localeCompare(basename(b), undefined, { numeric: true }))
}

function folderFiles(dir) {
  if (!existsSync(dir)) return []
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...folderFiles(full))
    else if (entry.isFile() && IMAGE_EXT.has(extname(entry.name).toLowerCase())) files.push(full)
  }
  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

function pick(dir, names) {
  return names.map((name) => join(dir, name)).filter(existsSync)
}

function refs(prefix) {
  return readdirSync(REFS)
    .filter((name) => name.startsWith(`${prefix}-`) && name.endsWith('.png'))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((name) => join(REFS, name))
}

function cleanCaption(file, fallback = '') {
  return (
    fallback ||
    basename(file, extname(file))
      .replace(/^illustration-|^catalog-|^foldout-|^render-3d-/i, '')
      .replace(/\s+/g, ' ')
      .trim()
  )
}

function safeName(value) {
  return value
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

async function encode(buffer, quality, targetKB) {
  let q = quality
  let result
  for (;;) {
    result = await sharp(buffer).webp({ quality: q, effort: 5 }).toBuffer({ resolveWithObject: true })
    if (result.data.length <= targetKB * 1024 || q <= 58) break
    q -= 5
  }
  return { buffer: result.data, ...result.info, quality: q }
}

async function addGroup(manifest, slug, files, options = {}) {
  const outDir = join(OUT, slug)
  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })

  const {
    width = 1200,
    quality = 78,
    targetKB = 300,
    captions = {},
    segmentHeight = 2600,
    splitAbove = 4300,
  } = options

  const rows = []
  let sourceBytes = 0
  let outputBytes = 0
  let index = 0

  for (const file of files) {
    const original = statSync(file).size
    sourceBytes += original
    const caption = cleanCaption(file, captions[basename(file)])
    const resized = await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .png()
      .toBuffer()
    const meta = await sharp(resized).metadata()
    const longImage = meta.height > splitAbove && meta.height / meta.width > 2.1
    const parts = longImage ? Math.ceil(meta.height / segmentHeight) : 1

    for (let part = 0; part < parts; part += 1) {
      const top = part * segmentHeight
      const height = Math.min(segmentHeight, meta.height - top)
      if (height <= 0) continue
      index += 1
      const partSuffix = parts > 1 ? `-${part + 1}` : ''
      const outputName = `${String(index).padStart(2, '0')}-${safeName(caption) || 'work'}${partSuffix}.webp`
      const outputPath = join(outDir, outputName)
      const cropped =
        parts > 1
          ? await sharp(resized).extract({ left: 0, top, width: meta.width, height }).png().toBuffer()
          : resized
      const encoded = await encode(cropped, quality, targetKB)
      writeFileSync(outputPath, encoded.buffer)
      outputBytes += encoded.data?.length || encoded.buffer.length
      rows.push({
        file: outputName,
        name: `${caption}${parts > 1 ? ` · ${part + 1}/${parts}` : ''}`,
        w: encoded.width,
        h: encoded.height,
      })
    }
  }

  manifest[slug] = rows
  console.log(
    `${slug.padEnd(22)} ${String(rows.length).padStart(2)} images  ` +
      `${(sourceBytes / 1024 / 1024).toFixed(1)}MB -> ${(outputBytes / 1024 / 1024).toFixed(1)}MB`
  )
}

let manifest = {}
try {
  manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'))
} catch {
  manifest = {}
}

mkdirSync(OUT, { recursive: true })

const domesticRoot = join(SOURCE, '国内电商')
await addGroup(manifest, 'domestic-creative', folderFiles(join(domesticRoot, '创意主图')), {
  width: 900,
  quality: 76,
  targetKB: 220,
})
await addGroup(manifest, 'domestic-consistent', folderFiles(join(domesticRoot, '统一风格组图')), {
  width: 900,
  quality: 76,
  targetKB: 220,
})

const amazonDir = join(SOURCE, '网页设计', '亚马逊网页设计', '素材')
const amazonOrder = [
  'E75.jpg',
  '关于品牌.jpg',
  '品牌历史.jpg',
  '选择理由\\矩形 4.jpg',
  '选择理由\\矩形 4 拷贝.jpg',
  '选择理由\\矩形 4 拷贝 2.jpg',
  '选择理由\\矩形 4 拷贝 21.jpg',
  '热卖产品\\矩形 5.jpg',
  '热卖产品\\矩形 5 拷贝.jpg',
  '热卖产品\\矩形 5 拷贝 2.jpg',
  '热卖产品\\矩形 5 拷贝 21.jpg',
  '热卖产品\\View All ».jpg',
  'EDC\\组 5.jpg',
  'EDC\\EDC分类.jpg',
  'k1.jpg',
  'logo.jpg',
]
const amazonCaptions = {
  'web-amazon-1.png': '亚马逊完整店铺页',
  'E75.jpg': '主视觉 / E75',
  '关于品牌.jpg': '关于品牌',
  '品牌历史.jpg': '品牌历史',
  '矩形 4.jpg': '选择理由',
  '矩形 4 拷贝.jpg': '选择理由 / 细节',
  '矩形 4 拷贝 2.jpg': '选择理由 / 工艺',
  '矩形 4 拷贝 21.jpg': '选择理由 / 场景',
  '矩形 5.jpg': '热卖产品 / 主推',
  '矩形 5 拷贝.jpg': '热卖产品 / 产品组',
  '矩形 5 拷贝 2.jpg': '热卖产品 / 场景',
  '矩形 5 拷贝 21.jpg': '热卖产品 / 阵列',
  'View All ».jpg': '查看全部',
  '组 5.jpg': 'EDC / TAC 2AA',
  'EDC分类.jpg': 'EDC / 分类标题',
  'k1.jpg': 'EDC / K1',
  'logo.jpg': '品牌收口',
}
await addGroup(manifest, 'web-amazon', [...refs('web-amazon'), ...pick(amazonDir, amazonOrder)], {
  width: 1250,
  quality: 82,
  targetKB: 320,
  captions: amazonCaptions,
})

const aliexpressDir = join(SOURCE, '网页设计', '速卖通')
const aliexpressFiles = [
  ...pick(aliexpressDir, ['页面顺序和真正的实际效果.jpg']),
  ...pick(aliexpressDir, [
    '素材/轮播海报/K1.png',
    '素材/轮播海报/500.jpg',
    '素材/轮播海报/E75.png',
    '素材/轮播海报/EC90.png',
    '素材/轮播海报/UC25.png',
    '素材/轮播海报/T37.png',
    '素材/轮播海报/D30.png',
    '素材/产品类型/矩形 2 拷贝 5.jpg',
    '素材/产品类型/矩形 2 拷贝 6.png',
    '素材/产品类型/矩形 2 拷贝 8.png',
    '素材/产品类型/矩形 2 拷贝 9.png',
    '素材/产品类型/矩形 2 拷贝 10.png',
    '素材/产品类型/矩形 2 拷贝 11.png',
    '素材/热卖产品/1.jpg',
    '素材/热卖产品/矩形 2 拷贝 2.jpg',
    '素材/热卖产品/矩形 2 拷贝 3.jpg',
    '素材/热卖产品/矩形 2.jpg',
    '素材/关于我们/矩形 2 拷贝 15.jpg',
    '素材/关于我们/矩形 2 拷贝 14.png',
    '素材/关于我们/矩形 3.png',
    '素材/页尾设计文案.png',
    '素材/logo.png',
  ]),
]
const aliexpressCaptions = {
  '页面顺序和真正的实际效果.jpg': '速卖通完整店铺页',
  'K1.png': '轮播 / K1',
  '500.jpg': '轮播 / Keylite 500',
  'E75.png': '轮播 / E75',
  'EC90.png': '轮播 / EC90',
  'UC25.png': '轮播 / UC25',
  'T37.png': '轮播 / T37',
  'D30.png': '轮播 / D30',
  '矩形 2 拷贝 5.jpg': '产品类型 / 照明工具',
  '矩形 2 拷贝 6.png': '产品类型 / 高亮系列',
  '矩形 2 拷贝 8.png': '产品类型 / EDC 系列',
  '矩形 2 拷贝 9.png': '产品类型 / 战术系列',
  '矩形 2 拷贝 10.png': '产品类型 / 头灯系列',
  '矩形 2 拷贝 11.png': '产品类型 / 潜水系列',
  '1.jpg': '热卖产品 / 主推',
  '矩形 2 拷贝 2.jpg': '热卖产品 / 产品组',
  '矩形 2 拷贝 3.jpg': '热卖产品 / 场景',
  '矩形 2.jpg': '热卖产品 / 阵列',
  '矩形 2 拷贝 15.jpg': '关于品牌 / 品牌背书',
  '矩形 2 拷贝 14.png': '关于品牌 / 研发实力',
  '矩形 3.png': '关于品牌 / 品牌历史',
  '页尾设计文案.png': '页尾信息',
  'logo.png': '品牌标识',
}
await addGroup(manifest, 'web-aliexpress', aliexpressFiles, {
  width: 1100,
  quality: 80,
  targetKB: 320,
  captions: aliexpressCaptions,
})

const illustrationDir = join(SOURCE, '插画')
const illustrationFiles = [
  ...pick(illustrationDir, ['大图.jpg']),
  ...pick(illustrationDir, [
    '金龙.jpg',
    '凤凰.jpg',
    '金狮.jpg',
    '麒麟.jpg',
    '甪瑞.jpg',
    '狻貌.jpg',
    '懈豸.jpg',
    '行什.jpg',
  ]),
  ...refs('illustration-mockups'),
]
const illustrationCaptions = {
  '大图.jpg': '故宫祥瑞 / 八大瑞兽',
  '金龙.jpg': '金龙 / 祥瑞',
  '凤凰.jpg': '凤凰 / 瑞德',
  '金狮.jpg': '金狮 / 守护',
  '麒麟.jpg': '麒麟 / 仁兽',
  '甪瑞.jpg': '甪瑞 / 明达',
  '狻貌.jpg': '狻貌 / 辟邪',
  '懈豸.jpg': '懈豸 / 公正',
  '行什.jpg': '行什 / 镇火',
}
await addGroup(manifest, 'illustration', illustrationFiles, {
  width: 1000,
  quality: 82,
  targetKB: 320,
  captions: illustrationCaptions,
})

const materialsDir = join(SOURCE, '物料')
const materialFiles = [
  ...refs('catalog'),
  ...refs('foldout-cn'),
  ...refs('foldout-en'),
]
const materialCaptions = {
  'foldout-cn-1.png': '2026 中文展会折页',
  'foldout-en-1.png': '2026 英文展会折页',
}
await addGroup(manifest, 'materials', materialFiles, {
  width: 1400,
  quality: 81,
  targetKB: 360,
  captions: materialCaptions,
})

mkdirSync(dirname(MANIFEST), { recursive: true })
writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

const outputBytes = Object.values(manifest)
  .flat()
  .reduce((sum, item) => {
    const path = join(OUT, Object.keys(manifest).find((slug) => manifest[slug].includes(item)), item.file)
    return sum + (existsSync(path) ? statSync(path).size : 0)
  }, 0)
console.log(`\nManifest: ${relative(ROOT, MANIFEST)}`)
console.log(`Web assets: ${(outputBytes / 1024 / 1024).toFixed(2)}MB in ${relative(ROOT, OUT)}`)
