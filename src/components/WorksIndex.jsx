import { useMemo, useState } from 'react'
import AnimatedContent from './AnimatedContent'
import WorkVisual from './WorkVisual'
import { getCover } from '../lib/gallery'
import { navigate, rememberWorksOrigin, goHomeTo } from '../lib/useHashRoute'
import useContent from '../lib/content'
import './works-index.css'

/** 作品列表页：#/works —— 全部作品，网格浏览 */
export default function WorksIndex() {
  const { lang, c, t, tl } = useContent()
  const [filterIndex, setFilterIndex] = useState(0)

  const page = c.worksPage
  const filters = t(c.projectFilters)
  const active = filters[filterIndex]

  const list = useMemo(() => {
    const all = c.projects
    if (filterIndex === 0) return all
    return all.filter((p) => t(p.category) === active)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIndex, lang])

  const categories = new Set(c.projects.map((p) => t(p.category)))
  const years = c.projects.flatMap((p) => String(p.year).match(/\d{4}/g) || []).map(Number)
  const yearRange = years.length ? `${Math.min(...years)} — ${Math.max(...years)}` : '—'

  return (
    <div className="windex">
      <header className="windex__head">
        <div className="shell">
          <AnimatedContent distance={44} blur={8} duration={1}>
            <span className="kicker">{page.kicker}</span>
            <h1 className="windex__title">
              {t(page.title)}
              <em>{t(page.titleEn)}</em>
            </h1>
            <p className="windex__desc">{t(page.desc)}</p>
          </AnimatedContent>

          <AnimatedContent className="windex__stats" delay={0.12} stagger={0.09} distance={30} duration={0.75}>
            <div className="windex__stat">
              <span className="mono">{page.stats.projects}</span>
              <strong>{String(c.projects.length).padStart(2, '0')}</strong>
            </div>
            <div className="windex__stat">
              <span className="mono">{t(page.stats.directions)}</span>
              <strong>{String(categories.size).padStart(2, '0')}</strong>
            </div>
            <div className="windex__stat">
              <span className="mono">{t(page.stats.years)}</span>
              <strong>{yearRange}</strong>
            </div>
          </AnimatedContent>
        </div>
      </header>

      <div className="shell">
        <div className="works__toolbar">
          <ul className="works__filters">
            {filters.map((item, i) => (
              <li key={item}>
                <button
                  type="button"
                  className={`chip ${filterIndex === i ? 'is-active' : ''}`}
                  onClick={() => setFilterIndex(i)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <span className="works__count mono">
            {String(list.length).padStart(2, '0')} / {String(c.projects.length).padStart(2, '0')} PROJECTS
          </span>
        </div>

        <AnimatedContent
          className="windex__grid"
          stagger={0.06}
          distance={52}
          duration={0.8}
          blur={4}
          threshold={0.05}
        >
          {list.map((project, i) => {
            const cover = getCover(project.slug)
            const tags = tl(project.tags)
            return (
              <a
                href={`#/works/${project.slug}`}
                className="wcard"
                key={`${filterIndex}-${project.slug}`}
                aria-label={`${t(project.title)} — ${t(c.ui.viewProject)}`}
                onClick={(event) => {
                  event.preventDefault()
                  rememberWorksOrigin('list')
                  navigate(`#/works/${project.slug}`)
                }}
              >
                <div className="wcard__media">
                  {project.cover ? (
                    <img src={project.cover} alt={t(project.title)} loading="lazy" decoding="async" />
                  ) : cover ? (
                    <img
                      src={cover.src}
                      alt={t(project.title)}
                      loading="lazy"
                      decoding="async"
                      width={cover.w || undefined}
                      height={cover.h || undefined}
                    />
                  ) : (
                    <>
                      <WorkVisual type={project.visual} />
                      <span className="wcard__placeholder mono">IMG</span>
                    </>
                  )}
                  <span className="wcard__badge mono">{project.index}</span>
                  <span className="wcard__sheen" aria-hidden="true" />
                </div>

                <div className="wcard__body">
                  <div className="wcard__top">
                    <span className="mono">{t(project.category)}</span>
                    <span className="mono">{project.year}</span>
                  </div>
                  <h2 className="wcard__title">{t(project.title)}</h2>
                  <p className="wcard__subtitle mono">{t(project.subtitle)}</p>
                  <ul className="wcard__tags">
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </a>
            )
          })}
        </AnimatedContent>

        <AnimatedContent className="windex__cta" distance={36} blur={6} duration={0.9}>
          <div className="windex__cta-text">
            <h2>{t(page.ctaTitle)}</h2>
            <p>{t(page.ctaText)}</p>
          </div>
          <div className="windex__cta-actions">
            <a
              className="btn btn--primary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                goHomeTo('contact')
              }}
            >
              {t(c.ui.contactMe)}
              <svg className="btn__ico" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11m0 0L8.6 3.6M13 8l-4.4 4.4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
            <a
              className="btn"
              href="#/"
              onClick={(e) => {
                e.preventDefault()
                goHomeTo('hero')
              }}
            >
              {t(c.ui.backHome)}
            </a>
          </div>
        </AnimatedContent>
      </div>
    </div>
  )
}
