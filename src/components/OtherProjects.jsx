import AnimatedContent from './AnimatedContent'
import SectionPlate from './SectionPlate'
import { getOtherCovers, getOtherGallery } from '../lib/gallery'
import { navigate, rememberHomeScroll } from '../lib/useHashRoute'
import useContent from '../lib/content'
import { sections } from '../data/profile'
import otherBg from '../assets/section-bg/tactical/hangar.webp'
import './other-projects.css'

export function OtherCard({ project, t, featured = false }) {
  const covers = getOtherCovers(project)
  const count = project.children?.length
    ? project.children.reduce((sum, child) => sum + getOtherGallery(child.gallery).length, 0)
    : getOtherGallery(project.coverGroup).length
  const children = project.children || []

  return (
    <a
      href={`#/other/${project.slug}`}
      className={`op-card ${featured ? 'op-card--featured' : ''} ${
        covers.length > 1 ? 'op-card--duo' : ''
      } op-card--${project.slug}`}
      onClick={(event) => {
        event.preventDefault()
        rememberHomeScroll(window.scrollY)
        navigate(`#/other/${project.slug}`)
      }}
    >
      <div className="op-card__media">
        <div className="op-card__stage" aria-label={t(project.title)}>
          {covers.map((cover, index) => (
            <span className="op-card__cover" key={cover.src}>
              <img
                src={cover.src}
                alt={`${t(project.title)} ${index + 1}`}
                loading="lazy"
                decoding="async"
                width={cover.w || undefined}
                height={cover.h || undefined}
              />
              {cover.label ? (
                <span className="op-card__cover-label mono">{t(cover.label)}</span>
              ) : null}
            </span>
          ))}
        </div>
        <span className="op-card__shade" aria-hidden="true" />
        <span className="op-card__index mono">{project.index}</span>
        <span className="op-card__count mono">{String(count).padStart(2, '0')} ASSETS</span>
      </div>

      <div className="op-card__body">
        <div className="op-card__meta mono">
          <span className="op-card__category">{t(project.category)}</span>
          <span>{project.year}</span>
        </div>
        <h3 className="op-card__title">{t(project.title)}</h3>
        <p className="op-card__sub mono">{t(project.subtitle)}</p>
        <p className="op-card__desc">{t(project.desc)}</p>
        {children.length ? (
          <div className="op-card__children">
            {children.map((child, index) => (
              <span key={child.slug}>
                <em className="mono">{String(index + 1).padStart(2, '0')}</em>
                {t(child.title)}
              </span>
            ))}
          </div>
        ) : null}
        <span className="op-card__open">
          {t({ zh: '进入项目', en: 'Explore project' })}
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 8h11m0 0L8.6 3.6M13 8l-4.4 4.4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
    </a>
  )
}

export default function OtherProjects() {
  const { c, t } = useContent()
  const list = c.otherProjects

  return (
    <section className="section other-projects" id="other">
      <SectionPlate className="other-projects__bg" src={otherBg} width={1920} height={1080} />
      <div className="shell">
        <AnimatedContent className="sec-head" distance={40} blur={7} duration={0.95} threshold={0.15}>
          <div className="sec-head__left">
            <span className="sec-head__index">03</span>
            <h2 className="sec-head__title">
              <span className="sec-head__title-en">{t(sections.other.eyebrow)}</span>
              {t(sections.other.title)}
            </h2>
          </div>
          <div className="other-projects__head-right">
            <p className="sec-head__desc">{t(sections.other.desc)}</p>
            <a
              className="sec-head__more"
              href="#/other"
              onClick={(event) => {
                event.preventDefault()
                rememberHomeScroll(window.scrollY)
                navigate('#/other')
              }}
            >
              {t(c.otherProjectUi.viewAllOther)}
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 8h11m0 0L8.6 3.6M13 8l-4.4 4.4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </AnimatedContent>

        <AnimatedContent className="op-grid" stagger={0.08} distance={52} duration={0.82} blur={5}>
          {list.map((project, index) => (
            <OtherCard
              key={project.slug}
              project={project}
              t={t}
              featured={index < 2}
            />
          ))}
        </AnimatedContent>
      </div>
    </section>
  )
}
