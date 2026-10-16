import { useEffect, useState } from 'react'

/** 根据滚动位置高亮当前导航项 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.34
      let current = null
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.top <= probe) current = id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}
