import { useEffect, useState } from 'react'

/**
 * 中英切换（零依赖）
 * ---------------------------------------------------------------
 * · 语言只存在浏览器里（localStorage），刷新后保持上次选的
 * · 不写进 URL，所以不会影响现有的 hash 路由（作品详情页地址不变）
 * · 图片素材完全不动，只切换文字
 */
const KEY = 'ybj-lang'
const listeners = new Set()

function readInitial() {
  try {
    const saved = window.localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'zh') return saved
  } catch {
    /* 隐私模式下拿不到 localStorage，用默认中文 */
  }
  return 'zh'
}

let current = typeof window === 'undefined' ? 'zh' : readInitial()

function apply(lang) {
  current = lang
  if (typeof document !== 'undefined') document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
}

apply(current)

export function getLang() {
  return current
}

export function setLang(next) {
  if (next !== 'zh' && next !== 'en') return
  if (next === current) return
  apply(next)
  try {
    window.localStorage.setItem(KEY, next)
  } catch {
    /* 存不了也不影响当前会话 */
  }
  listeners.forEach((fn) => fn(next))
}

export function toggleLang() {
  setLang(current === 'zh' ? 'en' : 'zh')
}

export default function useLang() {
  const [lang, set] = useState(current)
  useEffect(() => {
    const fn = (next) => set(next)
    listeners.add(fn)
    return () => listeners.delete(fn)
  }, [])
  return lang
}
