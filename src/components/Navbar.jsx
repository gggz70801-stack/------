import { useEffect, useRef, useState } from 'react'
import useActiveSection from '../lib/useActiveSection'
import { goHomeTo, navigate, rememberHomeScroll, rememberWorksOrigin } from '../lib/useHashRoute'
import subscribeViewport from '../lib/scrollFrame'
import useContent from '../lib/content'
import useLang, { toggleLang } from '../lib/lang'
import { sectionOrder } from '../data/profile'
import './navbar.css'

export default function Navbar({ route }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [openPortfolio, setOpenPortfolio] = useState('')
  const [openOtherProject, setOpenOtherProject] = useState('')
  const navRef = useRef(null)
  const lang = useLang()
  const { c, t } = useContent()
  const active = useActiveSection(sectionOrder)

  // 作品列表页 / 详情页 / 其他项目页都归在「作品集」这一项
  const onWorksRoute = route.view === 'works' || route.view === 'other'
  const activeId = onWorksRoute ? 'works' : active === 'other' ? 'works' : active
  const activePortfolio = route.view === 'other' ? 'other' : 'works'
  const backTarget =
    route.view === 'works'
      ? '#/works'
      : route.view === 'other'
        ? route.sub
          ? `#/other/${route.slug}`
          : '#/other'
        : null
  const backLabel =
    route.view === 'works'
      ? t({ zh: '返回作品集', en: 'Back to works' })
      : route.sub
        ? t({ zh: '返回项目类别', en: 'Back to category' })
        : t({ zh: '返回其他项目', en: 'Back to other projects' })

  useEffect(() => {
    return subscribeViewport(() => {
      const next = window.scrollY > 40
      setScrolled((current) => (current === next ? current : next))
    })
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    return () => document.body.classList.remove('is-locked')
  }, [open])

  useEffect(() => {
    setOpenPortfolio('')
    setOpenOtherProject('')
  }, [route.view, route.slug, route.sub])

  useEffect(() => {
    if (!openPortfolio) return
    const closeMenu = (event) => {
      if (event.type === 'keydown') {
        if (event.key === 'Escape') {
          setOpenPortfolio('')
          setOpenOtherProject('')
        }
        return
      }
      if (!navRef.current?.contains(event.target)) {
        setOpenPortfolio('')
        setOpenOtherProject('')
      }
    }
    document.addEventListener('pointerdown', closeMenu)
    document.addEventListener('keydown', closeMenu)
    return () => {
      document.removeEventListener('pointerdown', closeMenu)
      document.removeEventListener('keydown', closeMenu)
    }
  }, [openPortfolio])

  const openPortfolioMenu = (menu) => {
    setOpenPortfolio(menu)
    setOpenOtherProject('')
  }

  const closePortfolioMenu = () => {
    setOpenPortfolio('')
    setOpenOtherProject('')
  }

  const goPortfolioRoute = (event, path) => {
    event.preventDefault()
    closePortfolioMenu()
    if (path.startsWith('#/works')) rememberWorksOrigin('list')
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

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
    <header
      ref={navRef}
      className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}
    >
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

      {onWorksRoute && scrolled && backTarget ? (
        <a
          className="route-back"
          href={backTarget}
          onClick={(event) => {
            event.preventDefault()
            navigate(backTarget)
            window.scrollTo({ top: 0, behavior: 'auto' })
          }}
        >
          <span aria-hidden="true">←</span>
          {backLabel}
        </a>
      ) : null}

      {onWorksRoute ? (
        <nav className="route-switch" aria-label={t({ zh: '作品大类切换', en: 'Portfolio categories' })}>
          <div
            className={`route-projects route-projects--works ${
              openPortfolio === 'works' ? 'is-open' : ''
            }`}
            onMouseEnter={() => openPortfolioMenu('works')}
            onMouseLeave={closePortfolioMenu}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closePortfolioMenu()
            }}
          >
            <a
              href="#/works"
              className={`route-projects__trigger ${
                activePortfolio === 'works' ? 'is-active' : ''
              }`}
              aria-current={activePortfolio === 'works' ? 'page' : undefined}
              aria-haspopup="true"
              aria-expanded={openPortfolio === 'works'}
              aria-controls="route-works-menu"
              onFocus={() => openPortfolioMenu('works')}
              onClick={(event) => {
                event.preventDefault()
                openPortfolioMenu('works')
              }}
            >
              <span className="mono">01</span>
              {t({ zh: '跨境电商', en: 'Cross-border' })}
              <svg className="route-projects__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="m4 6 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <div
              id="route-works-menu"
              className="route-projects__menu"
              aria-label={t({ zh: '跨境电商项目快捷入口', en: 'Cross-border project shortcuts' })}
            >
              <div className="route-projects__menu-head mono">
                <span>CROSS-BORDER PROJECTS</span>
                <span>{String(c.projects.length).padStart(2, '0')} WORKS</span>
              </div>

              <div className="route-projects__list">
                {c.projects.map((project) => {
                  const projectHref = `#/works/${project.slug}`
                  return (
                    <div className="route-project" key={project.slug}>
                      <a
                        className="route-project__link"
                        href={projectHref}
                        onClick={(event) => goPortfolioRoute(event, projectHref)}
                      >
                        <span className="route-project__index mono">{project.index}</span>
                        <span className="route-project__name">{t(project.title)}</span>
                        <span className="route-project__type mono">{t(project.category)}</span>
                        <span className="route-project__arrow" aria-hidden="true">↗</span>
                      </a>
                    </div>
                  )
                })}
              </div>

              <a
                className="route-projects__all"
                href="#/works"
                onClick={(event) => goPortfolioRoute(event, '#/works')}
              >
                <span>{t({ zh: '查看全部跨境电商项目', en: 'View all cross-border projects' })}</span>
                <span className="mono">↗</span>
              </a>
            </div>
          </div>
          <div
            className={`route-projects route-projects--other ${
              openPortfolio === 'other' ? 'is-open' : ''
            }`}
            onMouseEnter={() => openPortfolioMenu('other')}
            onMouseLeave={closePortfolioMenu}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) closePortfolioMenu()
            }}
          >
            <a
              href="#/other"
              className={`route-projects__trigger ${activePortfolio === 'other' ? 'is-active' : ''}`}
              aria-current={activePortfolio === 'other' ? 'page' : undefined}
              aria-haspopup="true"
              aria-expanded={openPortfolio === 'other'}
              aria-controls="route-other-menu"
              onFocus={() => openPortfolioMenu('other')}
              onClick={(event) => {
                event.preventDefault()
                openPortfolioMenu('other')
              }}
            >
              <span className="mono">02</span>
              {t({ zh: '其他项目', en: 'Other projects' })}
              <svg className="route-projects__chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="m4 6 4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <div
              id="route-other-menu"
              className="route-projects__menu"
              aria-label={t({ zh: '其他项目快捷入口', en: 'Other project shortcuts' })}
            >
              <div className="route-projects__menu-head mono">
                <span>OTHER PROJECTS</span>
                <span>{String(c.otherProjects.length).padStart(2, '0')} CATEGORIES</span>
              </div>

              <div className="route-projects__list">
                {c.otherProjects.map((project) => {
                  const children = project.children || []
                  const projectHref = `#/other/${project.slug}`
                  return (
                    <div
                      className={`route-project ${children.length ? 'has-children' : ''} ${
                        openOtherProject === project.slug ? 'is-open' : ''
                      }`}
                      key={project.slug}
                    >
                      <a
                        className="route-project__link"
                        href={projectHref}
                        onFocus={() =>
                          setOpenOtherProject(children.length ? project.slug : '')
                        }
                        onMouseEnter={() =>
                          setOpenOtherProject(children.length ? project.slug : '')
                        }
                        onClick={(event) => goPortfolioRoute(event, projectHref)}
                      >
                        <span className="route-project__index mono">{project.index}</span>
                        <span className="route-project__name">{t(project.menuLabel || project.title)}</span>
                        <span className="route-project__type mono">{t(project.category)}</span>
                        <span className="route-project__arrow" aria-hidden="true">
                          {children.length ? '›' : '↗'}
                        </span>
                      </a>

                      {children.length ? (
                        <div className="route-project__children">
                          <div className="route-project__children-head mono">
                            <span>{t(project.menuLabel || project.title)}</span>
                            <span>{String(children.length).padStart(2, '0')} LINKS</span>
                          </div>
                          {children.map((child, index) => {
                            const childHref = `#/other/${project.slug}/${child.slug}`
                            return (
                              <a
                                className="route-project__child"
                                href={childHref}
                                key={child.slug}
                                onClick={(event) => goPortfolioRoute(event, childHref)}
                              >
                                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                                <span>
                                  <strong>{t(child.title)}</strong>
                                  <em>{t(child.subtitle)}</em>
                                </span>
                                <span aria-hidden="true">↗</span>
                              </a>
                            )
                          })}
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>

              <a
                className="route-projects__all"
                href="#/other"
                onClick={(event) => goPortfolioRoute(event, '#/other')}
              >
                <span>{t({ zh: '查看全部其他项目', en: 'View all other projects' })}</span>
                <span className="mono">↗</span>
              </a>
            </div>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
