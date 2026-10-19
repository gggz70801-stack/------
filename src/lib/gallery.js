import manifest from '../data/gallery.json'
import otherManifest from '../data/other-gallery.json'

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

const OTHER_FILES = import.meta.glob('../assets/other/**/*.{webp,jpg,jpeg,png,avif}', {
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

/**
 * 其他项目图库：带原始文件名和尺寸清单，按导入脚本生成好的顺序读取。
 */
export function getOtherGallery(slug) {
  if (!slug) return []
  const prefix = `../assets/other/${slug}/`
  const dims = otherManifest[slug] || []

  return Object.entries(OTHER_FILES)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, src]) => {
      const file = path.split('/').pop()
      const size = dims.find((item) => item.file === file) || {}
      return {
        src,
        file,
        name: size.name || file.replace(/\.[^.]+$/, ''),
        w: size.w || 0,
        h: size.h || 0,
        page: size.page,
        part: size.part,
        parts: size.parts,
      }
    })
    .sort((a, b) => {
      const ai = dims.findIndex((item) => item.file === a.file)
      const bi = dims.findIndex((item) => item.file === b.file)
      return ai - bi
    })
}

export function getOtherCover(slug) {
  return getOtherGallery(slug)[0] || null
}

/** 在指定图库中按文件名找一张封面，找不到时回退到该组第一张。 */
export function getOtherFile(slug, file) {
  const gallery = getOtherGallery(slug)
  return gallery.find((image) => image.file === file) || gallery[0] || null
}

/**
 * 项目的策展封面：可以用多张图组成完整封面，也可以回退到 coverGroup 第一张。
 * label 会保留在返回对象上，由卡片组件按当前语言显示。
 */
export function getOtherCovers(project) {
  const selected = (project?.covers || [])
    .map((cover) => {
      const image = getOtherFile(cover.gallery, cover.file)
      return image ? { ...image, label: cover.label } : null
    })
    .filter(Boolean)

  if (selected.length) return selected
  const fallback = getOtherCover(project?.coverGroup)
  return fallback ? [fallback] : []
}
