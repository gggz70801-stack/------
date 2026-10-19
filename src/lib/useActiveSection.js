import { useEffect, useState } from 'react'
import subscribeViewport from './scrollFrame'

/** 根据滚动位置高亮当前导航项 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    return subscribeViewport(() => {
      const probe = window.innerHeight * 0.34
      let current = null
      ids.forEach((id) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        if (rect.top <= probe) current = id
      })
      setActive((previous) => (previous === current ? previous : current))
    })
  }, [ids])

  return active
}
