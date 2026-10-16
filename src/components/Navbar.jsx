import { useEffect, useState } from 'react'
import useActiveSection from '../lib/useActiveSection'
import useHashRoute, { goHomeTo, navigate, rememberHomeScroll, rememberWorksOrigin } from '../lib/useHashRoute'
import useContent from '../lib/content'
import useLang, { toggleLang } from '../lib/lang'
import { sectionOrder } from '../data/profile'
import './navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const route = useHashRoute()
  const lang = useLang()
  const { c, t } = useContent()
  const active = useActiveSection(sectionOrder)

  // 作品列表页 / 详情页也属于「作品集」这一项
  const onWorksRoute = route.view === 'works'
  const activeId = onWorksRoute ? 'works' : active

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    return () => document.body.classList.remove('is-locked')
  }, [open])

  const go = (event, id) => {
    event.preventDefault()
    setOpen(false)

    // 「作品集」→ 作品列表页（#/works）
    if (id === 'works') {
      rememberWorksOrigin('list')
      if (onWorksRoute) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      rememberHomeScroll(window.scrollY)
      navigate('#/works')
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const scroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // 在作品列表页 / 详情页时，先回首页再滚动到对应区块
    if (onWorksRoute) {
      goHomeTo(id)
      return
    }
    scroll()
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="shell nav__inner">
        <a className="nav__brand" href="#hero" onClick={(e) => go(e, 'hero')}>
          <span className="nav__mark">{c.profile.initials}</span>
          <span className="nav__brand-text">
            <strong>{t(c.profile.brandMain)}</strong>
            <em>{t(c.profile.brandSub)}</em>
          </span>
        </a>

        <nav className="nav__links" aria-label="主导航">
          {c.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link ${activeId === item.id ? 'is-active' : ''}`}
              onClick={(e) => go(e, item.id)}
              aria-current={activeId === item.id ? 'page' : undefined}
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__lang"
            onClick={toggleLang}
            aria-label={t(c.ui.langButtonLabel)}
            title={t(c.ui.langButtonLabel)}
            lang={lang === 'zh' ? 'en' : 'zh-CN'}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.1" stroke="currentColor" strokeWidth="1.1" />
              <path d="M1.9 8h12.2M8 1.9c1.7 1.7 2.6 3.8 2.6 6.1S9.7 12.4 8 14.1C6.3 12.4 5.4 10.3 5.4 8S6.3 3.6 8 1.9Z" stroke="currentColor" strokeWidth="1.1" />
            </svg>
            <span>{t(c.ui.langButton)}</span>
          </button>

          <button
            type="button"
            className="nav__burger"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
