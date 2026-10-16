import { useEffect, useState } from 'react'
import './intro.css'

export default function Intro({ name, nameEn }) {
  const [state, setState] = useState('idle') // idle -> running -> done

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setState('done')
      return
    }
    document.body.classList.add('is-locked')
    const t1 = window.setTimeout(() => setState('running'), 40)
    const t2 = window.setTimeout(() => {
      setState('done')
      document.body.classList.remove('is-locked')
    }, 1500)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      document.body.classList.remove('is-locked')
    }
  }, [])

  if (state === 'done') return null

  return (
    <div className={`intro ${state === 'running' ? 'is-running' : ''}`} aria-hidden="true">
      <div className="intro__inner">
        <div className="intro__name">
          <span>{name}</span>
          <span className="intro__name-en">{nameEn}</span>
        </div>
        <div className="intro__bar">
          <span />
        </div>
        <p className="intro__meta mono">PORTFOLIO / 2026 · VISUAL DESIGN</p>
      </div>
    </div>
  )
}
