import { useEffect, useRef, useState } from 'react'
import { subscribeToast } from '../lib/toast'

export function Grain() {
  return <div className="grain" aria-hidden="true" />
}

export function Spotlight() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(hover: none)').matches) return

    const el = ref.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x
    let cy = y
    let raf = 0

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
    }

    const loop = () => {
      cx += (x - cx) * 0.09
      cy += (y - cy) * 0.09
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="spotlight" ref={ref} aria-hidden="true" />
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      className="progress"
      style={{ width: `${progress * 100}%` }}
      aria-hidden="true"
    />
  )
}

export function Toast() {
  const [message, setMessage] = useState('')

  useEffect(() => subscribeToast(setMessage), [])

  return (
    <div className={`toast ${message ? 'is-open' : ''}`} role="status" aria-live="polite">
      {message && (
        <>
          <span className="toast__dot" />
          {message}
        </>
      )}
    </div>
  )
}
