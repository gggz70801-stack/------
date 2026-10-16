import { useMemo, useState } from 'react'
import AnimatedContent from './AnimatedContent'
import WorkVisual from './WorkVisual'
import { getCover } from '../lib/gallery'
import { navigate, rememberHomeScroll, rememberWorksOrigin } from '../lib/useHashRoute'
import useContent from '../lib/content'
import { sections } from '../data/profile'
import './works.css'

export default function Works() {
  const { lang, c, t, tl } = useContent()
  /** 用「筛选条件的序号」记录状态：切换语言时不会因为标签文字变了而失效 */
  const [filterIndex, setFilterIndex] = useState(0)

  const filters = t(c.projectFilters)
  const active = filters[filterIndex]

  const list = useMemo(() => {
    const all = c.projects
    if (filterIndex === 0) return all
    return all.filter((p) => t(p.category) === active)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterIndex, lang])

  return (
    <section className="section works" id="works">
      <div className="shell">
        <AnimatedContent className="sec-head" distance={40} blur={7} duration={0.95} threshold={0.15}>
          <div className="sec-head__left">
            <span className="sec-head__index">02</span>
            <h2 className="sec-head__title">
              <span className="sec-head__title-en">{t(sections.works.eyebrow)}</span>
              {t(sections.works.title)}
            </h2>
          </div>
          <div className="sec-head__right">
            <p className="sec-head__desc">{t(sections.works.desc)}</p>
            <a
              className="sec-head__more"
              href="#/works"
              onClick={(e) => {
                e.preventDefault()
                rememberHomeScroll(window.scrollY)
                rememberWorksOrigin('list')
                navigate('#/works')
              }}
            >
              {t(c.ui.viewAllWorks)}
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11m0 0L8.6 3.6M13 8l-4.4 4.4" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </AnimatedContent>

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
            {String(list.length).padStart(2, '0')} PROJECTS
          </span>
        </div>

        {/* 作品逐个进场：stagger 让每个项目依次落下，而不是整片一起淡入 */}
        <AnimatedContent
          className="works__list"
          stagger={0.08}
          distance={72}
          duration={0.85}
          blur={5}
          threshold={0.06}
        >
          {list.map((project, i) => {
            const cover = getCover(project.slug)
            const tags = tl(project.tags)
            const metrics = tl(project.metrics)
            return (
              <a
                href={`#/works/${project.slug}`}
                className={`work ${i % 2 === 1 ? 'work--flip' : ''}`}
                key={`${filterIndex}-${project.index}`}
                aria-label={`${t(project.title)} — ${t(c.ui.viewProject)}`}
                onClick={(event) => {
                  // 先记住当前位置，再从详情页返回时才能回到原处
                  event.preventDefault()
                  rememberHomeScroll(window.scrollY)
                  rememberWorksOrigin('home')
                  navigate(`#/works/${project.slug}`)
                }}
              >
                <div className="work__media">
                  {project.cover ? (
                    <img
                      src={project.cover}
                      alt={t(project.title)}
                      loading="lazy"
                      decoding="async"
                    />
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
                      <span className="work__placeholder mono">IMG</span>
                    </>
                  )}
                  <span className="work__media-tag mono">
                    {project.index} · {t(project.category)}
                  </span>
                  <span className="work__sheen" aria-hidden="true" />
                </div>

                <div className="work__body">
                  <div className="work__head">
                    <span className="work__index mono">{project.index}</span>
                    <span className="work__year mono">{project.year}</span>
                  </div>
                  <h3 className="work__title">{t(project.title)}</h3>
                  <p className="work__subtitle mono">{t(project.subtitle)}</p>
                  <p className="work__desc">{t(project.desc)}</p>

                  <ul className="work__tags">
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>

                  <ul className="work__metrics">
                    {metrics.map((m) => (
                      <li key={m.k}>
                        <span className="mono">{m.k}</span>
                        <strong>{m.v}</strong>
                      </li>
                    ))}
                  </ul>

                  <span className="work__open">
                    {t(c.ui.viewProject)}
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M2 8h11m0 0L8.6 3.6M13 8l-4.4 4.4" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </span>
                </div>
              </a>
            )
          })}
        </AnimatedContent>
      </div>
    </section>
  )
}
