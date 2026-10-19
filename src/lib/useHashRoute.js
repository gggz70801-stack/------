import { useEffect, useState } from 'react'

const ROUTE_EVENT = 'app:route'

/**
 * 极简 hash 路由（零依赖，静态托管零配置）
 *   #/                  → 首页
 *   #/works             → 作品列表页（全部作品）
 *   #/works/<slug>      → 作品详情页
 *   #/other             → 其他项目总览
 *   #/other/<slug>      → 其他项目类别页
 *   #/other/<slug>/<sub>→ 类别下的独立项目页
 *   #works / #about 等  → 不算路由，属于首页内的锚点滚动
 */
function parse() {
  const hash = window.location.hash || ''
  if (!hash.startsWith('#/')) return { view: 'home', slug: '', sub: '', parts: [] }
  const parts = hash.slice(2).split('/').filter(Boolean)
  return {
    view: parts[0] || 'home',
    slug: parts[1] || '',
    sub: parts[2] || '',
    parts,
  }
}

export default function useHashRoute() {
  const [route, setRoute] = useState(parse)

  useEffect(() => {
    const update = () => setRoute(parse())
    window.addEventListener('hashchange', update)
    window.addEventListener('popstate', update)
    window.addEventListener(ROUTE_EVENT, update)
    return () => {
      window.removeEventListener('hashchange', update)
      window.removeEventListener('popstate', update)
      window.removeEventListener(ROUTE_EVENT, update)
    }
  }, [])

  return route
}

/**
 * 程序化跳转：用 pushState 而不是直接改 location.hash，
 * 避免浏览器把 "#/works/xxx" 当成找不到的锚点、把页面甩回顶部。
 */
export function navigate(path) {
  const hash = path.startsWith('#') ? path : `#${path}`
  if (window.location.hash === hash) return
  window.history.pushState(null, '', hash)
  window.dispatchEvent(new Event(ROUTE_EVENT))
}

/** 记住 / 取回首页滚动位置 */
let homeScroll = 0
export function rememberHomeScroll(y) {
  homeScroll = y
}
export function takeHomeScroll() {
  const y = homeScroll
  homeScroll = 0
  return y
}

/**
 * 记住访客是从哪儿点进作品详情页的：
 *  · 'home' → 首页「精选项目」区块
 *  · 'list' → 作品列表页（#/works）
 * 详情页的「返回作品集」会照着回去，不会把人甩到别的地方。
 */
let worksOrigin = 'list'
export function rememberWorksOrigin(origin) {
  worksOrigin = origin === 'home' ? 'home' : 'list'
}
export function getWorksOrigin() {
  return worksOrigin
}

/** 回首页（可选：落到某个区块） */
export function goHomeTo(sectionId) {
  navigate('#/')
  if (!sectionId) return
  window.setTimeout(() => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, 90)
}
