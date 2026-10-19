import { lazy, Suspense, useEffect, useState } from 'react'
import AnimatedContent from './AnimatedContent'
import ProjectBackdrop from './ProjectBackdrop'
import { getOtherCover, getOtherFile, getOtherGallery } from '../lib/gallery'
import { navigate } from '../lib/useHashRoute'
import useContent from '../lib/content'
import './other-project.css'

const IllustrationProject = lazy(() => import('./IllustrationProject'))
const RenderingProject = lazy(() => import('./RenderingProject'))

function toneFor(project, child) {
  if (project.slug === 'web-design') return 'blue'
  if (project.slug === 'materials') return 'amber'
  if (project.slug === '3d-rendering') return 'cyan'
  if (project.slug === 'domestic-ecommerce') return child?.slug === 'consistent' ? 'blue' : 'red'
  return 'amber'
}

function backdropFor(project, child) {
  if (project.slug === 'domestic-ecommerce') {
    if (child?.slug === 'creative') return 'cod-warm'
    if (child?.slug === 'consistent') return 'cod-visor'
    return 'cod-team'
  }
  if (project.slug === 'web-design') {
    if (child?.slug === 'amazon') return 'cod-gear'
    if (child?.slug === 'aliexpress') return 'cockpit-night'
    return 'night-launch'
  }
  if (project.slug === 'materials') return 'helmet-soldier'
  if (project.slug === '3d-rendering') return 'heli-night'
  return 'cod-team'
}

function ArrowBack({ children, href, onClick }) {
  return (
    <a className="opd__back" href={href} onClick={onClick}>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M13 8H2m0 0 4.4-4.4M2 8l4.4 4.4"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      {children}
    </a>
  )
}

function ProjectGallery({ images, title, mode = 'grid', onOpen }) {
  if (!images.length) return null

  return (
    <div className={`ogallery ogallery--${mode}`}>
      {images.map((image, index) => (
        <button
          type="button"
          className="ogallery__item"
          key={image.src}
          onClick={() => onOpen(index)}
          aria-label={`${title} ${index + 1}`}
          style={
            image.w && image.h
              ? { '--media-ratio': `${image.w} / ${image.h}` }
              : undefined
          }
        >
          <span className="ogallery__image">
            <img
              src={image.src}
              alt={`${title} ${image.name || index + 1}`}
              loading="lazy"
              decoding="async"
              width={image.w || undefined}
              height={image.h || undefined}
            />
          </span>
          <span className="ogallery__caption">
            <span className="mono">{String(index + 1).padStart(2, '0')}</span>
            <span>{image.name}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

function StorefrontPreview({ images, title, onOpen }) {
  if (!images.length) return null
  const nativeWidth = Math.max(...images.map((image) => image.w || 0), 1100)

  return (
    <div className="storefront-preview" style={{ '--storefront-width': `${nativeWidth}px` }}>
      <div className="storefront-preview__bar">
        <span className="mono">ACTUAL STOREFRONT</span>
        <span className="mono">
          {String(images.length).padStart(2, '0')} CONTINUOUS SECTIONS
        </span>
        <span>{title}</span>
      </div>
      <div className="storefront-preview__viewport">
        {images.map((image, index) => (
          <button
            type="button"
            className="storefront-preview__segment"
            key={image.src}
            onClick={() => onOpen(index)}
            aria-label={`${title} ${index + 1}`}
          >
            <img
              src={image.src}
              alt={`${title} ${index + 1}`}
              loading="lazy"
              decoding="async"
              width={image.w || undefined}
              height={image.h || undefined}
            />
          </button>
        ))}
      </div>
      <div className="storefront-preview__foot">
        <span className="mono">1:1 SOURCE SEQUENCE</span>
        <span>{title}</span>
        <span className="mono">CLICK TO INSPECT</span>
      </div>
    </div>
  )
}

function Lightbox({ images, active, title, onClose, onMove }) {
  useEffect(() => {
    if (active == null) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onMove(-1)
      if (event.key === 'ArrowRight') onMove(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose, onMove])

  if (active == null || !images[active]) return null
  const image = images[active]

  return (
    <div className="olightbox" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="olightbox__backdrop" onClick={onClose} aria-label="Close" />
      <div className="olightbox__bar">
        <span className="mono">
          {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
        <span>{image.name}</span>
        <button type="button" onClick={onClose}>
          CLOSE
        </button>
      </div>
      <button
        type="button"
        className="olightbox__move olightbox__move--prev"
        onClick={() => onMove(-1)}
        aria-label="Previous image"
      >
        ←
      </button>
      <img
        src={image.src}
        alt={`${title} ${active + 1}`}
        loading="eager"
        decoding="async"
        width={image.w || undefined}
        height={image.h || undefined}
      />
      <button
        type="button"
        className="olightbox__move olightbox__move--next"
        onClick={() => onMove(1)}
        aria-label="Next image"
      >
        →
      </button>
    </div>
  )
}

function ChildGrid({ project, t }) {
  return (
    <div className="opd__children">
      {project.children.map((child, index) => {
        const cover = child.coverFile
          ? getOtherFile(child.gallery, child.coverFile)
          : getOtherCover(child.gallery)
        const count = getOtherGallery(child.gallery).length
        return (
          <a
            href={`#/other/${project.slug}/${child.slug}`}
            className={`opd-child opd-child--${child.slug}`}
            key={child.slug}
            onClick={(event) => {
              event.preventDefault()
              navigate(`#/other/${project.slug}/${child.slug}`)
              window.scrollTo({ top: 0, behavior: 'auto' })
            }}
          >
            <div className="opd-child__media">
              {cover ? (
                <img
                  src={cover.src}
                  alt={t(child.title)}
                  loading="lazy"
                  decoding="async"
                  width={cover.w || undefined}
                  height={cover.h || undefined}
                />
              ) : null}
              <span className="opd-child__index mono">{String(index + 1).padStart(2, '0')}</span>
              <span className="opd-child__count mono">{String(count).padStart(2, '0')} IMAGES</span>
            </div>
            <div className="opd-child__body">
              <p className="mono">{t(child.subtitle)}</p>
              <h2>{t(child.title)}</h2>
              <p>{t(child.desc)}</p>
              <span className="opd-child__open">
                {t({ zh: '打开独立页面', en: 'Open standalone page' })}
                <span aria-hidden="true">↗</span>
              </span>
            </div>
          </a>
        )
      })}
    </div>
  )
}

function CategoryPage({ project, t, c }) {
  const cover = getOtherCover(project.coverGroup)
  const gallery = getOtherGallery(project.coverGroup)
  const [active, setActive] = useState(null)
  const hasChildren = Boolean(project.children?.length)
  const strategy = project.strategy

  const move = (direction) => {
    if (active == null) return
    setActive((active + direction + gallery.length) % gallery.length)
  }

  return (
    <>
      <article className={`opd opd--${project.slug}`}>
        <header className="opd__hero">
          <ProjectBackdrop
            className="opd__backdrop"
            variant={backdropFor(project)}
            tone={toneFor(project)}
          />
          <div className="shell opd__hero-inner">
            <ArrowBack
              href="#/other"
              onClick={(event) => {
                event.preventDefault()
                navigate('#/other')
              }}
            >
              {t(c.otherProjectUi.backOther)}
            </ArrowBack>
            <div className="opd__meta mono">
              <span>{project.index} / 05</span>
              <span>{t(project.category)}</span>
              <span>{project.year}</span>
            </div>
            <AnimatedContent className="opd__lead" distance={42} blur={7} duration={0.9}>
              <p className="kicker">{t(project.category)}</p>
              <h1>{t(project.title)}</h1>
              <p className="opd__subtitle mono">{t(project.subtitle)}</p>
              <p className="opd__desc">{t(project.desc)}</p>
              <ul className="opd__tags">
                {t(project.tags).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </AnimatedContent>
          </div>
        </header>

        {hasChildren ? (
          <section className="opd__section opd__section--gallery">
            <div className="shell">
              <ChildGrid project={project} t={t} />
            </div>
          </section>
        ) : null}

        {strategy ? (
          <section className="opd__strategy">
            <div className="shell">
              <div className="opd__section-head">
                <span className="mono">{t(strategy.eyebrow)}</span>
                <h2>{t(strategy.title)}</h2>
              </div>
              <div className="opd__strategy-grid">
                <AnimatedContent className="opd__strategy-lead" distance={34} blur={5}>
                  <span className="opd__strategy-num mono">A/B</span>
                  <p>{t(strategy.lead)}</p>
                </AnimatedContent>
                <AnimatedContent className="opd__strategy-points" stagger={0.07} distance={28} blur={3}>
                  {strategy.points.map((point, index) => (
                    <div className="opd-strategy-point" key={point.title.zh}>
                      <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                      <h3>{t(point.title).replace(/^\d+\s*\/\s*/, '')}</h3>
                      <p>{t(point.desc)}</p>
                    </div>
                  ))}
                </AnimatedContent>
              </div>
            </div>
          </section>
        ) : null}

        {!hasChildren && project.slug === 'materials' ? (
          <section className="opd__section opd__section--gallery">
            <div className="shell">
              <ProjectGallery images={gallery} title={t(project.title)} mode="materials" onOpen={setActive} />
            </div>
          </section>
        ) : null}
      </article>
      <Lightbox images={gallery} active={active} title={t(project.title)} onClose={() => setActive(null)} onMove={move} />
    </>
  )
}

function SubPage({ project, child, t, c }) {
  const gallery = getOtherGallery(child.gallery)
  const [active, setActive] = useState(null)
  const mode = project.slug === 'web-design' ? 'sequence' : 'grid'
  const isStorefront = project.slug === 'web-design'
  const overview = isStorefront
    ? gallery.filter((image) => image.name.includes('完整店铺页'))
    : []
  const modules = isStorefront
    ? gallery.filter((image) => !image.name.includes('完整店铺页'))
    : gallery
  const move = (direction) => {
    if (active == null) return
    setActive((active + direction + gallery.length) % gallery.length)
  }

  return (
    <>
      <article className={`opd opd-sub opd-sub--${project.slug} opd-sub--${child.slug}`}>
        <header className="opd-sub__head">
          <ProjectBackdrop
            className="opd-sub__backdrop"
            variant={backdropFor(project, child)}
            tone={toneFor(project, child)}
          />
          <div className="shell">
            <ArrowBack
              href={`#/other/${project.slug}`}
              onClick={(event) => {
                event.preventDefault()
                navigate(`#/other/${project.slug}`)
              }}
            >
              {t(c.otherProjectUi.backCategory)}
            </ArrowBack>
            <div className="opd-sub__meta mono">
              <span>{project.index}</span>
              <span>{t(project.title)}</span>
              <span>{String(gallery.length).padStart(2, '0')} ASSETS</span>
            </div>
            <AnimatedContent className="opd-sub__lead" distance={42} blur={7}>
              <p className="kicker">{t(child.subtitle)}</p>
              <h1>{t(child.title)}</h1>
              <p>{t(child.desc)}</p>
              <ul className="opd__tags">
                {t(child.tags).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </AnimatedContent>
            <div className="opd-sub__note">
              <span className="mono">{t(c.otherProjectUi.overview)}</span>
              <p>
                {project.slug === 'domestic-ecommerce'
                  ? t({
                      zh: '独立页面与另一套主图策略分开呈现，避免两种视觉逻辑在浏览时混在一起。',
                      en: 'This page is separated from the other listing system so the two visual logics never blur together.',
                    })
                  : project.slug === 'web-design'
                    ? t({
                        zh: '先按真实店铺顺序连续查看完整页面，再进入模块拆解。长页从高清交付稿提取并分段，不裁掉左右画面，也不重新拼贴版式。',
                        en: 'Read the complete storefront in its real browsing order, then inspect the modules. The long page is extracted from the final delivery and split without cropping or rearranging the layout.',
                      })
                  : t({
                      zh: '页面按平台浏览顺序排列，从品牌入口、核心模块到产品承接，可直接连续查看完整视觉链路。',
                      en: 'Assets follow the platform’s browsing order — from brand entry and core modules to product conversion.',
                    })}
              </p>
            </div>
          </div>
        </header>

        <section className="opd-sub__gallery">
          <div className="shell">
            {isStorefront ? (
              <>
                <div className="opd-sub__gallery-head">
                  <span className="mono">01 / {t({ zh: '真实店铺页', en: 'Actual storefront' })}</span>
                  <p>
                    {child.slug === 'amazon'
                      ? t({
                          zh: '按亚马逊 A+ 交付稿的真实浏览顺序完整展开，保留品牌入口、产品分类、热卖阵列、品牌历史与页脚之间的真实留白。',
                          en: 'The Amazon A+ delivery is shown in its real browsing order, preserving the brand entry, category rhythm, bestseller grids, history section and footer spacing.',
                        })
                      : t({
                          zh: '从 1920px 宽的速卖通实际店铺长图提取，保留轮播、品类入口、产品矩阵、品牌介绍与页脚的原生比例和顺序。',
                          en: 'Extracted from the 1920px-wide AliExpress storefront, preserving the carousels, category entry, product matrix, brand story and footer in their native proportions.',
                        })}
                  </p>
                </div>
                {overview.length ? (
                  <StorefrontPreview
                    images={overview}
                    title={t(child.title)}
                    onOpen={(local) => setActive(gallery.indexOf(overview[local]))}
                  />
                ) : null}
                <div className="opd-sub__gallery-head opd-sub__gallery-head--modules">
                  <span className="mono">02 / {t({ zh: '模块拆解', en: 'Modules' })}</span>
                  <p>
                    {t({
                      zh: '按首页轮播、产品类型、品牌介绍、热卖产品与页尾顺序浏览，查看每个模块在实际店铺中的作用。',
                      en: 'Browse carousels, product types, brand story, bestsellers and the footer in storefront order.',
                    })}
                  </p>
                </div>
                <ProjectGallery
                  images={modules}
                  title={t(child.title)}
                  mode="grid"
                  onOpen={(local) => setActive(gallery.indexOf(modules[local]))}
                />
              </>
            ) : (
              <ProjectGallery images={gallery} title={t(child.title)} mode={mode} onOpen={setActive} />
            )}
          </div>
        </section>
      </article>
      <Lightbox images={gallery} active={active} title={t(child.title)} onClose={() => setActive(null)} onMove={move} />
    </>
  )
}

export default function OtherProjectDetail({ slug, sub }) {
  const { c, t } = useContent()
  const project = c.otherProjects.find((item) => item.slug === slug)

  if (!project) {
    return (
      <section className="detail shell">
        <p className="detail__empty-text">{t(c.ui.notFoundOther)}（{slug}）</p>
        <a
          className="detail__back"
          href="#/other"
          onClick={(event) => {
            event.preventDefault()
            navigate('#/other')
          }}
        >
          ← {t(c.ui.backToOther)}
        </a>
      </section>
    )
  }

  if (slug === 'illustration' || slug === '3d-rendering') {
    return (
      <Suspense fallback={<div className="route-loading mono">LOADING PROJECT…</div>}>
        {slug === 'illustration' ? (
          <IllustrationProject project={project} />
        ) : (
          <RenderingProject project={project} />
        )}
      </Suspense>
    )
  }

  if (sub) {
    const child = project.children?.find((item) => item.slug === sub)
    if (!child) {
      return (
        <section className="detail shell">
          <p className="detail__empty-text">{t(c.ui.notFoundOther)}（{sub}）</p>
          <a
            className="detail__back"
            href={`#/other/${slug}`}
            onClick={(event) => {
              event.preventDefault()
              navigate(`#/other/${slug}`)
            }}
          >
            ← {t(c.otherProjectUi.backCategory)}
          </a>
        </section>
      )
    }
    return <SubPage project={project} child={child} t={t} c={c} />
  }

  return <CategoryPage project={project} t={t} c={c} />
}
