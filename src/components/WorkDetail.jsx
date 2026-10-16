import AnimatedContent from './AnimatedContent'
import Reveal from './Reveal'
import { getCover, getGallery } from '../lib/gallery'
import { goHomeTo, getWorksOrigin, navigate } from '../lib/useHashRoute'
import useContent from '../lib/content'
import './work-detail.css'

/** 图片说明：优先用文件名里 "-" 后面的文字（例如 03-详情页排版.webp → 详情页排版） */
function captionOf(image) {
  return String(image.name || '')
    .replace(/^\d+[-_\s]*/, '')
    .trim()
}

/**
 * 「项目信息」栏：
 * 先用项目本身已有的真实数据（分类 / 年份 / 交付），
 * 如果数据里补了 detail（角色 / 周期 / 交付物），就自动多显示几项。
 */
function factsOf(project, t, ui) {
  const detail = project.detail || {}
  const facts = [
    { label: t(ui.factType), value: t(project.category) },
    { label: t(ui.factTime), value: detail.period || project.year },
  ]
  if (detail.role) facts.push({ label: t(ui.factRole), value: t(detail.role) })
  facts.push({
    label: t(ui.factDeliver),
    list: detail.deliverables
      ? t(detail.deliverables)
      : t(project.metrics).map((m) => `${m.k} · ${m.v}`),
  })
  return facts
}

export default function WorkDetail({ slug }) {
  const { c, t, tl } = useContent()
  const projects = c.projects
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  if (!project) {
    return (
      <section className="detail shell">
        <p className="detail__empty-text">
          {t(c.ui.notFound)}（{slug}）
        </p>
        <a
          className="detail__back"
          href="#/works"
          onClick={(e) => {
            e.preventDefault()
            navigate('#/works')
          }}
        >
          ← {t(c.ui.backToWorks)}
        </a>
      </section>
    )
  }

  const gallery = getGallery(slug)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const prevCover = getCover(prev.slug)
  const nextCover = getCover(next.slug)
  const facts = factsOf(project, t, c.ui)
  const notes = project.notes
  const tags = tl(project.tags)
  const galleryLayout = project.detail?.gallery === 'grid' ? 'grid' : 'stack'

  // 从首页点进来就回首页那块，从列表页点进来就回列表页
  const backToList = (event) => {
    event.preventDefault()
    if (getWorksOrigin() === 'home') {
      goHomeTo('works')
      return
    }
    navigate('#/works')
  }

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <article className="detail">
      <header className="detail__head">
        <div className="shell">
          <a className="detail__back" href="#/works" onClick={backToList}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H2m0 0 4.4-4.4M2 8l4.4 4.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {t(c.ui.backToWorks)}
          </a>

          <div className="detail__meta">
            <span className="mono">{project.index} / {String(projects.length).padStart(2, '0')}</span>
            <span className="mono">{t(project.category)}</span>
            <span className="mono">{project.year}</span>
          </div>

          {/* 左栏：作品名 + 一句话定位 + 说明 + 标签 */}
          <AnimatedContent className="detail__lead" distance={46} blur={8} duration={1}>
            <h1 className="detail__title">{t(project.title)}</h1>
            <p className="detail__subtitle mono">{t(project.subtitle)}</p>
            <p className="detail__desc">{t(project.desc)}</p>
            <ul className="detail__tags">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </AnimatedContent>

          {/* 右栏：项目信息（原来单独占一整条，现在并到标题旁边，省掉一大截空白） */}
          <AnimatedContent
            className="detail__facts"
            stagger={0.06}
            distance={26}
            duration={0.7}
            delay={0.1}
          >
            {facts.map((fact) => (
              <div className="detail__fact" key={fact.label}>
                <span className="mono">{fact.label}</span>
                {fact.value ? <strong>{fact.value}</strong> : null}
                {fact.list ? (
                  <ul className="detail__fact-list">
                    {fact.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </AnimatedContent>
        </div>
      </header>

      {notes ? (
        <section className="dnotes">
          <div className="shell">
            {/* 标题和正文并排：原来一上一下，空了一大片 */}
            <div className="dnotes__top">
              <AnimatedContent className="dnotes__head" distance={36} blur={6} duration={0.9}>
                <span className="kicker">{t(c.ui.designNotesKicker)}</span>
                <h2 className="dnotes__title">{t(c.ui.designNotesTitle)}</h2>
              </AnimatedContent>

              <AnimatedContent className="dnotes__idea" delay={0.08} distance={30} duration={0.85} blur={4}>
                <p>{t(notes.idea)}</p>
              </AnimatedContent>
            </div>

            {notes.points?.length ? (
              <AnimatedContent className="dnotes__points" stagger={0.09} distance={30} duration={0.75}>
                {tl(notes.points).map((point, i) => (
                  <div className="dnote" key={point.t}>
                    <span className="dnote__num mono">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="dnote__title">{point.t}</h3>
                    <p className="dnote__desc">{point.d}</p>
                  </div>
                ))}
              </AnimatedContent>
            ) : null}

            {notes.flow ? (
              <AnimatedContent className="dflow" delay={0.12} distance={30} duration={0.8}>
                <span className="mono dflow__label">{t(c.ui.pageFlow)}</span>
                <ol className="dflow__list">
                  {t(notes.flow).map((step, i) => (
                    <li key={step}>
                      <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </AnimatedContent>
            ) : null}
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <div className="shell detail__gallery-head">
          <span className="mono">{t(c.ui.gallery)}</span>
          <span className="mono">
            {String(gallery.length).padStart(2, '0')} {t(c.ui.galleryUnit)}
          </span>
        </div>
      ) : null}

      <div className={`detail__gallery detail__gallery--${galleryLayout}`}>
        {gallery.length ? (
          gallery.map((img, i) => (
            <Reveal as="figure" className="detail__shot" key={img.src} delay={i < 3 ? i * 60 : 0}>
              <img
                src={img.src}
                alt={`${t(project.title)} ${i + 1}`}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                width={img.w || undefined}
                height={img.h || undefined}
              />
              <figcaption className="mono">
                <span className="detail__shot-index">
                  {String(i + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                </span>
                {captionOf(img) ? (
                  <span className="detail__shot-caption">{captionOf(img)}</span>
                ) : null}
              </figcaption>
            </Reveal>
          ))
        ) : (
          <div className="shell">
            <div className="detail__empty">
              <span className="mono">GALLERY</span>
              <h2>{t({ zh: '这个作品的图还没放进来', en: 'No images for this project yet' })}</h2>
              <p>
                {t({
                  zh: '把原图按顺序丢进 media-src/works/' + project.slug + '/，文件名用 01-、02- 排好，然后运行一次 pnpm media:image，图片会自动压缩成网页版并显示在这里。',
                  en: 'Put the source images into media-src/works/' + project.slug + '/ named 01-, 02- … then run pnpm media:image once — they will be optimised and shown here automatically.',
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      <nav className="detail__pager">
        <div className="shell detail__pager-inner">
          <a
            className="detail__pager-item"
            href={`#/works/${prev.slug}`}
            onClick={(e) => {
              e.preventDefault()
              navigate(`#/works/${prev.slug}`)
            }}
          >
            <span className="mono detail__pager-dir">{t(c.ui.prev)}</span>
            <span className="detail__pager-row">
              {prevCover ? (
                <span className="detail__pager-thumb">
                  <img src={prevCover.src} alt="" loading="lazy" decoding="async" />
                </span>
              ) : null}
              <strong>{t(prev.title)}</strong>
            </span>
          </a>
          <a
            className="detail__pager-item detail__pager-item--next"
            href={`#/works/${next.slug}`}
            onClick={(e) => {
              e.preventDefault()
              navigate(`#/works/${next.slug}`)
            }}
          >
            <span className="mono detail__pager-dir">{t(c.ui.next)}</span>
            <span className="detail__pager-row">
              <strong>{t(next.title)}</strong>
              {nextCover ? (
                <span className="detail__pager-thumb">
                  <img src={nextCover.src} alt="" loading="lazy" decoding="async" />
                </span>
              ) : null}
            </span>
          </a>
        </div>
      </nav>

      <footer className="detail__foot">
        <div className="shell detail__foot-inner">
          <span className="mono">
            {t(c.profile.name)} · {t(c.profile.role)}
          </span>
          <div className="detail__foot-links">
            <a className="mono detail__top" href="#/works" onClick={backToList}>
              {t(c.ui.allWorks)}
            </a>
            <button type="button" className="mono detail__top" onClick={toTop}>
              {t(c.ui.toTop)}
            </button>
          </div>
        </div>
      </footer>
    </article>
  )
}
