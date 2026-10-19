import AnimatedContent from './AnimatedContent'
import { OtherCard } from './OtherProjects'
import ProjectBackdrop from './ProjectBackdrop'
import { getOtherGallery } from '../lib/gallery'
import { navigate } from '../lib/useHashRoute'
import useContent from '../lib/content'
import './works-index.css'
import './other-projects.css'
import './other-index.css'

export default function OtherIndex() {
  const { c, t } = useContent()
  const page = c.otherProjectsPage
  const groups = [...new Set(c.otherProjects.flatMap((project) => [
    project.coverGroup,
    ...(project.children || []).map((child) => child.gallery),
  ]))]
  const assetCount = groups.reduce((sum, slug) => sum + getOtherGallery(slug).length, 0)
  return (
    <div className="other-index windex">
      <header className="windex__head">
        <ProjectBackdrop className="windex__backdrop" variant="neon-rain" tone="blue" />
        <div className="shell">
          <a
            className="other-index__back"
            href="#/works"
            onClick={(event) => {
              event.preventDefault()
              navigate('#/works')
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13 8H2m0 0 4.4-4.4M2 8l4.4 4.4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            {t({ zh: '跨境电商作品', en: 'Cross-border works' })}
          </a>

          <AnimatedContent distance={44} blur={8} duration={1}>
            <span className="kicker">{page.kicker}</span>
            <h1 className="windex__title">
              {t(page.title)}
              <em>{t(page.titleEn)}</em>
            </h1>
            <p className="windex__desc">{t(page.desc)}</p>
          </AnimatedContent>

          <AnimatedContent className="windex__stats" delay={0.12} stagger={0.08} distance={30}>
            <div className="windex__stat">
              <span className="mono">CATEGORIES</span>
              <strong>{String(c.otherProjects.length).padStart(2, '0')}</strong>
            </div>
            <div className="windex__stat">
              <span className="mono">PROJECT PAGES</span>
              <strong>{String(c.otherProjects.reduce((sum, project) => sum + 1 + (project.children?.length || 0), 0)).padStart(2, '0')}</strong>
            </div>
            <div className="windex__stat">
              <span className="mono">VISUAL ASSETS</span>
              <strong>{String(assetCount).padStart(2, '0')}</strong>
            </div>
          </AnimatedContent>

        </div>
      </header>

      <div className="shell">
        <AnimatedContent className="op-grid other-index__grid" stagger={0.07} distance={46} blur={5}>
          {c.otherProjects.map((project, index) => (
            <OtherCard key={project.slug} project={project} t={t} featured={index < 2} />
          ))}
        </AnimatedContent>

        <AnimatedContent className="windex__cta" distance={36} blur={6} duration={0.9}>
          <div className="windex__cta-text">
            <h2>{t({ zh: '想继续看跨境项目？', en: 'Back to cross-border work?' })}</h2>
            <p>
              {t({
                zh: '回到跨境电商分类，查看 ACEBEAM 产品详情页、主图与海外社媒物料。',
                en: 'Return to the cross-border category for ACEBEAM product pages, listing visuals and overseas social creatives.',
              })}
            </p>
          </div>
          <div className="windex__cta-actions">
            <a
              className="btn btn--primary"
              href="#/works"
              onClick={(event) => {
                event.preventDefault()
                navigate('#/works')
              }}
            >
              {t({ zh: '查看跨境电商', en: 'Cross-border works' })}
            </a>
            <a
              className="btn"
              href="#contact"
              onClick={(event) => {
                event.preventDefault()
                navigate('#/')
                window.setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 90)
              }}
            >
              {t(c.ui.contactMe)}
            </a>
          </div>
        </AnimatedContent>
      </div>
    </div>
  )
}
