import useLang from './lang'
import * as site from '../data/profile'

/**
 * 取文案的两种写法：
 *   1) 固定文字（不翻译）：直接是字符串，原样返回
 *   2) 双语文字：写成 { zh: '中文', en: 'English' }，按当前语言取值
 */
export function tx(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('zh' in value || 'en' in value)) {
    return value[lang] ?? value.zh
  }
  return value
}

/**
 * 数组取值：既支持 ['a','b']，也支持 { zh: [...], en: [...] }；
 * 数组里每一项如果是双语对象，也会按当前语言取。
 */
export function txList(list, lang) {
  const arr = tx(list, lang)
  return (Array.isArray(arr) ? arr : []).map((item) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return tx(item, lang)
    return Object.fromEntries(Object.entries(item).map(([k, v]) => [k, tx(v, lang)]))
  })
}

/** 组件里统一用这个：拿到当前语言、当前语言的全部文案、以及取值函数 */
export default function useContent() {
  const lang = useLang()
  return {
    lang,
    c: site,
    /** 取一个双语字段 */
    t: (value) => tx(value, lang),
    /** 取一个「每项可能是双语」的数组 */
    tl: (list) => txList(list, lang),
  }
}
