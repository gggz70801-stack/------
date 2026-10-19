import { useEffect } from 'react'

/**
 * 全站滚动出现动效：
 * 只需给元素加 data-reveal，进入视口后自动加上 .is-in
 */
export default function useRevealScan() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = () => Array.from(document.querySelectorAll('[data-reveal]:not(.is-in)'))

    if (reduce) {
      nodes().forEach((n) => n.classList.add('is-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.01, rootMargin: '0px 0px -8% 0px' }
    )

    let scanRaf = 0
    const scan = () => nodes().forEach((n) => observer.observe(n))
    const scheduleScan = () => {
      if (scanRaf) return
      scanRaf = requestAnimationFrame(() => {
        scanRaf = 0
        scan()
      })
    }
    scan()

    // 路由切换会在同一帧里连续插入很多节点，合并成一次扫描，避免重复遍历整页。
    const mutation = new MutationObserver(scheduleScan)
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
      if (scanRaf) cancelAnimationFrame(scanRaf)
    }
  }, [])
}
