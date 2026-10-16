import { useEffect, useRef, useState } from 'react'

export default function Counter({ value, duration = 1500, pad = 2 }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.unobserve(el)
        const start = performance.now()
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(value * eased))
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [value, duration])

  return (
    <span className="num" ref={ref}>
      {String(display).padStart(pad, '0')}
    </span>
  )
}
