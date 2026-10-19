#!/usr/bin/env node
/**
 * Sync only the new social creatives from the shared source folder.
 * Existing curated filenames are kept so the prior portfolio order stays intact.
 */

import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const SOURCE = 'E:/作品集/作品集素材/社交媒体'
const OUT = join(process.cwd(), 'media-src', 'works', 'acebeam-social')

const additions = [
  ['1 拷贝 2.jpg', '32-UC3A多色平铺.jpg'],
  ['1 拷贝.jpg', '33-直播场景-青色.jpg'],
  ['1.jpg', '34-直播场景-暗色.jpg'],
  ['23.jpg', '35-E75马年礼盒.jpg'],
  ['Gemini_Generated_Image_d0iis0d0iis0d0ii.jpg', '36-手电分层结构.jpg'],
  ['Giveaway-ec20.jpg', '37-EC20抽奖.jpg'],
  ['giveaway.jpg', '38-圣诞赠礼活动.jpg'],
  ['K1 - winner图.jpg', '39-K1开奖.jpg'],
  ['L35-giveaway.jpg', '40-L35万圣节抽奖.jpg'],
  ['M1-带折扣.jpg', '41-M1黑五折扣.jpg'],
  ['创意海报.jpg', '42-多品横幅创意.jpg'],
  ['圣诞EDM封面图.jpg', '43-圣诞EDM封面.jpg'],
  ['电池5600.jpg', '44-5600电池性能海报.jpg'],
  ['黑五限量版产品合集-无折扣.jpg', '45-黑五限量合集.jpg'],
  ['黑色星期五.jpg', '46-黑五悬念海报.jpg'],
]

mkdirSync(OUT, { recursive: true })
let copied = 0
let sourceBytes = 0
let webBytes = 0

for (const [sourceName, targetName] of additions) {
  const source = join(SOURCE, sourceName)
  const target = join(OUT, targetName)
  const webTarget = join(process.cwd(), 'src', 'assets', 'works', 'acebeam-social', targetName.replace(/\.jpg$/i, '.webp'))
  if (!existsSync(source)) {
    console.log(`MISSING ${sourceName}`)
    continue
  }
  sourceBytes += statSync(source).size
  if (existsSync(webTarget)) webBytes += statSync(webTarget).size
  if (existsSync(target)) {
    console.log(`EXISTS  ${targetName}`)
    continue
  }
  copyFileSync(source, target)
  console.log(`ADDED   ${targetName}`)
  copied += 1
}

console.log(`\n${copied} new social creatives added.`)
if (webBytes) {
  console.log(
    `New set size: ${(sourceBytes / 1024 / 1024).toFixed(2)}MB -> ${(webBytes / 1024 / 1024).toFixed(2)}MB`
  )
} else {
  console.log('Run: pnpm media:image --only acebeam-social')
}
