import manifest from '../data/gallery.json'

/**
 * 作品图自动收集：
 * 把图片放进 src/assets/works/<slug>/ 后，无需改任何代码即可被读取，
 * 文件名用 01-、02- 开头控制顺序；尺寸信息来自 pnpm media:image 生成的 gallery.json。
 */
const FILES = import.meta.glob('../assets/works/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
})

/** 非作品的零散素材（获奖证书等），放在 src/assets/misc/ 下 */
const MISC_FILES = import.meta.glob('../assets/misc/**/*.{webp,jpg,jpeg,png,avif}', {
  eager: true,
  import: 'default',
})

export function getMisc(sub = '') {
  const prefix = `../assets/misc/${sub ? sub + '/' : ''}`
  return Object.entries(MISC_FILES)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => {
      const file = path.split('/').pop()
      return { src, file, name: file.replace(/\.[^.]+$/, '') }
    })
}

export function getGallery(slug) {
  if (!slug) return []
  const prefix = `../assets/works/${slug}/`
  const dims = manifest[slug] || []

  return Object.entries(FILES)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => {
      const file = path.split('/').pop()
      const size = dims.find((d) => d.file === file) || {}
      return { src, file, name: size.name || '', w: size.w || 0, h: size.h || 0 }
    })
}

/** 列表页封面：优先 cover 开头，其次第一张 */
export function getCover(slug) {
  const list = getGallery(slug)
  return list.find((img) => /^cover/i.test(img.file)) || list[0] || null
}

export function hasGallery(slug) {
  return getGallery(slug).length > 0
}
