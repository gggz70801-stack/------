#!/usr/bin/env node
/**
 * 章节背景板：把「视频里截的一帧」处理成能当底纹用的图
 * ---------------------------------------------------------------
 * 为什么单独写一个脚本：
 *   背景板不是"作品图"，处理方式和 optimize-images.mjs 不一样——
 *   它要裁掉水印、压成黑白/单色、压暗、模糊，最后压到很小的体积。
 *   这是**一次性脚本**（和之前处理「关于我」那张壁纸一样），
 *   改素材时在这里改参数重跑，不参与日常 media:image 流程。
 *
 * 用法：pnpm plates        （或 node scripts/make-section-plates.mjs）
 *
 * 源帧来自《使命召唤》幽灵壁纸视频：
 *   D:/STEAM/steamapps/workshop/content/431960/3133797682/WeChat_20240107180029.mp4
 *   1280×720 / 17.6s，用 scripts/grab-frames.mjs 抽帧后挑的
 */

import { existsSync, mkdirSync, statSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { loadSharp } from './lib/load-sharp.mjs'

const ROOT = process.cwd()
const OUT_DIR = join(ROOT, 'src', 'assets', 'section-bg')
const FRAME_DIR = join(ROOT, '.frames')

/**
 * 每块背景板的参数说明：
 *   frame      源帧文件名（.frames/ 里，用 grab-frames.mjs 抽出来的）
 *   out        输出文件名
 *   crop       裁切 { left, top, width, height }（单位 px，源帧 1280×720）
 *              —— 裁切的目的：把原视频右下角的 UP 主水印、"CALL OF DUTY" 滚动字幕、
 *                 以及花哨的大字标题挡掉。背景是给人"感觉"的，不是给人"读"的。
 *   saturate   保色程度。0 = 纯黑白，1 = 原色。冷色板留一点点色，暖色板留得多一点。
 *   tint       单色染色（不填就保持黑白）
 *   brightness 整体明暗（<1 更暗）
 *   contrast   对比（>1 更硬）
 *   blur       模糊（px）——"轮廓在、细节糊"，人物不会跳出来抢字
 *   width      输出宽度（最多和源帧一样宽，不放大）
 *   quality    WebP 质量
 */
const PLATES = [
  {
    /* 15.55s：幽灵在火红的光里，背景是纯黑 —— 和全站琥珀橙主色是同一个色温 */
    frame: 'f-027-15.55s.jpg',
    out: 'contact-ghost.webp',
    /*
      裁成"比章节更宽"的一条：
      原帧太方，铺满 1700 宽的版心时余量不够，人物只能停在正中间；
      裁宽之后才能靠 object-position 把人推到画面右侧的空当里。
      top:175 是为了躲开底部那行 UP 主水印。
    */
    crop: { left: 120, top: 175, width: 1160, height: 475 },
    saturate: 0.5,
    tint: '#ff8434',
    brightness: 0.98,
    contrast: 1.1,
    blur: 1.6,
    width: 1160,
    quality: 74,
  },
  {
    /* 6.75s：幽灵＋队友，冷蓝夜戏 —— 给「关于我」做底，和暖色板形成冷暖两组 */
    frame: 'f-012-6.75s.jpg',
    out: 'about-ghost.webp',
    crop: { left: 0, top: 0, width: 1280, height: 552 },
    saturate: 0.3,
    tint: '#8ea6c2',
    brightness: 1.38,
    contrast: 1.12,
    blur: 2.2,
    width: 1280,
    quality: 72,
  },
]

const sharp = await loadSharp()
if (!sharp) {
  console.log('\n没找到 sharp，无法处理图片。\n')
  process.exit(1)
}
if (!existsSync(FRAME_DIR)) {
  console.log(`\n没有 ${FRAME_DIR}，先用下面这条命令抽帧：`)
  console.log('  node scripts/grab-frames.mjs "<视频路径>" --count 30 --out .frames\n')
  process.exit(1)
}
mkdirSync(OUT_DIR, { recursive: true })

const kb = (n) => `${(n / 1024).toFixed(0)}KB`
let total = 0

for (const plate of PLATES) {
  const src = join(FRAME_DIR, plate.frame)
  if (!existsSync(src)) {
    console.log(`⚠️  缺少源帧 ${plate.frame}，跳过`)
    continue
  }
  const out = join(OUT_DIR, plate.out)
  const before = statSync(src).size

  let img = sharp(src).extract(plate.crop)

  // 饱和度：先按比例降饱和（sharp 没有直接"降饱和"的开关，用 modulate 做）
  img = img.modulate({ saturation: plate.saturate })
  // 单色化：tint 会把图先转灰度再染色，等于"黑白 + 一个色相"
  if (plate.tint) img = img.tint(plate.tint)
  // 对比 / 明暗
  img = img.linear(plate.contrast, -(128 * plate.contrast) + 128 * plate.brightness)
  if (plate.blur) img = img.blur(plate.blur)
  if (plate.width) img = img.resize({ width: plate.width, withoutEnlargement: true })

  await img.webp({ quality: plate.quality, effort: 6 }).toFile(out)

  const after = statSync(out).size
  total += after
  const m = await sharp(out).metadata()
  console.log(
    `  ${plate.out}  ${m.width}×${m.height}  ${kb(before)} → ${kb(after)}` +
      `（${(100 - (after / before) * 100).toFixed(0)}% off）`
  )
}

console.log(`\n背景板合计 ${kb(total)}，输出目录 src/assets/section-bg/\n`)
console.log('下一步：在 about.css / contact.css 里调整透明度和位置。\n')

