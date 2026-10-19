import AnimatedContent from './AnimatedContent'
import SectionPlate from './SectionPlate'
import useContent from '../lib/content'
import { sections } from '../data/profile'
import strengthsBg from '../assets/section-bg/tactical/cod-visor.webp'
import './strengths.css'

const ICONS = {
  commerce: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M3.6 12h16.8M12 3.6c2.4 2.3 3.6 5.1 3.6 8.4s-1.2 6.1-3.6 8.4c-2.4-2.3-3.6-5.1-3.6-8.4S9.6 5.9 12 3.6Z" />
    </>
  ),
  systems: (
    <>
      <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="2.4" />
      <path d="M3.8 9.4h16.4M9.6 9.4v10.8" />
    </>
  ),
  product: (
    <>
      <path d="M12 3.4 13.9 9l5.6 2-5.6 2-1.9 5.6L10.1 13 4.5 11l5.6-2z" />
      <path d="M18.4 16.6l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  story: (
    <>
      <path d="M4.4 5.2h6.1c.8 0 1.5.7 1.5 1.5v11.1H7c-1.4 0-2.6-1.2-2.6-2.6z" />
      <path d="M19.6 5.2h-6.1c-.8 0-1.5.7-1.5 1.5v11.1H17c1.4 0 2.6-1.2 2.6-2.6z" />
      <path d="M7.2 9h2.4M14.4 9h2.4" />
    </>
  ),
  multi: (
    <>
      <path d="M12 3.4 3.6 7.9 12 12.4l8.4-4.5z" />
      <path d="M3.6 12.5 12 17l8.4-4.5M3.6 16.5 12 21l8.4-4.5" />
    </>
  ),
  vi: (
    <>
      <path d="M12 3.2 19.4 6v6c0 4-3.1 7.2-7.4 8.8C7.7 19.2 4.6 16 4.6 12V6z" />
      <path d="M9 12.2l2.2 2.2 4.2-4.4" />
    </>
  ),
  strategy: (
    <>
      <path d="M4.6 10.4A7.6 7.6 0 0 1 17.9 6.6l1.5 2" />
      <path d="M19.4 13.6A7.6 7.6 0 0 1 6.1 17.4l-1.5-2" />
      <path d="M19.4 4.4v4.2h-4.2M4.6 19.6v-4.2h4.2" />
    </>
  ),
}

export default function Strengths() {
  const { c, t } = useContent()

  return (
    <section className="section strengths" id="strengths">
      <SectionPlate className="strengths__bg" src={strengthsBg} width={1920} height={1080} />
      <div className="shell">
        <AnimatedContent className="sec-head" distance={40} blur={7} duration={0.95} threshold={0.15}>
          <div className="sec-head__left">
            <span className="sec-head__index">04</span>
            <h2 className="sec-head__title">
              <span className="sec-head__title-en">{t(sections.strengths.eyebrow)}</span>
              {t(sections.strengths.title)}
            </h2>
          </div>
          <p className="sec-head__desc">{t(sections.strengths.desc)}</p>
        </AnimatedContent>

        <AnimatedContent className="strengths__grid" stagger={0.08} distance={40} duration={0.8} blur={4}>
          {c.strengths.map((item, i) => (
            <div className="cap" key={item.id}>
              <div className="cap__top">
                <span className="cap__icon">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[item.id]}
                    </g>
                  </svg>
                </span>
                <span className="cap__index mono">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="cap__title">{t(item.title)}</h3>
              <p className="cap__en mono">{t(item.en)}</p>
              <p className="cap__desc">{t(item.desc)}</p>
            </div>
          ))}
        </AnimatedContent>
      </div>
    </section>
  )
}
