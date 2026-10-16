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

    const scan = () => nodes().forEach((n) => observer.observe(n))
    scan()

    const mutation = new MutationObserver(() => scan())
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])
}
