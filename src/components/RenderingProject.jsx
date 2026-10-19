import { useEffect, useState } from 'react'
import AnimatedContent from './AnimatedContent'
import { getOtherGallery } from '../lib/gallery'
import { navigate } from '../lib/useHashRoute'
import useContent from '../lib/content'
import './rendering-project.css'

function RenderFigure({ image, index, onOpen, className = '', eager = false }) {
  if (!image) return null

  return (
    <button
      type="button"
      className={`r-figure ${className}`}
      onClick={() => onOpen(index)}
      aria-label={`${image.name}，打开大图`}
    >
      <span className="r-figure__media">
        <img
          src={image.src}
          alt={image.name}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          width={image.w || undefined}
          height={image.h || undefined}
        />
      </span>
      <span className="r-figure__caption">
        <span className="mono">{String(index + 1).padStart(2, '0')}</span>
        <span>{image.name}</span>
      </span>
    </button>
  )
}

function RenderLightbox({ images, active, onClose, onMove }) {
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
    <div className="r-lightbox" role="dialog" aria-modal="true" aria-label="3D 渲染作品大图">
      <button type="button" className="r-lightbox__backdrop" onClick={onClose} aria-label="关闭" />
      <div className="r-lightbox__bar">
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
        className="r-lightbox__move r-lightbox__move--prev"
        onClick={() => onMove(-1)}
        aria-label="上一张"
      >
        ←
      </button>
      <img src={image.src} alt={image.name} />
      <button
        type="button"
        className="r-lightbox__move r-lightbox__move--next"
        onClick={() => onMove(1)}
        aria-label="下一张"
      >
        →
      </button>
    </div>
  )
}

export default function RenderingProject({ project }) {
  const { t } = useContent()
  const gallery = getOtherGallery(project.coverGroup)
  const [active, setActive] = useState(null)
  const studies = gallery.slice(1)

  const move = (direction) => {
    if (active == null) return
    setActive((active + direction + gallery.length) % gallery.length)
  }

  return (
    <>
      <article className="rproject">
        <header className="r-hero">
          <div className="shell r-hero__inner">
            <div className="r-hero__top">
              <a
                className="r-back"
                href="#/other"
                onClick={(event) => {
                  event.preventDefault()
                  navigate('#/other')
                }}
              >
                <span aria-hidden="true">←</span>
                {t({ zh: '返回其他项目', en: 'Back to other projects' })}
              </a>
              <span className="mono">
                05 / BLENDER STUDIES / {String(gallery.length).padStart(2, '0')} FRAMES
              </span>
            </div>

            <div className="r-hero__body">
              <AnimatedContent className="r-hero__copy" distance={38} blur={6}>
                <p className="r-kicker">3D MODELING · LIGHTING · RENDERING</p>
                <h1>{t(project.title)}</h1>
                <p className="r-hero__subtitle">{t(project.subtitle)}</p>
                <p className="r-hero__desc">{t(project.desc)}</p>
                <ul className="r-tags">
                  {t(project.tags).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </AnimatedContent>

              <RenderFigure
                image={gallery[0]}
                index={0}
                className="r-hero__poster"
                onOpen={setActive}
                eager
              />
            </div>

            <div className="r-hero__foot mono">
              <span>{String(gallery.length).padStart(2, '0')} SELECTED FRAMES</span>
              <span>BLENDER / MATERIAL / LIGHT</span>
              <span>SCROLL TO EXPLORE ↓</span>
            </div>
          </div>
        </header>

        <section className="r-studies">
          <div className="shell">
            <div className="r-study-grid">
              {studies.map((image, index) => (
                <RenderFigure
                  key={image.src}
                  image={image}
                  index={index + 1}
                  className={`r-study r-study--${index + 1}`}
                  onOpen={setActive}
                />
              ))}
            </div>
          </div>
        </section>

        <footer className="r-footer">
          <div className="shell">
            <div>
              <p className="r-kicker">END OF 3D STUDIES</p>
              <h2>{t({ zh: '继续看其他项目', en: 'Continue through the other projects' })}</h2>
            </div>
            <a
              href="#/other"
              onClick={(event) => {
                event.preventDefault()
                navigate('#/other')
              }}
            >
              {t({ zh: '返回其他项目', en: 'Back to other projects' })}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </footer>
      </article>
      <RenderLightbox
        images={gallery}
        active={active}
        onClose={() => setActive(null)}
        onMove={move}
      />
    </>
  )
}
