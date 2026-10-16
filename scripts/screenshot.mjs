#!/usr/bin/env node
/**
 * 无头浏览器截图（改完页面自己看一眼用，见 AGENTS.md 规则 3）
 * ---------------------------------------------------------------
 * 用法：
 *   node scripts/screenshot.mjs                                  # 默认截首页
 *   node scripts/screenshot.mjs "#/works"                        # 截作品列表页
 *   node scripts/screenshot.mjs "#/works/amazon-listing" 1920x1080
 *   node scripts/screenshot.mjs "#/works" 1440x900 full
 *   node scripts/screenshot.mjs "!works" 1920x1080               # 首页滚到「作品集」区块
 *   SHOT_LANG=en node scripts/screenshot.mjs "!about" 1920x1080  # 切到英文版再截
 *
 * 参数：<hash> [尺寸 宽x高] [full]
 *   · 不加 full    → 只截首屏（看第一眼的效果）
 *   · 加 full      → 整页长截图
 *   · 写成 !区块ID → 先滚到首页某个区块再截图
 * 输出目录：.shots/（不进仓库）
 * 顺便把浏览器控制台里的报错打印出来。
 */

import { createRequire } from 'node:module'
import { existsSync, mkdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const BASE = process.env.SHOT_BASE_URL || 'http://127.0.0.1:5173/'

/** 找到可用的 playwright：优先项目本地，其次借用 Codex 运行环境自带的那份 */
const PW_CANDIDATES = [
  join(process.cwd(), 'node_modules', 'playwright', 'index.js'),
  'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.js',
]

async function loadPlaywright() {
  for (const p of PW_CANDIDATES) {
    if (!existsSync(p)) continue
    const require = createRequire(pathToFileURL(p).href)
    return require(p)
  }
  return import('playwright')
}

const args = process.argv.slice(2)
const hash = args.find((a) => !/^\d+x\d+$/.test(a) && a !== 'full') || ''
const sizeArg = args.find((a) => /^\d+x\d+$/.test(a)) || '1920x1080'
const fullPage = args.includes('full')
const [width, height] = sizeArg.split('x').map(Number)

const atSection = hash.startsWith('!') ? hash.slice(1) : ''
const url = atSection ? BASE : BASE + '#/' + hash.replace(/^#*\/?/, '')
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const outDir = resolve(process.cwd(), '.shots')
mkdirSync(outDir, { recursive: true })
const outFile = join(outDir, `${stamp}-${width}x${height}${fullPage ? '-full' : ''}.png`)

const { chromium } = await loadPlaywright()

/** 本机装好的 Chrome / Edge 都能用，不额外下载浏览器内核 */
const LAUNCH_OPTIONS = [{ channel: 'chrome' }, { channel: 'msedge' }, {}]
let browser
let launchError
for (const options of LAUNCH_OPTIONS) {
  try {
    browser = await chromium.launch(options)
    break
  } catch (err) {
    launchError = err
  }
}
if (!browser) {
  console.error('\n❌ 打不开浏览器。请确认本机装了 Chrome 或 Edge，或执行 npx playwright install\n')
  console.error(launchError?.message || launchError)
  process.exit(1)
}

const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })

/*
  语言：站点把中英选择存在 localStorage（见 src/lib/lang.js），
  所以要在页面脚本跑起来之前先把值塞进去，否则会先渲染中文再跳一次。
*/
const shotLang = process.env.SHOT_LANG
if (shotLang === 'en' || shotLang === 'zh') {
  await page.addInitScript((value) => window.localStorage.setItem('ybj-lang', value), shotLang)
}

const problems = []
page.on('console', (msg) => {
  if (msg.type() === 'error' || msg.type() === 'warning') problems.push(`[${msg.type()}] ${msg.text()}`)
})
page.on('pageerror', (err) => problems.push(`[pageerror] ${err.message}`))
page.on('requestfailed', (req) => problems.push(`[requestfailed] ${req.url()} ${req.failure()?.errorText || ''}`))

await page.goto(url, { waitUntil: 'load' })
// 等开场动画结束 + 滚动出现动效跑完 + 字体稳定
await page.waitForTimeout(2200)
if (atSection) {
  await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({ block: 'start' }), atSection)
  await page.waitForTimeout(1400)
}
if (fullPage) {
  await page.evaluate(async () => {
    // 页面上开了 scroll-behavior: smooth，整页截图前先关掉，否则滚不到底
    const previous = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    const step = window.innerHeight
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 90))
    }
    window.scrollTo(0, 0)
    document.documentElement.style.scrollBehavior = previous
  })
  await page.waitForTimeout(900)
} else {
  await page.mouse.move(width / 2, height / 2)
  await page.waitForTimeout(400)
}

// 等所有图片真的解码完成，避免截图里出现"还没画出来"的空图
await page
  .waitForFunction(() => Array.from(document.images).every((img) => img.complete), null, {
    timeout: 20000,
  })
  .catch(() => {})
await page.waitForTimeout(600)

await page.screenshot({ path: outFile, fullPage })
await browser.close()

console.log(`\n📸 截图完成：${outFile}`)
console.log(`   地址：${url}  尺寸：${width}×${height}${fullPage ? '（整页）' : '（首屏）'}`)
if (problems.length) {
  console.log('\n⚠️  控制台有问题：')
  problems.slice(0, 20).forEach((p) => console.log('   ' + p))
} else {
  console.log('\n✅ 控制台干净，没有报错。')
}
