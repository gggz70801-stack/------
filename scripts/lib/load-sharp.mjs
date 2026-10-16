import { createRequire } from 'node:module'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

/**
 * 找到可用的 sharp（图片压缩库）。
 * 优先用项目自己装的；没装就借用 Codex 运行环境里自带的那份，
 * 这样本项目可以保持"零依赖"，不用为了压图额外装几十 MB 的包。
 *
 * 注意：sharp 不同版本的入口文件不一样（老版本是 lib/index.js，新版本是 dist/index.cjs），
 * 所以这里按"包的目录"来找，让 Node 自己按 package.json 里的 main 去解析，换版本也不会失效。
 */
const CANDIDATES = [
  // 1) 项目本地
  join(process.cwd(), 'node_modules', 'sharp', 'package.json'),
  // 2) Codex 运行环境（本机）
  'C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/package.json',
]

export async function loadSharp() {
  const found = CANDIDATES.find((p) => existsSync(p))
  if (found) {
    const require = createRequire(found)
    try {
      const mod = require(found.replace(/package\.json$/, ''))
      return mod.default || mod
    } catch {
      // 继续往下试
    }
  }
  // 最后尝试常规解析（万一装在别处）
  try {
    const require = createRequire(import.meta.url)
    const mod = require('sharp')
    return mod.default || mod
  } catch {
    return null
  }
}
