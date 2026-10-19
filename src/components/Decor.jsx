import { useEffect, useRef, useState } from 'react'
import subscribeViewport from '../lib/scrollFrame'
import { subscribeToast } from '../lib/toast'

export function PageAtmosphere() {
  return <div className="page-atmosphere" aria-hidden="true" />
}

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
    el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`

    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const loop = () => {
      raf = 0
      cx += (x - cx) * 0.09
      cy += (y - cy) * 0.09
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      if (Math.abs(x - cx) + Math.abs(y - cy) > 0.2) raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div className="spotlight" ref={ref} aria-hidden="true" />
}

export function ScrollProgress() {
  const ref = useRef(null)

  useEffect(() => {
    return subscribeViewport(() => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (ref.current) ref.current.style.transform = `scaleX(${progress})`
    })
  }, [])

  return <div className="progress" ref={ref} aria-hidden="true" />
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
